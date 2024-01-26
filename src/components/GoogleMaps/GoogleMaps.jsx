import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./GoogleMaps.module.css";
import { useRef, useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from '@mui/material/Typography';
import CardContent from "@mui/material/CardContent";
import { Navbar } from "../Navbar/Navbar";
const libraries = ["places"];

// Your fetchPlaceId function (if you're fetching additional details using place_id)

const GoogleMaps = () => {
  const autocompleteInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapPresent, setMapPresent] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const location = useLocation();
  const searchResults = location.state?.searchResults;
  console.log(searchResults);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const center = {
    lat: searchResults.place.lat,
    lng: searchResults.place.lng,
  };

  useEffect(() => {
    console.log(nearbyPlaces);
  }, [nearbyPlaces]);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  async function fetchNearbyPlaces(lat, lng, query) {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/api/nearbySearch?lat=${lat}&lng=${lng}&query=${query}`
      );
      setNearbyPlaces(response.data);
    } catch (error) {
      console.error("Error fetching nearby places", error);
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchNearbyPlaces(center.lat, center.lng, searchQuery);
  };

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const initAutocomplete = useCallback((map) => {
    if (!autocompleteInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current
    );
    autocomplete.setFields(["place_id", "geometry", "name"]);
    autocomplete.addListener("place_changed", () => {
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
      <Navbar />
      {mapPresent ? (
        <>
          <div className={styles.container}>
            <div className={styles.leftSide}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search (e.g., hotels, pizza, museums)"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className={styles.searchInput}
                />
                <button
                  type="button"
                  className={styles.searchButton}
                  onClick={handleSearchSubmit}
                >
                  Search Nearby
                </button>
              </div>
              <div className={styles.Map}>
                <div className={styles.googleMaps}>
                  <GoogleMap
                    mapContainerStyle={{
                      width: "95%",
                      height: "95%",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                    center={center}
                    zoom={13}
                    onLoad={initAutocomplete}
                    onClick={handleMapClick}
                  >
                    {nearbyPlaces.map((place, index) => (
                      <Marker
                        key={index}
                        position={{
                          lat: place.geometry.location.lat,
                          lng: place.geometry.location.lng,
                        }}
                        onClick={() => handleMarkerClick(place)}
                      />
                    ))}
                    {selectedPlace && (
                      <InfoWindow
                        position={{
                          lat: selectedPlace.geometry.location.lat,
                          lng: selectedPlace.geometry.location.lng,
                        }}
                        onCloseClick={() => setSelectedPlace(null)}
                      >
                        <div>
                          <h3>{selectedPlace.name}</h3>
                          {/* Other place details */}
                        </div>
                      </InfoWindow>
                    )}
                    {markerPosition && <Marker position={markerPosition} />}
                  </GoogleMap>
                </div>
              </div>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.tripTitle}>
                <h1 className={styles.createTitle}> CREATE ITINERARY </h1>
                <h2 className={styles.selectedPlaceTitle}> {searchResults.place.name} </h2>
              </div>
              <div className={styles.itinerary}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                  <Typography variant="h1" sx={{fontSize: '2rem'}}>
                      Points of Intrest: 
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div className={styles.saveCancel}>
                <button className={styles.cancel}> Cancel </button>
                <button className={styles.save}> Save </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <input ref={autocompleteInputRef} type="text" placeholder="Where to?" />
      )}
    </>
  );
};

export default GoogleMaps;
