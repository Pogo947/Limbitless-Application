import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Alert, Button, AsyncStorage } from 'react-native';
import prompt from 'react-native-prompt-android';
import firebase from 'react-native-firebase';
import {connect} from "react-redux"
import { NavigationActions } from "react-navigation";

export default class AddDeviceScreen extends Component {

    constructor(){
      super()
        this.state = {
          selectedColor: '#00acea',
          type: "", 
          loading: false, 
          user: null,
          accessCode: "",
          deviceData: null,
         }
    }

    navigate = () => {
      const navigateToDevice = NavigationActions.navigate({
        routeName: "screenDevice",
        params: {}
      });
      this.props.navigation.dispatch(navigateToDevice);
    };

    fetchDataLocal = async ()=> {
      try{

          let userData = await AsyncStorage.getItem('userData');
          
          userData = JSON.parse(userData)

          this.setState({
              user: userData, loading: false});
      }
      catch(error) {
          alert(error);
      }
    }

    fetchDatabase = async (code)=> {
      try{

        await firebase.database().ref().child("users").child(this.state.user.uid).child("devices")
        .child("connectedDevices").on("value", snapshot => {
          this.setState({deviceData: snapshot.val(), accessCode: code})
          })
      }
      catch(error) {
          alert(error);
      }
    }

    async componentWillMount(){
      this.fetchDataLocal()
    }

    confirmDevicePrompt(){

      prompt(
        'Enter Access code',
        '',
        [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'OK', onPress: code => this.confirmCode(code)},
        ],
        {   
            cancelable: true,
            defaultValue: this.state.accessCode,
            placeholder: 'a2b4c6'
        }
      )

    }

    async confirmCode(code){
      this.fetchDatabase(code).done()
    }

    async createDevice(){
      var connectedDevices = this.state.deviceData 

      if(!connectedDevices){
        let connectedDevices = [{
          name: this.state.type + '' + this.state.accessCode,
          code: this.state.accessCode,
          type: this.state.type,
          emg: 0,
          thresholds: [0,0,0,0]
        }]
        firebase.database().ref().child("users").child(this.state.user.uid).child("devices").set({connectedDevices})
      }
      else{
        let addDevice = {
          name: this.state.type + '' + this.state.accessCode,
          code: this.state.accessCode,
          type: this.state.type,
          emg: 0,
          thresholds: [0,0,0,0]
        }

        connectedDevices.push(addDevice)

        var userID = this.state.user.uid

        firebase.database().ref().child("users").child(this.state.user.uid).child("devices").set({connectedDevices})
      } 
      //AsyncStorage.setItem('@devices', JSON.stringify(device))
      this.navigate();
    }

    selectToAddNewArm(){
      if(this.state.type == "arm"){
        this.setState({type: ""})
      }
      else{
        this.setState({type: "arm"})
      }
    }
    selectToAddNewBand(){
      if(this.state.type == "band"){
        this.setState({type: ""})
        }
        else{
          this.setState({type: "band"})
        }
    }
    selectToAddNewWheel(){
      if(this.state.type == "wheel"){
        this.setState({type: ""})
        }
        else{
          this.setState({type: "wheel"})
        }
    }
    selectToAddNewHead(){
      if(this.state.type == "head"){
        this.setState({type: ""})
        }
        else{
          this.setState({type: "head"})
        }
    }

    render(){

        return(
        <View style={styles.MainContainer}>
        
        <View style = {{alignItems: 'center'}}>
        <Text style = {styles.titleText}>
           SELECT TO ADD DEVICE
        </Text>
        </View>
          <View style = {{flexDirection: 'row'}}>
          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, { backgroundColor:this.state.type == "arm" ? this.state.selectedColor : "white"}] }
              onPress={() => this.selectToAddNewArm()} >
              <Image style={{height: 100, width:100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/armIcon.png')} />
          </TouchableHighlight>

          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, {backgroundColor:this.state.type == "band" ? this.state.selectedColor : "white"}]}
            onPress={() => this.selectToAddNewBand()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/bandIcon.png')} />
          </TouchableHighlight>
          </View>

          <View style = {{flexDirection: 'row'}}>
          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, { backgroundColor:this.state.type == "wheel" ? this.state.selectedColor : "white"}]}  
            onPress={() => this.selectToAddNewWheel()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/wheelIcon.png')} />
          </TouchableHighlight>

          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, { backgroundColor:this.state.type == "head" ? this.state.selectedColor : "white"}]}
            onPress={() => this.selectToAddNewHead()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/headIcon.png')} />
          </TouchableHighlight>
          </View> 
          <Button onPress={this.confirmDevicePrompt.bind(this)} title="Confirm Access Code" />
          <Button onPress={this.createDevice.bind(this)} title = "Add Device" />
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
    },
    touchableIcon: {
        margin: 10, 
        borderRadius: 5, 
        borderWidth: 5
    }
  });
  