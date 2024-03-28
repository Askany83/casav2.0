import { resizeImage } from "./resizeImage";
import { convertToWebP } from "./convertToWebP";

export const handleImageChange = async (
  file: File,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedImageFile: React.Dispatch<React.SetStateAction<File | null>>,
  setImageMimeType: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    // Compress and resize the image
    const resizedImage = await resizeImage(file);
    // console.log("Resized image:", resizedImage);

    // Convert to WebP format
    const webPImage = await convertToWebP(resizedImage);
    // console.log("WebP image:", webPImage);

    // Convert Blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(webPImage);
    reader.onloadend = () => {
      const base64data = reader.result as string;

      // Convert Blob to File
      const convertedFile = new File([webPImage], file.name, {
        type: webPImage.type,
        lastModified: Date.now(),
      });

      // Set selected image file
      setSelectedImageFile(convertedFile);
      // console.log("Selected image file:", convertedFile);

      // Set image preview
      setSelectedImage(base64data);

      // Extract MIME type
      const mimeType = webPImage.type;
      // console.log("Image MIME type:", mimeType);

      setImageMimeType(mimeType);
    };
  } catch (error) {
    console.error("Error processing image:", error);
    // Handle error
    setError("Erro no processamento de imagem. Tente novamente.");
  }
};
