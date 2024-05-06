"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BsFillHousesFill,
  BsFillHouseAddFill,
  BsFillQuestionSquareFill,
} from "react-icons/bs";
import { BiSolidChevronRightSquare } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa6";
import { SiHomeassistant } from "react-icons/si";
import { useUserEmailFromSession } from "@/customHooks/useUserEmailFromSession";
import { deleteUser } from "@/fetchCallServices/deleteUser";
import { useUserData } from "@/customHooks/useUserData";

export default function SideNavbarHouseOwner() {
  const { data: session } = useSession();
  const router = useRouter();
  const email = useUserEmailFromSession();
  console.log("User email from session:", email);

  const handleSignOut = async () => {
    await signOut();
    sessionStorage.clear();
    router.push("/");
  };

  const { userData, blobUrl } = useUserData(email ?? "");
  //delete user
  const handleDeleteClick = () => {
    deleteUser(userData, handleSignOut);
  };

  return (
    <>
      <div className="drawer drawer-start z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content absolute left-[50] top-[50%]">
          {/* Page content here */}

          <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <ul className="menu p-4 w-20 h-screen bg-base-200 text-base-content text-lg font-bold">
                  {/* Sidebar content here */}
                  <div className="mb-10">
                    <BiSolidChevronRightSquare size={64} className=" -ml-2" />
                  </div>
                  <div>LOGO</div>
                  <div className="divider"></div>
                  <li>
                    <Link href={`/registerHouse`}>
                      <BsFillHouseAddFill size={20} className="h-10" />
                    </Link>
                  </li>
                  <li>
                    <Link href={"/housesInRecord"}>
                      <BsFillHousesFill size={20} className="h-10" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/grants">
                      <SiHomeassistant size={20} className="h-10" />
                    </Link>
                  </li>
                  <li>
                    <Link href={`/about`}>
                      <BsFillQuestionSquareFill size={20} className="h-10" />
                    </Link>
                  </li>
                  <div className="divider"></div>
                  <li>
                    <Link href={`/houseOwnerProfile/${email}`}>
                      <PiUserCircleFill size={20} className="h-10" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      key={userData?._id}
                      href={`/editUser/${userData?._id}`}
                    >
                      <FaUserEdit size={20} className="h-10" />
                    </Link>
                  </li>
                  <li>
                    <a>
                      <FaUserSlash
                        size={20}
                        className="h-10"
                        onClick={handleDeleteClick}
                      />
                    </a>
                  </li>
                  <div className="divider"></div>
                  <li onClick={handleSignOut} className="-ml-1">
                    <Link href="">
                      <IoLogOut size={20} className="h-10" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div></div>
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content text-lg font-bold">
            {/* Sidebar content here */}
            <div>LOGO</div>
            <div className="divider"></div>
            <li>
              <Link href={`/registerHouse`}>
                <BsFillHouseAddFill size={17} className="mr-3" />
                Registar Imóvel
              </Link>
            </li>
            <li>
              <Link href={"/housesInRecord"}>
                <BsFillHousesFill size={17} className="mr-3" />
                As minhas Casas
              </Link>
            </li>
            <li>
              <Link href="/grants">
                <SiHomeassistant size={17} className="mr-3" />
                Apoios Disponíveis
              </Link>
            </li>
            <li>
              <Link href={`/about`}>
                <BsFillQuestionSquareFill size={17} className="mr-3" />
                Sobre - C.A.S.A.
              </Link>
            </li>
            <div className="divider"></div>
            <li>
              <details open>
                <summary>{session?.user?.name}</summary>
                <ul>
                  <li>
                    <Link href={`/houseOwnerProfile/${email}`}>
                      <PiUserCircleFill size={22} className="-ml-1 mr-3" />O meu
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      key={userData?._id}
                      href={`/editUser/${userData?._id}`}
                    >
                      <FaUserEdit size={20} className="mr-3" />
                      Editar Perfil
                    </Link>
                  </li>
                  <li onClick={handleDeleteClick}>
                    <a>
                      <FaUserSlash size={18} className="mr-3" />
                      Apagar Conta
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <div className="divider"></div>
            <li onClick={handleSignOut} className="-ml-1">
              <Link href="">
                <IoLogOut size={23} className="mr-2" />
                Sair
              </Link>
            </li>
            <div className="fixed bottom-0 left-0 flex flex-col items-start justify-start text-xs font-light mx-4 mb-4">
              <p>
                {" "}
                <span>
                  <i>Developed by</i> <b>Askany.Inc</b>
                </span>
                <br />
                <span>
                  <b>GNU.v3</b> license
                </span>
              </p>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
