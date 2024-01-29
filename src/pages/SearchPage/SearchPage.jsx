import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import styles from "./SearchPage.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import photo from "../../Media/pexels-marta-branco-1510492.jpg";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const SearchPage = () => {
  const libraries = ["places"];
  const autocompleteInputRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    place: {
      lat: null,
      lng: null,
      name: null,
      place_id: "",
    },
    startDate: null,
    endDate: null,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchResults({ ...searchResults, [e.target.name]: e.target.value });

    const response = await axios.post(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/itineraries/`,
      {
        locationName: searchResults.place.name,
        startDate: searchResults.startDate.$d,
        endDate: searchResults.endDate.$d,
        lat: searchResults.place.lat,
        lng: searchResults.place.lng
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming a Bearer token, adjust if different
        },
      }
    );
    const itineraryId = response.data.itineraryId;
    navigate("/createItinerary", { state: { searchResults, itineraryId } });
  };

  const handleDateChange = (fieldName, newValue) => {
    setSearchResults((prevResults) => ({
      ...prevResults,
      [fieldName]: newValue,
    }));
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
          window.alert(
            "No details available for input: '" + place.name + "'"
          );
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.name;
        const place_id = place.place_id;

   

        setSearchResults((prevResults) => ({
          ...prevResults,
          place: {
            lat: lat,
            lng: lng,
            name: name,
            place_id: place_id,
          },
        }));

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
      <Navbar className={styles.navbar} />
      <div className={styles.mainContainer}>
        {/* Replace video with img */}
        <img src={photo} alt="Background" className={styles.planeBg} />
        <div className={styles.headerContainer}>
          <h1 className={styles.header}> READY FOR YOUR NEXT ADVENTURE?</h1>
          <h1 className={styles.subHeader}>
            {" "}
             Let's Get You Set Up For Your Next Get Away. 
          </h1>
        </div>
        <div className={styles.scheduleContainer}>
          <form className={styles.schedule}>
            <input
              type="text"
              name="place"
              placeholder="Where to?"
              ref={autocompleteInputRef}
              className={styles.searchInputField}
              onChange={() => {
                console.log(autocompleteInputRef.current.value);
              }}
            />
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{
                  width: "95%",
                  height: "95%",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                  display: "none",
                }}
                zoom={13}
                onLoad={initAutocomplete}
                value={searchResults.place}
                onChange={(e) =>
                  setSearchResults({ ...searchResults, place: e.target.value })
                }
              ></GoogleMap>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="startDate"
                value={searchResults.startDate}
                onChange={(newValue) =>
                  handleDateChange("startDate", newValue)
                }
                sx={{
                  // Your custom styles here
                  // Example:
                  '.MuiInputBase-input': {
                    color: 'white',
                    borderWidth: 'thin',
                    borderColor: 'white',
                    borderStyle: 'solid'

                    // Add more styles as needed
                  },
                  '& .MuiInputBase-root': {
                    borderWidth: 'thin',
                    borderColor: 'white',
                    borderStyle: 'solid'

                  },
                  '& .MuiSvgIcon-root' : {
                    color: 'white'
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="endDate"
                value={searchResults.endDate}
                onChange={(newValue) =>
                  handleDateChange("endDate", newValue)
                }
                sx={{
                  // Your custom styles here
                  // Example:
                  '.MuiInputBase-input': {
                    color: 'white',
                    borderWidth: 'thin',
                    borderColor: 'white',
                    borderStyle: 'solid'

                    // Add more styles as needed
                  },
                  '& .MuiInputBase-root': {
                    borderWidth: 'thin',
                    borderColor: 'white',
                    borderStyle: 'solid'

                  },
                  '& .MuiSvgIcon-root' : {
                    color: 'white'
                  }
                }}
              />
            </LocalizationProvider>
            <Link to="/createItinerary">
              <button
                className={styles.searchButton}
                onClick={handleSearch}
              >
                Search
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
