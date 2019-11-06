import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ADD_STOP, EDIT_STOP } from "../actions";
import { generatePushId } from "../helpers";
import { errorMessages } from '../data';

export const AddStop = ({ propStop, closeAddStop }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [stopName, setStopName] = useState(propStop ? propStop.name : "");
  const [stopAddress, setStopAddress] = useState(propStop ? propStop.validatedAddress.formatted_address : "");
  const dispatch = useDispatch();

  const addStop = (e) => {
    e.preventDefault();
    if (stopAddress.length < 3) {
      setIsError('threeCharAddress');
      cleanUp();
    } else if (stopName === "" || stopAddress === "") {
      setIsError('empty');
      cleanUp()
    } else {
      setIsError('');
      setIsFetching(true);
    }
  };

  const formatStop = useCallback((validatedAddress) => {
    const stop = {
      id: isEditing ? propStop.id : generatePushId(),
      name: stopName,
      address: stopAddress,
      validatedAddress: validatedAddress
    };
    return stop;
  }, [stopName, stopAddress, propStop, isEditing]);

  const cleanUp = useCallback(() => {
    setStopName("");
    setStopAddress("");
    setIsFetching(false);
    setIsValidated(false)
  }, [setStopName, setStopAddress, setIsFetching, setIsValidated]);

  const callCloseAddStop = useCallback(() => {
    closeAddStop(false);
  }, [closeAddStop])

  // sets editing vs adding on component render 
  useEffect(() => {
    if (propStop) {
      setIsEditing(true);
    }
  }, [propStop]);

  // validates entered address after submit
  // needs to be moved along with stop state, into a custom hook if wanted to continue the hooks route. would probably rather move to a thunk or saga
  useEffect(() => {
    async function validateAddress() {
      const url = `https://dev-api.shipwell.com/v2/locations/addresses/validate/`;
      const data = { formatted_address: stopAddress };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify(data)
        })

        const json = await response.json();
        const stop = formatStop(json.geocoded_address);
        isEditing
          ? dispatch({ type: EDIT_STOP, stop })
          : dispatch({ type: ADD_STOP, stop });
        setIsValidated(true)
      } catch (e) {
        setIsError("apiError");
        setIsFetching(false)
      }
    }

    if (isFetching) {
      validateAddress();
    }
  }, [isFetching, isEditing, stopAddress, callCloseAddStop, formatStop, dispatch]);

  useEffect(() => {
    if (isValidated) {
      isEditing
        ? callCloseAddStop()
        : cleanUp();
    }
  }, [isValidated, isEditing, callCloseAddStop, cleanUp]);




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
            <button
              className="add-stop-button"
              type="submit"
              onClick={e => addStop(e)}
              onKeyDown={e => addStop(e)}
              tabIndex={0}
            >
              {isEditing ? "Save Changes": 'Add Stop'}
            </button>
        </div>
      </form>

      {isError !== "" && (
        <div className="add-stop-error">
          <p>{errorMessages[isError]}</p>
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
