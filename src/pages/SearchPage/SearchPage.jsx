// src/pages/SearchPage/SearchPage.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchPage.module.css' ; 
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleSearch = () => {
    
  
    setSearchResults(results);
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <h2>This is Search Page!!</h2>
        {/* Move the DateRangePicker above the search input and button */}
        <div className={styles.schedule}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
           <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateRangePicker']}>
            <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
          </DemoContainer>
        </LocalizationProvider>
          <button onClick={handleSearch}>Search</button>
        </div>
      
      </div>
    </>
  );
};

export default SearchPage;