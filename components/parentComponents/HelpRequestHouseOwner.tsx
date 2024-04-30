"use client";

import { houseStateMapping } from "@/utils/houseStateProcess";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import useHelpRequestDetailsHouseOwner from "@/customHooks/useHelpRequestDetailsHouseOwner";
import { BiSolidDetail } from "react-icons/bi";
import Link from "next/link";

const HelpRequest = () => {
  const {
    helpRequest,
    selectedState,
    imageUrl,
    message,
    apoios,
    isLoading,
    error,
    handleChange,
    handleTextareaChange,
    handleCheckboxChange,
    handleSubmit,
    router,
    messages,
  } = useHelpRequestDetailsHouseOwner();

  const helpRequestId = helpRequest?._id;
  console.log("helpRequestId - ho:", helpRequestId);
  console.log("helpRequest - ho: ", helpRequest);

  return (
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="flex justify-center items-start flex-col md:flex-row mt-6">
        <div className="w-full md:w-1/2 px-2">
          <div className="p-6 lg:w-[90rem] w-72 ">
            <div className="flex items-center justify-start ml-7">
              <BiSolidDetail
                size={32}
                className="mr-4 w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
              />
              <h2 className="text-sm md:text-2xl font-black text-gray-900">
                Detalhes do pedido de ajuda
              </h2>
            </div>

            <div className="mt-24 ml-12">
              {helpRequest && (
                <div>
                  <div className="flex flex-wrap items-start justify-start">
                    {imageUrl && (
                      <div className="mb-5">
                        <p className="font-bold text-xs mb-1">
                          Casa do processo
                        </p>
                        <div className="w-80 h-80">
                          <Image
                            src={imageUrl}
                            alt="House"
                            className="mt-6 rounded-lg w-full h-full object-cover"
                            width={300}
                            height={300}
                          />
                        </div>
                      </div>
                    )}
                    <div className="mb-8 ml-24">
                      <p className="font-bold text-xs">Iniciado</p>
                      <p className="text-sm mb-1">
                        {formatDate(helpRequest.createdAt)}
                      </p>

                      <p className="font-bold text-xs mt-3">Atualizado</p>
                      <p className="text-sm mb-1">
                        {formatDate(helpRequest.updatedAt)}
                      </p>

                      <p className="font-bold text-xs mt-3">Estado</p>
                      <p className="text-sm mb-1">
                        {houseStateMapping[selectedState]}
                      </p>

                      {apoios.apoio1 && (
                        <div className="mb-2">
                          <Link href={`/grant1/${helpRequestId}`}>
                            <p className="link link-info text-xs mt-3">
                              Apoio 1
                            </p>
                          </Link>
                        </div>
                      )}
                      {apoios.apoio2 && (
                        <div className="mb-2">
                          <Link href={`/grant2/${helpRequestId}`}>
                            <p className="link link-info text-xs mt-3">
                              Apoio 2
                            </p>
                          </Link>
                        </div>
                      )}
                      {apoios.apoio3 && (
                        <div className="mb-2">
                          <Link href={`/grant3/${helpRequestId}`}>
                            <p className="link link-info text-xs mt-3">
                              Apoio 3
                            </p>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* New div to display messages */}
        <div className="w-full md:w-1/2 px-2 mr-12">
          <div className="p-4 rounded-lg">
            <div className="flex items-start">
              <div className="mt-4">
                <p className="font-bold text-xl text-left mb-3">
                  Mensagens trocadas
                </p>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.sender === "govUser" ? "text-left" : "text-right"
                    }`}
                  >
                    <small>
                      <strong>
                        {msg.sender === "govUser"
                          ? "Entidade Pública"
                          : "Proprietário"}
                      </strong>
                    </small>
                    <p className="text-sm mb-3">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Form for changing the state */}
            <div className="mt-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-5 flex flex-wrap items-start justify-between">
                  {/* Checkboxes for Apoios */}
                  <div className="mb-5">
                    <div className="hidden">
                      <label>
                        <input
                          type="checkbox"
                          name="apoio1"
                          checked={apoios.apoio1}
                          onChange={handleCheckboxChange}
                          disabled
                        />
                        Apoio 1
                      </label>
                    </div>
                    <div className="hidden">
                      <label>
                        <input
                          type="checkbox"
                          name="apoio2"
                          checked={apoios.apoio2}
                          onChange={handleCheckboxChange}
                          disabled
                        />
                        Apoio 2
                      </label>
                    </div>
                    <div>
                      <label className="hidden">
                        <input
                          type="checkbox"
                          name="apoio3"
                          checked={apoios.apoio3}
                          onChange={handleCheckboxChange}
                          disabled
                        />
                        Apoio 3
                      </label>
                    </div>
                  </div>
                  <div className="hidden">
                    <label
                      htmlFor="houseState"
                      className="font-bold text-xs mr-2"
                    >
                      Estado do processo
                    </label>

                    <select
                      id="houseState"
                      name="houseState"
                      value={selectedState}
                      onChange={handleChange}
                      className="select select-bordered mb-3"
                      required
                      disabled
                    >
                      <option value="">Selecione...</option>
                      {Object.keys(houseStateMapping).map((key) => (
                        <option key={key} value={key}>
                          {houseStateMapping[key]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Textarea for message */}
                <div className="mb-5 -mt-5">
                  <label htmlFor="message" className="font-bold text-xs mb-1">
                    Mensagem (máximo 200 caracteres):
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleTextareaChange}
                    maxLength={200}
                    rows={1}
                    className="textarea textarea-bordered w-full"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="btn btn-sm rounded-none md:btn-md mt-4 bg-teal-950 text-white hover:text-teal-950 w-32 mr-24"
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm rounded-none md:btn-md mt-4 bg-gray-300 text-teal-950 hover:bg-teal-950 hover:text-white w-32"
                    onClick={() => router.push(`/house/${helpRequest.houseId}`)}
                  >
                    Ver casa
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequest;
