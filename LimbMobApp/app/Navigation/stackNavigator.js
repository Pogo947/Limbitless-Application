import { TabNavigator, StackNavigator, TabView } from 'react-navigation'
import Login from '../screen/LoginScreen/Login.js'
import Home from '../screen/HomeScreen.js'
import DeviceScreen from '../screen/DeviceScreen.js'
import Games from '../screen/GameScreen/Games.js'
import Profile from '../screen/ProfileScreen/Profile.js'


// Manifest of possible screens
export const Tabs = TabNavigator({
    screenHome: {
		screen: Home,
		navigationOptions: {
			tabBarLabel: "Home",
			header: null

		}
	},
	screenDevice: {
		screen: DeviceScreen,
		navigationOptions: {
			tabBarLabel: "Devices",
			header: null
		}
	},
	screenGames: {
		screen: Games,
		navigationOptions: {
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