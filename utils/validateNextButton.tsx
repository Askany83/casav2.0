const isStepValid = (
  currentStep: number,
  typeOfHouse: string,
  streetName: string,
  locality: string,
  municipality: string,
  postalCode: string,
  housingConditions: string,
  area: string,
  selectedYear: string,
  selectedImageFile: File | null,
  latitude: string,
  longitude: string
) => {
  switch (currentStep) {
    case 1:
      return (
        typeOfHouse && streetName && locality && municipality && postalCode
      );
    case 2:
      return housingConditions && area && selectedYear;
    case 3:
      return selectedImageFile && latitude && longitude;
    default:
      return false;
  }
};

export default isStepValid;
