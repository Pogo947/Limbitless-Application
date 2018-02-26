import React, { Component } from 'react';
import {Platform, StyleSheet, KeyboardAvoidingView, Text,  View, ImageBackground, Dimensions} from 'react-native';
import firebase from 'react-native-firebase';
import LoginForm from './LoginForm'

export default class Login extends Component  {

   render(){

       return(

        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <ImageBackground 
                style={styles.BGImage} 
                imageStyle ={{resizeMode: 'cover'}}
                source={require('../../resources/background/LoginBackground_Dark.png')}> 

                <LoginForm />

             </ImageBackground>
           </KeyboardAvoidingView>
        )
   }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.9)',
      },
    BGImage:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
  });