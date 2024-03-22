/**
 * Renders a dropdown component to select housing conditions.
 *
 * @param setHousingConditions - Function to update housing conditions state
 * @param housingConditions - Current selected housing conditions
 */

import React from "react";

interface HousingCondition {
  [key: string]: string;
}

const housingConditionsOptions: HousingCondition = {
  habitavelManutencaoLeve: "Habitável - requer manutenção leve",
  habitavelRenovacao: "Habitável - requer obras de renovação",
  habitavelReparacao: "Habitável - requer obras de reparação",
  naoHabitavelRemodelacao: "Não Habitável - requer remodelação",
  naoHabitavelDemolicao: "Não Habitável - requer demolição",
};

const HousingConditionsDropdown: React.FC<{
  setHousingConditions: Function;
  housingConditions: string;
}> = ({ setHousingConditions, housingConditions }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHousingConditions(event.target.value);
  };

  return (
    <div className=" h-30 w-210">
      <select
        value={housingConditions}
        onChange={handleChange}
        className="form-select py-1 mt-3 border"
      >
        <option value="">Selecione</option>
        {Object.entries(housingConditionsOptions).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HousingConditionsDropdown;
