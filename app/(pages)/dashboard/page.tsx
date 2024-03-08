import UserInfo from "@/components/UserInfo";
import Footer from "@/components/(NavbarAndFooter)/Footer";
import NavbarHouseOwner from "@/components/(NavbarAndFooter)/NavbarHouseOwner";

export default function dashboard() {
  return (
    <>
      <NavbarHouseOwner />
      <UserInfo />
      <Footer />
    </>
  );
}
