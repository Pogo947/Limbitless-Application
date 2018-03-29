import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Slider } from 'react-native';

export default class EmgScreen extends Component {
    
    state = {value1 : 0, value2 : 0}

    updateValue1 = (value1) => {
        this.setState({value1: value1})
    }

    updateValue2 = (value2) => {
        this.setState({value2: value2})
    }

    render(){


        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
           EMG SERVICES
        </Text>
        <View style = {{flex: 1, width: 350, justifyContent: 'center'}}>
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
  