// components/childComponents/PhoneInput.tsx

interface PhoneInputProps {
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ phone, onPhoneChange }) => {
  return (
    <>
      <input
        type="text"
        value={phone}
        onChange={onPhoneChange}
        className="input input-primary btn-sm rounded-box md:btn-md w-full max-w-xs"
      />
    </>
  );
};

export default PhoneInput;
