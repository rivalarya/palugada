from fastapi import APIRouter, UploadFile, File, HTTPException
from .service import extract_text_from_image
from .schemas import ExtractResponse

router = APIRouter(prefix="/image-to-text", tags=["Image to Text"])

@router.post("/extract", response_model=ExtractResponse)
async def extract_text(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File harus gambar")
    
    contents = await file.read()
    text = extract_text_from_image(contents)
    
    return {"text": text, "filename": file.filename}