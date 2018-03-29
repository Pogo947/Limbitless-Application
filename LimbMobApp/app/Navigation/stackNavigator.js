import { TabNavigator, StackNavigator, TabView } from 'react-navigation'
import Login from '../screen/LoginScreen/Login.js'
import Home from '../screen/HomeScreen.js'
import DeviceScreen from '../screen/DeviceScreen.js'
import Games from '../screen/GameScreen/Games.js'
import Profile from '../screen/ProfileScreen/Profile.js'
import LevelScreen from '../screen/LevelScreen.js'


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
			header: null
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
		screen: DeviceScreen,
		navigationOptions: {
			gesturesEnabled: false,
			tabBarLabel: "Devices",
			header: null
		}
	},
	screenLevel: {
		screen: LevelScreen,
		navigationOptions: {
			gesturesEnabled: false,
			tabBarLabel: "Level",
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