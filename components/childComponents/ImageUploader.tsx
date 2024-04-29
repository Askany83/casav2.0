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
      {/* Image preview */}
      {selectedImage && (
        <div className="my-3 w-80 h-80">
          <p className="font-bold my-1 mt-3 text-xs md:text-sm">Nova imagem</p>
          <Image
            src={selectedImage}
            alt="Preview"
            width={200}
            height={200}
            className="mt-1 rounded-lg w-full h-full object-cover"
          />
        </div>
      )}
      {!selectedImage &&
        blobUrl && ( // Render the Image component if Blob URL exists
          <div className="my-3 w-80 h-80">
            <p className="font-bold my-1 mt-3 text-xs md:text-sm">
              Imagem na base de dados
            </p>
            <Image
              src={blobUrl}
              alt="Preview"
              width={200}
              height={200}
              className="mt-1 rounded-lg w-full h-full object-cover"
            />
          </div>
        )}
      <div className="mt-11">
        <p className="font-bold my-1 text-xs md:text-sm">Imagem</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          placeholder="Image"
          className="file-input file-input-bordered file-input-teal-950 file-input-sm rounded-none md:file-input-md  w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
