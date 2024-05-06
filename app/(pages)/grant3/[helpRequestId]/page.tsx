import SideNavbarHouseOwner from "@/components/parentComponents/SideNavbarHouseOwner";
import Grant3 from "@/components/parentComponents/Grant3";

export default function grant3Page({
  params,
}: {
  params: { helpRequestId: string };
}) {
  const id = params.helpRequestId;
  console.log("id: ", id);
  return (
    <>
      <SideNavbarHouseOwner />
      <Grant3 id={id} />
    </>
  );
}
