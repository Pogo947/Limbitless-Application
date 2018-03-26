import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';

export default class WheelChairScreen extends Component {
    
    pressStop(){

    }
    pressForward(){

    }
    pressLeft(){

    }

    pressRight(){

    }

    render(){

        return(
        <View style={styles.MainContainer}>
            <View style = {{flex: 1, flexDirection: 'row'}}>
                <Image style={{height: 50, width: 50, margin: 20}} source={require('../resources/wc_img/wheel_battery.png')} />
                <Image style={{height: 250, width: 250, margin: 10, borderRadius: 2, borderWidth: 5}} source={require('../resources/wc_img/wc_both_on.png')} />
                <Image style={{height: 50, width: 50, margin: 20}} source={require('../resources/wc_img/headband_battery.png')} />
            </View> 
            <View style = {{flexDirection: 'row', alignItems: 'center', }}>
                <Image style={{height: 100, width: 100, margin: 10, borderRadius: 2, borderWidth: 5}} source={require('../resources/wc_img/arrow_left.png')} />
                  <View style = {{flexDirection: "column", alignItems: 'center', justifyContent: 'center',}}>
                    <Image style={{height: 100, width: 100}} source={require('../resources/wc_img/arrow_up.png')} />
                    <Image style={{height: 150, width: 180}} source={require('../resources/wc_img/stop.png')} />
                    <Image style={{height: 100, width: 100}} source={require('../resources/wc_img/arrow_down.png')} />
                  </View>
                <Image style={{height: 100, width: 100, margin: 10, borderRadius: 2, borderWidth: 5}} source={require('../resources/wc_img/arrow_right.png')} />
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

  });
  