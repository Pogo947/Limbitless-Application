import { TabNavigator, StackNavigator, TabView } from 'react-navigation'
import Login from '../screen/LoginScreen/Login.js'
import Home from '../screen/HomeScreen.js'
import DeviceScreen from '../screen/DeviceScreen.js'
import Games from '../screen/GameScreen/Games.js'



// Manifest of possible screens
export const Tabs = StackNavigator({
    screenHome: {
		screen: Home,
		navigationOptions: {
			tabBarLabel: "Home",
			title: "Home"
		}
	},
	screenDevice: {
		screen: DeviceScreen,
		navigationOptions: {
			tabBarLabel: "Devices",
			title: "Devices"
		}
	},
	screenGames: {
		screen: Games,
		navigationOptions: {
			tabBarLabel: "Games",
			title: "Games"
		}
	}
});

const navigator = StackNavigator({
	login: {
		screen: Login
	},
	mainScreens: {
		screen: Tabs,
		navigationOptions: {
			gesturesEnabled: false,
			headerLeft: null
		}
	}
});

export default navigator;