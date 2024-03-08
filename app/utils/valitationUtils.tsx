export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]{1,100}@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ])(?=.*[A-ZÇÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ])(?=.*[0-9@$!%*?&])[A-Za-zçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ\d@$!%*?&]{8,50}$/;
  return passwordRegex.test(password);
}

export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ]{2,20}$/;
  return nameRegex.test(name);
}

export function validateStreetName(streetName: string): boolean {
  const streetNameRegex =
    /^[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ0-9\sº\-']{5,100}$/i;
  return streetNameRegex.test(streetName);
}

export function validateLocality(locality: string): boolean {
  const localityRegex =
    /^[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ\s\-']{2,100}$/i;
  return localityRegex.test(locality);
}

export function validatePostalCode(postalCode: string): boolean {
  const postalCodeRegex = /^\d{4}-\d{3}$/;
  return postalCodeRegex.test(postalCode);
}

export function validateArea(area: string): boolean {
  const areaNumber = parseInt(area, 10);
  return !isNaN(areaNumber) && areaNumber >= 1 && areaNumber <= 9999;
}

export function validateLatitude(latitude: string): boolean {
  const latitudeNumber = parseFloat(latitude);
  return (
    !isNaN(latitudeNumber) && latitudeNumber >= -90 && latitudeNumber <= 90
  );
}

export function validateLongitude(longitude: string): boolean {
  const longitudeNumber = parseFloat(longitude);
  return (
    !isNaN(longitudeNumber) && longitudeNumber >= -180 && longitudeNumber <= 180
  );
}
