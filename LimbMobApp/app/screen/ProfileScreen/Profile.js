import React, { Component } from 'react';
import {Platform, StyleSheet, KeyboardAvoidingView, Text,  View, ImageBackground, Dimensions, Image} from 'react-native';
import firebase from 'react-native-firebase';
import ProfileForm from './ProfileForm'
import AvatarComponent from '../../components/AvatarComponent'
import styles from '../../common/styles'

export default class Profile extends Component  {

   render(){

       return(

        <KeyboardAvoidingView behavior="padding" style={styles.MainContainer}>
            
            <ImageBackground 
            
                style={BGsize.BGImage} 
                imageStyle ={{resizeMode: 'cover'}}
                source={require('../../resources/background/Background.png')}> 
                
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
const BGsize = {

    BGImage:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
}