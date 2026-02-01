from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import Response
from .service import compress_image
import io

router = APIRouter(prefix="/image-compression", tags=["Image Compression"])

@router.post("/compress")
async def compress_image_endpoint(file: UploadFile = File(...), quality: int = 31):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image")
    
    try:
        contents = await file.read()
        compressed_bytes, filename = compress_image(contents, file.filename, quality)
        
        return Response(
            content=compressed_bytes,
            media_type=file.content_type,
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"'
            }
        )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during compression: {str(e)}")
