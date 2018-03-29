import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';

export default class PatternScreen extends Component {
    
    render(){

        return(
        <View style={styles.MainContainer}>

        <View style = {{alignItems: 'center'}}>
        <Text style = {styles.titleText}>
           PATTERNS
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
        alignItems: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    }
  });
  