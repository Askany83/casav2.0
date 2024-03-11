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
      <nav className="fixed w-full h-12 bg-gray-100">
        {/* desktop&tablet menu */}
        <div className="flex justify-between items-center px-4 h-full w-full 2xl:px-16">
          <div>Olá {session?.user?.name}</div>
          <div className="hidden sm:flex">
            <ul className="hidden sm:flex">
              <li
                className="ml-10 hover:border-b text-l cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/dashboard"}>Inicio</Link>
                </Suspense>
              </li>
              <li
                className="ml-10 hover:border-b text-l cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/registerHouse"}>Registar</Link>
                </Suspense>
              </li>
              <li
                className="ml-10 hover:border-b text-l cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/housesInRecord"}>Registos</Link>
                </Suspense>
              </li>
              <li
                className="ml-10 hover:border-b text-l cursor-pointer"
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
              <li
                className="py-4 cursor-pointer hover:border-b"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/dashboard"}>Inicio</Link>
                </Suspense>
              </li>
              <li
                className="py-4 cursor-pointer hover:border-b"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/registerHouse"}>Registar</Link>
                </Suspense>
              </li>
              <li
                className="py-4 cursor-pointer hover:border-b"
                onClick={() => setMenuOpen(false)}
              >
                <Suspense fallback={null}>
                  <Link href={"/housesInRecord"}>Registos</Link>
                </Suspense>
              </li>
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
