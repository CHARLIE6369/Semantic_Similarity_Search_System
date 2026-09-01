from typing import List, Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict


class SearchRequest(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    query: str = Field(
        ...,
        description="Natural language search query string.",
        examples=["I forgot my password"]
    )
    top_k: int = Field(
        default=5,
        ge=1,
        le=50,
        description="Maximum number of results to return (1 to 50)."
    )
    category: Optional[str] = Field(
        default=None,
        description="Optional category name filter."
    )
    model_type: str = Field(
        default="word2vec",
        description="Selected vector search model engine ('word2vec', 'fasttext', 'tfidf')."
    )

    @field_validator("query")
    @classmethod
    def validate_query(cls, v: str) -> str:
        trimmed = v.strip()
        if len(trimmed) < 2:
            raise ValueError("Query string must contain at least 2 non-whitespace characters.")
        return trimmed

    @field_validator("model_type")
    @classmethod
    def validate_model_type(cls, v: str) -> str:
        clean = v.strip().lower()
        if clean not in ["word2vec", "fasttext", "tfidf"]:
            return "word2vec"
        return clean


class SearchResultItem(BaseModel):
    document_id: str = Field(..., description="Unique document ID (e.g. KB001312)")
    title: str = Field(..., description="Document title")
    category: str = Field(..., description="Document category")
    similarity_score: float = Field(..., description="Cosine similarity score (0.0 to 1.0)")


class SearchResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    query: str = Field(..., description="Executed search query string")
    model_type: str = Field(..., description="ML model engine used for the search")
    total_results: int = Field(..., description="Number of results returned")
    results: List[SearchResultItem] = Field(..., description="Ranked list of search results")
    processing_time_ms: float = Field(..., description="Backend search processing time in milliseconds")


class ModelOption(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    id: str = Field(..., description="Model identifier ('word2vec', 'fasttext', 'tfidf')")
    name: str = Field(..., description="Display name")
    description: str = Field(..., description="Description of the ML approach")
    available: bool = Field(..., description="Whether model files are loaded and ready")


class ModelsResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    models: List[ModelOption] = Field(..., description="List of supported search models")
