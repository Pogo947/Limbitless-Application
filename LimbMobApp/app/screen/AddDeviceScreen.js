import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Alert, Button } from 'react-native';
import LoadingScreen from './LoadingScreen'


export default class AddDeviceScreen extends Component {

    constructor(){
      super()
        this.state = {selectedColor: '#00acea', device: "", loading: "false"}
    }

    confirmDevice(){

      this.setState({loading:"true"})
      
    }
    loadingAnim(){
      return <LoadingScreen/>
    }
    selectToAddNewArm(){
      if(this.state.selectedArm == "arm"){
        this.setState({device: ""})
      }
      else{
        this.setState({device: "arm"})
      }
    }
    selectToAddNewBand(){
      if(this.state.selectedArm == "band"){
        this.setState({device: ""})
        }
        else{
          this.setState({device: "band"})
        }
    }
    selectToAddNewWheel(){
      if(this.state.selectedArm == "wheel"){
        this.setState({device: ""})
        }
        else{
          this.setState({device: "wheel"})
        }
    }
    selectToAddNewHead(){
      if(this.state.selectedArm == "head"){
        this.setState({device: ""})
        }
        else{
          this.setState({device: "head"})
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
          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, { backgroundColor:this.state.device == "arm" ? this.state.selectedColor : "white"}] }
              onPress={() => this.selectToAddNewArm()} >
              <Image style={{height: 100, width:100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/armIcon.png')} />
          </TouchableHighlight>

          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, {backgroundColor:this.state.device == "band" ? this.state.selectedColor : "white"}]}
            onPress={() => this.selectToAddNewBand()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/bandIcon.png')} />
          </TouchableHighlight>
          </View>

          <View style = {{flexDirection: 'row'}}>
          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, { backgroundColor:this.state.device == "wheel" ? this.state.selectedColor : "white"}]}  
            onPress={() => this.selectToAddNewWheel()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/wheelIcon.png')} />
          </TouchableHighlight>

          <TouchableHighlight underlayColor = {'#8DD0F0'} style={[styles.touchableIcon, { backgroundColor:this.state.device == "head" ? this.state.selectedColor : "white"}]}
            onPress={() => this.selectToAddNewHead()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/device_icons/headIcon.png')} />
          </TouchableHighlight>
          </View> 
          {this.state.loading == "false" ? <Button onPress={this.confirmDevice.bind(this)} title="Confirm" /> : this.loadingAnim()}
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
  