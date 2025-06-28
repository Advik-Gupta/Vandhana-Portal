import torch
import cv2
import numpy as np
from torchvision import transforms
from model.rail_angle_cnn import RailAngleCNN  # adjust path if needed

# --- Load model ---
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = RailAngleCNN(num_classes=180)
model.load_state_dict(torch.load("model/rail_angle_cnn_v2.pth", map_location=DEVICE))
model.eval().to(DEVICE)

# --- Torch transform pipeline for grayscale preprocessing ---
transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.ToTensor()  # Output shape: (1, 224, 224), values ∈ [0, 1]
])

def correct_image_orientation(image_bgr: np.ndarray) -> np.ndarray:
    """
    Takes a BGR image (as NumPy array), predicts the rail tilt angle,
    and returns the rotation-corrected BGR image.
    """
    # Convert to grayscale
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)

    # Preprocess for model
    x = transform(gray).unsqueeze(0).to(DEVICE)

    # Predict angle
    with torch.no_grad():
        output = model(x)
        pred_angle = torch.argmax(output, dim=1).item()

    # Rotate original color image back
    h, w = image_bgr.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, -pred_angle, 1.0)
    corrected = cv2.warpAffine(image_bgr, M, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

    return corrected