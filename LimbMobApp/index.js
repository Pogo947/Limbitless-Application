import { AppRegistry, Dimensions,Platform, StyleSheet } from 'react-native';

import App from './App';
import Login from './app/screen/LoginScreen/Login'
import Profile from './app/screen/ProfileScreen/Profile'
import Games from './app/screen/GameScreen/Games'
import LevelScreen from './app/screen/LevelScreen'
import Signup from './app/screen/SignupScreen/Signup'
import LoadingScreen from './app/screen/LoadingScreen'
import WheelChairScreen from "./app/screen/WheelChairScreen"
import HomeScreen from './app/screen/HomeScreen';

AppRegistry.registerComponent('LimbMobApp', () => App);
