import { AsyncStorage } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import history from "./history";
import settings from "./settings";

const reducers = combineReducers({
  history,
  settings
});

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() =>
  AsyncStorage.setItem("info", JSON.stringify(store.getState()))
);

export default store;
