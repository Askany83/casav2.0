/**
 * AddressInputFields component renders input fields for street name, locality and postal code.
 * It takes in the current values and change handler functions for each field as props.
 */

export const AddressInputFields: React.FC<{
  streetName: string;
  locality: string;
  civilParish: string;
  municipality: string;
  postalCode: string;
  setStreetName: Function;
  setLocality: Function;
  setCivilParish: Function;
  setMunicipality: Function;
  setPostalCode: Function;
}> = ({
  streetName,
  locality,
  civilParish,
  municipality,
  postalCode,
  setStreetName,
  setLocality,
  setCivilParish,
  setMunicipality,
  setPostalCode,
}) => {
  return (
    <div className="flex flex-col -mt-1 ">
      <input
        type="text"
        className="mt-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Morada"
        value={streetName}
        onChange={(e) => setStreetName(e.target.value)}
        id="streetName"
      />
      <input
        type="text"
        className="mt-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Localidade"
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
        id="locality"
        //was giving warning in dev tools if not set
        autoComplete="off"
      />
      <input
        type="text"
        className="mt-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Freguesia"
        value={civilParish}
        onChange={(e) => setCivilParish(e.target.value)}
        id="civilParish"
      />
      <input
        type="text"
        className="my-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Concelho"
        value={municipality}
        onChange={(e) => setMunicipality(e.target.value)}
        id="municipality"
        //was giving warning in dev tools if not set
        // autoComplete="off"
      />
      <input
        type="text"
        className="mb-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Código postal"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        id="postalCode"
      />
    </div>
  );
};
