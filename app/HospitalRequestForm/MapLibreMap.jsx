import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";

const DEFAULT_CENTER = [77.209, 28.6139]; // Default to Delhi, India

async function reverseGeocode(lat, lng) {
  const url = `/api/geocode?lat=${lat}&lon=${lng}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Nominatim returns display_name for reverse geocode
    if (data && data.display_name) return data.display_name;
    // If using array (in case of geocode), fallback
    if (Array.isArray(data) && data[0] && data[0].display_name) return data[0].display_name;
    return '';
  } catch {
    return '';
  }
}

async function geocodeAddress(address) {
  // Use backend proxy for geocoding
  const url = `/api/geocode?q=${encodeURIComponent(address)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Nominatim returns array for geocode
    if (Array.isArray(data) && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    // If using object (in case of reverse), fallback
    if (data && data.lat && data.lon) {
      return { lat: parseFloat(data.lat), lng: parseFloat(data.lon) };
    }
    return null;
  } catch {
    return null;
  }
}

export default function MapLibreMap({ latitude, longitude, onLocationChange, address, onAddressChange }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Update marker and address when pin is dropped
  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      // Use a reliable public style (replace with your MapTiler API key)
      style: "https://api.maptiler.com/maps/basic-v2/style.json?key=lq31cPtOMpUzFuSnG3m7",
      center: longitude && latitude ? [longitude, latitude] : DEFAULT_CENTER,
      zoom: 5.5,
    });
    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add marker if lat/lng present
    if (latitude && longitude) {
      markerRef.current = new maplibregl.Marker({ draggable: true })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
      markerRef.current.on('dragend', async () => {
        const lngLat = markerRef.current.getLngLat();
        // Only update if changed
        if (lngLat.lat !== latitude || lngLat.lng !== longitude) {
          onLocationChange(lngLat.lat, lngLat.lng);
        }
        const addr = await reverseGeocode(lngLat.lat, lngLat.lng);
        if (addr && addr !== address) onAddressChange(addr);
      });
    }

    // On map click, set marker
    mapRef.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new maplibregl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
        markerRef.current.on('dragend', async () => {
          const lngLat = markerRef.current.getLngLat();
          if (lngLat.lat !== latitude || lngLat.lng !== longitude) {
            onLocationChange(lngLat.lat, lngLat.lng);
          }
          const addr = await reverseGeocode(lngLat.lat, lngLat.lng);
          if (addr && addr !== address) onAddressChange(addr);
        });
      }
      if (lat !== latitude || lng !== longitude) {
        onLocationChange(lat, lng);
      }
      const addr = await reverseGeocode(lat, lng);
      if (addr && addr !== address) onAddressChange(addr);
    });

    return () => {
      mapRef.current && mapRef.current.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // If lat/lng changes from outside, update marker
  useEffect(() => {
    if (mapRef.current && latitude && longitude) {
      mapRef.current.setCenter([longitude, latitude]);
      if (markerRef.current) {
        markerRef.current.setLngLat([longitude, latitude]);
      } else {
        markerRef.current = new maplibregl.Marker({ draggable: true })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
        markerRef.current.on('dragend', async () => {
          const lngLat = markerRef.current.getLngLat();
          if (lngLat.lat !== latitude || lngLat.lng !== longitude) {
            onLocationChange(lngLat.lat, lngLat.lng);
          }
          const addr = await reverseGeocode(lngLat.lat, lngLat.lng);
          if (addr && addr !== address) onAddressChange(addr);
        });
      }
    }
  }, [latitude, longitude]);

  // Remove geocoding when address changes. Only update address from map interaction.
  // (No useEffect for [address])

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}
