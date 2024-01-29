import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../ItinerariesList/Itineraries.css'

const ItineraryList = () => {
  const [itineraries, setItneraries] = useState([]);

  useEffect(() => {
    const fetchItins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/itineraries`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming a Bearer token, adjust if different
            },
          }
        );
        setItneraries(response.data.itineraries);
      } catch (error) {
        console.error("error fetching the itinerary list", error);
      }
    };
    fetchItins();
  }, []);

  return (
    <div>
      <h2> My Itineraries </h2>
      {itineraries.length === 0 ? (
        <p> No itineraries found </p>
      ) : (
        <ul className="itinList">
          {itineraries.map((itinerary) => (
            
            <li key={itinerary._id}>
              <Link
                to={{
                  pathname: `/itineraries/${itinerary._id}`,
                  state: { itinerary },
                }}
              >
                <h1>
                  {itinerary.name}
                </h1>
                <h2>
                  {itinerary.locationName}
                </h2>
                <p>  
                {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                  {new Date(itinerary.endDate).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItineraryList;
