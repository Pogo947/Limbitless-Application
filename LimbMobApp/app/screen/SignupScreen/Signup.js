import React, { Component } from 'react';
import {Platform, StyleSheet, KeyboardAvoidingView, Text,  View, ImageBackground, Dimensions, Image} from 'react-native';
import firebase from 'react-native-firebase';
import SignupForm from './SignupForm'

export default class Signup extends Component  {

   render(){

       return(

        <KeyboardAvoidingView style={styles.MainContainer}>
            
            <ImageBackground 
            
                style={styles.BGImage} 
                imageStyle ={{resizeMode: 'cover'}}
                source={require('../../resources/background/LoginBackground_Dark.png')}> 
                
                <SignupForm />

             </ImageBackground>

           </KeyboardAvoidingView>
        )
   }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    BGImage:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }, 
    titleText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight : 'bold',
        fontSize: 22, 
        color: '#0b2c60'
    }
  });