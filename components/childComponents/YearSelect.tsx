/**
 * Select component to choose a year from a list of options.
 *
 * @param selectedYear - The currently selected year value.
 * @param handleYearChange - Callback when year is changed.
 * @param years - List of available year options.
 */

import { ChangeEvent } from "react";

const YearSelect: React.FC<{
  selectedYear: string;
  handleYearChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  years: number[];
}> = ({ selectedYear, handleYearChange, years }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <select
        className="px-3 py-1 select select-bordered my-3 "
        value={selectedYear}
        onChange={handleYearChange}
        id="selectedYear"
      >
        <option value="">Selecione</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelect;
