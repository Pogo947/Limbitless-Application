import React, { Component } from 'react';
import {Platform, StyleSheet, KeyboardAvoidingView, Text,  View, ImageBackground, Dimensions, Image, TouchableWithoutFeedback, 
        Keyboard} from 'react-native';
import firebase from 'react-native-firebase';
import ProfileForm from './ProfileForm'
import { NavigationActions, withNavigation } from "react-navigation";
import { connect } from "react-redux";

class ProfileView extends Component  {
	static navigationOptions = {
		title: "Profile"
	};
   render(){
	
       return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView  style={styles.MainContainer}>
            
            <ImageBackground 
            
                style={styles.BGImage} 
                imageStyle ={{resizeMode: 'cover'}}
                source={require('../../resources/background/Background.png')}> 
                <View style = {{alignItems: 'center'}}>
                <Text style = {styles.titleText}>
                PROFILE
                </Text>
                </View>
                <ProfileForm />

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
      },
    BGImage:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }, 
    titleText: {
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72',
        marginBottom: -10,
        
    },
  });
  
  const Profile = connect(null, null)(ProfileView);
  
  export default withNavigation(Profile);