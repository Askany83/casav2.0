import Grant1 from "@/components/parentComponents/Grant1";
import SideNavbarHouseOwner from "@/components/parentComponents/SideNavbarHouseOwner";

export default function Grant1Page({
  params,
}: {
  params: { helpRequestId: string };
}) {
  const id = params.helpRequestId;
  console.log("id: ", id);

  return (
    <>
      <SideNavbarHouseOwner />
      <Grant1 id={id} />
    </>
  );
}
