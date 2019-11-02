export const ADD_STOP = "ADD_STOP";
export const EDIT_STOP = "EDIT_STOP";
export const DELETE_STOP = "DELETE_STOP";
export const COMPLETE_STOP = "COMPLETE_STOP";
export const REQUEST_ADDRESS_VALIDATION = "REQUEST_ADDRESS_VALIDATION";
export const RECEIVE_ADDRESS_VALIDATION = "RECEIVE_ADDRESS_VALIDATION"

export const addStop = stop => ({
  type: ADD_STOP,
  stop
});

export const editStop = stop => ({
  type: EDIT_STOP,
  stop
});

export const deleteStop = stop => ({
  type: DELETE_STOP,
  stop
});

export const completeStop = stop => ({
  type: COMPLETE_STOP,
  stop
});

export const requestAddressValidation = stop => ({
  type: REQUEST_ADDRESS_VALIDATION,
  stop
});

export const receiveAddressValidation = (stop, json) => ({
  type: RECEIVE_ADDRESS_VALIDATION,
  stop,
  stopValidationInfo: json.data,
});

const fetchStopValidation = stop => dispatch => {
  const url = "https://dev-api.shipwell.com/v2/locations/addresses/validate/";
  const data = { formatted_address: stop.address };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(json => dispatch(receiveAddressValidation(stop, json)));
}

const shouldFetchStopValidation = (state, stop) => {
  const stops = state.stops;
  if (!stops) {
    return true
  }
  if (stops.isFetching) {
    return false;
  }
  return stops.didInvalidate;
}

export const fetchStopValidationIfNeeded = stop => (dispatch, getState) => {
  if (shouldFetchStopValidation(getState(), stop)) {
    return dispatch(fetchStopValidation(stop))
  }
}