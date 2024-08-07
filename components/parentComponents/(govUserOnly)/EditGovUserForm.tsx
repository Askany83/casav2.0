import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleImageChange } from "@/utils/imageConverter";
import xss from "xss";
import MunicipalityInput from "@/components/childComponents/(govUserOnly)/MunicipalityInputField";
import EmailInput from "@/components/childComponents/EmailInput";
import NameInput from "@/components/childComponents/NameInput";
import Password from "@/components/childComponents/PasswordInput";
import ErrorMessage from "@/components/childComponents/ErrorMessage";
import { useGovUserProfileData } from "@/customHooks/(govUserOnly)/useGovUserProfileData";
import { validateEditGovUserForm } from "@/utils/validationUtils";
import { EDIT_GOV_USER_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import PhoneInput from "@/components/childComponents/PhoneInput";
import ImageUploader from "@/components/childComponents/ImageUploader";
import { FaUserEdit } from "react-icons/fa";
import SurnameInput from "@/components/childComponents/Surname";

interface EditUserFormProps {
  userId: string;
}

const EditGovUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const {
    userData,
    setUserData,
    phone,
    setPhone,
    sessionImage,
    setSessionImage,
    blobUrl,
    setBlobUrl,
  } = useGovUserProfileData(userId);

  const handleMunicipalityChange = useCallback(
    (value: string) => {
      setUserData((prevData) => ({
        ...prevData,
        municipality: value,
      }));
    },
    [setUserData]
  );

  const handleNameChange = useCallback(
    (value: string) => {
      setUserData((prevData) => ({
        ...prevData,
        name: value,
      }));
    },
    [setUserData]
  );

  const handleSurnameChange = useCallback(
    (value: string) => {
      setUserData((prevData) => ({
        ...prevData,
        surname: value,
      }));
    },
    [setUserData]
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      setUserData((prevData) => ({
        ...prevData,
        email: value,
      }));
    },
    [setUserData]
  );

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const { value } = event.target;
        setPhone(value);
      },
      [setPhone]
    );

  //image Converter
  const handleImageChangeWrapper = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];

      if (!file) {
        setError("Por favor selecione uma imagem");
        return;
      }

      await handleImageChange(
        file,
        setError,
        setSelectedImage,
        setSelectedImageFile,
        setImageMimeType
      );
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;

      if (!validateEditGovUserForm(userData, setError)) {
        return;
      }
      const formData = new FormData();

      formData.append("name", xss(userData.name.trim()));
      formData.append("surname", xss(userData.surname.trim()));
      formData.append("municipality", xss(userData.municipality.trim()));
      formData.append("email", xss(userData.email.trim()));
      if (password) {
        formData.append("password", xss(password));
      }
      if (phone) {
        formData.append("phone", xss(phone.trim()));
      }
      // Append image data and MIME type if available
      if (selectedImage && imageMimeType) {
        formData.append("imageBase64", selectedImage);
        formData.append("imageType", imageMimeType);
      } else {
        console.log("No image to append to formData.");
      }
      // Logging formData entries
      console.log("FormData entries:");
      for (const [key, value] of Array.from(formData.entries())) {
        console.log(`${key}: ${value}`);
      }
      // Send form data to your backend endpoint
      const response = await fetch(EDIT_GOV_USER_API_ENDPOINT, {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        // Handle success response
        alert("Informação do utilizador atualizada com sucesso!");

        // Retrieve existing houseOwnerProfile from sessionStorage
        const existingGovUserProfile = sessionStorage.getItem("govUserProfile");

        if (existingGovUserProfile) {
          // Parse the existing houseOwnerProfile into a JavaScript object
          let updatedUserData = JSON.parse(existingGovUserProfile);
          // Update specific values
          updatedUserData.name = formData.get("name");
          updatedUserData.surname = formData.get("surname");
          updatedUserData.municipality = formData.get("municipality");
          updatedUserData.email = formData.get("email");
          updatedUserData.phone = formData.get("phone");
          if (selectedImage && imageMimeType) {
            updatedUserData.image.data = formData.get("imageBase64");
            updatedUserData.image.contentType = formData.get("imageType");
          }
          // Store the updated object back in sessionStorage
          sessionStorage.setItem(
            "govUserProfile",
            JSON.stringify(updatedUserData)
          );

          form.reset();
          router.push(`/govUserProfile/${userEmail}`);
        } else {
          console.error("govUserProfile not found in sessionStorage.");
          setError("Erro ao atualizar as informações do utilizador.");
        }
      }
    } catch (error) {
      // Log any caught errors
      console.error("Error:", error);
      setError("Aconteceu um erro inesperado, tente outra vez.");
    }
  };

  return (
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5">
          <div className="p-4 sm:w-64 md:w-80 -mt-4">
            <div className="flex items-center justify-center">
              <FaUserEdit size={32} className="mr-3" />
              <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
                Editar Utilizador
              </h1>
            </div>
            <div className="divider divider-primary"></div>
            {/* <p>{userId}</p> */}
            <form
              className="mt-3"
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <div className="mt-1">
                <p className="font-bold my-1 text-xs md:text-sm">Município</p>
                <MunicipalityInput
                  value={userData.municipality}
                  onChange={handleMunicipalityChange}
                />
              </div>

              <div className="mt-1">
                <p className="font-bold my-1 text-xs md:text-sm">Nome</p>
                <NameInput value={userData.name} onChange={handleNameChange} />
              </div>

              <div className="mt-1">
                <p className="font-bold my-1 text-xs md:text-sm">Sobrenome</p>
                <SurnameInput
                  value={userData.surname}
                  onChange={handleSurnameChange}
                />
              </div>

              <div className="mt-1">
                <p className="font-bold my-1 text-xs md:text-sm">Email</p>
                <EmailInput
                  value={userData.email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mt-1">
                <p className="font-bold my-1 text-xs md:text-sm">
                  Nova password
                </p>
                <Password value={password} onChange={handlePasswordChange} />
              </div>

              <div className="mt-1 ">
                <p className="font-bold my-1 text-xs md:text-sm">Telefone</p>
                <PhoneInput phone={phone} onPhoneChange={handlePhoneChange} />
              </div>

              <div className="mt-1">
                <p className="font-bold my-1 text-xs md:text-sm">Imagem</p>
                <ImageUploader
                  selectedImage={selectedImage}
                  blobUrl={blobUrl}
                  handleImageChange={handleImageChangeWrapper}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="btn btn-primary btn-sm rounded-box md:btn-md mt-6"
                  type="submit"
                >
                  Submeter
                </button>
              </div>
              {error && (
                <div className="flex justify-center">
                  <ErrorMessage error={error} />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGovUserForm;
