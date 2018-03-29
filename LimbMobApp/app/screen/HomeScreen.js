import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';
import {logout} from "../Navigation/Actions/actionCreator";
import {connect} from "react-redux"
import { NavigationActions } from "react-navigation";

class HomeScreenView extends Component {
    static navigationOptions = {
		title: "HomeScreen"
	};
	navigate2 = () => {
		const navigateToLevel = NavigationActions.navigate({
			routeName: "screenLevel",
			params: {}
		});
		this.props.navigation.dispatch(navigateToLevel);
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
        <Image style = {styles.avatar} source={require('../resources/testAvatar.png')}/>
		</TouchableHighlight>
        <Text style = {styles.titleText}>
             NAME HERE
        </Text>
		<TouchableHighlight onPress={this.navigate2}>
        <Text style = {styles.titleText}>
             LEVEL HERE
        </Text>
		</TouchableHighlight>
        <Text style = {styles.titleText}>
             NICKNAME HERE
        </Text>

       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    titleText: {
        fontWeight : 'bold',
        fontSize: 22, 
        color: 'blue'
    }, 
    avatar:{
        height:256,
        width: 256,
        borderRadius: 64, 
    },

  });

  
const HomeScreen = connect(null, null)(HomeScreenView)

export default HomeScreen;
  