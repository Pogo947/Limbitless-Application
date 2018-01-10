import { AppRegistry, Dimensions,Platform, StyleSheet } from 'react-native';

//import App from './App';
import {DrawerNavigator} from 'react-navigation';

//components
import HeaderComponent from './components/HeaderComponent';

//Screens
import {Home, Settings, Game} from './screenNames';
import HomeScreen from './screen/HomeScreen';
import SettingScreen from './screen/SettingScreen';
import GameScreen from './screen/GameScreen';

var {height, width} = Dimensions.get('window');

let routeConfigs = {
    Home : {
        screen: HomeScreen,
    },
    Settings: {
        screen: SettingScreen,
    },
    Game: {
        screen: GameScreen,
    }

};
let drawerNavigatorConfig = {
    initialRouteName: Home, 
    drawerWidth: width*3 / 5,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'white',
    contentOptions: {
        activeTintColor: 'blue',
    }
};

const App = DrawerNavigator(routeConfigs, drawerNavigatorConfig);

AppRegistry.registerComponent('LimbMobApp', () => App);
