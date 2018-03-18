import { AppRegistry, Dimensions,Platform, StyleSheet } from 'react-native';

import App from './App';
import Login from './app/screen/LoginScreen/Login'
import DeviceScreen from './app/screen/DeviceScreen'
import Profile from './app/screen/ProfileScreen/Profile'
import Games from './app/screen/GameScreen/Games'
import LevelScreen from './app/screen/LevelScreen'

AppRegistry.registerComponent('LimbMobApp', () => LevelScreen);
