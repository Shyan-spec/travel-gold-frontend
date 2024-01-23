import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './GoogleMaps.css';
import { useRef, useCallback, useState } from "react";
import axios from "axios";

const libraries = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "80vh",
};

const center = {
  lat: 40.7128,
  lng: 74.0060,
};

async function fetchPlaceId(id) {

  console.log(id)

  // const place = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json
  // ?place_id=${id}
  // &key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`)

  // return place
}


const GoogleMaps = () => {
  const autocompleteInputRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });


const handleMapMarker = (event) => {

  setMarkerPosition({
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  });
}

  const initAutocomplete = useCallback((map) => {
    if (!autocompleteInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current
    );
    autocomplete.setFields(['place_id', 'geometry', 'name']);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    });
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <>
      <input ref={autocompleteInputRef} type="text" placeholder="Where to?" />
      <div className='google-maps'>
        <GoogleMap
           mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
          onLoad={initAutocomplete}
          onClick={(e) => {
            fetchPlaceId(e.placeId)
            handleMapMarker(e)
          }}
          
          
        >{markerPosition && <Marker position={markerPosition} />}</GoogleMap>
    
       
      </div>
    </>
  );
};

export default GoogleMaps;
