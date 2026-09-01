from fastapi import APIRouter
from app.api.v1.router import api_v1_router

main_router = APIRouter()
main_router.include_router(api_v1_router)
