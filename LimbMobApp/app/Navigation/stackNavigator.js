import { TabNavigator, StackNavigator, TabView } from 'react-navigation'
import Login from '../screen/LoginScreen/Login.js'
import Home from '../screen/HomeScreen.js'
import SavedDeviceScreen from '../screen/SavedDeviceScreen.js'
import Games from '../screen/GameScreen/Games.js'
import Profile from '../screen/ProfileScreen/Profile.js'
import LevelScreen from '../screen/LevelScreen.js'
import AddDeviceScreen from '../screen/AddDeviceScreen.js'
import EmgScreen from '../screen/EmgScreen.js';
import DeviceScanScreen from '../screen/DeviceScanScreen.js'
import DeviceGraphScreen from '../screen/DeviceGraphScreen.js'

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
			tabBarVisible: false
		}
	},
});

const DeviceScreenNavigator = StackNavigator({
	screenScanDevice: {
		screen: DeviceScanScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header: null
		}
	},
	screenGraphDevice: {
		screen: DeviceGraphScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header: null
		}
	},
	screenDevice: {
		screen: SavedDeviceScreen,
		navigationOptions: {
			gesturesEnabled: false,
			header: null
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
	}
});
			
export const Tabs = TabNavigator({
    screenHome: {
		screen: HomeScreenNavigator,
		navigationOptions: {
			gesturesEnabled: false,
			tabBarLabel: "Home",
			header: null

		}
	},
	screenDevice: {
		screen: DeviceScreenNavigator,
		navigationOptions: {
			gesturesEnabled: false,
			tabBarLabel: "Devices",
			header: null
		}
	},
	screenGames: {
		screen: Games,
		navigationOptions: {
			gesturesEnabled: false,
			tabBarLabel: "Games",
			header: null
		}
	}
},{
	tabBarPosition: 'bottom'
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
	}
});

export default navigator;