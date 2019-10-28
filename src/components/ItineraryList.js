import React from 'react';
import { ItineraryItem } from './ItineraryItem';



export const ItineraryList = () => {


  return (
    <div className="ininerary-list">
      <h2>Itinerary List:</h2>
      <ul>
        <ItineraryItem />
        <ItineraryItem />
      </ul>
    </div>
  )
}