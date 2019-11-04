import React from 'react';
import { ItineraryItem } from './ItineraryItem';
import { useSelector } from 'react-redux';

export const ItineraryList = () => {
  const stops = useSelector(state => state.stops);
  console.log('stops -> ', stops);

  return (
    <div className="ininerary-list">
      <h2>Itinerary List:</h2>
      <ul>
        {stops && stops.map((stop, index) => (
          <ItineraryItem key={stop.id} stop={stop} index={index} />
        ))}
      </ul>
    </div>
  )
}