import { AsyncStorage } from "react-native";
import uuid from "uuid/v4";
import { types } from "./";

export const initialize = () => async dispatch => {
  const infoJSON = await AsyncStorage.getItem("info");
  if (infoJSON != null) {
    const trips = JSON.parse(tripsJSON);
    dispatch({ type: types.INITIALIZE, payload: { trips } });
  }
};

export const saveTrip = trip => ({
  type: types.saveTrip,
  payload: { ...trip, id: uuid() }
});

export const editTrip = trip => ({
  type: types.EDIT_TRIP,
  payload: { trip }
});

export const deleteTrip = tripId => ({
  type: types.DELETE_TRIP,
  payload: { tripId }
});
