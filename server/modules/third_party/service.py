import pytesseract
import urllib.request
import zipfile
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# assign tesseract path
pytesseract.pytesseract.tesseract_cmd = os.path.join(
    BASE_DIR,
    "Tesseract-OCR",
    "tesseract.exe",
)

def is_tesseract_installed() -> bool:
    return os.path.isfile(pytesseract.pytesseract.tesseract_cmd)

def install_tesseract() -> None:
    download_url = (
        "https://twds.dl.sourceforge.net/project/"
        "tesseract-ocr-alt/tesseract-ocr-3.02-win32-portable.zip"
    )

    script_dir = os.path.dirname(os.path.abspath(__file__))
    zip_path = os.path.join(script_dir, "tesseract.zip")

    try:
        urllib.request.urlretrieve(download_url, zip_path)

        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            # Extract directly into the script directory
            zip_ref.extractall(script_dir)

    except Exception as e:
        raise RuntimeError(f"Failed to install Tesseract: {e}") from e

    finally:
        if os.path.exists(zip_path):
            os.remove(zip_path)
