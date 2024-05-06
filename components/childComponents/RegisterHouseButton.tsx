import Link from "next/link";

const RegisterHouseButton = () => {
  return (
    <div className="flex items-center justify-end">
      <Link href="/registerHouse">
        <button className="btn btn-sm rounded-none md:btn-md bg-teal-950 text-white hover:text-teal-950 sm:text-sm text-xs">
          Registar Casa
        </button>
      </Link>
    </div>
  );
};

export default RegisterHouseButton;
