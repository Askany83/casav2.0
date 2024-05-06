import Grant2 from "@/components/parentComponents/Grant2";
import SideNavbarHouseOwner from "@/components/parentComponents/SideNavbarHouseOwner";

export default function grant2Page({
  params,
}: {
  params: { helpRequestId: string };
}) {
  const id = params.helpRequestId;
  console.log("id: ", id);

  return (
    <>
      <SideNavbarHouseOwner />
      <Grant2 id={id} />
    </>
  );
}
