import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class DeviceScreen extends Component {
    navigate = () => {
		const navigateToAddDevice = NavigationActions.navigate({
			routeName: "screenAddDevice",
			params: {}
		});
		this.props.navigation.dispatch(navigateToAddDevice);
	};
    render(){

        return(
        <View style={styles.MainContainer}>
		<TouchableHighlight onPress={this.navigate}>
        <Text style = {styles.titleText}>
           DEVICES
        </Text>
		</TouchableHighlight>
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
        color: '#0b2959'
    }
  });
  