"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Import marker icons properly to prevent 404 errors
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Fix for default marker icon in production build
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
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
            <strong>Ambulance #{ambulance.id}</strong>
            <br />
            Status: {ambulance.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
