"use client";

import EmailInput from "@/components/childComponents/EmailInput";
import NameInput from "@/components/childComponents/NameInput";
import Password from "@/components/childComponents/PasswordInput";
import ErrorMessage from "@/components/childComponents/ErrorMessage";
import { useState, useCallback } from "react";
import { handleImageChange } from "@/utils/imageConverter";
import xss from "xss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { validateUserEditForm } from "@/utils/validationUtils";
import { EDIT_USER_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import useSessionUserData from "@/customHooks/useSessionStorageUserData";
import PhoneInput from "../childComponents/PhoneInput";
import ImageUploader from "../childComponents/ImageUploader";
import { FaUserEdit } from "react-icons/fa";
import SurnameInput from "../childComponents/Surname";

interface EditUserFormProps {
  userId: string;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  // console.log("userId in the comp - edit user: ", userId);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  // get user data from sessionStorage
  const { userData, setUserData, phone, setPhone, sessionImage, blobUrl } =
    useSessionUserData(userId);
  // Check if userData state is updated correctly
  // console.log("userData - edit user2:", userData);

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

  // handle edit houseOwner form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;

      if (!validateUserEditForm(userData, setError)) {
        return;
      }
      const formData = new FormData();

      formData.append("name", xss(userData.name.trim()));
      formData.append("surname", xss(userData.surname.trim()));
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
      const response = await fetch(EDIT_USER_API_ENDPOINT, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        // Handle success response
        alert("Informação do utilizador atualizada com sucesso!");

        // Retrieve existing houseOwnerProfile from sessionStorage
        const existingHouseOwnerProfile =
          sessionStorage.getItem("houseOwnerProfile");

        if (existingHouseOwnerProfile) {
          // Parse the existing houseOwnerProfile into a JavaScript object
          let updatedUserData = JSON.parse(existingHouseOwnerProfile);

          if (!updatedUserData.image) {
            updatedUserData.image = {};
          }
          // Update specific values
          updatedUserData.name = formData.get("name");
          updatedUserData.surname = formData.get("surname");
          updatedUserData.email = formData.get("email");
          if (formData.get("phone")) {
            updatedUserData.phone = formData.get("phone");
          }
          if (selectedImage && imageMimeType) {
            updatedUserData.image.data = formData.get("imageBase64");
            updatedUserData.image.contentType = formData.get("imageType");
          }

          // Store the updated object back in sessionStorage
          sessionStorage.setItem(
            "houseOwnerProfile",
            JSON.stringify(updatedUserData)
          );
          form.reset();
          router.push(`/houseOwnerProfile/${userEmail}`);
        } else {
          console.error("houseOwnerProfile not found in sessionStorage.");
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
        <div className="p-5 lg:w-[90rem] w-72 mt-6">
          <div className="flex items-center justify-start">
            <FaUserEdit
              size={32}
              className="mr-4 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
            />

            <h1 className="text-sm md:text-2xl font-black mt-1 text-gray-900">
              Editar Utilizador
            </h1>
          </div>
          {/* <p>{userId}</p> */}

          <div className="flex flex-row justify-center items-start mt-9">
            <form
              className="mt-3"
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <div className="flex flex-row items-start justify-start">
                <div className="flex flex-col items-start justify-start mr-24">
                  <div className="mt-1">
                    <p className="font-bold my-1 text-xs md:text-sm">Nome</p>
                    <NameInput
                      value={userData.name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-bold my-1 text-xs md:text-sm">Apelido</p>
                    <SurnameInput
                      value={userData.surname}
                      onChange={handleSurnameChange}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-bold my-1 mt-3 text-xs md:text-sm">
                      Telefone
                    </p>
                    <PhoneInput
                      phone={phone}
                      onPhoneChange={handlePhoneChange}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-bold my-1 mt-3 text-xs md:text-sm">
                      Email
                    </p>
                    <EmailInput
                      value={userData.email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-bold my-1 mt-3 text-xs md:text-sm">
                      Nova password
                    </p>
                    <Password
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start w-30">
                  <div className="-mt-1">
                    <ImageUploader
                      selectedImage={selectedImage}
                      blobUrl={blobUrl}
                      handleImageChange={handleImageChangeWrapper}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="btn btn-sm rounded-none md:btn-md mt-8 mb-4 bg-teal-950 text-white"
                  type="submit"
                >
                  Salvar
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

export default EditUserForm;
