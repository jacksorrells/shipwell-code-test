import { combineReducers } from 'redux';
import {
  ADD_STOP,
  EDIT_STOP,
  DELETE_STOP,
  COMPLETE_STOP,
  REQUEST_ADDRESS_VALIDATION,
  RECIEVE_ADDRESS_VALIDATION,
} from '../actions';

const stop = (
  state = {
    isFetching: false,
    stopName: '',
    formattedAddress: '',
    isCompleted: false
  }, action
) => {
  switch(action.type) {
    case EDIT_STOP:
      return;
    case COMPLETE_STOP:
      return;
    case DELETE_STOP:
      return;
    default:
      return state;
  }
}

const itinerary = (
  state = {
    stops: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_STOP:
      return;
    case EDIT_STOP:
      return;
    case DELETE_STOP:
      return;
    case COMPLETE_STOP:
      return;
    case REQUEST_ADDRESS_VALIDATION:
      return {
        ...state,
        isFetching: true
      };
    case RECIEVE_ADDRESS_VALIDATION:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  itinerary
});

export default rootReducer;