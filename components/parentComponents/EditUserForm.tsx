"use client";

import EmailInput from "@/components/childComponents/EmailInput";
import NameInput from "@/components/childComponents/NameInput";
import Password from "@/components/childComponents/PasswordInput";
import { UserList } from "@phosphor-icons/react";
import ErrorMessage from "@/components/childComponents/ErrorMessage";
import { useState, useEffect } from "react";
import Image from "next/image";
import { handleImageChange } from "@/utils/imageConverter";
import xss from "xss";
import { validateName, validateEmail } from "@/utils/validationUtils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { base64ToBlob } from "@/utils/base64ToBlob";

interface EditUserFormProps {
  userId: string;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  // console.log("userId in the comp - edit user: ", userId);

  const [error, setError] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Add state to hold image data retrieved from sessionStorage
  const [sessionImage, setSessionImage] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    // Retrieve data from sessionStorage based on userId
    const userDataFromSessionStorage = sessionStorage.getItem("cachedUserData");
    console.log("userDataFromSessionStorage:", userDataFromSessionStorage);

    if (userDataFromSessionStorage) {
      const parsedUserData = JSON.parse(userDataFromSessionStorage);
      const user = parsedUserData.find((user: any) => user._id === userId);
      if (user) {
        setUserData({ name: user.name, email: user.email, phone: user.phone });
        setPhone(user.phone);
        if (user && user.image && user.image.data) {
          // Set the image data to sessionImage state
          setSessionImage(user.image.data);
          console.log("sessionImage:", user.image.data);

          // Convert the image data to a Blob
          const imageBlob = base64ToBlob(user.image.data);

          // Check if the blob was successfully created
          if (imageBlob) {
            // Create a Blob URL for the Blob
            const url = URL.createObjectURL(imageBlob);
            setBlobUrl(url); // Set the Blob URL state variable
          } else {
            console.error("Failed to convert image data to blob.");
          }
        }
      }
    }
  }, [userId]);

  // Check if userData state is updated correctly
  // console.log("userData - edit user2:", userData);

  //******************* */
  const handleNameChange = (value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleEmailChange = (value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    setPhone(value);
  };

  //image Converter
  const handleImageChangeWrapper = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      // console.log("No file selected");
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
  };

  //****************** */
  const validateUserEditForm = () => {
    if (!userData.name) {
      setError("Nome é um campo obrigatório");
      return;
    }

    if (!userData.email) {
      setError("Email é um campo obrigatório");
      return;
    }

    if (!validateName(userData.name)) {
      setError("Nome deve ter entre 5 e 20 letras!");
      return;
    }

    if (!validateEmail(userData.email)) {
      setError("O email inserido não é válido!");
      return;
    }

    return true;
  };

  // ******************************************
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validateUserEditForm()) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", xss(userData.name.trim()));
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
      const response = await fetch("/api/editUser", {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        // Handle success response
        alert("Informação do utilizador atualizada com sucesso!");

        form.reset();
        router.push(`/houseOwnerProfile/${userEmail}`);
      } else {
        // Handle error response
        console.error("Failed to submit form data:", response.statusText);
        setError(
          "Falha no envio de infomação para a base de dados, tente outra vez."
        );
      }
    } catch (error) {
      // Log any caught errors
      console.error("Error:", error);
      setError("Aconteceu um erro inesperado, tente outra vez.");
    }
  };

  return (
    <>
      <div className="fixed top-16 bottom-10 left-0 right-0 overflow-y-auto ">
        <div className="h-full flex justify-center items-start">
          <div className="border border-black bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center">
              <UserList
                size={32}
                weight="fill"
                style={{ fill: "black" }}
                className="mb-4 mr-3"
              />
              <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
                Editar Utilizador
              </h1>
            </div>
            {/* <p>{userId}</p> */}
            <form
              className="mt-3"
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <div className="mt-1">
                <p className="font-bold my-1 ">Nome</p>
                <NameInput value={userData.name} onChange={handleNameChange} />
              </div>
              <div className="mt-1">
                <p className="font-bold my-1 mt-3">Email</p>
                <EmailInput
                  value={userData.email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mt-1">
                <p className="font-bold my-1 mt-3">Nova password</p>
                <Password value={password} onChange={handlePasswordChange} />
              </div>

              <div className="mt-1 ">
                <p className="font-bold my-1 mt-3">Telefone</p>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="mt-1">
                <p className="font-bold my-1 mt-3">Imagem</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangeWrapper}
                  placeholder="Image"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
                {/* Image preview */}
                {selectedImage && (
                  <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
                    <p className="font-bold my-1 mt-3">Nova imagem</p>
                    <Image
                      src={selectedImage}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                {blobUrl && ( // Render the Image component if Blob URL exists
                  <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
                    <p className="font-bold my-1 mt-3">
                      Imagem na base de dados
                    </p>
                    <Image
                      src={blobUrl}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <button
                  className="btn btn-success cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
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
    </>
  );
};

export default EditUserForm;
