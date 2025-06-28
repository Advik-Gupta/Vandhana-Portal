from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
import numpy as np
import cv2
from utils.processor import correct_image_orientation
import io

app = FastAPI()

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    contents = await file.read()
    # Convert byte content to numpy BGR image
    np_arr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    corrected = correct_image_orientation(image)

    # Convert corrected image back to byte stream
    _, img_encoded = cv2.imencode('.jpg', corrected)
    return StreamingResponse(io.BytesIO(img_encoded.tobytes()), media_type="image/jpeg")
