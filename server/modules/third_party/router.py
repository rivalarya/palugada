from fastapi import APIRouter, HTTPException
from .service import install_tesseract, is_tesseract_installed, remove_tesseract, install_ffmpeg, is_ffmpeg_installed, remove_ffmpeg
from .schemas import ThirdPartyStatus, ThirdPartyAction

router = APIRouter(prefix="/third-party", tags=["Third Party"])

@router.get("/status", response_model=ThirdPartyStatus)
async def get_status():
    return {
        "tesseract": is_tesseract_installed(),
        "ffmpeg": is_ffmpeg_installed()
    }

@router.post("/install", response_model=ThirdPartyStatus)
async def install(action: ThirdPartyAction):
    if action.name == "tesseract":
        if is_tesseract_installed():
            raise HTTPException(status_code=400, detail="Tesseract already installed")
        install_tesseract()
    elif action.name == "ffmpeg":
        if is_ffmpeg_installed():
            raise HTTPException(status_code=400, detail="FFmpeg already installed")
        install_ffmpeg()
    else:
        raise HTTPException(status_code=400, detail=f"Unknown third party: {action.name}")

    return {
        "tesseract": is_tesseract_installed(),
        "ffmpeg": is_ffmpeg_installed()
    }

@router.post("/remove", response_model=ThirdPartyStatus)
async def remove(action: ThirdPartyAction):
    if action.name == "tesseract":
        if not is_tesseract_installed():
            raise HTTPException(status_code=400, detail="Tesseract not installed")
        remove_tesseract()
    elif action.name == "ffmpeg":
        if not is_ffmpeg_installed():
            raise HTTPException(status_code=400, detail="FFmpeg not installed")
        remove_ffmpeg()
    else:
        raise HTTPException(status_code=400, detail=f"Unknown third party: {action.name}")
    
    return {
        "tesseract": is_tesseract_installed(),
        "ffmpeg": is_ffmpeg_installed()
    }