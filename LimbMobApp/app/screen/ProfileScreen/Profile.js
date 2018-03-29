import React, { Component } from 'react';
import {Platform, StyleSheet, KeyboardAvoidingView, Text,  View, ImageBackground, Dimensions, Image} from 'react-native';
import firebase from 'react-native-firebase';
import ProfileForm from './ProfileForm'
import AvatarComponent from '../../components/AvatarComponent'
import { NavigationActions, withNavigation } from "react-navigation";
import { connect } from "react-redux";

class ProfileView extends Component  {
	static navigationOptions = {
		title: "Profile"
	};
   render(){

       return(

        <KeyboardAvoidingView behavior="padding" style={styles.MainContainer}>
            
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
        )
   }
}

/* If background, use this
<ImageBackground 
            
                style={styles.BGImage} 
                imageStyle ={{resizeMode: 'cover'}}
                source={require('../../resources/background/LoginBackground_Dark.png')}> 
                <Text style ={styles.titleText}> Settings </Text>
                <ProfileForm />

             </ImageBackground>
*/

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
    avatar:{
        alignItems: 'center',
        justifyContent: 'center',
        height:128,
        width: 128,
        borderRadius: 64, 
    },
    titleText: {
        alignItems: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72',
        margin: 10
    }
  });
  
  const Profile = connect(null, null)(ProfileView);
  
  export default withNavigation(Profile);