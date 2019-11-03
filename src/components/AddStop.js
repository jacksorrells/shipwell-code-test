import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { ADD_STOP } from "../actions";

export const AddStop = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stopName, setStopName] = useState("");
  const [stopAddress, setStopAddress] = useState("");
  const dispatch = useDispatch();

  const addStop = () => {
    console.log("stopName -> ", stopName);
    console.log("stopAddress -> ", stopAddress);
    const stop = {
      name: stopName,
      address: stopAddress
    };
    dispatch({
      type: ADD_STOP,
      stop
    });
    setIsFetching(true);

  };

  return (
    <div className="add-stop">
      <form className="add-stop-form">
        <div className="stop-name">
          <label htmlFor="stop-name-input">Stop Name:</label>
          <input
            type="text"
            id="stop-name-input"
            name="stop-name-input"
            required
            onChange={e => setStopName(e.target.value)}
          />
        </div>
        <div className="stop-address">
          <label htmlFor="stop-address-input">Stop Address:</label>
          <input
            type="text"
            id="stop-name-input"
            name="stop-name-input"
            required
            onChange={e => setStopAddress(e.target.value)}
          />
        </div>
        <div className="add-stop-button-wrap">
          <button 
            className="add-stop-button" 
            type="button"
            onClick={() => addStop()}
          >
            Add Stop
          </button>
        </div>
      </form>

      {isError && (
        <div className="add-stop-error">
          <p>Validation error. Try again.</p>
        </div>
      )}

      {isFetching && (
        <div className="add-stop-adding">
          <p>Adding...</p>
        </div>
      )}
    </div>
  );
};
