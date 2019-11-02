export const ADD_STOP = "ADD_STOP";
export const EDIT_STOP = "EDIT_STOP";
export const DELETE_STOP = "DELETE_STOP";
export const COMPLETE_STOP = "COMPLETE_STOP";
export const VALIDATE_ADDRESS = "VALIDATE_ADDRESS";
export const VALIDATE_ADDRESS_SUCCESS = "VALIDATE_ADDRESS_SUCCESS";
export const VALIDATE_ADDERSS_FAILURE = "VALIDATE_ADDRESS_SUCCESS";
export const RECEIVE_ADDRESS_VALIDATION = "RECEIVE_ADDRESS_VALIDATION";

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

const fetchStopValidation = stop => dispatch => {
  return fetch(`${stop.address}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(stop, json)));
}

const shouldFetchStopValidation = (state, stop) => {
  const stops = state.stops;
  if(!stops) {
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