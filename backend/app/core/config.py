import os
from pathlib import Path
from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    APP_NAME: str = "Semantic Similarity Search"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"

    HOST: str = "127.0.0.1"
    PORT: int = 8000

    MODEL_PATH: str = "models/word2vec.model"
    VECTOR_PATH: str = "models/doc_vectors_w2v.npy"
    DATASET_PATH: str = "models/cleaned_dataset.csv"

    DEFAULT_TOP_K: int = 5
    MAX_TOP_K: int = 50

    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:5173"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    def get_absolute_path(self, relative_or_abs_path: str) -> Path:
        path = Path(relative_or_abs_path)
        if path.is_absolute():
            return path
        return BASE_DIR / path

    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
