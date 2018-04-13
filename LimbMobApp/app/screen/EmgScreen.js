import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Slider, AsyncStorage, Button } from 'react-native';
import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation';

export default class EmgScreen extends Component {
    constructor(){
        super()
        this.state = {
            value1: 0,
            value2: 0,
            user: null,
            devicesData: null,
            currentData: null,
        }
    }

    async componentWillMount(){
        this.fetchData().done()
    }

    navigateToSavedDevice = () => {
        const navigateToSavedDevice = NavigationActions.navigate({
          routeName: "screenDevice",
          params: {}
        });
        this.props.navigation.dispatch(navigateToSavedDevice);
      };

    fetchData = async ()=> {

        try{
            let userData = await AsyncStorage.getItem('userData');
            let deviceData = await AsyncStorage.getItem('savedDevices');
            let currentData = await AsyncStorage.getItem('currentDevice')

            userData = JSON.parse(userData)
            deviceData = JSON.parse(deviceData)
            currentData = JSON.parse(currentData)

            let value1 = currentData.emg
            
            this.setState({
                user: userData, devicesData: deviceData, currentData: currentData, value1: value1});

        }
        catch(error) {
            alert(error);
        }
    }

    updateValue1 = (value1) => {
        this.setState({value1: value1})
    }

    updateValue2 = (value2) => {
        this.setState({value2: value2})
    }
    saveSettings(){
        let devices = this.state.devicesData
        let currentDevice = this.state.currentData
        let index = devices.findIndex(device => device.name === currentDevice.name);

        devices[index].emg = this.state.value1

        firebase.database().ref().child("users").child(this.state.user.uid)
            .child("devices").child("savedDevices").child(index).child("emg").set(this.state.value1)

        AsyncStorage.setItem('savedDevices', JSON.stringify(devices))

        this.navigateToSavedDevice()
        
    }

    render(){


        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
           EMG SERVICES
        </Text>

        <View style = {{flex: 1, width: 350, justifyContent: 'center',}}>
            <Text style = {{marginLeft: 10}}> EMG Gain: {this.state.value1}</Text>
            <Slider
                step = {1}
                maximumValue={100}
                onValueChange = {this.updateValue1}
                value={this.state.value1}
            />
            <Text style = {{marginLeft: 10}}> EMG Gain Two: {this.state.value2}</Text>
            <Slider
                step = {1}
                maximumValue={100}
                onValueChange = {this.updateValue2}
                value={this.state.value2}
            />
            <Button onPress={() => this.saveSettings()} title="Save Settings" />   
        </View>

        
        </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
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
  