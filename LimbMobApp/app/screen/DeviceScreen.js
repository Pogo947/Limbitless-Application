import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';

export default class DeviceScreen extends Component {
    
    render(){

        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
           DEVICES
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
        color: '#0b2959'
    }
  });
  