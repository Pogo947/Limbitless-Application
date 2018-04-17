import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableOpacity, Image, Slider, AsyncStorage, Button } from 'react-native';
import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation';

export default class EmgScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            emgVal: 0,
            val1: 0,
            val2: 0,
            val3: 0,
            val4: 0,
            softwareThreshold: [0,0,0,0],
            user: null,
            devicesData: null,
            currentData: "",
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

            let emgVal = currentData.emg
            let threshold = currentData.thresholds
            
            this.setState({
                user: userData, devicesData: deviceData, currentData: currentData, emgVal: emgVal, 
                val1: threshold[0],val2: threshold[1],val3: threshold[2],val4: threshold[3] });

        }
        catch(error) {
            alert(error);
        }
    }

    updateEMGval = (emgVal) => {
        this.setState({emgVal: emgVal})
    }

    updateThreshold1 = (val1) => {

        var roundVal1 = parseFloat(val1.toFixed(2))

        this.setState({val1:roundVal1 })
    }

    updateThreshold2 = (val2) => {

        var roundVal2 = parseFloat(val2.toFixed(2))

        this.setState({val2:roundVal2 })
    }

    updateThreshold3 = (val3) => {

        var roundVal3 = parseFloat(val3.toFixed(2))

        this.setState({val3:roundVal3 })
    }

    updateThreshold4 = (val4) => {

        var roundVal4 = parseFloat(val4.toFixed(2))

        this.setState({val4:roundVal4 })
    }

    saveSettings(){
        let devices = this.state.devicesData
        let currentDevice = this.state.currentData
        let index = devices.findIndex(device => device.name === currentDevice.name);
        let threshold = this.state.softwareThreshold

        threshold[0] = this.state.val1
        threshold[1] = this.state.val2
        threshold[2] = this.state.val3
        threshold[3] = this.state.val4

        devices[index].emg = this.state.emgVal
        devices[index].thresholds = threshold

        firebase.database().ref().child("users").child(this.state.user.uid)
            .child("devices").child("savedDevices").child(index).child("emg").set(this.state.emgVal)

        firebase.database().ref().child("users").child(this.state.user.uid)
            .child("devices").child("savedDevices").child(index).child("thresholds").set(threshold)

        AsyncStorage.setItem('savedDevices', JSON.stringify(devices))

        this.navigateToSavedDevice()
        
    }

    render(){


        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
           EMG SERVICES
        </Text>

        <Text style = {styles.textStyle}> Current Device : {this.state.currentData.name} </Text>

        <View style = {{width: 350, justifyContent: 'center', paddingTop: 30}}>
            <Text style = {styles.textStyle}> EMG Gain: {this.state.emgVal}</Text>
            <Slider
                step = {1}
                maximumValue={100}
                onValueChange = {this.updateEMGval}
                value={this.state.emgVal}
            />
        </View>
        <Text style = {styles.textStyle}> Software Thresholds: [{this.state.val1}, {this.state.val2}, {this.state.val3}, {this.state.val4}]</Text>
            
            <View style = {{flexDirection: 'row', paddingBottom: 50}}>
                <Slider
                    style = {styles.slider}
                    step = {0.1}
                    maximumValue={0.8}
                    onValueChange = {this.updateThreshold1}
                    value={this.state.val1}
                />
                <Slider
                    style = {styles.slider}
                    step = {0.1}
                    minimumValue= {0.9}
                    maximumValue={1.6}
                    onValueChange = {this.updateThreshold2}
                    value={this.state.val2}
                />
                <Slider
                    style = {styles.slider}
                    step = {0.1}
                    minimumValue= {1.7}
                    maximumValue={2.4}
                    onValueChange = {this.updateThreshold3}
                    value={this.state.val3}
                />
                <Slider
                    style = {styles.slider}
                    step = {0.1}
                    minimumValue= {2.4}
                    maximumValue={3.3}
                    onValueChange = {this.updateThreshold4}
                    value={this.state.val4}
                />
            </View>
            
            <TouchableOpacity onPress={() => this.saveSettings()}> 
                <View style={{backgroundColor: '#06a7e2' , padding: 20}}>
                    <Text style = {styles.buttonText}> Update Settings </Text>
                </View>
            </TouchableOpacity>

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
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },
    slider: {
        width: 100,
        marginHorizontal: -10,
    },
    textStyle: {
        fontFamily : "Klavika-Regular",
        fontSize: 20,
        margin: 5,
        color: 'black',
        textAlign: 'center'
      },
    buttonText: {
        fontFamily : "MuseoSans",
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
      },
  });
  