import { createStore, combineReducers } from "redux";
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";
import storage from "redux-persist/es/storage";

import counterReducer from "./app/Navigation/Reducers/counterReducer";
import NavigationReducer from "./app/Navigation/Reducers/navigationReducer";
import loginReducer from "./app/Navigation/Reducers/loginReducer";
import levelReducer from "./app/Navigation/Reducers/levelReducer"

// config to not persist the *counterString* of the CounterReducer's slice of the global state.
const config = {
  key: "root",
  storage,
  blacklist: ["counterString"]
};

const config1 = {
  key: "primary",
  storage
};

const levelconfig = {
  key: "level",
  storage
}

// Object of all the reducers for redux-persist
const reducer = {
  counterReducer,
  NavigationReducer,
  loginReducer,
  levelReducer
  
};

// This will persist all the reducers, but I don't want to persist navigation state, so instead will use persistReducer.
// const rootReducer = persistCombineReducers(config, reducer)

// We are only persisting the counterReducer and loginRducer
const CounterReducer = persistReducer(config, counterReducer);
const LoginReducer = persistReducer(config1, loginReducer);
const LevelReducer = persistReducer(levelconfig, loginReducer);

// combineReducer applied on persisted(counterReducer) and NavigationReducer
const rootReducer = combineReducers({
  CounterReducer,
  NavigationReducer,
  LoginReducer,
  LevelReducer
});

function configureStore() {
  let store = createStore(rootReducer);
  let persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore;