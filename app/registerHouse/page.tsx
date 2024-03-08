import Footer from "@/components/Footer";
import NavbarHouseOwner from "@/components/NavbarHouseOwner";
import { RegisterHouseForm } from "@/components/RegisterHouseForm";

export default function registerHouse() {
  return (
    <>
      <NavbarHouseOwner />
      <RegisterHouseForm />
      <Footer />
    </>
  );
}
