import { ChangeEvent } from "react";

export const YearSelect: React.FC<{
  selectedYear: string;
  handleYearChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  years: number[];
}> = ({ selectedYear, handleYearChange, years }) => {
  return (
    <div className="mt-4 h-30 w-210">
      <select
        className="px-3 py-2 border"
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
