import React, { Component } from 'react';
import {Platform, StyleSheet, ActivityIndicator, Text,  View, Dimensions, TouchableOpacity, Image, AsyncStorage, Alert, Button, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
import {logout} from "../Navigation/Actions/actionCreator";
import {connect} from "react-redux"
import { NavigationActions } from "react-navigation";
import AvatarComponent from '../components/AvatarComponent'

const width1 = Dimensions.get('window').width
const height1 = Dimensions.get('window').height
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

    fetchDataLocal = async ()=> {
        try{
            let userData = await AsyncStorage.getItem('userData');

            userData = JSON.parse(userData)

            this.setState({user: userData,});

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
		<ImageBackground style={styles.BGImage} source={require("../resources/background/BackgroundOther.png")}>
        
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
        <AvatarComponent/>
        <View style = {{ alignItems: 'center', justifyContent: 'center'}}> 

            <Text style = {styles.titleText}>
                {this.state.user.name} 
            </Text>
        </View>
        </View>
       </View>
	   </ImageBackground>
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
	BGImage:{
        width: width1,
        height: height1,
    },
    titleText: {
        marginTop: 50,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },


  });

  
const HomeScreen = connect(null, null)(HomeScreenView)

export default HomeScreen;
  