"use client";

import L from "leaflet";
import MarkerIcon from "@/node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "@/node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useHouses } from "@/customHooks/(govUserOnly)/useHouses";
import { House } from "@/interfaces/interfaces";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import HouseDetailsButtonGovUser from "@/components/childComponents/(govUserOnly)/HouseDetailsButtonGovUser";

const Map = () => {
  const [coord, setCoord] = useState({ lat: 40.64247, lng: -8.642789 });
  const [houses, setHouses] = useState<House[]>([]);

  useHouses(setHouses);

  const houseIcon = new L.Icon({
    iconUrl: MarkerIcon.src,
    iconRetinaUrl: MarkerIcon.src,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    shadowUrl: MarkerShadow.src,
    shadowSize: [41, 41],
  });

  const handleClick = (house: House) => {
    console.log("House clicked:", house);
  };

  // const SearchLocation = () => {
  //   return (
  //     <div className="search-location">
  //       <input type="text" placeholder="Search Location" />
  //     </div>
  //   );
  // };

  // const GetMyLocation = () => {
  //   const getMyLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         setCoord({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       });
  //     } else {
  //       console.log("Geolocation is not supported by this browser.");
  //     }
  //   };

  //   return (
  //     <div className="get-my-location">
  //       <button onClick={getMyLocation}>Get My Location</button>
  //     </div>
  //   );
  // };

  return (
    <div>
      {/* <SearchLocation />
      <GetMyLocation /> */}
      <MapContainer
        style={{ height: 600, width: "100%" }}
        center={coord}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {houses.map((house, index) => (
          <Marker
            key={index}
            icon={houseIcon}
            position={[parseFloat(house.latitude), parseFloat(house.longitude)]}
          >
            <Popup>
              <div className="my-2">
                <span className="font-bold">Tipo de habitação:</span>{" "}
                {house.typeOfHouse} {house.selectedOption}
              </div>
              <div className="my-2">
                <span className="font-bold">Condições habitacionais:</span>{" "}
                <br />
                {conditionsMapHouses[house.housingConditions] ||
                  house.housingConditions}
              </div>
              <div className="my-2">
                {" "}
                <span className="font-bold">Área:</span> {house.area}
              </div>

              <div className="my-2">
                <span className="font-bold">Morada:</span> {house.streetName},{" "}
                {house.locality}
              </div>

              <div className="my-2">
                <span className="font-bold">Município:</span>{" "}
                {house.municipality}
              </div>

              <div className="my-2">
                <span className="font-bold">Código postal:</span>{" "}
                {house.postalCode}
              </div>
              <HouseDetailsButtonGovUser house={house} onClick={handleClick} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
