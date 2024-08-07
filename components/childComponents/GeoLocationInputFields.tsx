/**
 * GeoLocationInputFields component.
 * Accepts latitude, longitude, setLatitude and setLongitude props.
 * Renders input fields to capture latitude and longitude.
 */
const GeoLocationInputFields: React.FC<{
  latitude: string;
  longitude: string;
  setLatitude: Function;
  setLongitude: Function;
}> = ({ latitude, longitude, setLatitude, setLongitude }) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="mb-3 input input-bordered input-primary rounded-box input-sm md:input-md w-full max-w-xs"
        placeholder="latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        id="latitude"
      />
      <input
        type="text"
        className="mb-3 input input-bordered input-primary rounded-box input-sm md:input-md w-full max-w-xs"
        placeholder="longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        id="longitude"
      />
    </div>
  );
};

export default GeoLocationInputFields;
