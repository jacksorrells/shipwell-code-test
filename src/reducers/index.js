import { combineReducers } from 'redux';



const itinerary = (state = [], action) => {
  switch(action.type) {

    default:
      return state;
  }
}


const rootReducer = combineReducers({
  itinerary
});

export default rootReducer;