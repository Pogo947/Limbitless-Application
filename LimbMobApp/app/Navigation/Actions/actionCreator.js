import {
  incrementCounter,
  decrementCounter,
  Login,
  Logout,
  NavigateToLogoutScreen,
  Level,
  Register,
  RegisterSuccess
} from "./actionTypes";

const incrementAction = () => ({
  type: incrementCounter
});

const decrementAction = () => ({
  type: decrementCounter
});

const registersuccess = () => ({
	type: RegisterSuccess
});

const register = () => ({
	type: Register
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
  level,
  register,
  registersuccess
};