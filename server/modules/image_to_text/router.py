from fastapi import APIRouter, UploadFile, File, HTTPException
from pytesseract import TesseractNotFoundError
from .service import extract_text_from_image
from .schemas import ExtractResponse

router = APIRouter(prefix="/image-to-text", tags=["Image to Text"])

@router.post("/extract", response_model=ExtractResponse)
async def extract_text(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image")
    
    try:
        contents = await file.read()
        text = extract_text_from_image(contents)
    except TesseractNotFoundError:
        raise HTTPException(
            status_code=500, 
            detail="Tesseract OCR not found. Make sure Tesseract is installed."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during extraction: {str(e)}")
    
    return {"text": text, "filename": file.filename}