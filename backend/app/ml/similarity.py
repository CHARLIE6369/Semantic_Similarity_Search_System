import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def calculate_cosine_similarity(query_vector: np.ndarray, doc_vectors: np.ndarray) -> np.ndarray:
    """Calculate cosine similarity between query vector (1, d) and document vectors (N, d).

    Returns a 1D array of float similarity scores for each document.
    Handles zero query vector or NaN edge cases cleanly.
    """
    if query_vector is None or doc_vectors is None or len(doc_vectors) == 0:
        return np.array([], dtype=np.float32)

    q_vec_2d = query_vector.reshape(1, -1)

    # Check for all-zero vector to prevent division by zero NaN
    if np.all(q_vec_2d == 0):
        return np.zeros(len(doc_vectors), dtype=np.float32)

    sims = cosine_similarity(q_vec_2d, doc_vectors).flatten()
    # Replace any NaN values with 0.0
    sims = np.nan_to_num(sims, nan=0.0)
    return sims.astype(np.float32)
