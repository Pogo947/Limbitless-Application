import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';

export default class HomeScreen extends Component {
    
    render(){

        return(
        <View style={styles.MainContainer}>
            
        <Image style = {styles.avatar} source={require('../resources/testAvatar.png')}/>

        <Text style = {styles.titleText}>
             NAME HERE
        </Text>
        <Text style = {styles.titleText}>
             LEVEL HERE
        </Text>
        <Text style = {styles.titleText}>
             NICKNAME HERE
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
    }, 
    avatar:{
        height:256,
        width: 256,
        borderRadius: 64, 
    },

  });
  