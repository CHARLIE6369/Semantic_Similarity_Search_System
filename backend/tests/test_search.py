from unittest.mock import MagicMock, patch
import numpy as np
import pandas as pd
from fastapi.testclient import TestClient

from app.main import app
from app.services.model_service import model_service

client = TestClient(app)


def test_search_validation_empty_query():
    response = client.post("/api/v1/search", json={"query": "", "top_k": 5})
    assert response.status_code == 422  # Unprocessable Entity from Pydantic


def test_search_validation_short_query():
    response = client.post("/api/v1/search", json={"query": "a", "top_k": 5})
    assert response.status_code == 422


def test_search_validation_invalid_top_k():
    response = client.post("/api/v1/search", json={"query": "password recovery", "top_k": 100})
    assert response.status_code == 422


@patch.object(model_service, "_is_loaded", True)
def test_successful_search_with_mock_model():

    mock_model = MagicMock()
    mock_model.vector_size = 100
    mock_model.wv = {"password": np.ones(100), "recovery": np.ones(100)}

    mock_df = pd.DataFrame([
        {
            "document_id": "KB000001",
            "title": "Password Reset Guide",
            "category": "Authentication",
            "content": "Instructions to reset password.",
            "keywords": "password, reset"
        },
        {
            "document_id": "KB000002",
            "title": "Billing FAQ",
            "category": "Billing",
            "content": "Invoice details.",
            "keywords": "billing, invoice"
        }
    ])

    mock_doc_vectors = np.array([np.ones(100), np.zeros(100)])

    with patch.object(model_service, "model", mock_model), \
         patch.object(model_service, "df", mock_df), \
         patch.object(model_service, "doc_vectors", mock_doc_vectors):

        response = client.post(
            "/api/v1/search",
            json={"query": "password recovery", "top_k": 5, "category": None}
        )

        assert response.status_code == 200
        data = response.json()
        assert data["query"] == "password recovery"
        assert data["total_results"] > 0
        assert "processing_time_ms" in data
        assert data["results"][0]["document_id"] == "KB000001"
