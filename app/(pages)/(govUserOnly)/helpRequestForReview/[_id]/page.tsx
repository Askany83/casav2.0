import NavbarGovUser from "@/components/parentComponents/(govUserOnly)/NavbarGovUser";
import Footer from "@/components/parentComponents/Footer";
import HelpRequest from "@/components/parentComponents/(govUserOnly)/HelpRequest";

const HelpRequestForReview = (_id: string) => {
  console.log("Help Request ID:", _id);
  const helpRequestId = _id;
  return (
    <>
      <NavbarGovUser />
      <HelpRequest />
      <Footer />
    </>
  );
};

export default HelpRequestForReview;
