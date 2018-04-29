import { types } from "./";

export const changeDailyTrips = payload => ({
  type: types.DAILY_TRIPS_GOAL_CHANGE,
  payload
});

export const changeDailyActiveTrips = payload => ({
  type: types.DAILY_ACTIVE_TRIPS_GOAL_CHANGE,
  payload
});

export const changeDailyCarpoolingTrips = payload => ({
  type: types.DAILY_CARPOOLING_TRIPS_GOAL_CHANGE,
  payload
});

export const changeName = payload => ({
  type: types.CHANGE_USER_NAME,
  payload
});

export const changeAddress = payload => ({
  type: types.CHANGE_USER_ADDRESS,
  payload
});
