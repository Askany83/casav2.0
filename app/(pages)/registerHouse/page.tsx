import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import { RegisterHouseForm } from "@/components/parentComponents/RegisterHouseForm";

export default function registerHouse() {
  return (
    <>
      <NavbarHouseOwner />
      <RegisterHouseForm />
      <Footer />
    </>
  );
}
