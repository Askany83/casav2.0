// ImageUploader.tsx

import React from "react";
import Image from "next/image";

interface ImageUploaderProps {
  selectedImage: string | null;
  blobUrl: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImage,
  blobUrl,
  handleImageChange,
}) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        placeholder="Image"
        className="file-input file-input-bordered w-full max-w-xs"
      />
      {/* Image preview */}
      {selectedImage && (
        <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
          <p className="font-bold my-1 mt-3 text-sm">Nova imagem</p>
          <Image
            src={selectedImage}
            alt="Preview"
            width={200}
            height={200}
            className="object-cover w-full h-full rounded-3xl"
          />
        </div>
      )}
      {blobUrl && ( // Render the Image component if Blob URL exists
        <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
          <p className="font-bold my-1 mt-3 text-sm">Imagem na base de dados</p>
          <Image
            src={blobUrl}
            alt="Preview"
            width={200}
            height={200}
            className="object-cover w-full h-full rounded-3xl"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
