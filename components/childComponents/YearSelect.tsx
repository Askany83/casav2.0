/**
 * Select component to choose a year from a list of years.
 *
 * @param selectedYear - The currently selected year value
 * @param handleYearChange - Callback when year selection changes
 * @param years - Array of available year numbers
 */
import { ChangeEvent } from "react";

const YearSelect: React.FC<{
  selectedYear: string;
  handleYearChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  years: number[];
}> = ({ selectedYear, handleYearChange, years }) => {
  return (
    <div className="my-3">
      <select
        className="px-3 py-1 border"
        value={selectedYear}
        onChange={handleYearChange}
        id="selectedYear"
      >
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
