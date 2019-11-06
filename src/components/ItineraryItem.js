import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AddStop } from './AddStop';
import { COMPLETE_STOP, DELETE_STOP } from '../actions';

export const ItineraryItem = ({ stop, index }) => {
  const [ isEditing, setIsEditing ] = useState(false);
  const dispatch = useDispatch();

  return (
    <li>
      <div className="stop-action-box">
        <span>
          <input 
            type="checkbox" 
            id="complete-stop" 
            name="complete-stop"
            onClick={() => dispatch({ type: COMPLETE_STOP, stop })} 
            onKeyDown={() => dispatch({ type: COMPLETE_STOP, stop })}  
          />
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
          onKeyDown={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'cancel' : 'edit'}
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: DELETE_STOP, stop })}
          onKeyDown={() => dispatch({ type: DELETE_STOP, stop })}
        >delete</button>
      </div>
    </li>
  )
};