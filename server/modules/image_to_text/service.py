import cv2
import numpy as np
import pytesseract
from PIL import Image
from io import BytesIO

def extract_text_from_image(image_bytes: bytes) -> str:
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = np.array(image)

    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = cv2.resize(gray, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    gray = cv2.fastNlMeansDenoising(gray, h=30)
    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        2
    )
    config = r"--oem 3 --psm 6"

    text = pytesseract.image_to_string(
        thresh,
        lang="eng",
        config=config
    )

    return text.strip()
