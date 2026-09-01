from fastapi import APIRouter
from app.schemas.document import HealthResponse
from app.services.model_service import model_service

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="System Health and Model Status",
    description="Returns backend system health status and ML model loading state."
)
def get_health() -> HealthResponse:
    info = model_service.get_status_info()
    status_str = "healthy" if info["model_loaded"] else "degraded"
    return HealthResponse(
        status=status_str,
        model_loaded=info["model_loaded"],
        missing_artifacts=info["missing_artifacts"] if info["missing_artifacts"] else None
    )
