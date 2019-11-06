import { combineReducers } from 'redux';
import {
  ADD_STOP,
  EDIT_STOP,
  DELETE_STOP,
  COMPLETE_STOP,
} from '../actions';

const stops = (state = [], action) => {
  switch(action.type) {
    case ADD_STOP:
      return [
        ...state,
        {
          id: action.stop.id,
          isFetching: false,
          name: action.stop.name,
          unformattedAddress: action.stop.address,
          validatedAddress: action.stop.validatedAddress,
          completed: false
        }
      ]
    case EDIT_STOP:
      return state.map((stop) => {
        if (stop.id === action.stop.id) {
          return Object.assign({}, stop, {
            name: action.stop.name,
            unformattedAddress: action.stop.address,
            validatedAddress: action.stop.validatedAddress
          })
        }
        return stop;
      });
    case COMPLETE_STOP:
      return state.map((stop) => {
        if (stop.id === action.stop.id) {
          return Object.assign({}, stop, {
            completed: !stop.completed
          })
        }
        return stop;
      });
    case DELETE_STOP:
      return state.filter((stop) => { return stop.id !== action.stop.id });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  stops
});

export default rootReducer;