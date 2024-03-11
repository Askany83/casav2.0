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
        className="my-3 border border-gray-200 py-2 px-6 sm:w-[224px] md:w-[320px]"
        placeholder="latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        id="latitude"
      />
      <input
        type="text"
        className="mb-3 border border-gray-200 py-2 px-6 sm:w-[224px] md:w-[320px]"
        placeholder="longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        id="longitude"
      />
    </div>
  );
};

export default GeoLocationInputFields;
