/**
 * Converts a Blob to WebP format by loading it into a canvas and encoding as WebP.
 * Returns a Promise resolving to the WebP Blob.
 */

export const convertToWebP = (blob: Blob): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d")?.drawImage(img, 0, 0);
      canvas.toBlob((webPBlob) => {
        resolve(webPBlob as Blob);
      }, "image/webp");
    };
    img.src = URL.createObjectURL(blob);
  });
};
