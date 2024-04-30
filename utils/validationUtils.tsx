/*
Email requirements

^             // Start of the string
[^\s@]{1,100} // Match 1 to 100 characters that are not whitespace or '@'
@             // Match the '@' symbol
[^\s@]+       // Match one or more characters that are not whitespace or '@'
\.            // Match the '.' symbol
[^\s@]+       // Match one or more characters that are not whitespace or '@'
$             // End of the string
*/
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]{1,100}@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/*
Password requirements

^                                                       // Start of the string
(?=.*[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ])        // Positive lookahead for at least one letter
(?=.*[A-ZÇÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ])                            // Positive lookahead for at least one uppercase letter
(?=.*[0-9@$!%*?&])                                      // Positive lookahead for at least one digit or special character
[A-Za-zçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ\d@$!%*?&]     // Allowed characters: letters, digits, and special characters
{8,50}                                                  // Match between 8 and 50 of the allowed characters
$                                                       // End of the string
*/
export function validatePassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ])(?=.*[A-ZÇÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ])(?=.*[0-9@$!%*?&])[A-Za-zçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ\d@$!%*?&]{8,50}$/;
  return passwordRegex.test(password);
}

/*
Name requirements

^                                             // Start of the string
[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ]    // Match any letter or accented letter (2 or more times)
{2,200}                                       // Match between 2 and 200 occurrences of the previous character class
$                                             // End of the string
*/
export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ]{3,200}$/;
  return nameRegex.test(name);
}

/*
Street name requirements

^                                     // Start of the string
[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ0-9\sº\-']  // Allowed characters: letters (with accents), digits, spaces, degree symbol, hyphen, apostrophe (5 to 100 times)
{5,100}                               // Match between 5 and 100 occurrences of the previous character class
$                                     // End of the string
/i                                    // Case-insensitive flag
*/
export function validateStreetName(streetName: string): boolean {
  const streetNameRegex =
    /^[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ0-9\sº\-']{5,100}$/i;
  return streetNameRegex.test(streetName);
}

/*
Locality requirements

^                                         // Start of the string
[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ\s\-,']  // Allowed characters: letters (with accents), spaces, commas, hyphens, and apostrophes (2 to 100 times)
{2,100}                                   // Match between 2 and 100 occurrences of the previous character class
$                                         // End of the string
/i                                        // Case-insensitive flag
*/
export function validateLocality(locality: string): boolean {
  const localityRegex =
    /^[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ\s\-,']{3,100}$/i;
  return localityRegex.test(locality);
}

/*
Postal code requirements

^        // Start of the string
\d{4}    // Matches exactly 4 digits
-        // Matches a hyphen (-)
\d{3}    // Matches exactly 3 digits
$        // End of the string
*/
export function validatePostalCode(postalCode: string): boolean {
  const postalCodeRegex = /^\d{4}-\d{3}$/;
  return postalCodeRegex.test(postalCode);
}

/*
Area requirements

between 1 and 9999
*/
export function validateArea(area: string): boolean {
  const areaNumber = parseInt(area, 10);
  return !isNaN(areaNumber) && areaNumber >= 1 && areaNumber <= 9999;
}

/*
Latitude requirements

between -90 and 90
*/
export function validateLatitude(latitude: string): boolean {
  const latitudeNumber = parseFloat(latitude);
  return (
    !isNaN(latitudeNumber) && latitudeNumber >= -90 && latitudeNumber <= 90
  );
}

/*
Longitude requirements

between -180 and 180
*/
export function validateLongitude(longitude: string): boolean {
  const longitudeNumber = parseFloat(longitude);
  return (
    !isNaN(longitudeNumber) && longitudeNumber >= -180 && longitudeNumber <= 180
  );
}

/* 
validateForm HOUSE

uses the methods that are above t validate each field

setError accordingly 
*/
export const validateFormHouse = (
  typeOfHouse: string,
  selectedOption: string,
  streetName: string,
  locality: string,
  civilParish: string,
  municipality: string,
  postalCode: string,
  housingConditions: string,
  area: string,
  selectedYear: string,
  latitude: string,
  longitude: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!typeOfHouse) {
    setError("Tipo de casa: vazio");
    return false;
  }
  if (!selectedOption) {
    setError("Número de quartos: vazio");
    return false;
  }
  if (!streetName || !validateStreetName(streetName)) {
    setError("Nome da rua: vazio ou formato inválido");
    alert("Nome da rua deve ter entre 5 e 100 caracteres");
    return false;
  }

  if (!locality || !validateLocality(locality)) {
    setError("Localidade: vazia ou com caracteres inválidos");
    alert("Localidade deve ter entre 3 e 100 caracteres");
    return false;
  }

  if (!civilParish || !validateLocality(civilParish)) {
    setError("Freguesia: vazia ou com caracteres inválidos");
    alert("Freguesia deve ter entre 3 e 100 caracteres");
    return false;
  }

  if (!municipality || !validateLocality(municipality)) {
    setError("Município: vazio ou com caracteres inválidos");
    alert("Município deve ter entre 3 e 100 caracteres");
    return false;
  }

  if (!postalCode || !validatePostalCode(postalCode)) {
    setError("Código postal com formato inválido(ex. 1111-111)");
    return false;
  }
  if (!housingConditions) {
    setError("Condições de habitabilidade: vazio");
    return false;
  }
  if (!area || !validateArea(area)) {
    setError("Área bruta deve ser um número entre 1 e 9999");
    return false;
  }
  if (!selectedYear) {
    setError("Ano selecionado: vazio");
    return false;
  }
  if (!latitude || !validateLatitude(latitude)) {
    setError("latitude: deve ser um número entre -90 e 90");
    return false;
  }
  if (!longitude || !validateLongitude(longitude)) {
    setError("longitude: deve ser um número entre -180 e 180");
    return false;
  }

  return true;
};

/* 
validateForm USER

uses the methods that are above to validate each field

setError accordingly 
*/
export const validateFormUser = (
  name: string,
  surname: string,
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  // validate inputs
  if (!name || !surname || !email || !password) {
    setError("Todos os campos devem ser preenchidos!");
    return;
  }

  if (!validateName(name)) {
    setError("Nome deve ter entre 5 e 20 letras!");
    return;
  }

  if (!validateName(surname)) {
    setError("Sobrenome deve ter entre 5 e 20 letras!");
    return;
  }

  if (!validateEmail(email)) {
    setError("O email inserido não é válido!");
    return;
  }

  if (!validatePassword(password)) {
    alert(
      "Password deve conter caracteres especiais, números e letras maiúsculas e minúsculas, e ter pelo menos 8 caracteres!"
    );
    setError("Password não oferece segurança suficiente!");
    return;
  }
  return true;
};

/* 

Regular expression to match phone number starting with '9' and having exactly 9 digits

*/
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[9]\d{8}$/;
  return phoneRegex.test(phone);
};

