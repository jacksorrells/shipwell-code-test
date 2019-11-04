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
