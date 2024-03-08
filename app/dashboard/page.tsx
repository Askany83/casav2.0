import UserInfo from "@/components/UserInfo";
import Footer from "@/components/Footer";
import NavbarHouseOwner from "@/components/NavbarHouseOwner";

export default function dashboard() {
  return (
    <>
      <NavbarHouseOwner />
      <UserInfo />
      <Footer />
    </>
  );
}
