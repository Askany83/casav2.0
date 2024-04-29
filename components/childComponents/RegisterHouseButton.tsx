import Link from "next/link";

const RegisterHouseButton = () => {
  return (
    <div className="flex items-center justify-end">
      <Link href="/registerHouse">
        <button className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950">
          Registar Casa
        </button>
      </Link>
    </div>
  );
};

export default RegisterHouseButton;
