import { types } from "../actions";

export default (
  state = {
    tripsGoal: 100,
    activeGoal: 50,
    carpoolingGoal: 50,
    username: "John Doe",
    address: "Knowhere"
  },
  action
) => {
  switch (action.type) {
    case types.INITIALIZE:
      return action.payload.settings || state;
    case types.DAILY_TRIPS_GOAL_CHANGE:
      return { ...state, tripsGoal: action.payload };
    case types.DAILY_ACTIVE_TRIPS_GOAL_CHANGE:
      return { ...state, activeGoal: action.payload };
    case types.DAILY_CARPOOLING_TRIPS_GOAL_CHANGE:
      return { ...state, carpoolingGoal: action.payload };
    case types.CHANGE_USER_NAME:
      return { ...state, username: action.payload };
    case types.CHANGE_USER_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};
