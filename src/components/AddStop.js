import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_STOP, editStop, EDIT_STOP } from "../actions";
import { generatePushId } from "../helpers";

export const AddStop = ({ propStop, closeAddStop }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [stopName, setStopName] = useState("");
  const [stopAddress, setStopAddress] = useState("");
  const [validatedAddress, setValidatedAddress] = useState({});
  const dispatch = useDispatch();

  // sets editing vs adding on component render 
  useEffect(() => {
    if (propStop) {
      setIsEditing(true);
    }
  }, [propStop]);

  // validates entered address after submit
  useEffect(() => {
    async function validateAddress() {
      const url = `https://dev-api.shipwell.com/v2/locations/addresses/validate/`;
      const data = { formatted_address: stopAddress };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(data)
      })
      
      const json = await response.json();
      setValidatedAddress(json.geocoded_address)

      const stop = {
        id: isEditing ? propStop.id : generatePushId(),
        name: stopName,
        address: stopAddress,
        validatedAddress: json.geocoded_address
      };
      isEditing
        ? dispatch({ type: EDIT_STOP, stop })
        : dispatch({ type: ADD_STOP, stop });

      setIsValidated(true)
    }

    if(isFetching) {
      validateAddress();
    }
  }, [isFetching, stopAddress]);


  const addStop = (e) => {
    e.preventDefault();
    setIsFetching(true);
  };

  const editStop = (e) => {
    e.preventDefault();

    //setIsFetching(true);
    
    //dispatch({ type: EDIT_STOP, stop });
    //closeAddStop(false);
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
            value={stopName}
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
            value={stopAddress}
            onChange={e => setStopAddress(e.target.value)}
          />
        </div>

        <div className="add-stop-button-wrap">
          {!isEditing && (
            <button
              className="add-stop-button"
              type="submit"
              onClick={e => addStop(e)}
              onKeyDown={e => addStop(e)}
            >
              Add Stop
            </button>
          )}

          {isEditing && (
            <button
              className="edit-stop-button"
              type="button"
              onClick={e => editStop(e)}
              onKeyDown={e => editStop(e)}
            >
              Save Changes
            </button>
          )}
        </div>
      </form>

      {isError && (
        <div className="add-stop-error">
          <p>Validation error. Try again.</p>
        </div>
      )}

      {isFetching && (
        <div className="add-stop-adding">
          <p>Saving...</p>
        </div>
      )}
    </div>
  );
};
