import { combineReducers } from 'redux';
import {
  ADD_STOP,
  EDIT_STOP,
  DELETE_STOP,
  COMPLETE_STOP,
  REQUEST_ADDRESS_VALIDATION,
  RECEIVE_ADDRESS_VALIDATION,
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
      console.log('edit stop')
      console.log('state -> ', state)
      return state.map((stop) => {
        if (stop.id === action.stop.id) {
          return Object.assign({}, stop, {
            name: action.stop.name,
            unformattedAddress: action.stop.address,
          })
        }
        return stop;
      });
    case COMPLETE_STOP:
      return state.map((stop) => {
        if (stop.id === action.id) {
          return Object.assign({}, stop, {
            completed: !stop.completed
          })
        }
        return stop;
      });
    case REQUEST_ADDRESS_VALIDATION:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_ADDRESS_VALIDATION:
      return {
        ...state,
        isFetching: false,
        formattedAddress: action.data.formattedAddress
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  stops
});

export default rootReducer;