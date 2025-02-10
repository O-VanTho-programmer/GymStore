import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [10.7769, 106.7009]; // Example (Ho Chi Minh City)

function MapComponent() {
  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Welcome to Ho Chi Minh City!</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
