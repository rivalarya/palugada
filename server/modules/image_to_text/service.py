import pytesseract
from PIL import Image
from io import BytesIO

import os
pytesseract.pytesseract.tesseract_cmd = os.path.join(os.path.dirname(__file__), 'Tesseract-OCR', 'tesseract.exe')
# pytesseract.pytesseract.tesseract_cmd = r"C:\Users\ThinkPad\Downloads\code\image-to-text\server\modules\image_to_text\Tesseract-OCR\tesseract.exe"

def extract_text_from_image(image_bytes: bytes) -> str:
    image = Image.open(BytesIO(image_bytes))
    text = pytesseract.image_to_string(image)
    return text.strip()