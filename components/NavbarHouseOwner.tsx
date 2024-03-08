"use client";

import { useState, lazy, Suspense } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Lazy loading components
const Link = lazy(() => import("next/link"));
const AiOutlineMenu = lazy(() =>
  import("react-icons/ai").then((module) => ({ default: module.AiOutlineMenu }))
);
const AiOutlineClose = lazy(() =>
  import("react-icons/ai").then((module) => ({
    default: module.AiOutlineClose,
  }))
);

const NavbarHouseOwner = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div>
      <nav className="fixed w-full h-20 bg-gray-100">
        {/* desktop&tablet menu */}
        <div className="flex justify-between items-center px-4 h-full w-full 2xl:px-16">
          <div>Olá {session?.user?.name}</div>
          <div className="hidden sm:flex">
            <ul className="hidden sm:flex">
              <Suspense fallback={null}>
                <Link href={"/dashboard"}>
                  <li className="ml-10 hover:border-b text-xl">Inicio</li>
                </Link>
              </Suspense>

              <Suspense fallback={null}>
                <Link href={"/registerHouse"}>
                  <li className="ml-10 hover:border-b text-xl">Registar</li>
                </Link>
              </Suspense>

              <Suspense fallback={null}>
                <Link href={"/housesInRecord"}>
                  <li className="ml-10 hover:border-b text-xl">Registos</li>
                </Link>
              </Suspense>

              <li
                className="ml-10 hover:border-b text-xl cursor-pointer"
                onClick={handleSignOut}
              >
                Sair
              </li>
            </ul>
          </div>
          <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
            <AiOutlineMenu size={25} />
          </div>
        </div>
        {/* mobile menu */}
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-gray-100 p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={handleNav} className="cursor-pointer">
              <Suspense fallback={null}>
                <AiOutlineClose size={25} />
              </Suspense>
            </div>
          </div>
          <div className="flex-col py-4">
            <ul>
              <Suspense fallback={null}>
                <Link href={"/dashboard"}>
                  <li
                    className="py-4 cursor-pointer hover:border-b"
                    onClick={() => setMenuOpen(false)}
                  >
                    Inicio
                  </li>
                </Link>
              </Suspense>

              <Suspense fallback={null}>
                <Link href={"/registerHouse"}>
                  <li
                    className="py-4 cursor-pointer hover:border-b"
                    onClick={() => setMenuOpen(false)}
                  >
                    Registar
                  </li>
                </Link>
              </Suspense>

              <Suspense fallback={null}>
                <Link href={"/housesInRecord"}>
                  <li
                    className="py-4 cursor-pointer hover:border-b"
                    onClick={() => setMenuOpen(false)}
                  >
                    Registos
                  </li>
                </Link>
              </Suspense>

              <li
                className="py-4 cursor-pointer hover:border-b"
                onClick={handleSignOut}
              >
                Sair
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarHouseOwner;
