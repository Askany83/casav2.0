// components/childComponents/PhoneInput.tsx

import { FaPhoneFlip } from "react-icons/fa6";

interface PhoneInputProps {
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ phone, onPhoneChange }) => {
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
    </>
  );
};

export default PhoneInput;
