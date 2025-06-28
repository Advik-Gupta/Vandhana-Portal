export async function processImage(file, targetAspectRatio, rotateIfVertical) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
    };

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      const isVertical = height > width;

      const shouldRotate = rotateIfVertical && isVertical;

      // Determine new dimensions based on aspect ratio
      if (targetAspectRatio >= 1) {
        width = 1000;
        height = 1000 / targetAspectRatio;
      } else {
        height = 1000;
        width = 1000 * targetAspectRatio;
      }

      canvas.width = shouldRotate ? height : width;
      canvas.height = shouldRotate ? width : height;

      if (shouldRotate) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }

      canvas.toBlob((blob) => {
        const newFile = new File([blob], file.name, { type: file.type });
        resolve(newFile);
      }, file.type);
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
