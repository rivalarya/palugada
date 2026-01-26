from pydantic import BaseModel

class ThirdPartyInstallation(BaseModel):
    tesseract: bool
