import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import AppNavigation from "./app/Navigation";
import configureStore from "./store";
import Splash from './Splash'
const { store, persistor } = configureStore();


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Splash/>} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}