from fastapi import APIRouter
from app.schemas.document import CategoriesResponse
from app.services.document_service import document_service

router = APIRouter(tags=["Categories"])


@router.get(
    "/categories",
    response_model=CategoriesResponse,
    summary="List Document Categories",
    description="Retrieve all unique document categories sorted alphabetically."
)
def get_categories() -> CategoriesResponse:
    categories = document_service.get_categories()
    return CategoriesResponse(categories=categories)
