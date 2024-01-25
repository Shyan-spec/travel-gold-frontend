import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./SearchPage.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import planeBgVideo from "../../media/pexels-jer-rey-11374334 (1080p).mp4";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleSearch = () => {
    setSearchResults(results);
  };

  return (
    <>
      <Navbar className={styles.navbar}/>
      <div className={styles.mainContainer}>
        <video
          src={planeBgVideo}
          autoPlay
          muted
          loop
          className={styles.planeBg}
        />
        <div className={styles.headerContainer}>
          <h1 className={styles.header}> WELCOME BACK!</h1>
          <h1 className={styles.subHeader}>
            {" "}
            Let's Get You Set Up For Your Next Get Away.
          </h1>
        </div>
        <div className={styles.scheduleContainer}>
          <div className={styles.schedule}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={() => {}}
              className={styles.searchInputField}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className={styles.ehh} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className={styles.ehh} />
            </LocalizationProvider>
            <button className={styles.searchButton} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
