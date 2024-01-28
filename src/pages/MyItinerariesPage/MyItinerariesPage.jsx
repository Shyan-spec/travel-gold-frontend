import React from 'react';
import ItineraryList from '../../components/ItinerariesList/ItinerariesList';
import { Navbar } from '../../components/Navbar/Navbar';

const MyItinerariesPage = () => {
  return (
    <>
    <Navbar />
    <div>
      <ItineraryList />
      {/* Add your content for the My Itineraries page */}
    </div>
    </>
  );
};

export default MyItinerariesPage;
