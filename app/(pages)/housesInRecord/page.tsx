import Footer from "@/components/(NavbarAndFooter)/Footer";
import HousesInRecord from "@/components/(HousesInRecord)/(ChildComponents)/HousesInRecord";
import NavbarHouseOwner from "@/components/(NavbarAndFooter)/NavbarHouseOwner";

export default function housesInRecord() {
  return (
    <>
      <NavbarHouseOwner />
      <HousesInRecord />
      <Footer />
    </>
  );
}
