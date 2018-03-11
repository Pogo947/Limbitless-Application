import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';

export default class GameScreen extends Component {
    
    render(){

        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
           GAMES
        </Text>

       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    titleText: {
        fontWeight : 'bold',
        fontSize: 22, 
        color: 'blue'
    }
  });
  