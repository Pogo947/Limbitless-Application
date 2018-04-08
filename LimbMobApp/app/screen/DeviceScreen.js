import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Button } from 'react-native';
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
        <View>
		<TouchableHighlight onPress={this.navigate}>
        <Text style = {styles.titleText}>
           DEVICES
        </Text>
		</TouchableHighlight>
        </View>
        <View>
        <Button onPress={this.navigate} title="Save Current Level" />
        </View> 
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
        alignItems: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    }
  });
  