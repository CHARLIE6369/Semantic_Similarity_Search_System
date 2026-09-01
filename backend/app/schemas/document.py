from typing import List, Optional
from pydantic import BaseModel, Field


class DocumentResponse(BaseModel):
    document_id: str = Field(..., description="Unique document ID (e.g. KB001312)")
    title: str = Field(..., description="Document title")
    category: str = Field(..., description="Document category")
    content: str = Field(..., description="Full text body of the document")
    keywords: List[str] = Field(default_factory=list, description="Keywords list")


class CategoriesResponse(BaseModel):
    categories: List[str] = Field(..., description="Sorted list of unique category names")


class HealthResponse(BaseModel):
    model_config = {"protected_namespaces": ()}

    status: str = Field(..., description="Service status ('healthy' or 'unhealthy')")
    model_loaded: bool = Field(..., description="Whether Word2Vec model and artifacts are loaded")
    missing_artifacts: Optional[List[str]] = Field(default=None, description="List of missing artifact paths if any")

