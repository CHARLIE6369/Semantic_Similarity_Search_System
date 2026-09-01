from pathlib import Path
from typing import Optional, List, Dict, Any
import pickle
import ast
import numpy as np
import pandas as pd
from gensim.models import Word2Vec, FastText
from scipy import sparse
from sklearn.feature_extraction.text import TfidfVectorizer

from app.core.config import settings
from app.core.logging import logger


class ModelService:
    """Service for loading and managing Word2Vec, FastText, and TF-IDF models, document vectors, and dataset artifacts."""

    def __init__(self):
        self.w2v_model: Optional[Word2Vec] = None
        self.ft_model: Optional[FastText] = None
        self.tfidf_vectorizer: Optional[Any] = None

        self.doc_vectors_w2v: Optional[np.ndarray] = None
        self.doc_vectors_ft: Optional[np.ndarray] = None
        self.doc_vectors_tfidf: Optional[sparse.csr_matrix] = None

        self.df: Optional[pd.DataFrame] = None
        self.missing_artifacts: List[str] = []
        self._is_loaded: bool = False

    def load_artifacts(self) -> bool:
        """Load all available ML model artifacts on startup, or auto-generate fallback if deployed to cloud."""
        base_dir = settings.get_absolute_path("models")
        base_dir.mkdir(parents=True, exist_ok=True)

        w2v_path = base_dir / "word2vec.model"
        w2v_vec_path = base_dir / "doc_vectors_w2v.npy"
        
        ft_path = base_dir / "fasttext.model"
        ft_vec_path = base_dir / "doc_vectors_fasttext.npy"

        tfidf_path = base_dir / "tfidf_vectorizer.pkl"
        tfidf_vec_path = base_dir / "doc_vectors_tfidf.npz"

        dataset_path = base_dir / "cleaned_dataset.csv"

        self.missing_artifacts = []

        # If dataset CSV missing on cloud server, create sample cloud dataset
        if not dataset_path.exists():
            logger.warning(f"Dataset CSV missing at '{dataset_path}'. Creating initial cloud dataset...")
            sample_data = [
                {"document_id": "KB001001", "title": "Forgot Your Password? on the Web", "category": "Authentication", "content": "Reset your account password easily online. Enter your registered email address to receive password reset link.", "keywords": "password, reset, authentication, login"},
                {"document_id": "KB001002", "title": "How to Change Account Email Address", "category": "Account Settings", "content": "Update your profile email address in account settings. Verification code will be sent to confirm change.", "keywords": "email, change, profile, settings"},
                {"document_id": "KB001003", "title": "Fix Verification Code Not Working", "category": "Security", "content": "Troubleshoot 2FA and OTP verification code issues. Request new SMS or check authenticator app sync.", "keywords": "verification, code, otp, 2fa, security"},
                {"document_id": "KB001004", "title": "Order Problem and Refund Support", "category": "Orders & Billing", "content": "Resolve order payment issues, track delivery status, or request invoice refund from support team.", "keywords": "order, refund, payment, support, billing"},
                {"document_id": "KB001005", "title": "Enable Two-Factor Authentication", "category": "Security", "content": "Protect your account with two factor authentication 2FA using Google Authenticator or SMS.", "keywords": "2fa, security, authentication, protection"}
            ]
            self.df = pd.DataFrame(sample_data)
            self.df.to_csv(dataset_path, index=False)
        else:
            logger.info(f"Loading dataset CSV from '{dataset_path}'...")
            self.df = pd.read_csv(str(dataset_path))

        if "document_id" in self.df.columns:
            self.df["document_id"] = self.df["document_id"].astype(str)
        self.df.fillna("", inplace=True)
        doc_count = len(self.df)

        try:
            # 1. Load Word2Vec if available
            if w2v_path.exists() and w2v_vec_path.exists():
                logger.info("Loading Word2Vec model and vectors...")
                self.w2v_model = Word2Vec.load(str(w2v_path))
                self.doc_vectors_w2v = np.load(str(w2v_vec_path))
                logger.info("[OK] Word2Vec loaded.")
            else:
                logger.info("Auto-training initial Word2Vec fallback model...")
                sentences = [str(t).lower().split() for t in self.df["title"].tolist()]
                self.w2v_model = Word2Vec(sentences=sentences, vector_size=100, min_count=1, sg=1, epochs=10)
                self.w2v_model.save(str(w2v_path))
                self.doc_vectors_w2v = np.array([np.mean([self.w2v_model.wv[w] for w in s if w in self.w2v_model.wv] or [np.zeros(100)], axis=0) for s in sentences], dtype=np.float32)
                np.save(str(w2v_vec_path), self.doc_vectors_w2v)

            # 2. Load FastText if available
            if ft_path.exists() and ft_vec_path.exists():
                logger.info("Loading FastText model and vectors...")
                self.ft_model = FastText.load(str(ft_path))
                self.doc_vectors_ft = np.load(str(ft_vec_path))
                logger.info("[OK] FastText loaded.")

            # 3. Load TF-IDF if available
            if tfidf_path.exists() and tfidf_vec_path.exists():
                logger.info("Loading TF-IDF vectorizer and matrix...")
                with open(tfidf_path, "rb") as f:
                    self.tfidf_vectorizer = pickle.load(f)
                self.doc_vectors_tfidf = sparse.load_npz(str(tfidf_vec_path))
                logger.info("[OK] TF-IDF loaded.")
            else:
                logger.info("Auto-building TF-IDF fallback matrix...")
                self.tfidf_vectorizer = TfidfVectorizer(max_features=10000)
                self.doc_vectors_tfidf = self.tfidf_vectorizer.fit_transform(self.df["title"].astype(str))
                with open(tfidf_path, "wb") as f:
                    pickle.dump(self.tfidf_vectorizer, f)
                sparse.save_npz(str(tfidf_vec_path), self.doc_vectors_tfidf)

            self._is_loaded = True
            logger.info(f"[OK] ModelService initialized with {doc_count} dataset records.")
            return True

        except Exception as e:
            logger.error(f"Failed to load ML artifacts: {str(e)}", exc_info=True)
            self._is_loaded = False
            return False

    @property
    def is_loaded(self) -> bool:
        return self._is_loaded

    def get_available_models(self) -> List[Dict[str, Any]]:
        """Return metadata list of available search models."""
        return [
            {
                "id": "word2vec",
                "name": "Word2Vec (Skip-Gram)",
                "description": "Gensim Skip-gram 100D vector embeddings with mean pooling.",
                "available": self.w2v_model is not None and self.doc_vectors_w2v is not None
            },
            {
                "id": "fasttext",
                "name": "FastText (Subword)",
                "description": "Gensim Subword 100D n-gram embeddings handling out-of-vocabulary words.",
                "available": self.ft_model is not None and self.doc_vectors_ft is not None
            },
            {
                "id": "tfidf",
                "name": "TF-IDF (Sparse Matrix)",
                "description": "Term Frequency-Inverse Document Frequency sparse matrix baseline.",
                "available": self.tfidf_vectorizer is not None and self.doc_vectors_tfidf is not None
            }
        ]

    def get_status_info(self) -> Dict[str, Any]:
        """Return status info for health check."""
        return {
            "model_loaded": self._is_loaded,
            "missing_artifacts": self.missing_artifacts,
            "doc_count": len(self.df) if self.df is not None else 0,
            "available_models": [m["id"] for m in self.get_available_models() if m["available"]]
        }


model_service = ModelService()
