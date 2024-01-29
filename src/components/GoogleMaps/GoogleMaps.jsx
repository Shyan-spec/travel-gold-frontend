import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./GoogleMaps.module.css";
import { useRef, useCallback, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar";
import PointsOfInterest from "../PointsOfInterest/PointsOfInterest.jsx";
const libraries = ["places"];

const GoogleMaps = () => {
  const [address, setAddress] = useState("");
  const autocompleteInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapPresent, setMapPresent] = useState(true);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const location = useLocation();
  const searchResults = location.state?.searchResults;
  const itineraryId = location.state?.itineraryId;
  const [center, setCenter] = useState({lat: searchResults.place.lat, lng: searchResults.place.lng});
  const [itinerary, setItinerary] = useState({
    itineraryName: "",
    placeIds: [],
  });
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const getItinerary = async () => {
      const fetchItinerary = await axios.get(
        `${
          import.meta.env.VITE_BACK_END_SERVER_URL
        }/itineraries/${itineraryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming a Bearer token, adjust if different
          },
        }
      );
      setItinerary({
        itineraryName: fetchItinerary.data.name,
      });

      setPointsOfInterest(fetchItinerary.data.places);

    };
    getItinerary();
  }, []);

  const handleMapDragEnd = () => {
    setCenter({lat: map.center.lat(), lng: map.center.lng()});
  };

  const deletePointOfInterest = async (placeId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACK_END_SERVER_URL
        }/itineraries/${itineraryId}/poi/${placeId}`
      );

      if (response.status === 200) {
        setPointsOfInterest((prev) => {
          const updatedPoints = prev.filter((poi) => poi.place_id !== placeId);
          return updatedPoints;
        });
      } else {
        console.error("Delete operation was not successful");
      }
    } catch (error) {
      console.error("Error deleting point of interest:", error);
    }
  };

  const handleSaveItinerary = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/itineraries/${itineraryId}`,
      {
        name: itinerary.itineraryName,
        lat: center.lat,
        lng: center.lng
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming a Bearer token, adjust if different
        },
      }
    );

  };

  const addPoiToBackend = async (placeId, lat, lng) => {
    let placeInfo = await axios.get(
      `${
        import.meta.env.VITE_BACK_END_SERVER_URL
      }/itineraries/${itineraryId}/poi/${placeId}/${lat}/${lng}`
    );

    return placeInfo;
  };

  

  

  const handleAddress = (lat, lng) => {
    return new Promise((resolve, reject) => {
      if (!isLoaded) {
        reject("Map is not loaded yet");
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            setAddress(results[0].formatted_address);
            resolve(results[0].formatted_address);
          } else {
            reject("No results found");
          }
        } else {
          reject("Geocoder failed:", status);
        }
      });
    });
  };

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

  const handleSearchSubmit = (e) => {

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
        
        map.setCenter(center);
        map.setZoom(17);
      }
    });
  }, []);

  const handleAddToPointOfInterest = (selectedPlace) => {
    setPointsOfInterest((prevPoints) => [
      ...prevPoints,
      {
        name: selectedPlace.name,
        address: address,
        lat: selectedPlace.geometry.location.lat,
        lng: selectedPlace.geometry.location.lng,
        id: selectedPlace.place_id,
      },
    ]);
  };

  const handleChange = (event) => {
    setItinerary((prevItinerary) => ({
      ...prevItinerary,
      itineraryName: event.target.value,
    }));

  };

  useEffect(() => {
  }, [pointsOfInterest]);

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
                    id="GOOGLE_MAP"
                    onDragEnd={handleMapDragEnd}
                    mapContainerStyle={{
                      width: "95%",
                      height: "95%",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                    center={center}
                    zoom={13}
                    onLoad={(map) => {
                      initAutocomplete(map);
                      setMap(map);
                    }}
                    onClick={handleMapClick}
                  >
                    {nearbyPlaces.map((place, index) => (
                      <Marker
                        key={index}
                        position={{
                          lat: place.geometry.location.lat,
                          lng: place.geometry.location.lng,
                        }}
                        onClick={() => {
                          handleMarkerClick(place),
                            handleAddress(
                              place.geometry.location.lat,
                              place.geometry.location.lng
                            );
                        }}
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
                          <p> {address} </p>
                          <button
                            className={styles.saveLocation}
                            onClick={async () => {
                              try {
                                const fetchedAddress = await handleAddress(
                                  selectedPlace.geometry.location.lat,
                                  selectedPlace.geometry.location.lng
                                );
                                handleAddToPointOfInterest({
                                  ...selectedPlace,
                                  address: fetchedAddress,
                                  id: selectedPlace.place_id,
                                });
                                addPoiToBackend(
                                  selectedPlace.place_id,
                                  selectedPlace.geometry.location.lat,
                                  selectedPlace.geometry.location.lng
                                );
                              } catch (error) {
                                console.error("Error fetching address:", error);
                              }
                            }}
                          >
                            {" "}
                            Add To Points Of Intrests
                          </button>
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
                <input
                  required
                  placeholder="Create An Itinerary Name..."
                  name="itineraryName"
                  className={styles.userItineraryChoiceField}
                  onChange={handleChange}
                  value={itinerary.itineraryName}
                />
                <h2 className={styles.selectedPlaceTitle}>
                  {" "}
                  {searchResults.place.name}{" "}
                </h2>
              </div>
              <div className={styles.itinerary}>
                <PointsOfInterest
                  pointsOfInterest={pointsOfInterest}
                  handleSaveItinerary={handleSaveItinerary}
                  deletePointOfInterest={deletePointOfInterest}
                />
              </div>
              <div className={styles.saveCancel}>
                <button className={styles.cancel}> Cancel </button>
                <Link to='/itineraries'>
                  <button onClick={handleSaveItinerary} className={styles.save}>
                    Save
                  </button>
                </Link>
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
