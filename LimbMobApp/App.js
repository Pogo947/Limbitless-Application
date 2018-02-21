import React, { Component } from 'react';
import {
  Platform,StyleSheet, Text, View, Button, Alert
} from 'react-native';

import firebase from 'react-native-firebase';
import Login from './app/screen/LoginScreen/Login.js'

const test ="haha"
const count = 0

export default class App extends Component<{}> {

  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }

  onLogoutPress() {
    firebase.auth().signOut()
        .then(() => {Alert.alert('You have signed out') })
        .catch(() => {
          Alert.alert('Failed to sign out')
        });
  }

  componentDidMount() {
    if(this.state.user == null){
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user
      });
    
      count = count + 1
    });
  }
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {

    if (this.state.user == null) {
      return <Login />
     test = "User not active"
    }

    if (!this.state.user == null){
      test= "user active"
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {test} User state has changed: {count} times
        </Text>
        <Text style={styles.instructions}>
          Hello to your own hell  
        </Text>
        <Text style={styles.instructions}>
          {this.state.user.email}
        </Text>
         <Button onPress={this.onLogoutPress.bind(this)} title="Log Out" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