/* 

Regular expression to match municipality - matches alphabetic characters, accented characters, hyphens, and spaces

*/

export function validateMunicipality(municipality: string): boolean {
  const municipalityRegex =
    /^[a-zA-ZçÇáàãâéèêíìóòõôúùûÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÛ\- ]{3,200}$/;
  return municipalityRegex.test(municipality);
}

/* 
validateForm USER

uses the methods that are above to validate each field

setError accordingly 
*/
export const validateFormGovUser = (
  municipality: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  // validate inputs
  if (!municipality || !name || !surname || !email || !password) {
    setError("Todos os campos devem ser preenchidos!");
    return;
  }

  if (!validateMunicipality(municipality)) {
    setError("Município deve ter entre 2 e 200 caracteres!");
    return;
  }

  if (!validateName(name)) {
    setError("Nome deve ter entre 5 e 20 letras!");
    return;
  }

  if (!validateName(surname)) {
    setError("Sobrenome deve ter entre 5 e 20 letras!");
    return;
  }

  if (!validateEmail(email)) {
    setError("O email inserido não é válido!");
    return;
  }

  if (!validatePassword(password)) {
    alert(
      "Password deve conter caracteres especiais, números e letras maiúsculas e minúsculas, e ter pelo menos 8 caracteres!"
    );
    setError("Password não oferece segurança suficiente!");
    return;
  }
  return true;
};

/*

validate edit form for houseOwner

*/

interface UserData {
  name: string;
  email: string;
}

// Pass setError as an argument to the function
export const validateUserEditForm = (
  userData: UserData,
  setError: (error: string) => void
): boolean => {
  if (!userData.name) {
    setError("Nome é um campo obrigatório");
    return false;
  }

  if (!userData.email) {
    setError("Email é um campo obrigatório");
    return false;
  }

  if (!validateName(userData.name)) {
    setError("Nome deve ter entre 5 e 20 letras!");
    return false;
  }

  if (!validateEmail(userData.email)) {
    setError("O email inserido não é válido!");
    return false;
  }

  return true;
};

/*

validate login input fields

*/

export const validateLoginForm = (
  email: string,
  password: string
): string | null => {
  if (!email || !password) {
    return "Todos os campos devem ser preenchidos!";
  }

  if (!validateEmail(email)) {
    return "Email inválido";
  }

  if (!validatePassword(password)) {
    return "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.";
  }

  return null;
};

/*

validate edit govUser Form

*/

export const validateEditGovUserForm = (
  userData: UserData,
  setError: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  if (!userData.name) {
    setError("Nome é um campo obrigatório");
    return false;
  }

  if (!userData.email) {
    setError("Email é um campo obrigatório");
    return false;
  }

  if (!validateName(userData.name)) {
    setError("Nome deve ter entre 5 e 20 letras!");
    return false;
  }

  if (!validateEmail(userData.email)) {
    setError("O email inserido não é válido!");
    return false;
  }

  return true;
};
