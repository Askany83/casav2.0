const HouseStateFilter = ({
  selectedHouseState,
  setSelectedHouseState,
}: {
  selectedHouseState: string;
  setSelectedHouseState: (value: string) => void;
}) => {
  return (
    <div className="flex items-start justify-center mb-3 mt-4 px-5">
      <span className="mr-2 font-bold text-xs md:text-sm">Filtrar estado</span>
      <select
        className="select select-bordered select-neutral rounded-none w-full max-w-xs select-sm md:select-md"
        value={selectedHouseState}
        onChange={(e) => setSelectedHouseState(e.target.value)}
      >
        <option value="Todas as casas">Todas as casas</option>
        {/* <option value="registoInicial">Registo Inicial</option> */}
        <option value="pedidoDeAjuda">Pedido de Ajuda</option>
        <option value="avaliacaoMunicipio">Avaliação do Município</option>
        <option value="parecerIHRU">Parecer IHRU</option>
        <option value="aprovadoRequalificar">Aprovado para Requalificar</option>
        <option value="naoAprovadoRequalificar">
          Não Aprovado para Requalificar
        </option>
        <option value="obraIniciada">Obra Iniciada</option>
        <option value="obraFinalizada">Obra Finalizada</option>
        <option value="avaliacaoFinal">Avaliação Final</option>
      </select>
    </div>
  );
};

export default HouseStateFilter;
