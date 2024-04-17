"use client";

import { useRouter } from "next/navigation";

const GovUserAccessLink = () => {
  const router = useRouter();

  const handleLoginGovUserClick = () => {
    router.push("/loginGovUser");
  };

  return (
    <p
      className="text-center cursor-pointer text-xs mt-3"
      onClick={handleLoginGovUserClick}
    >
      Aceder a <span className="link">govUser</span>
    </p>
  );
};

export default GovUserAccessLink;
