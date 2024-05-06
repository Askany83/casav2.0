import Grant1 from "@/components/parentComponents/Grant1";
import SideNavbarHouseOwner from "@/components/parentComponents/SideNavbarHouseOwner";
import GetCheckUserRoleHouseOwner from "@/components/childComponents/GetCheckUserRoleHouseOwner";

export default function Grant1Page({
  params,
}: {
  params: { helpRequestId: string };
}) {
  const id = params.helpRequestId;
  console.log("id: ", id);

  return (
    <>
      <GetCheckUserRoleHouseOwner>
        <SideNavbarHouseOwner />
        <Grant1 id={id} />
      </GetCheckUserRoleHouseOwner>
    </>
  );
}
