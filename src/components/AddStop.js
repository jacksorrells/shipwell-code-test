import React from 'react';

export const AddStop = () => {


  return (
    <div className="add-stop">
      <div className="stop-name">
        <label htmlFor="stop-name-input">
          Stop Name: 
        </label>
        <input 
          type="text" 
          id="stop-name-input" 
          name="stop-name-input" 
          required />
      </div>
      <div className="stop-address">
        <label htmlFor="stop-address-input">
          Stop Address:
        </label>
        <input 
          type="text" 
          id="stop-name-input" 
          name="stop-name-input" 
          required />
      </div>
      <div className="add-stop-button-wrap">
        <button 
          className="add-stop-button" 
          type="button">
          Add Stop
        </button>
      </div>
    </div>
  )
};