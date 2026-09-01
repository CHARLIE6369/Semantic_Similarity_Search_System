from typing import Any, List
import numpy as np
from app.ml.preprocessing import clean_and_tokenize


def generate_query_vector(query: str, model: Any) -> np.ndarray:
    """Generate a 100-dimensional query vector by averaging Word2Vec vectors of recognized tokens.

    If no recognized tokens exist, returns a zero vector of size model.vector_size.
    """
    tokens: List[str] = clean_and_tokenize(query)
    vector_size = getattr(model, "vector_size", 100)

    if not tokens:
        return np.zeros(vector_size, dtype=np.float32)

    vectors = []
    for token in tokens:
        if hasattr(model, "wv") and token in model.wv:
            vectors.append(model.wv[token])

    if not vectors:
        return np.zeros(vector_size, dtype=np.float32)

    return np.mean(vectors, axis=0).astype(np.float32)
