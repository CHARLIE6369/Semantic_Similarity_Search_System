import time
from typing import Dict, List, Optional, Any
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse

from app.ml.preprocessing import clean_and_tokenize
from app.ml.embeddings import generate_query_vector
from app.ml.similarity import calculate_cosine_similarity
from app.services.model_service import ModelService, model_service
from app.utils.exceptions import InvalidQueryException, ModelNotLoadedException


class SearchService:
    """Service responsible for executing multi-model semantic similarity search operations."""

    def __init__(self, service: ModelService = model_service):
        self.model_svc = service

    def search(
        self,
        query: str,
        top_k: int = 5,
        category: Optional[str] = None,
        model_type: str = "word2vec"
    ) -> Dict[str, Any]:
        """Perform similarity search using selected model type ('word2vec', 'fasttext', 'tfidf')."""

        start_time = time.perf_counter()

        if not query or not isinstance(query, str) or len(query.strip()) < 2:
            raise InvalidQueryException("Search query must be a string with at least 2 characters.")

        query_str = query.strip()
        selected_model = model_type.strip().lower()

        if not self.model_svc.is_loaded or self.model_svc.df is None:
            raise ModelNotLoadedException("ML model artifacts are not loaded. Please train/place model files.")

        df = self.model_svc.df

        # Compute similarity scores based on model selection
        if selected_model == "fasttext":
            if self.model_svc.ft_model is None or self.model_svc.doc_vectors_ft is None:
                raise ModelNotLoadedException("FastText model artifacts are not loaded.")
            
            q_vec = generate_query_vector(query_str, self.model_svc.ft_model)
            similarity_scores = calculate_cosine_similarity(q_vec, self.model_svc.doc_vectors_ft)

        elif selected_model == "tfidf":
            if self.model_svc.tfidf_vectorizer is None or self.model_svc.doc_vectors_tfidf is None:
                raise ModelNotLoadedException("TF-IDF model artifacts are not loaded.")
            
            tokens = clean_and_tokenize(query_str)
            clean_query_text = " ".join(tokens)
            q_vec_sparse = self.model_svc.tfidf_vectorizer.transform([clean_query_text])
            similarity_scores = cosine_similarity(q_vec_sparse, self.model_svc.doc_vectors_tfidf).flatten()
            similarity_scores = np.nan_to_num(similarity_scores, nan=0.0).astype(np.float32)

        else: # default to word2vec
            selected_model = "word2vec"
            if self.model_svc.w2v_model is None or self.model_svc.doc_vectors_w2v is None:
                raise ModelNotLoadedException("Word2Vec model artifacts are not loaded.")
            
            q_vec = generate_query_vector(query_str, self.model_svc.w2v_model)
            similarity_scores = calculate_cosine_similarity(q_vec, self.model_svc.doc_vectors_w2v)

        # Apply category filter
        if category and category.strip():
            cat_clean = category.strip().lower()
            mask = df["category"].astype(str).str.strip().str.lower() == cat_clean
            matching_indices = np.where(mask)[0]
        else:
            matching_indices = np.arange(len(df))

        if len(matching_indices) == 0:
            elapsed_ms = (time.perf_counter() - start_time) * 1000.0
            return {
                "query": query_str,
                "model_type": selected_model,
                "total_results": 0,
                "results": [],
                "processing_time_ms": round(elapsed_ms, 2)
            }

        # Rank descending
        filtered_scores = similarity_scores[matching_indices]
        sorted_rel_order = np.argsort(filtered_scores)[::-1]
        top_rel_indices = sorted_rel_order[:top_k]

        final_indices = matching_indices[top_rel_indices]
        final_scores = filtered_scores[top_rel_indices]

        results: List[Dict[str, Any]] = []
        for idx, score in zip(final_indices, final_scores):
            row = df.iloc[idx]
            results.append({
                "document_id": str(row.get("document_id", "")),
                "title": str(row.get("title", "")),
                "category": str(row.get("category", "")),
                "similarity_score": round(float(score), 6)
            })

        elapsed_ms = (time.perf_counter() - start_time) * 1000.0

        return {
            "query": query_str,
            "model_type": selected_model,
            "total_results": len(results),
            "results": results,
            "processing_time_ms": round(elapsed_ms, 2)
        }


search_service = SearchService()
