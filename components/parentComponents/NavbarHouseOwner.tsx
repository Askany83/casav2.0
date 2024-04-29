"use client";

import { useState, lazy, Suspense } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUserEmailFromSession } from "@/customHooks/useUserEmailFromSession";

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

  const { data: session } = useSession();
  const router = useRouter();
  const email = useUserEmailFromSession();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 h-8 sm:h-16 glass">
        {/* desktop&tablet menu */}
        <div className="flex justify-between items-center px-4 h-full w-full 2xl:px-16 navbar -mt-4 lg:mt-0">
          <div className="text-xs md:text-md">Olá {session?.user?.name}</div>
          <div className="hidden sm:flex">
            <ul className="hidden sm:flex">
              <li className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                <Suspense fallback={null}>
                  <Link href={"/dashboard"}>Inicio</Link>
                </Suspense>
              </li>
              <li className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                <Suspense fallback={null}>
                  <Link href={"/registerHouse"}>Registar</Link>
                </Suspense>
              </li>
              <li className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                <Suspense fallback={null}>
                  <Link href={"/housesInRecord"}>Registos</Link>
                </Suspense>
              </li>

              <li className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
                <Suspense fallback={null}>
                  <Link href={`/houseOwnerProfile/${email}`}>Perfil</Link>
                </Suspense>
              </li>

              <li className="btn btn-ghost" onClick={handleSignOut}>
                Sair
              </li>
            </ul>
          </div>
          <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
            <AiOutlineMenu
              size={25}
              className="mr-2 w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </div>
        </div>
        {/* mobile menu */}
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-gray-100 p-6 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="flex w-full items-right justify-end">
            <div onClick={handleNav} className="cursor-pointer">
              <Suspense fallback={null}>
                <AiOutlineClose size={25} />
              </Suspense>
            </div>
          </div>
          <div className="flex-col py-2">
            <ul>
              <li
                className="py-2 cursor-pointer hover:border-b"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/dashboard"} className="text-sm">
                    Inicio
                  </Link>
                </Suspense>
              </li>
              <li
                className="py-2 cursor-pointer hover:border-b"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/registerHouse"} className="text-sm">
                    Registar
                  </Link>
                </Suspense>
              </li>
              <li
                className="py-2 cursor-pointer hover:border-b"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/housesInRecord"} className="text-sm">
                    Registos
                  </Link>
                </Suspense>
              </li>
              <li
                className="py-2 cursor-pointer hover:border-b"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link
                    href={`/houseOwnerProfile/${email}`}
                    className="text-sm"
                  >
                    Perfil
                  </Link>
                </Suspense>
              </li>
              <li
                className="py-2 cursor-pointer hover:border-b text-sm"
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
