//it's used for the REGISTER HOUSE FORM

const startYear = 1900;
const endYear = 2024;
const yearsCount = endYear - startYear + 1;

const years: number[] = Array.from(
  { length: yearsCount },
  (_, index) => startYear + index
);

export default years;
