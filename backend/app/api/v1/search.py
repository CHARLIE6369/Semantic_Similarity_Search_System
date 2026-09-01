from fastapi import APIRouter, HTTPException, status
from app.schemas.search import SearchRequest, SearchResponse
from app.services.search_service import search_service
from app.utils.exceptions import InvalidQueryException, ModelNotLoadedException

router = APIRouter(tags=["Search"])


@router.post(
    "/search",
    response_model=SearchResponse,
    summary="Semantic Similarity Document Search",
    description="Search knowledge-base documents using Word2Vec query vector mean pooling and cosine similarity."
)
def search_documents(request: SearchRequest) -> SearchResponse:
    try:
        results = search_service.search(
            query=request.query,
            top_k=request.top_k,
            category=request.category,
            model_type=request.model_type
        )

        return SearchResponse(**results)
    except InvalidQueryException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
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
            detail="An unexpected error occurred while processing the search request."
        )
