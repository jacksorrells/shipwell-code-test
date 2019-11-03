import { combineReducers } from 'redux';
import {
  ADD_STOP,
  EDIT_STOP,
  DELETE_STOP,
  COMPLETE_STOP,
  REQUEST_ADDRESS_VALIDATION,
  RECEIVE_ADDRESS_VALIDATION,
} from '../actions';
import { generatePushId } from '../helpers';

const stops = (state = [], action) => {
  switch(action.type) {
    case ADD_STOP:
      return [
        ...state,
        {
          id: generatePushId(),
          isFetching: false,
          stopName: action.stop.name,
          unformattedAddress: action.stop.address,
          formattedAddress: '',
          isCompleted: false
        }
      ]
    case EDIT_STOP:
      return;
    case COMPLETE_STOP:
      return state.map((stop, index));
    case REQUEST_ADDRESS_VALIDATION:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_ADDRESS_VALIDATION:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

const itinerary = (
  state = {}, action
) => {
  switch (action.type) {
    case EDIT_STOP:
      return;
    case DELETE_STOP:
      return;
    case COMPLETE_STOP:
      return;
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  itinerary,
  stops
});

export default rootReducer;