import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./ItineraryDetailsPage.module.css";
import { useState, useCallback, useRef, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const ItineraryDetailsPage = () => {
  const libraries = ["places"];
  const [placesOfInterest, setPlacesOfInterest] = useState(null);
  const [showDummyMarker, setShowDummyMarker] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });

  const autocompleteInputRef = useRef(null);

  const { itinerary } = useParams();
  const [itineraryDetails, setItineraryDetails] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACK_END_SERVER_URL
          }/itineraries/${itinerary}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setItineraryDetails(response.data);
        if (response.data.lat && response.data.lng) {
          setCenter({
            lat: response.data.lat,
            lng: response.data.lng,
          });
        }

        if (response.data.places) {
          setPlacesOfInterest(response.data.places);
        }
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    };

    fetchItinerary();
  }, [itinerary]);

  useEffect(() => {
    // Place the dummy marker when component mounts
    setShowDummyMarker(true);
  
    // Remove the dummy marker after a short delay
    const timer = setTimeout(() => {
      setShowDummyMarker(false);
    }, 500); // Adjust the time as needed
  
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const initAutocomplete = useCallback(
    (map) => {
      if (!autocompleteInputRef.current || !isLoaded) return;

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
          map.setCenter(center);
          map.setZoom(17);
        }
      });
    },
    [isLoaded] // Dependencies for useCallback
  );


  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  

  return (
    <>
      <Navbar />
      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeader}>
          <div className={styles.leftColumn}>
            <h1 className={styles.itineraryName}>{itineraryDetails?.name}</h1>
            <h2 className={styles.itineraryLocation}>
              {itineraryDetails?.locationName}
            </h2>
          </div>
          <div className={styles.rightColumn}>
            <p className={styles.dates}>
              <span>Start Date: </span>{" "}
              {dayjs(itineraryDetails?.startDate).format("MM-DD-YYYY")}
            </p>
            <p className={styles.dates}>
              <span>Return Date: </span>{" "}
              {dayjs(itineraryDetails?.startDate).format("MM-DD-YYYY")}
            </p>
          </div>
        </div>
        <div className={styles.detailsMap}>
          {isLoaded && placesOfInterest && Array.isArray(placesOfInterest) && (
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
            >
              {showDummyMarker && (
                <Marker
                  position={{lat: 40.000, lng:-73.000}} // Position for the dummy marker
                />
              )}

              {placesOfInterest && !showDummyMarker &&
                placesOfInterest.map((place, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: Number(place.lat),
                      lng: Number(place.long),
                    }}
                    onClick={() => {
                      handleMarkerClick(place);
                    }}
                    // ...other Marker props
                  />
                ))}

              {selectedPlace && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.lat,
                    lng: selectedPlace.long,
                  }}
                  onCloseClick={() => {setSelectedPlace(null)}}
                >
                  <>
                    <div>
                      <h2>{selectedPlace.name}</h2>
                      <h3>{selectedPlace.formatted_address}</h3>
                      <p>Phone Number: {selectedPlace.national_phone_number}</p>
                      <p>Rating: {selectedPlace.rating}</p>
                      {selectedPlace?.openingHours.map((day, index) => (
                        <p key={index}>{day}</p>
                      ))}
                    </div>
                  </>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
        <div className={styles.detailsInfo}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h1" sx={{ fontSize: "2rem" }}>
                Itinerary:
              </Typography>
              <Typography variant="body2">
                {placesOfInterest
                  ? placesOfInterest.map((location, index) => (
                      <div key={index}>
                        <h2>{location.name}</h2>
                        <p>{location.formatted_address}</p>
                      </div>
                    ))
                  : null}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ItineraryDetailsPage;
