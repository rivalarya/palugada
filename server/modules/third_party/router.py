from fastapi import APIRouter, HTTPException
from .service import install_tesseract, is_tesseract_installed
from .schemas import ThirdPartyInstallation

router = APIRouter(prefix="/third-party", tags=["Third Party"])

@router.get("/check", response_model=ThirdPartyInstallation)
async def check():
    return {"tesseract": is_tesseract_installed()}

@router.post("/install", response_model=ThirdPartyInstallation)
async def install(third_party: ThirdPartyInstallation):
    if third_party.tesseract:
        if is_tesseract_installed():
            raise HTTPException(status_code=400, detail="Tesseract already installed")

        install_tesseract()

    return {"tesseract": is_tesseract_installed()}
