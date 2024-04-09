"use client";

import { useHandleSignOut } from "@/customHooks/useHandleSignOut";

export default function AccessDeniedPage() {
  const handleSignOut = useHandleSignOut();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="border border-black bg-amber-50 p-5 rounded-lg text-center">
        <div className="font-bold mb-4">
          <h1>Acesso Negado</h1>
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
            <li
              className="btn btn-ghost border border-gray-400"
              onClick={handleSignOut}
            >
              Sair
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
