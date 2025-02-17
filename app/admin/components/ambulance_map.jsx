"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in production build
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
})

const ambulances = [
  { id: 1, lat: 51.505, lng: -0.09, status: "available" },
  { id: 2, lat: 51.51, lng: -0.1, status: "on-duty" },
  { id: 3, lat: 51.515, lng: -0.09, status: "maintenance" },
]

export function AmbulanceMap() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ambulances.map((ambulance) => (
        <Marker key={ambulance.id} position={[ambulance.lat, ambulance.lng]}>
          <Popup>
            Ambulance #{ambulance.id}
            <br />
            Status: {ambulance.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

