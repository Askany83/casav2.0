"use client";

import Link from "next/link";
import Grant2RightsDuties from "@/components/childComponents/Grant2RightsDuties";

export default function Grant1(id: { id: string }) {
  console.log("Grant1 component rendered with id:", id.id);
  const helpRequestId = id.id;
  return (
    <main className="min-h-screen flex flex-col lg:flex-row ml-28">
      <div className="w-full flex flex-col  justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Grant2RightsDuties />
          <div className="flex items-center justify-center mt-6">
            <Link href={`/helpRequestAnswer/${helpRequestId}`}>
              <button className="btn btn-sm btn-outline rounded-none md:btn-md mt-4 mb-4 hover:bg-teal-950 hover:text-white w-22">
                Voltar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
