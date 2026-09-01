from unittest.mock import patch
import pandas as pd
from fastapi.testclient import TestClient

from app.main import app
from app.services.model_service import model_service

client = TestClient(app)


@patch.object(model_service, "_is_loaded", True)
def test_get_document_success():
    mock_df = pd.DataFrame([
        {
            "document_id": "KB000100",
            "title": "Account Lockout Solutions",
            "category": "Authentication",
            "content": "Step 1: Wait 15 minutes. Step 2: Request unlock email.",
            "keywords": "lockout, account, unlock"
        }
    ])

    with patch.object(model_service, "df", mock_df):
        response = client.get("/api/v1/documents/KB000100")
        assert response.status_code == 200
        data = response.json()
        assert data["document_id"] == "KB000100"
        assert data["title"] == "Account Lockout Solutions"
        assert data["category"] == "Authentication"
        assert isinstance(data["keywords"], list)


@patch.object(model_service, "_is_loaded", True)
def test_get_document_not_found():
    mock_df = pd.DataFrame([
        {
            "document_id": "KB000100",
            "title": "Account Lockout Solutions",
            "category": "Authentication",
            "content": "Step 1: Wait 15 minutes.",
            "keywords": "lockout"
        }
    ])

    with patch.object(model_service, "df", mock_df):
        response = client.get("/api/v1/documents/NON_EXISTENT_ID")
        assert response.status_code == 404
        assert "not found" in response.json()["detail"]


@patch.object(model_service, "_is_loaded", True)
def test_get_categories():
    mock_df = pd.DataFrame([
        {"category": "Billing"},
        {"category": "Authentication"},
        {"category": "Subscriptions"},
        {"category": "Authentication"}
    ])

    with patch.object(model_service, "df", mock_df):
        response = client.get("/api/v1/categories")
        assert response.status_code == 200
        data = response.json()
        assert "categories" in data
        assert data["categories"] == ["Authentication", "Billing", "Subscriptions"]
