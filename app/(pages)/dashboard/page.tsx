import UserInfo from "@/components/UserInfo";
import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";

export default function dashboard() {
  return (
    <>
      <NavbarHouseOwner />
      <UserInfo />
      <Footer />
    </>
  );
}
