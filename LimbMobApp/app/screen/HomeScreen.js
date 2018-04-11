import React, { Component } from 'react';
import {Platform, StyleSheet, ActivityIndicator, Text,  View, TouchableHighlight, Image, AsyncStorage, Alert } from 'react-native';
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

    fetchData = async ()=> {
        try{
            let userData = await AsyncStorage.getItem('userData');
            
            userData = JSON.parse(userData)

            this.setState({
                user: userData});
        }
        catch(error) {
            alert(error);
        }
    }

    async componentWillMount(){

        this.fetchData().done()
        
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
        <TouchableHighlight onPress={this.navigate}>
            <View>
                <AvatarComponent/>
            </View>
		</TouchableHighlight>
        <Text style = {styles.titleText}>
           WELCOME 
        </Text>
        <Text style = {styles.titleText}>
           {this.state.user.name}
        </Text>
		<TouchableHighlight onPress={this.navigate2}>
        <Text style = {styles.titleText}>
             Navigate to Level
        </Text>
		</TouchableHighlight>
       </View>
    )}
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    titleText: {
        alignItems: 'center',
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
  