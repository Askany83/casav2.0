/**
 * Renders the house owner profile page.
 *
 * @param params - The route params containing the house owner's email address.
 * @returns The house owner profile page component.
 */

import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import HouseOwnerProfile from "@/components/parentComponents/HouseOwnerProfile";

export const houseOwnerProfile = ({
  params,
}: {
  params: { email: string };
}) => {
  const email = params.email;

  return (
    <>
      <NavbarHouseOwner />
      <HouseOwnerProfile email={email} />
      <Footer />
    </>
  );
};

export default houseOwnerProfile;
