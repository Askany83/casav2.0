import Footer from "@/components/parentComponents/Footer";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import EditUserForm from "@/components/parentComponents/EditUserForm";

export const editUser = ({ params }: { params: { _id: string } }) => {
  const id = params._id;
  // console.log("params user id: ", id);

  return (
    <>
      <NavbarHouseOwner />
      <EditUserForm userId={id} />
      <Footer />
    </>
  );
};

export default editUser;
