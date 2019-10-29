import React, { useState } from 'react';
import { AddStop } from './AddStop';

export const ItineraryItem = ({ stop }) => {
  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <li>
      <div>
        <span>
          <input 
            type="checkbox" 
            id="complete-stop" 
            name="complete-stop" />
          <label for="complete-stop">Complete:</label>
        </span>
        <span>Stop {stop.id}</span>
      </div>



      {!isEditing && (
        <div>
          <h3>{stop.name}</h3>
          <p>{stop.address}</p>
        </div>
      )}
      
      {isEditing && (
        <AddStop />
      )}



      <div>
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