import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
      <Image
        src="/background/landscape.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={75}
      />
    </div>
  );
}
