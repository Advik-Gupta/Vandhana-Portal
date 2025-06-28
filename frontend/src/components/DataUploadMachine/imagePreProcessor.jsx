export async function processImage(
  file,
  desiredAspectRatio,
  rotateIfVertical = true
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        let rotate = false;

        // 1. Rotate if vertical
        if (rotateIfVertical && height > width) {
          rotate = true;
          [width, height] = [height, width]; // Swap
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 2. Determine final canvas size based on aspect ratio
        const currentRatio = width / height;
        let targetWidth, targetHeight;

        if (desiredAspectRatio > currentRatio) {
          // Too tall – reduce height
          targetWidth = width;
          targetHeight = width / desiredAspectRatio;
        } else {
          // Too wide – reduce width
          targetHeight = height;
          targetWidth = height * desiredAspectRatio;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 3. Draw image on canvas
        ctx.save();
        if (rotate) {
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          ctx.translate(targetHeight, 0);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(img, 0, 0, height, width);
        } else {
          const offsetX = (width - targetWidth) / 2;
          const offsetY = (height - targetHeight) / 2;
          ctx.drawImage(
            img,
            offsetX,
            offsetY,
            targetWidth,
            targetHeight,
            0,
            0,
            targetWidth,
            targetHeight
          );
        }
        ctx.restore();

        // 4. Convert back to File
        canvas.toBlob((blob) => {
          const newFile = new File([blob], file.name, { type: file.type });
          resolve(newFile);
        }, file.type);
      };

      img.onerror = reject;
      img.src = reader.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function sendToModel(file) {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await fetch("http://127.0.0.1:8000/process-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Model processing failed");
  }

  const blob = await response.blob();
  const outputFile = new File([blob], file.name, { type: blob.type });

  return outputFile;
}
