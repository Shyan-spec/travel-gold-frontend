import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./GoogleMaps.module.css";
import { useRef, useCallback, useState, useEffect } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Navbar } from "../Navbar/Navbar";
const libraries = ["places"];

const center = {
  lat: 40.6782,
  lng: -73.9442,
};

// Your fetchPlaceId function (if you're fetching additional details using place_id)

const GoogleMaps = () => {
  const autocompleteInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapPresent, setMapPresent] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    console.log(nearbyPlaces);
  }, [nearbyPlaces]);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  async function fetchNearbyPlaces(lat, lng, query) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/nearbySearch?lat=${lat}&lng=${lng}&query=${query}`
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
    <Navbar/>
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
                <button type="button" className={styles.searchButton} onClick={handleSearchSubmit} >
                  Search Nearby
                </button>
              </div>
              <div className={styles.Map}>
              <div className={styles.googleMaps}>
            <GoogleMap
              mapContainerStyle={{ width: '95%', height: '95%' , borderRadius: '10px' , boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}
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
                    <h2 className={styles.selectedPlaceTitle}> New York </h2>
                </div>
                <div className={styles.itinerary}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Monday
                        </AccordionSummary>
                        <AccordionDetails>
                            Loactions:
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            Tuesday
                        </AccordionSummary>
                        <AccordionDetails>
                            Loactions:
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            Wednesday
                        </AccordionSummary>
                        <AccordionDetails>
                            Loactions:
                        </AccordionDetails>
                    </Accordion>
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
