"use client";

import { houseStateMapping } from "@/utils/houseStateProcess";

import useHelpRequestDetails from "@/customHooks/(govUserOnly)/useHelpRequestDetails";

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
      <div className="px-2 mr-12">
        <div className="p-4">
          <div className="flex items-center">
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
        </div>
      </div>
      <div className="px-2 -mt-3 mr-12">
        <div className="p-6">
          {helpRequest && (
            <div>
              {/* Form for changing the state */}
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
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

                  <div className="flex justify-center items-center w-full">
                    <button
                      type="submit"
                      className="btn btn-sm rounded-none md:btn-md mt-4 bg-teal-950 text-white hover:text-teal-950 w-32"
                    >
                      Enviar
                    </button>
                  </div>
                  <div className="mb-5 mt-12 flex flex-wrap items-start justify-start">
                    {/* Checkboxes for Apoios */}
                    <div className="mb-5 mr-12">
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
                    <div className="flex items-start justify-start mt-1">
                      <label
                        htmlFor="houseState"
                        className="font-bold text-xs mr-2 "
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
                  <div className="divider divider-gray-900 -mt-1"></div>
                  <p className="font-bold text-xs">Nome do proprietário</p>
                  <p className="text-sm mb-1">
                    {userData?.name} {userData?.surname}
                  </p>
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
