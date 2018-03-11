import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';

export default class LoadingScreen extends Component {
    
    render(){

        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.loadingText}>
           Loading
        </Text>

       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4F6D7A',
      },
    loadingText: {
        fontWeight : 'bold',
        fontSize: 22, 
        color: 'white'
    }
  });
  