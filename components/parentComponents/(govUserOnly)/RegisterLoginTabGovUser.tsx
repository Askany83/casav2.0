"use client";

import { useState } from "react";
import LoginFormGovUserPage from "@/components/parentComponents/(govUserOnly)/LoginFormGovUser";
import RegisterFormGovUser from "@/components/parentComponents/(govUserOnly)/RegisterFormGovUser";

export default function RegisterLoginTabGovUser() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row relative">
      <div className="w-full flex flex-col justify-center items-center relative z-10">
        {activeTab === "login" && <LoginFormGovUserPage />}
        {activeTab === "register" && <RegisterFormGovUser />}
        <div className="flex">
          <p
            className={`text-center cursor-pointer text-sm ${
              activeTab === "login" ? "text-black" : "text-gray-700"
            }`}
            onClick={() => handleTabChange("login")}
          >
            {activeTab !== "login" && (
              <>
                Já tem conta?{" "}
                <span className="link link-info no-underline">Entrar</span>
              </>
            )}
          </p>
          <p
            className={`text-center cursor-pointer text-sm ${
              activeTab === "register" ? "text-black" : "text-gray-700"
            }`}
            onClick={() => handleTabChange("register")}
          >
            {activeTab !== "register" && (
              <>
                Não tem conta?{" "}
                <span className="link link-info no-underline">Registar</span>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
