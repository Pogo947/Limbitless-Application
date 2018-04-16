import { TabNavigator, StackNavigator, TabView } from 'react-navigation'
import { NavigationActions } from 'react-navigation'
import { Image } from 'react-native'
import Login from '../screen/LoginScreen/Login.js'
import Home from '../screen/HomeScreen.js'
import DeviceScreen from '../screen/DeviceScreen.js'
import Games from '../screen/GameScreen/Games.js'
import Profile from '../screen/ProfileScreen/Profile.js'
import LevelScreen from '../screen/LevelScreen.js'
import AddDeviceScreen from '../screen/AddDeviceScreen.js'
import Signup from '../screen/SignupScreen/Signup.js'
import SignupScreen from '../screen/SignupScreen/Signup.js'
import EmgScreen from '../screen/EmgScreen.js'
import DeviceScanScreen from '../screen/DeviceScanScreen.js'
import WheelChairScreen from '../screen/WheelChairScreen.js'
import React from 'react'

// Manifest of possible screens

const HomeScreenNavigator = StackNavigator({
	home: {
		screen: Home,
		navigationOptions: {
			gesturesEnabled: false,
			header: null
		}
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
			gesturesEnabled: false,
			header: null,
			tabBarVisible: true
		}
	},
},{
	componentDidMount() {
		this.subs = BackHandler.addEventListener('hardwareBackPress', () =>
      this.props.navigation.dispatch(NavigationActions.back()),
    );
	}
});

const DeviceScreenNavigator = StackNavigator({
	screenDevice: {
		screen: DeviceScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header: null,
			tabBarVisible: true
		}
	},
	screenAddDevice: {
		screen: AddDeviceScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header: null,
			tabBarVisible: false
		}
	},
	screenScanDevice: {
		screen: DeviceScanScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header: null,
			tabBarVisible: true
		}
	},
	screenLevel: {
		screen: LevelScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header: null
		}
	},
	screenEMG: {
		screen: EmgScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header:null,
		}
	},
	screenWheel: {
		screen: WheelChairScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header:null,
		}
	}
});
			
export const Tabs = TabNavigator({
    screenHome: {
		screen: HomeScreenNavigator,
		navigationOptions: ({navigation}) => ({
			showLabel: false,
			tabBarIcon: (
				<Image style={{ width: 25, height: 25 }} source={require('../resources/tab_icons/Home_Button.png')}/>
			),
			header: null,
			tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      const { route, focused, index } = scene;

        if (route.index > 0) {
          const tabRoute = route.routeName;
          const { routeName, key } = route.routes[0];
          navigation.dispatch(
            NavigationActions.navigate({ routeName: tabRoute })
          );
          navigation.dispatch(
            NavigationActions.reset({
              index: 0,
              key,
              actions: [
                NavigationActions.navigate({ routeName })
              ]
            })
          );
        } else {
          jumpToIndex(index);
        }
     
    },
  })
	},
	screenDevice: {
		screen: DeviceScreenNavigator,
		navigationOptions: ({navigation}) => ({
			showLabel: false,
			header: null,
			tabBarIcon: (
				<Image style={{ width: 30, height: 30 }} source={require('../resources/tab_icons/Device_Button.png')}/>
			),
			tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      const { route, focused, index } = scene;

        if (route.index > 0) {
          const tabRoute = route.routeName;
          const { routeName, key } = route.routes[0];
          navigation.dispatch(
            NavigationActions.navigate({ routeName: tabRoute })
          );
          navigation.dispatch(
            NavigationActions.reset({
              index: 0,
              key,
              actions: [
                NavigationActions.navigate({ routeName })
              ]
            })
          );
        } else {
          jumpToIndex(index);
        }
     
    },
		})
	},
	screenGames: {
		screen: Games,

		navigationOptions: {
			header: null,
			showLabel: false,
			tabBarIcon: (
				<Image style={{ width: 30, height: 30 }} source={require('../resources/tab_icons/Game_Button.png')}/>
		),
		}
	}
},{ 
	tabBarPosition: 'bottom',
	tabBarOptions: {
		showIcon: true,
		showLabel: false
	}
});



const navigator = StackNavigator({
	login: {
		screen: Login,
		navigationOptions: {
			gesturesEnabled: false,
			headerLeft: null,
			header: null
		}
	},
	mainScreens: {
		screen: Tabs,
		navigationOptions: {
			gesturesEnabled: false,
			headerLeft: null,
			header: null
		}
	},
	signup: {
		screen: Signup,
		navigationOptions: {
			gesturesEnabled: false,
			headerLeft: null,
			header: null
		}
	},
	signupScreen: {
		screen: SignupScreen,
		navigationOptions: {
			gesturesEnabled: false,
			headerLeft: null,
			header: null
		}
	}
});

export default navigator;