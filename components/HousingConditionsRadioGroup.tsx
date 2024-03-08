export const HousingConditionsRadioGroup: React.FC<{
  setHousingConditions: Function;
}> = ({ setHousingConditions }) => {
  return (
    <div>
      <div className="flex items-center mt-3">
        <input
          type="radio"
          name="housingConditions"
          value="habitavelManutencaoLeve"
          onChange={() => setHousingConditions("habitavelManutencaoLeve")}
          className="form-radio h-4 w-4 text-black mt-1"
          id="habitavelManutencaoLeve"
        />
        <label
          htmlFor="habitavelManutencaoLeve"
          className="flex items-center ml-2 h-6"
        >
          Habitável - requer manutenção leve
        </label>
      </div>

      <div className="flex items-center mt-3">
        <input
          type="radio"
          name="housingConditions"
          value="habitavelRenovacao"
          onChange={() => setHousingConditions("habitavelRenovacao")}
          className="form-radio h-4 w-4 text-black mt-1"
          id="habitavelRenovacao"
        />
        <label
          htmlFor="habitavelRenovacao"
          className="flex items-center ml-2 h-6"
        >
          Habitável - requer obras de renovação
        </label>
      </div>

      <div className="flex items-center mt-3">
        <input
          type="radio"
          name="housingConditions"
          value="habitavelReparacao"
          onChange={() => setHousingConditions("habitavelReparacao")}
          className="form-radio h-4 w-4 text-black mt-1"
          id="habitavelReparacao"
        />
        <label
          htmlFor="habitavelReparacao"
          className="flex items-center ml-2 h-6"
        >
          Habitável - requer obras de reparação
        </label>
      </div>

      <div className="flex items-center mt-3">
        <input
          type="radio"
          name="housingConditions"
          value="naoHabitavelRemodelacao"
          onChange={() => setHousingConditions("naoHabitavelRemodelacao")}
          className="form-radio h-4 w-4 text-black mt-1"
          id="naoHabitavelRemodelacao"
        />
        <label
          htmlFor="naoHabitavelRemodelacao"
          className="flex items-center ml-2 h-6"
        >
          Não Habitável - requer remodelação
        </label>
      </div>

      <div className="flex items-center mt-3">
        <input
          type="radio"
          name="housingConditions"
          value="naoHabitavelDemolicao"
          onChange={() => setHousingConditions("naoHabitavelDemolicao")}
          className="form-radio h-4 w-4 text-black mt-1"
          id="naoHabitavelDemolicao"
        />
        <label
          htmlFor="naoHabitavelDemolicao"
          className="flex items-center ml-2 h-6"
        >
          Não Habitável - requer demolição
        </label>
      </div>
    </div>
  );
};
