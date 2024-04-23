"use client";

import { houseStateMapping } from "@/utils/houseStateProcess";
import { formatDate } from "@/utils/formatDate";
import useHelpRequestDetails from "@/customHooks/(govUserOnly)/useHelpRequestDetails";
import { BiSolidDetail } from "react-icons/bi";

const HelpRequest = () => {
  const {
    helpRequest,
    selectedState,
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
    userData,
  } = useHelpRequestDetails();

  if (isLoading) {
    return <p>A processar...</p>;
  }

  if (!helpRequest) {
    return <p>Sem registo do Pedido de ajuda</p>;
  }

  return (
    <>
      {/* New div to display messages */}
      <div className="px-2">
        <div className="p-4 glass rounded-lg">
          <div className="flex items-center">
            <div className="mt-4">
              <p className="font-bold text-xl text-center mb-3">
                Mensagens trocadas
              </p>

              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <small>
                    <strong>{msg.sender}</strong>
                  </small>
                  <p className="text-sm mb-2">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 mt-3">
        <div className="p-6 glass rounded-lg ">
          <div className="flex items-center justify-center">
            <BiSolidDetail size={32} className="mb-5 mr-2" />
            <h1 className="mb-5 font-bold">Detalhes do pedido de ajuda</h1>
          </div>
          <div className="divider divider-primary -mt-1"></div>
          {helpRequest && (
            <div>
              <div className="flex flex-wrap items-start justify-between">
                <div className="mb-5">
                  <p className="font-bold text-xs">Iniciado</p>
                  <p className="text-sm mb-1">
                    {formatDate(helpRequest.createdAt)}
                  </p>

                  <p className="font-bold text-xs">Atualizado</p>
                  <p className="text-sm mb-1">
                    {formatDate(helpRequest.updatedAt)}
                  </p>

                  <p className="font-bold text-xs">Nome</p>
                  <p className="text-sm mb-1">
                    {userData?.name} {userData?.surname}
                  </p>
                </div>
              </div>

              <div className="divider divider-primary -mt-1"></div>
              {/* Form for changing the state */}
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5 flex flex-wrap items-start justify-between">
                    {/* Checkboxes for Apoios */}
                    <div className="mb-5">
                      <label className="font-bold text-xs">
                        Apoios aplicáveis
                      </label>
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
                    <div className="">
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
                      >
                        <option value="">Selecione...</option>
                        {Object.keys(houseStateMapping).map(
                          (key) =>
                            key !== "registoInicial" && (
                              <option key={key} value={key}>
                                {houseStateMapping[key]}
                              </option>
                            )
                        )}
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

                  <div className="flex justify-between items-center w-full">
                    <button type="submit" className="btn btn-primary flex-grow">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HelpRequest;
