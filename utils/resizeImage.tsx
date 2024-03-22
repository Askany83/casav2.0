/**
 * Resizes an image file to max width and height.
 * Returns a promise that resolves to the resized blob.
 */

export const resizeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 500; // Set your desired max width
        const maxHeight = 500; // Set your desired max height
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            resolve(blob as Blob);
          },
          "image/wepb",
          0.8
        ); // Set compression quality
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
