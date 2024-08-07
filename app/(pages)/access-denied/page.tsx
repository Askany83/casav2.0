"use client";

import { useHandleSignOut } from "@/customHooks/useHandleSignOut";
import { BsFillSignStopFill } from "react-icons/bs";

export default function AccessDeniedPage() {
  const handleSignOut = useHandleSignOut();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="p-4 glass rounded-lg sm:w-64 md:w-80 text-center">
        <div className="flex items-center justify-center">
          <BsFillSignStopFill size={32} className="mr-2" />
          <h1 className="text-xl font-black mt-2 text-gray-900 mb-2">
            Acesso Negado
          </h1>
        </div>

        <div className="mt-8">
          <p className="mb-3">
            Não tem a permissão necessária para realizar esta ação.
          </p>
          <p className="mb-8">
            Por favor faça login com as credênciais correctas!
          </p>
        </div>
        <div>
          <ul className="mb-0">
            <li className="btn btn-error btn-outline" onClick={handleSignOut}>
              Sair
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
