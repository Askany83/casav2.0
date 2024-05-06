import Grant1RightsDuties from "@/components/childComponents/Grant1RightsDuties";
import Grant2RightsDuties from "@/components/childComponents/Grant2RightsDuties";
import Grant3RightsDuties from "@/components/childComponents/Grant3rightsDuties";
import SideNavbarHouseOwner from "@/components/parentComponents/SideNavbarHouseOwner";
import GetCheckUserRoleHouseOwner from "@/components/childComponents/GetCheckUserRoleHouseOwner";

export default function GrantsPage() {
  return (
    <>
      <GetCheckUserRoleHouseOwner>
        <SideNavbarHouseOwner />
        <main className="min-h-screen flex flex-col lg:flex-row ml-28">
          <div className="w-full flex flex-col  justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-6">
                <Grant1RightsDuties />
              </div>
              <div className="mb-6">
                <Grant2RightsDuties />
              </div>
              <div className="mb-6">
                <Grant3RightsDuties />
              </div>
            </div>
          </div>
        </main>
      </GetCheckUserRoleHouseOwner>
    </>
  );
}
