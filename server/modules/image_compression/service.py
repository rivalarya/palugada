import os
import tempfile
import uuid
from pathlib import Path
import subprocess
import sys

# Add the third_party module to the path to import from it
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from third_party.service import get_ffmpeg_path

def compress_image(image_bytes: bytes, original_filename: str, quality: int = 31) -> tuple[bytes, str]:
    """
    Compress image using ffmpeg.
    quality: For JPEG, 1-31 where 31 is worst quality. Default 31 for max compression.
             For other formats, we might need different logic, but let's start with basic ffmpeg transcoding.
    """
    ext = os.path.splitext(original_filename)[1].lower()
    if not ext:
        ext = ".jpg" # Default to jpg
        
    # Create temp input file
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as input_tmp:
        input_tmp.write(image_bytes)
        input_path = input_tmp.name
        
    # Output file
    output_filename = f"compressed_{uuid.uuid4()}{ext}"
    output_path = os.path.join(tempfile.gettempdir(), output_filename)
    
    try:
        # Check if ffmpeg is installed
        ffmpeg_path = get_ffmpeg_path()
        if not os.path.isfile(ffmpeg_path):
            raise RuntimeError("FFmpeg is not installed. Please install it from the settings page.")
        
        # Build ffmpeg command directly
        cmd = [ffmpeg_path, '-i', input_path, '-y']  # -y to overwrite output
        
        # Apply compression settings based on file type
        if ext in ['.jpg', '.jpeg']:
            # For JPEG, use q:v quality (1-31 where 31 is worst quality/highest compression)
            cmd.extend(['-q:v', str(quality)])
        elif ext == '.png':
            # For PNG, use compression level (0-9 where 9 is highest compression)
            compression_level = min(9, max(0, 9 - (quality // 3)))  # Map quality 1-31 to compression level 9-0
            cmd.extend(['-compression_level', str(compression_level)])
        else:
            # For other formats, use general quality parameter
            cmd.extend(['-q:v', str(quality)])
        
        cmd.append(output_path)
        
        # Run ffmpeg command
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            raise RuntimeError(f"FFmpeg failed: {result.stderr}")
        
        # Read back
        if os.path.exists(output_path):
            with open(output_path, "rb") as f:
                compressed_bytes = f.read()
            # Extract filename without extension and add -compressed suffix
            name, ext = os.path.splitext(original_filename)
            return compressed_bytes, f"{name}-compressed{ext}"
        else:
            raise Exception("FFmpeg failed to generate output file")
            
    except Exception as e:
        raise Exception(f"FFmpeg processing error: {str(e)}")
    finally:
        # Cleanup
        if os.path.exists(input_path):
            try:
                os.remove(input_path)
            except:
                pass
        if os.path.exists(output_path):
            try:
                os.remove(output_path)
            except:
                pass
