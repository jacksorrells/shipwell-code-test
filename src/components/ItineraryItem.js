import React, { useState } from 'react';
import { AddStop } from './AddStop';

export const ItineraryItem = ({ stop, index }) => {
  const [ isEditing, setIsEditing ] = useState(false);

  const completeStop = () => {
    return;
  };

  const editStop = () => {
    return;
  };

  const deleteStop = () => {
    return;
  }

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
        <span>{index+1}</span>
      </div>



      {!isEditing && (
        <div className="stop-text">
          <h3>{stop.name}</h3>
          <p>{stop.validatedAddress.formatted_address}</p>
        </div>
      )}
      
      {isEditing && (
        <div className="stop-text">
          <AddStop propStop={stop} closeAddStop={setIsEditing} />
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