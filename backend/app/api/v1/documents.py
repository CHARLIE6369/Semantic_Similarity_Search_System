from fastapi import APIRouter, HTTPException, status
from app.schemas.document import DocumentResponse
from app.services.document_service import document_service
from app.utils.exceptions import DocumentNotFoundException, ModelNotLoadedException

router = APIRouter(tags=["Documents"])


@router.get(
    "/documents/{document_id}",
    response_model=DocumentResponse,
    summary="Get Document Details",
    description="Retrieve full content and metadata for a specific document by ID."
)
def get_document(document_id: str) -> DocumentResponse:
    try:
        doc = document_service.get_document(document_id)
        return DocumentResponse(**doc)
    except DocumentNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except ModelNotLoadedException as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while retrieving the document."
        )
