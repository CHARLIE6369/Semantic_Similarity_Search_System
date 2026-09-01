from typing import Dict, List, Any
import ast
from app.services.model_service import ModelService, model_service
from app.utils.exceptions import DocumentNotFoundException, ModelNotLoadedException


class DocumentService:
    """Service for retrieving document details and category lists."""

    def __init__(self, service: ModelService = model_service):
        self.model_svc = service

    def get_document(self, document_id: str) -> Dict[str, Any]:
        """Fetch document details by document_id. Raises 404/DocumentNotFoundException if not found."""
        if not self.model_svc.is_loaded or self.model_svc.df is None:
            raise ModelNotLoadedException(
                "Dataset is not loaded. Please place 'cleaned_dataset.csv' in 'backend/models/'."
            )

        df = self.model_svc.df
        clean_doc_id = str(document_id).strip()

        match = df[df["document_id"].astype(str).str.strip().str.lower() == clean_doc_id.lower()]

        if match.empty:
            raise DocumentNotFoundException(clean_doc_id)

        row = match.iloc[0]
        keywords_val = row.get("keywords", "")

        keywords_list: List[str] = []
        if isinstance(keywords_val, list):
            keywords_list = [str(k).strip() for k in keywords_val if str(k).strip()]
        elif isinstance(keywords_val, str):
            kw_str = keywords_val.strip()
            if kw_str.startswith("[") and kw_str.endswith("]"):
                try:
                    parsed = ast.literal_eval(kw_str)
                    if isinstance(parsed, list):
                        keywords_list = [str(k).strip() for k in parsed if str(k).strip()]
                except Exception:
                    keywords_list = [k.strip() for k in kw_str.strip("[]").split(",") if k.strip()]
            elif kw_str:
                keywords_list = [k.strip() for k in kw_str.split(",") if k.strip()]

        return {
            "document_id": str(row.get("document_id", "")),
            "title": str(row.get("title", "")),
            "category": str(row.get("category", "")),
            "content": str(row.get("content", "")),
            "keywords": keywords_list
        }

    def get_categories(self) -> List[str]:
        """Return all unique categories sorted alphabetically."""
        if not self.model_svc.is_loaded or self.model_svc.df is None:
            return []

        df = self.model_svc.df
        if "category" not in df.columns:
            return []

        unique_cats = df["category"].dropna().astype(str).str.strip().unique()
        valid_cats = [c for c in unique_cats if c]
        valid_cats.sort()
        return valid_cats


document_service = DocumentService()
