import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet.heat";
import { useHouses } from "@/customHooks/(govUserOnly)/useHouses";
import L from "leaflet";
import { House } from "@/interfaces/interfaces";
import HouseStateFilter from "@/components/parentComponents/(govUserOnly)/HouseStateFilter";

declare module "leaflet" {
  function heatLayer(
    latlngs: Array<[number, number, number]>,
    options?: any
  ): any;
}

const HeatMap = () => {
  const [houses, setHouses] = useState<House[]>([]);
  useHouses(setHouses);
  const [selectedHouseState, setSelectedHouseState] =
    useState("Todas as casas");
  const heatLayerRef = useRef<L.HeatLayer | null>(null);

  const HeatLayer = () => {
    const map = useMap();

    useEffect(() => {
      const calculateRadius = (zoom: number) => {
        // Adjust this formula based on your preference
        return Math.pow(2, (15 - zoom) / 2) * 9;
      };

      const updateHeatmap = () => {
        const zoom = map.getZoom();

        const filteredPoints: [number, number, number][] = houses
          .filter(
            (house) =>
              selectedHouseState === "Todas as casas" ||
              house.houseState === selectedHouseState
          )
          .map((house) => [
            parseFloat(house.latitude),
            parseFloat(house.longitude),
            30, // intensity
          ]);

        const radius = calculateRadius(zoom);

        // Define custom color gradient
        const gradient = {
          0.3: "blue",
          // 0.4: "green",
          1.0: "yellow",
          0.8: "red",
        };

        // Remove previous heatmap layer
        if (heatLayerRef.current) {
          map.removeLayer(heatLayerRef.current);
        }

        // Add new heatmap layer
        const newHeatLayer = L.heatLayer(filteredPoints, {
          radius,
          gradient,
        }).addTo(map);

        heatLayerRef.current = newHeatLayer;
      };

      updateHeatmap();

      // Re-render the heatmap when zoom changes
      map.on("zoomend", updateHeatmap);

      return () => {
        map.off("zoomend", updateHeatmap);
      };
    }, [map]);

    return null;
  };

  return (
    <div>
      <HouseStateFilter
        selectedHouseState={selectedHouseState}
        setSelectedHouseState={setSelectedHouseState}
      />
      <MapContainer
        style={{ height: "600px", width: "100%" }}
        center={[40.64247, -8.642789]}
        zoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatLayer />
      </MapContainer>
    </div>
  );
};

export default HeatMap;
