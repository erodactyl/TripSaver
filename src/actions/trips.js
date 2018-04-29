import { AsyncStorage } from "react-native";
import uuid from "uuid/v4";
import { types } from "./";
import { Toast } from "native-base";

export const initialize = () => async dispatch => {
  // await AsyncStorage.clear();
  const infoJSON = await AsyncStorage.getItem("info");
  if (infoJSON != null) {
    const { history, settings } = JSON.parse(infoJSON);
    dispatch({ type: types.INITIALIZE, payload: { history, settings } });
  }
};

export const saveTrip = trip => (dispatch, getState) => {
  const {
    history,
    settings: { tripsGoal, activeGoal, carpoolingGoal }
  } = getState();
  const actives = history.reduce(
    (acc, curr) => (acc + curr.type === "active" ? curr.saved : 0),
    0
  );
  const carpoolings = history.reduce(
    (acc, curr) => (acc + curr.type === "carpooling" ? curr.saved : 0),
    0
  );
  const savedTrips = actives + carpoolings;
  if (savedTrips + trip.saved >= tripsGoal && savedTrips < tripsGoal) {
    Toast.show({
      text: "Congratulations! Trips goal met!",
      buttonText: "Awesome!",
      duration: 5000,
      position: "top"
    });
  } else if (
    trip.type === "carpooling" &&
    carpoolings + trip.saved >= carpoolingGoal &&
    carpoolings < carpoolingGoal
  ) {
    Toast.show({
      text: "Congratulations! Carpooling trips goal met!",
      buttonText: "Awesome!",
      duration: 5000,
      position: "top"
    });
  } else if (
    trip.type === "active" &&
    actives + trip.saved >= activeGoal &&
    actives < activeGoal
  ) {
    Toast.show({
      text: "Congratulations! Active trips goal met!",
      buttonText: "Awesome!",
      duration: 5000,
      position: "top"
    });
  }
  dispatch({
    type: types.SAVE_TRIP,
    payload: { trip: { ...trip, id: uuid() } }
  });
};

export const editTrip = trip => ({
  type: types.EDIT_TRIP,
  payload: { trip }
});

export const deleteTrip = tripId => ({
  type: types.DELETE_TRIP,
  payload: { tripId }
});
