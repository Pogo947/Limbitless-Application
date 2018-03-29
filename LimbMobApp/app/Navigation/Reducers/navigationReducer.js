import { NavigationActions } from "react-navigation";
import firebase from 'react-native-firebase';
import AppNavigator, { Tabs } from "../stackNavigator";
import {
  Login,
  Logout,
  NavigateToLogoutScreen
} from "../Actions/actionTypes";

const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
  "login"
);

const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams(
  "mainScreens"
);

const stateForLoggedOut = AppNavigator.router.getStateForAction(
  ActionForLoggedOut
);

const stateForLoggedIn = AppNavigator.router.getStateForAction(
  ActionForLoggedIn,
  stateForLoggedOut
);

const initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case Login:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          ActionForLoggedIn,
          stateForLoggedOut
        )
      };

    /*case Register:
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          AppNavigator.router.getActionForPathAndParams("signup"),
          stateForLoggedOut
        )
      };

    case RegisterSuccess:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({ routeName: "login" }),
              NavigationActions.navigate({ routeName: "signup" }),
              NavigationActions.navigate({ routeName: "mainScreens" })
            ]
          })
        )
      };

       Another option for RegisterSuccess
        nextState = {
          ...state,
          stateForLoggedIn: AppNavigator.router.getStateForAction(
            ActionForLoggedIn,
            AppNavigator.router.getStateForAction(
              AppNavigator.router.getActionForPathAndParams("signup"),
              stateForLoggedOut
            )
          )
        };
      */

    case "Navigation/BACK":
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          NavigationActions.back(),
          stateForLoggedOut
        )
      };

    case Logout:
      return {
        ...state,
		
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          NavigationActions.reset({
            key: null,
			index: 0,
            actions: [NavigationActions.navigate({ routeName: "login" })]
          }),
		  NavigationActions.reset({
            key: 1,
			index: 0,
            actions: [NavigationActions.navigate({ routeName: "home" })]
          })
        )
      };

    /* Other logic for logging out, more cleaner but unlike the above isn't telling the reader 
           that navigation is reset, that's why I chose the *reset* one for the article. I prefer
           this one, what about you?
        
        case 'LOGOUT':
            nextState = { ...state, initialStateForLoggedIn, initialStateForLoggedOut}
            break;
    */

    case NavigateToLogoutScreen:
      return {
        ...state,
        stateForLoggedOut: {
          ...state.stateForLoggedOut,
          routes: state.stateForLoggedOut.routes.map(
            route =>
              route.routeName === "login"
                ? { ...route, index: 1 }
                : { ...route }
          )
        }
      };

    default:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          action,
          state.stateForLoggedIn
        )
      };
  }
};

export default navigationReducer;