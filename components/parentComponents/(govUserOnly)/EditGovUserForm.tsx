import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { handleImageChange } from "@/utils/imageConverter";
import xss from "xss";
import MunicipalityInput from "@/components/childComponents/(govUserOnly)/MunicipalityInputField";
import EmailInput from "@/components/childComponents/EmailInput";
import NameInput from "@/components/childComponents/NameInput";
import PasswordInput from "@/components/childComponents/PasswordInput";
import NewPasswordInput from "@/components/childComponents/NewPasswordInput";
import ErrorMessage from "@/components/childComponents/ErrorMessage";
import { useGovUserProfileData } from "@/customHooks/(govUserOnly)/useGovUserProfileData";
import { validateEditGovUserForm } from "@/utils/validationUtils";
import { EDIT_GOV_USER_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import PhoneInput from "@/components/childComponents/PhoneInput";
import ImageUploader from "@/components/childComponents/ImageUploader";
import { FaUserEdit } from "react-icons/fa";
import SurnameInput from "@/components/childComponents/Surname";
import Link from "next/link";
import {
  validateName,
  validateMunicipality,
  validatePhone,
  validateEmail,
  validatePassword,
} from "@/utils/validationUtils";

interface EditUserFormProps {
  userId: string;
}

const EditGovUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");

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

  const handleOldPasswordChange = useCallback((value: string) => {
    setOldPassword(value);
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

      formData.append("userId", xss(userId.trim()));
      formData.append("name", xss(userData.name.trim()));
      formData.append("surname", xss(userData.surname.trim()));
      formData.append("municipality", xss(userData.municipality.trim()));
      formData.append("email", xss(userData.email.trim()));
      if (password && oldPassword) {
        const sanitizedPassword = password.trim();
        formData.append("password", xss(sanitizedPassword));
        const sanitizedOldPassword = oldPassword.trim();
        formData.append("oldPassword", xss(sanitizedOldPassword));
      } else if (oldPassword || password) {
        // If only one of old password and new password is provided, show error
        setError(
          "Por favor, preencha a senha atual e a nova para atualizar os seus dados."
        );
        return;
      }

      if (phone !== null) {
        formData.append("phone", xss(phone));
      } else {
        // Append an empty string or placeholder value if phone is empty
        formData.append("phone", "");
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

  const [municipalityError, setMunicipalityError] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");

  useEffect(() => {
    if (userData.name && !validateName(userData.name)) {
      setNameError("Nome deve ter pelo menos 3 caracteres");
    } else {
      setNameError("");
    }

    if (userData.surname && !validateName(userData.surname)) {
      setSurnameError("Apelido deve ter pelo menos 3 caracteres");
    } else {
      setSurnameError("");
    }

    if (userData.phone && !validatePhone(userData.phone)) {
      setPhoneError("Telefone deve ter 9 digitos");
    } else {
      setPhoneError("");
    }

    if (userData.email && !validateEmail(userData.email)) {
      setEmailError("Formato de email inválido");
    } else {
      setEmailError("");
    }

    if (password && !validatePassword(password)) {
      setPasswordError(
        "Pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números"
      );
    } else {
      setPasswordError("");
    }

    if (userData.municipality && !validateMunicipality(userData.municipality)) {
      setMunicipalityError("Concelho deve ter pelo menos 3 letras");
    } else {
      setMunicipalityError("");
    }

    if (oldPassword && !validatePassword(oldPassword)) {
      setOldPasswordError(
        "A senha antiga deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números"
      );
    } else {
      setOldPasswordError("");
    }
  }, [
    userData.municipality,
    userData.name,
    userData.surname,
    userData.phone,
    userData.email,
    password,
    oldPassword,
  ]);

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
                    <p className="font-bold my-1 text-xs md:text-sm">
                      Município
                    </p>
                    <MunicipalityInput
                      value={userData.municipality}
                      onChange={handleMunicipalityChange}
                      errorMessage={municipalityError}
                    />
                  </div>

                  <div className="mt-2">
                    <p className="font-bold my-1 text-xs md:text-sm">Nome</p>
                    <NameInput
                      value={userData.name}
                      onChange={handleNameChange}
                      errorMessage={nameError}
                    />
                  </div>

                  <div className="mt-2">
                    <p className="font-bold my-1 text-xs md:text-sm">
                      Sobrenome
                    </p>
                    <SurnameInput
                      value={userData.surname}
                      onChange={handleSurnameChange}
                      errorMessage={surnameError}
                    />
                  </div>

                  <div className="mt-2">
                    <p className="font-bold my-1 text-xs md:text-sm">
                      Telefone
                    </p>
                    <PhoneInput
                      phone={phone}
                      onPhoneChange={handlePhoneChange}
                      errorMessage={phoneError}
                    />
                  </div>

                  <div className="mt-2">
                    <p className="font-bold my-1 text-xs md:text-sm">Email</p>
                    <EmailInput
                      value={userData.email}
                      onChange={handleEmailChange}
                      errorMessage={emailError}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-bold my-1 mt-3 text-xs md:text-sm">
                      Password atual
                    </p>
                    <PasswordInput
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                      errorMessage={oldPasswordError}
                    />
                    <p className="font-bold my-1 mt-3 text-xs md:text-sm">
                      Nova password
                    </p>
                    <NewPasswordInput
                      value={password}
                      onChange={handlePasswordChange}
                      errorMessage={passwordError}
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

              <div className="flex items-center justify-center mt-6">
                <Link href={`/govUserProfile/${userEmail}`}>
                  <button className="btn btn-sm btn-outline rounded-none md:btn-md mt-4 mb-4 hover:bg-teal-950 hover:text-white w-22 mr-12">
                    Cancelar
                  </button>
                </Link>
                <button
                  className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950  w-24"
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

export default EditGovUserForm;
