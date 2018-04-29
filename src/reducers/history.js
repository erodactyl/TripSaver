import { types } from "../actions";
import { sortTripsByDate } from "../utils";

export default (state = [], action) => {
  switch (action.type) {
    case types.INITIALIZE:
      return action.payload.history;
    case types.SAVE_TRIP:
      const brr = sortTripsByDate([...state, action.payload.trip]);
      return brr;
    case types.EDIT_TRIP:
      return state.map(
        el => (el.id === action.payload.trip.id ? action.payload.trip : el)
      );
    case types.DELETE_TRIP:
      return state.filter(el => el.id !== action.payload.tripId);
    default:
      return state;
  }
};
