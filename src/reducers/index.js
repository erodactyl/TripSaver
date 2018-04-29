import { AsyncStorage } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import history from "./history";

const reducers = combineReducers({
  history
});

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() =>
  AsyncStorage.setItem("info", JSON.stringify(store.getState()))
);

export default store;
