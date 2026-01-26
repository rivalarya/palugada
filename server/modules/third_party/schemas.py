from pydantic import BaseModel

class ThirdPartyStatus(BaseModel):
    tesseract: bool

class ThirdPartyAction(BaseModel):
    name: str