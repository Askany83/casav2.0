// ImageUploader.tsx
import { FC } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  selectedImage: string | null;
  handleImageChangeWrapper: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  selectedImage,
  handleImageChangeWrapper,
}) => {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChangeWrapper}
        className="file-input file-input-bordered file-input-primary file-input-sm rounded-box md:file-input-md w-full max-w-xs"
      />
      {/* Image preview */}
      {selectedImage && (
        <div className="my-3 flex items-center justify-center">
          <Image
            src={selectedImage}
            alt="Preview"
            width={200}
            height={200}
            className=""
          />
        </div>
      )}
    </>
  );
};

export default ImageUploader;
