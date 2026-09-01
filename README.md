# 🚀 Semantic Similarity Search System

An enterprise-grade, end-to-end **Semantic Similarity Search Web Application** built with **FastAPI**, **React (TypeScript + Vite + Tailwind CSS)**, and multiple machine learning vector search engines (**Word2Vec**, **FastText**, and **TF-IDF**). 

The system indexes over **50,000+ support documents**, performing real-time continuous vector embedding transformations and cosine matrix similarity computations to find knowledge by contextual meaning rather than simple keyword matches.

---

## 🌟 Key Features

- 🧠 **Multi-Model Engine Selection**:
  - **Word2Vec (Skip-Gram 100D)**: Continuous mean vector embeddings with NLTK tokenization.
  - **FastText (Subword 100D)**: Handles out-of-vocabulary (OOV) terms using subword n-gram representations.
  - **TF-IDF Baseline**: Term Frequency-Inverse Document Frequency sparse matrix comparison.
- ⚡ **High-Performance FastAPI Backend**: Async endpoint execution, single-load in-memory dataset caching, Pydantic data validation, and structured logging.
- 🎨 **Modern Cybernetic Glassmorphic UI**: Built with React 18, TypeScript, Tailwind CSS, Framer Motion transitions, and ambient AI network wallpaper.
- 🔍 **Real-Time Filtering & Metrics**: Filter by document category, adjust top-K results dynamically (5, 10, 20), and view execution latency in milliseconds.
- 🐳 **Docker Containerized**: Ready for production deployment via `docker-compose`.

---

## 🏗️ System Architecture

```
                                  ┌───────────────────────────────┐
                                  │      React + Vite Frontend    │
                                  │  (Cybernetic Glassmorphic UI) │
                                  └───────────────┬───────────────┘
                                                  │ HTTP / REST API
                                                  ▼
                                  ┌───────────────────────────────┐
                                  │        FastAPI Backend        │
                                  └───────────────┬───────────────┘
                                                  │
                      ┌───────────────────────────┼───────────────────────────┐
                      ▼                           ▼                           ▼
            ┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
            │   Word2Vec Engine │       │  FastText Engine  │       │   TF-IDF Engine   │
            │  (Gensim 100D)    │       │  (Gensim 100D)    │       │ (Scikit-Learn)    │
            └───────────────────┘       └───────────────────┘       └───────────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Semantic_Similarity_Search_System.git
cd Semantic_Similarity_Search_System
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI backend will start live at `http://127.0.0.1:8000`.

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🐳 Running with Docker

You can run the full-stack application using Docker Compose:

```bash
docker-compose up --build
```
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`

---

## 📊 ML Model Pipeline

| Model Engine | Vector Dim | Vocabulary / Matrix | Method | OOV Support |
| :--- | :--- | :--- | :--- | :--- |
| **Word2Vec** | 100D | Skip-Gram (`sg=1`) | Mean Pooling | Token lookup fallback |
| **FastText** | 100D | Subword n-grams | Mean Pooling | Full Subword OOV |
| **TF-IDF** | 733D / 10KD | Term Frequency | Cosine Matrix | Exact term match |

---

## 📡 API Endpoints Summary

- `GET /api/v1/health` - Check backend health status & loaded models
- `GET /api/v1/models` - List available vector search model engines
- `POST /api/v1/search` - Execute similarity search (`query`, `top_k`, `category`, `model_type`)
- `GET /api/v1/categories` - Fetch unique document categories
- `GET /api/v1/documents/{document_id}` - Fetch full document details by ID

---

## 📁 Repository Structure

```
Semantic_Similarity_Search_System/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # FastAPI routers
│   │   ├── core/            # Config & logger
│   │   ├── ml/              # Tokenization, vector generation & cosine logic
│   │   ├── models/          # Word2Vec, FastText & TF-IDF model artifacts
│   │   ├── schemas/         # Pydantic validation models
│   │   └── services/        # Search & Model service singletons
│   ├── tests/               # Pytest suite
│   ├── main.py              # Application entry point
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/              # Static background assets & favicon
│   ├── src/
│   │   ├── components/      # React glassmorphic UI components
│   │   ├── hooks/           # State management & search hook
│   │   ├── pages/           # Home, DocumentDetails, About
│   │   └── services/        # Fetch API client
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## 🛡️ License

Distributed under the MIT License.
