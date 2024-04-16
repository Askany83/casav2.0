"use client";

import { houseStateMapping } from "@/utils/houseStateProcess";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import useHelpRequestDetails from "@/customHooks/(govUserOnly)/useHelpRequestDetails";
import { useCallback } from "react";

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
  } = useHelpRequestDetails();

  return (
    <div className="fixed top-16 bottom-10 left-0 right-0 overflow-y-auto ">
      <div className="h-full flex justify-center items-start">
        <div className="w-full md:w-1/2 px-2">
          <div className="border border-black bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center">
              <h1 className="mb-5 font-bold">Detalhes do pedido de ajuda</h1>
            </div>
            {helpRequest && (
              <div>
                <p className="mb-2">
                  <strong>Iniciado:</strong> {formatDate(helpRequest.createdAt)}
                </p>

                <p className="mb-2">
                  <strong>Atualizado:</strong>{" "}
                  {formatDate(helpRequest.updatedAt)}
                </p>
                <hr />
                <div>
                  {imageUrl && (
                    <div className="mb-4 mt-2">
                      <p className="font-bold mb-2">Casa do processo</p>
                      <Image
                        src={imageUrl}
                        alt="House"
                        className="max-w-xs"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                </div>
                <hr />
                {/* Form for changing the state */}
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      {/* Checkboxes for Apoios */}
                      <div className="mb-5">
                        <label className="font-bold">Apoios aplicáveis:</label>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="apoio1"
                              checked={apoios.apoio1}
                              onChange={handleCheckboxChange}
                            />
                            Apoio 1
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="apoio2"
                              checked={apoios.apoio2}
                              onChange={handleCheckboxChange}
                            />
                            Apoio 2
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="apoio3"
                              checked={apoios.apoio3}
                              onChange={handleCheckboxChange}
                            />
                            Apoio 3
                          </label>
                        </div>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="houseState" className="font-bold">
                          Estado do processo:
                        </label>
                      </div>
                      <select
                        id="houseState"
                        name="houseState"
                        value={selectedState}
                        onChange={handleChange}
                        className="select select-bordered w-full max-w-xs"
                        required
                      >
                        <option value="">Selecione...</option>
                        {Object.keys(houseStateMapping).map((key) => (
                          <option key={key} value={key}>
                            {houseStateMapping[key]}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Textarea for message */}
                    <div className="mb-5">
                      <label htmlFor="message" className="font-bold">
                        Mensagem (máximo 200 caracteres):
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={handleTextareaChange}
                        maxLength={200}
                        rows={4}
                        className="textarea textarea-bordered w-full"
                      />
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <button
                        type="submit"
                        className="btn btn-primary flex-grow"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary flex-grow ml-2"
                        onClick={() =>
                          router.push(`/houseDetails/${helpRequest.houseId}`)
                        }
                      >
                        Ver casa
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* New div to display messages */}
        <div className="w-full md:w-1/2 px-2">
          <div className="border border-black bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center">
              <div className="mt-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <small>
                      <strong>{msg.sender}</strong>
                    </small>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequest;
