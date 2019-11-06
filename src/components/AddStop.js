import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ADD_STOP, EDIT_STOP } from "../actions";
import { generatePushId } from "../helpers";

export const AddStop = ({ propStop, closeAddStop }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(-1);
  const [isValidated, setIsValidated] = useState(false);
  const [stopName, setStopName] = useState(propStop ? propStop.name : "");
  const [stopAddress, setStopAddress] = useState(propStop ? propStop.validatedAddress.formatted_address : "");
  //  const [validatedAddress, setValidatedAddress] = useState(propStop ? propStop.validatedAddress : {});
  const dispatch = useDispatch();

  const addStop = (e) => {
    e.preventDefault();
    if (stopAddress.length < 3) {
      console.log('error 1')
      setIsError(1);
      cleanUp();
    } else if (stopName === "" || stopAddress === "") {
      console.log('error 0')
      setIsError(0);
      cleanUp()
    } else {
      setIsFetching(true);
    }
  };

  const editStop = (e) => {
    e.preventDefault();

    setIsFetching(true);
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
        console.log('validateAddress')
        console.log("stop -> ", stop)
        if (isEditing) {
          dispatch({ type: EDIT_STOP, stop });
          //callCloseAddStop();
        } else {
          dispatch({ type: ADD_STOP, stop });
          //cleanUp();
        }

        setIsValidated(true)
      } catch (e) {
        console.log('error')
        console.log('e -> ', e);
        setIsError(2);
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

      {isError > -1 && (
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
