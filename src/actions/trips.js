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

export const saveTrip = trip => async (dispatch, getState) => {
  const {
    history,
    settings: { tripsGoal, activeGoal, carpoolingGoal }
  } = getState();
  const today = history.reduce(
    (acc, curr) => (curr.date === trip.date ? acc + curr : acc),
    1
  );
  if (today > 20) {
    Toast.show({
      text: "OH MY GOD YOU DID 20 TRIPS IN ONE DAY!!",
      buttonText: "Biggest achiement evah",
      duration: 5000,
      posiiton: "top"
    });
    saveReward("20 trips in one day!");
  }
  const actives = history.reduce(
    (acc, curr) =>
      acc + curr.type === "active" && curr.date === trip.date ? curr.saved : 0,
    0
  );
  const carpoolings = history.reduce(
    (acc, curr) =>
      acc + curr.type === "carpooling" && curr.date === trip.date
        ? curr.saved
        : 0,
    0
  );
  const savedTrips = actives + carpoolings;
  if (savedTrips + trip.saved >= 100 && savedTrips < 100) {
    Toast.show({
      text: "Congratulations! 100 trips goal met!",
      buttonText: "Awesome!",
      duration: 5000,
      position: "top"
    });
    saveReward("100 trips");
  } else if (savedTrips + trip.saved >= 1000 && savedTrips < 100) {
    Toast.show({
      text: "Congratulations! 1000 trips goal met!",
      buttonText: "Awesome!",
      duration: 5000,
      position: "top"
    });
    saveReward("1000 trips");
  } else if (
    trip.type === "carpooling" &&
    carpoolings + trip.saved >= 100 &&
    carpoolings < 100
  ) {
    Toast.show({
      text: "Carpooler! 100 carpooling goal met!",
      buttonText: "Awesome!",
      duration: 5000,
      position: "top"
    });
    saveReward("100 carpoolings");
  } else if (savedTrips + trip.saved >= tripsGoal && savedTrips < tripsGoal) {
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
    saveReward("Carpooling goal met");
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
    saveReward("Active goal met!");
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

const saveReward = async text => {
  const rewardsJSON = await AsyncStorage.getItem("rewards");
  if (rewardsJSON == null) {
    const rewards = [text];
    AsyncStorage.setItem("rewards", JSON.stringify(rewards));
  } else {
    const rewards = JSON.parse(rewardsJSON);
    const added = [...rewards, text];
    AsyncStorage.setItem(JSON.stringify(added));
  }
};
