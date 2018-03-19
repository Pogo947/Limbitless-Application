import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Alert, Button } from 'react-native';


export default class AddDeviceScreen extends Component {

    state = {buttonColorArm: '#00acea', buttonColorBand: '#00acea', buttonColorHead: '#00acea', 
              buttonColorWheel: '#00acea', selectedArm: "false", selectedBand: "false", selectedHead: "false", selectedWheel: "false",device: ""}
    confirmDevice(){

    }
    selectToAddNewArm(){
      if(this.state.selectedArm == "false"){
      this.setState({buttonColorArm: "black", selectedArm: "true", device: "arm"})
      }

      if(this.state.selectedArm == "true"){
      this.setState({buttonColorArm: "#00acea", selectedArm: "false", device: "" })
      }
    }
    selectToAddNewBand(){
      if(this.state.selectedBand == "false"){
        this.setState({buttonColorBand: "black", selectedBand: "true", device: "band"})
        }
  
        if(this.state.selectedBand == "true"){
        this.setState({buttonColorBand: "#00acea", selectedBand: "false", device: "" })
        }
    }
    selectToAddNewWheel(){
      if(this.state.selectedWheel == "false"){
        this.setState({buttonColorWheel: "black", selectedWheel: "true", device: "wheel"})
        }
  
        if(this.state.selectedWheel == "true"){
        this.setState({buttonColorWheel: "#00acea", selectedWheel: "false" , device: ""})
        }
    }
    selectToAddNewHead(){
      if(this.state.selectedHead == "false"){
        this.setState({buttonColorHead: "black", selectedHead: "true", device: "head"})
        }
  
        if(this.state.selectedHead == "true"){
        this.setState({buttonColorHead: "#00acea", selectedHead: "false", device: "" })
        }
    }

    render(){

        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
          SELECT TO ADD DEVICES
        </Text>

          <View style = {{flexDirection: 'row'}}>
          <TouchableHighlight style={[styles.touchableIcon, { backgroundColor: this.state.buttonColorArm}]}
              onPress={() => this.selectToAddNewArm()} >
              <Image style={{height: 100, width:100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/deviceIcons/armIcon.png')} />
          </TouchableHighlight>

          <TouchableHighlight style={[styles.touchableIcon, { backgroundColor: this.state.buttonColorBand}]}
            onPress={() => this.selectToAddNewBand()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/deviceIcons/bandIcon.png')} />
          </TouchableHighlight>
          </View>

          <View style = {{flexDirection: 'row'}}>
          <TouchableHighlight style={[styles.touchableIcon, { backgroundColor: this.state.buttonColorWheel}]}  
            onPress={() => this.selectToAddNewWheel()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/deviceIcons/wheelIcon.png')} />
          </TouchableHighlight>

          <TouchableHighlight style={[styles.touchableIcon, { backgroundColor: this.state.buttonColorHead}]}
            onPress={() => this.selectToAddNewHead()}>
              <Image style={{height: 100, width: 100, margin: 10, borderRadius: 5, borderWidth: 5}} source={require('../resources/deviceIcons/headIcon.png')} />
          </TouchableHighlight>
          </View> 
          <Button onPress={this.confirmDevice.bind(this)} title="Confirm" />
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
    touchableIcon: {
        margin: 10, 
        borderRadius: 5, 
        borderWidth: 5, 
    }
  });
  