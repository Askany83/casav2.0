import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import AllHousesInRecord from "@/components/parentComponents/(govUserOnly)/AllHousesInRecord";

export default function AllHousesInRecordPage() {
  return (
    <>
      <NavbarGovUser />
      <AllHousesInRecord />
      <Footer />
    </>
  );
}
