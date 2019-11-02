import React from 'react';
import { ItineraryItem } from './ItineraryItem';
import { itinerary } from '../data/testData';


export const ItineraryList = () => {


  return (
    <div className="ininerary-list">
      <h2>Itinerary List:</h2>
      <ul>
        {itinerary.stops.map(stop => (
          <ItineraryItem key={stop.id} stop={stop} />
        ))}
      </ul>
    </div>
  )
}