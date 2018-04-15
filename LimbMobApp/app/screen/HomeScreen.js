import React, { Component } from 'react';
import {Platform, StyleSheet, ActivityIndicator, Text,  View, TouchableOpacity, Image, AsyncStorage, Alert, Button } from 'react-native';
import firebase from 'react-native-firebase';
import {logout} from "../Navigation/Actions/actionCreator";
import {connect} from "react-redux"
import { NavigationActions } from "react-navigation";

class HomeScreenView extends Component {
    constructor() {
        super();
        this.state = {
          user: {
            name : "",
            email : "",
            photoUrl : "",
            emailVerified : "",
            uid : "",  
        },
        uploadURL: ""
        };
      }

    checkUploadURL(){
        if(this.state.uploadURL == "" || this.state.uploadURL == null){
            return (require('../resources/testAvatar.png'))
        }
        else
            return ({uri: this.state.uploadURL})
    }
    fetchDataLocal = async ()=> {
        try{
            let userData = await AsyncStorage.getItem('userData');
            let uploadURL = await AsyncStorage.getItem('uploadURL');

            userData = JSON.parse(userData)

            this.setState({user: userData, uploadURL: uploadURL });

            firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                      // User is signed in.
                    } else {
                      // No user is signed in.
                    }
                });
        }
        catch(error) {
            alert(error);
        }
    }

    async componentWillMount(){

        this.fetchDataLocal().done()
        
    }

    static navigationOptions = {
		title: "HomeScreen"
    };

	navigate = () => {
		const navigateToProfile = NavigationActions.navigate({
			routeName: "Profile",
			params: {}
		});
		this.props.navigation.dispatch(navigateToProfile);
	};
    render(){
        return(
        
        <View style={styles.MainContainer}>
		<View style={styles.ProfileButtonStyle}>
            <TouchableOpacity onPress={this.navigate}>
                <Image style = {{width: 70, height: 70}}source = {require("../resources/tab_icons/Settings_Button_Topleft.png")}/> 
            </TouchableOpacity>
		</View>
        <View style = {{alignItems: 'center'}}>
            <Text style = {styles.titleText}>
            WELCOME!
            </Text>
        </View>
        <View>
        <TouchableOpacity onPress={this.navigate}>
            <View style= {{alignItems: 'center',justifyContent: 'center',}}>
            <Image
                style ={{height:128, width: 128, borderRadius: 128/2, borderColor:'#0b2c60', 
                        borderWidth: 4}}
                source={this.checkUploadURL()}/>
            </View>
		</TouchableOpacity>

        <View style = {{ alignItems: 'center', justifyContent: 'center'}}> 

            <Text style = {styles.titleText}>
                {this.state.user.name} 
            </Text>
        </View>
        </View>
       </View>
    )}
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1
     
      },
	ProfileButtonStyle: {
		alignSelf: 'flex-start',
		position: 'absolute',
		top: 0
	},
    titleText: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },


  });

  
const HomeScreen = connect(null, null)(HomeScreenView)

export default HomeScreen;
  