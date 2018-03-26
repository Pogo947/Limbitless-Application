import {
  incrementCounter,
  decrementCounter,
  Login,
  Logout,
  NavigateToLogoutScreen,
  Level
} from "./actionTypes";

const incrementAction = () => ({
  type: incrementCounter
});

const decrementAction = () => ({
  type: decrementCounter
});

const login = () => ({
  type: Login
});

const logout = () => ({
  type: Logout
});

const navigateToLogoutScreen = () => ({
  type: NavigateToLogoutScreen
});

const level = () => ({
  type: Level
});

export {
  incrementAction,
  decrementAction,
  login,
  logout,
  navigateToLogoutScreen,
  level
};