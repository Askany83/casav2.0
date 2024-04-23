import OpenCageGeocode from "opencage-api-client";

const API_KEY = "6c73fb0b7dd14608ac71c6617617a1a6";

const fetchGeocodingData = async (address: string) => {
  try {
    const response = await OpenCageGeocode.geocode({
      q: address,
      key: API_KEY,
    });
    if (response && response.results && response.results.length > 0) {
      const { geometry } = response.results[0];
      return {
        latitude: geometry.lat.toString(),
        longitude: geometry.lng.toString(),
      };
    }
    throw new Error("No results found");
  } catch (error) {
    throw new Error("Error fetching geocoding data");
  }
};

export default fetchGeocodingData;
