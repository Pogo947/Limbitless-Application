import { combineReducers } from "redux";
import CounterReducer from "./counterReducer";
import NavigationReducer from "./navigationReducer";
import LevelReducer from "./levelReducer"

const AppReducer = combineReducers({
  CounterReducer,
  NavigationReducer,
  LevelReducer
});

export default AppReducer;