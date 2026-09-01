import re
from typing import List
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

try:
    nltk.download("punkt", quiet=True)
    nltk.download("punkt_tab", quiet=True)
    nltk.download("stopwords", quiet=True)
except Exception:
    pass

try:
    STOPWORDS = set(stopwords.words("english"))
except Exception:
    STOPWORDS = set()


def clean_and_tokenize(text: str) -> List[str]:
    """Clean and tokenize input text using NLTK matching the Colab training pipeline.

    Steps:
    1. Convert text to lowercase.
    2. Remove non-alphanumeric characters.
    3. Normalize whitespace.
    4. Tokenize using NLTK word_tokenize.
    5. Remove English stopwords.
    6. Remove tokens with length <= 1.
    """
    if not text:
        return []

    text = str(text).lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    if not text:
        return []

    try:
        tokens = word_tokenize(text)
    except Exception:
        tokens = text.split()

    tokens = [t for t in tokens if t not in STOPWORDS and len(t) > 1]
    return tokens
