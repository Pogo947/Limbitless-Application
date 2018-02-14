/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import firebase from 'react-native-firebase';

const test ="haha"


export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  /*
  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then(() => {
        this.setState({
          isAuthenticated: true,
        });
      });
  }
  */

  render() {

    if (!this.state.isAuthenticated) {
      test = "not logged in"
      //return null;
    }
    if (this.state.isAuthenticated){
      test= "logged in "
    }


    return (
      <View style={styles.container}>
      <Text style= {{fontWeight : 'bold', fontSize: 22, color: 'black'}}
           onPress={() => {
            firebase.auth().signInAnonymouslyAndRetrieveData()
            .then(() => {
              this.setState({
                isAuthenticated: true,
              });
            });
               }}>
              LOGIN </Text>
        <Text style={styles.welcome}>
          {test}
        </Text>
        <Text style={styles.instructions}>
          Hello to your own hell
        </Text>

        <Text style= {{fontWeight : 'bold', fontSize: 22, color: 'black'}}
          onPress={() => {
            firebase.auth().signOut()
            .then(() => {
              this.setState({
                isAuthenticated: false,
              });
            });
               }}>
              LOGOUT </Text>

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
