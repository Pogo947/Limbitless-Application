import {
  incrementCounter,
  decrementCounter,
  Login,
  Logout,
  NavigateToLogoutScreen
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

export {
  incrementAction,
  decrementAction,
  login,
  logout,
  navigateToLogoutScreen
};