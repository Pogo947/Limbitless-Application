import React, { Component } from 'react';
import {Platform, StyleSheet, ActivityIndicator, Text,  View, TouchableOpacity, Image, AsyncStorage, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import AvatarComponent from '../components/AvatarComponent'
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
            emailVerified : true,
            uid : "",  
        },
        };
      }

    fetchDataLocal = async ()=> {
        try{
            let userData = await AsyncStorage.getItem('userData');
            
            userData = JSON.parse(userData)

            this.setState({
                user: userData});

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

        <View style = {{alignItems: 'center'}}>
            <Text style = {styles.titleText}>
            HOME 
            </Text>
        </View>
        <View>
        <TouchableOpacity onPress={this.navigate}>
            <View style = {{justifyContent: 'center'}}>
                <AvatarComponent/>
            </View>
		</TouchableOpacity>

        <View style = {{ alignItems: 'center', justifyContent: 'center'}}> 
            <Text style = {styles.titleText}>
                WELCOME!
            </Text>
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
        flex: 1,
     
      },
    titleText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },
    avatar:{
        height:256,
        width: 256,
        borderRadius: 64, 
    },

  });

  
const HomeScreen = connect(null, null)(HomeScreenView)

export default HomeScreen;
  