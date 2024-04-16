import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import HelpRequestHouseOwner from "@/components/parentComponents/HelpRequestHouseOwner";

const HelpRequestForReview = (_id: string) => {
  console.log("Help Request ID:", _id);
  const helpRequestId = _id;
  return (
    <>
      <NavbarHouseOwner />
      <HelpRequestHouseOwner />
      <Footer />
    </>
  );
};

export default HelpRequestForReview;
