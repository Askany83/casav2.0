// components/childComponents/PhoneInput.tsx

import { FaPhoneFlip } from "react-icons/fa6";
import ErrorMessage from "@/components/childComponents/ErrorMessage";

interface PhoneInputProps {
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  phone,
  onPhoneChange,
  errorMessage,
}) => {
  return (
    <>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <FaPhoneFlip className="w-4 h-4 opacity-70" />
        <input
          type="text"
          value={phone}
          onChange={onPhoneChange}
          className="grow"
        />
      </label>
      {errorMessage && (
        <div className="mt-5">
          <ErrorMessage error={errorMessage} />
        </div>
      )}
    </>
  );
};

export default PhoneInput;
