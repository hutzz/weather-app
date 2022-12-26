import {
	MapContainer,
	TileLayer,
	WMSTileLayer,
	Marker,
	Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ cds }) => {
	const { lat, lon } = cds;
	return (
		<>
			<MapContainer
				center={[lat, lon]}
				zoom={13}
				scrollWheelZoom={true}
				style={{ width: "100%", height: "100vh" }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<WMSTileLayer
					url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
				/>
				<Marker position={[lat, lon]}>
					<Popup>Your location data points to this spot.</Popup>
				</Marker>
			</MapContainer>
		</>
	);
};
export default Map;
