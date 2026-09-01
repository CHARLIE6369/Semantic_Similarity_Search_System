from fastapi import APIRouter
from app.schemas.search import ModelsResponse
from app.services.model_service import model_service

router = APIRouter(tags=["Models"])


@router.get(
    "/models",
    response_model=ModelsResponse,
    summary="List Search Models",
    description="Retrieve available ML search model options (Word2Vec, FastText, TF-IDF)."
)
def get_models() -> ModelsResponse:
    models = model_service.get_available_models()
    return ModelsResponse(models=models)
