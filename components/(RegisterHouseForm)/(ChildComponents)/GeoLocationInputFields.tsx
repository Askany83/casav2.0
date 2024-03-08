export const GeoLocationInputFields: React.FC<{
  latitude: string;
  longitude: string;
  setLatitude: Function;
  setLongitude: Function;
}> = ({ latitude, longitude, setLatitude, setLongitude }) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="my-3"
        placeholder="latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        id="latitude"
      />
      <input
        type="text"
        className="my-3"
        placeholder="longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        id="longitude"
      />
    </div>
  );
};
