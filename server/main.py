from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from modules.third_party.router import router as third_party_router
from modules.image_to_text.router import router as image_to_text_router
from modules.image_compression.router import router as image_compression_router

app = FastAPI(title="Image Processing API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

app.include_router(third_party_router, prefix="/api")
app.include_router(image_to_text_router, prefix="/api")
app.include_router(image_compression_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "running"}