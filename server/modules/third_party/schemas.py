from pydantic import BaseModel

class ThirdPartyStatus(BaseModel):
    tesseract: bool
    ffmpeg: bool

class ThirdPartyAction(BaseModel):
    name: str