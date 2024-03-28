/**
 * AddressInputFields component renders input fields for street name, locality and postal code.
 * It takes in the current values and change handler functions for each field as props.
 */

export const AddressInputFields: React.FC<{
  streetName: string;
  locality: string;
  postalCode: string;
  setStreetName: Function;
  setLocality: Function;
  setPostalCode: Function;
}> = ({
  streetName,
  locality,
  postalCode,
  setStreetName,
  setLocality,
  setPostalCode,
}) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="mt-3 input input-bordered w-full max-w-xs"
        placeholder="Nome da rua"
        value={streetName}
        onChange={(e) => setStreetName(e.target.value)}
        id="streetName"
      />
      <input
        type="text"
        className="my-3 input input-bordered w-full max-w-xs"
        placeholder="Localidade, Concelho"
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
        id="locality"
        //was giving warning in dev tools if not set
        autoComplete="off"
      />
      <input
        type="text"
        className="mb-3 input input-bordered w-full max-w-xs"
        placeholder="Código postal"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        id="postalCode"
      />
    </div>
  );
};
