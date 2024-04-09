"use client";

import { useRouter } from "next/navigation";

const GovUserAccessLink = () => {
  const router = useRouter();

  const handleLoginGovUserClick = () => {
    router.push("/loginGovUser");
  };

  return (
    <p className="text-center cursor-pointer" onClick={handleLoginGovUserClick}>
      Aceder a <span className="link">govUser</span>
    </p>
  );
};

export default GovUserAccessLink;
