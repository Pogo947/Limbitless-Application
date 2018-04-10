import React, { Component } from 'react';
import {Platform, StyleSheet, KeyboardAvoidingView, Text,  View, ImageBackground, Keyboard, Dimensions, TouchableWithoutFeedback} from 'react-native';
import firebase from 'react-native-firebase';
import LoginForm from './LoginForm'
import {connect} from "react-redux";
import { NavigationActions } from "react-navigation"

class LoginView extends Component  {
	    static navigationOptions = {
		title: "Login"
	};
   render(){

       return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <ImageBackground 
                style={styles.BGImage} 
                imageStyle ={{resizeMode: 'cover'}}
                source={require('../../resources/background/LoginBackground_Dark.png')}> 

                <LoginForm />

             </ImageBackground>
           </KeyboardAvoidingView>
           </TouchableWithoutFeedback>
        )
   }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.9)',
      },
    BGImage:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
  });
  
  const Login = connect(null, null)(LoginView);
  
  export default Login;