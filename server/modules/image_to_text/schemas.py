from pydantic import BaseModel

class ExtractResponse(BaseModel):
    text: str
    filename: str