// src/App.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  return (
    <div className='App'>
      <h1>Type your desired location</h1>
      <div className="search-container">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="calendar-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
    </div>
  )
}

export default App;
