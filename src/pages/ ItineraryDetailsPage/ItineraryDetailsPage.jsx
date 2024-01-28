import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./ItineraryDetailsPage.module.css";
import { useState, useCallback, useRef } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

const ItineraryDetailsPage = () => {
  const libraries = ["places"];
  const autocompleteInputRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const center = {
    lat: 40.023,
    lng: -70.063,
  };

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
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
      });
    },
    [isLoaded] // Dependencies for useCallback
  );

  return (
    <>
    <Navbar/>
      <div className={styles.detailsContainer}>
      <div className={styles.detailsHeader}></div>
        <div className={styles.detailsMap}>
        {isLoaded && (
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
                
              ></GoogleMap>
            )}
        </div>
        <div className={styles.detailsInfo}>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h1" sx={{ fontSize: "2rem" }}>
          Itinerary:
        </Typography>
        <Typography variant="body2">
          {/* {pointsOfInterest.map((location, index) => {
            return (
              <>
                <div key={index}>
                  <h2> {location.name} </h2>
                  <p> {location.formatted_address || location.address} </p>
                </div>
              </>
            );
          })} */}
        </Typography>
      </CardContent>
    </Card>
        </div>
      </div>
    </>
  );
};

export default ItineraryDetailsPage;
