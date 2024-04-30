import Link from "next/link";

export default function grant3Page({
  params,
}: {
  params: { helpRequestId: string };
}) {
  const id = params.helpRequestId;
  console.log("id: ", id);
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex flex-col  justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1>Apoio 3</h1>
          <div className="flex items-center justify-center mt-6">
            <Link href={`/helpRequestAnswer/${id}`}>
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
