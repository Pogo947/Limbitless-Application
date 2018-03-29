import { AppRegistry, Dimensions,Platform, StyleSheet } from 'react-native';

import App from './App';
import Login from './app/screen/LoginScreen/Login'
import DeviceScreen from './app/screen/DeviceScreen'
import AddDeviceScreen from './app/screen/AddDeviceScreen'
import Profile from './app/screen/ProfileScreen/Profile'
import Games from './app/screen/GameScreen/Games'
import LevelScreen from './app/screen/LevelScreen'
import Signup from './app/screen/SignupScreen/Signup'
import LoadingScreen from './app/screen/LoadingScreen'
import WheelChairScreen from "./app/screen/WheelChairScreen"

AppRegistry.registerComponent('LimbMobApp', () => App);
