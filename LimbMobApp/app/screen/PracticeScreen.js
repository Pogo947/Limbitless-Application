import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';

export default class PracticeScreen extends Component {
    
    render(){

        return(
        <View style={styles.MainContainer}>

        <View style = {{alignItems: 'center'}}>
        <Text style = {styles.titleText}>
           PRACTICE
        </Text>
        </View>

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
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72',
        marginBottom: 20,
    },
  });
  