"use client";

import { useRouter } from "next/navigation";

const HouseOwnerAccessLink = () => {
  const router = useRouter();

  const handleLoginGovUserClick = () => {
    router.push("/");
  };

  return (
    <p className="text-center cursor-pointer" onClick={handleLoginGovUserClick}>
      Aceder a <span className="link">houseOwner</span>
    </p>
  );
};

export default HouseOwnerAccessLink;
