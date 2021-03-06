import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, ActivityIndicator } from 'react-native';

export default class Splash extends Component {
    
    render(){

        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.loadingText}>
           
        </Text>
        

        <ActivityIndicator size={100} color='white' style= {styles.loading} />

        <Text style = {styles.loadingText}>
            Please Wait...
        </Text>

       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00acea',
      },
    loadingText: {
        fontWeight : 'bold',
        fontSize: 30, 
        color: 'white'
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
     }
  });
  