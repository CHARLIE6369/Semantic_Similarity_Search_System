class ModelNotLoadedException(Exception):
    """Raised when an operation requires the ML model but it is not loaded."""

    def __init__(self, message: str = "ML model artifacts are not loaded."):
        self.message = message
        super().__init__(self.message)


class ModelDimensionMismatchException(Exception):
    """Raised when dataset documents count does not match document vectors shape."""

    def __init__(self, message: str = "Document vectors count does not match dataset size."):
        self.message = message
        super().__init__(self.message)


class DocumentNotFoundException(Exception):
    """Raised when requested document_id is not found in dataset."""

    def __init__(self, document_id: str):
        self.document_id = document_id
        self.message = f"Document with ID '{document_id}' not found."
        super().__init__(self.message)


class InvalidQueryException(Exception):
    """Raised when input query fails validation."""

    def __init__(self, message: str = "Invalid search query."):
        self.message = message
        super().__init__(self.message)
