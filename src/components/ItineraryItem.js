import React, { useState } from 'react';
import { AddStop } from './AddStop';

export const ItineraryItem = ({ stop }) => {
  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <li>
      <div className="stop-action-box">
        <span>
          <input 
            type="checkbox" 
            id="complete-stop" 
            name="complete-stop" />
          <label htmlFor="complete-stop">Complete:</label>
        </span>
        <span>Stop {stop.id}</span>
      </div>



      {!isEditing && (
        <div className="stop-text">
          <h3>{stop.name}</h3>
          <p>{stop.address}</p>
        </div>
      )}
      
      {isEditing && (
        <div className="stop-text">
          <AddStop />
        </div>
      )}



      <div className="stop-action-box">
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'cancel' : 'edit'}
        </button>
        <button>delete</button>
      </div>
    </li>
  )
};