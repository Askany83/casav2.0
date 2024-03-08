import Footer from "@/components/(NavbarAndFooter)/Footer";
import NavbarHouseOwner from "@/components/(NavbarAndFooter)/NavbarHouseOwner";
import { RegisterHouseForm } from "@/components/(RegisterHouseForm)/RegisterHouseForm";

export default function registerHouse() {
  return (
    <>
      <NavbarHouseOwner />
      <RegisterHouseForm />
      <Footer />
    </>
  );
}
