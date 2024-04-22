import Image from "next/image";

export default function LogoCasa() {
  return (
    <div className="pb-3 pt-2 -mb-14 md:mb-0">
      <div className="w-32 h-32 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-64 lg:h-48">
        <Image
          src="/logosCASA/casa.png"
          alt="logoCasa"
          width={200}
          height={200}
          layout="responsive"
          priority
        />
      </div>
    </div>
  );
}
