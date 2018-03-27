import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableOpacity, Image } from 'react-native';

export default class WheelChairScreen extends Component {
    state = {direction: ""}

    pressStop(){
        this.setState({direction: ""})
    }
    pressForward(){
        if(this.state.direction == "forward"){
            this.setState({direction: ""})
        }
        else
            this.setState({direction: "forward"})
    }
    pressLeft(){
        if(this.state.direction == "left"){
            this.setState({direction: ""})
        }
        else
            this.setState({direction: "left"})
    }

    pressRight(){
        if(this.state.direction == "right"){
            this.setState({direction: ""})
        }
        else
            this.setState({direction: "right"})
    }
    pressBackward(){
        if(this.state.direction == "backward"){
            this.setState({direction: ""})
        }
        else
            this.setState({direction: "backward"})
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

                <TouchableOpacity onPress={() => this.pressLeft()}>
                <Image style={{height: 100, width: 100}} source={ this.state.direction == "left" ? require('../resources/wc_img/arrow_left.png') : require('../resources/wc_img/arrow_left_off.png')} />
                </TouchableOpacity>

                  <View style = {{flexDirection: "column", alignItems: 'center', justifyContent: 'center',}}>

                    <TouchableOpacity onPress={() => this.pressForward()}>
                    <Image style={{height: 100, width: 100}} source={ this.state.direction == "forward" ? require('../resources/wc_img/arrow_up.png') : require('../resources/wc_img/arrow_up_off.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.pressStop()}>
                    <Image style={{height: 150, width: 180}} source={this.state.direction == "" ? require('../resources/wc_img/stop.png') : require('../resources/wc_img/stop_off.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.pressBackward()}>
                    <Image style={{height: 100, width: 100}} source={ this.state.direction == "backward" ? require('../resources/wc_img/arrow_down.png') : require('../resources/wc_img/arrow_down_off.png')} />
                    </TouchableOpacity>

                  </View>
                <TouchableOpacity onPress={() => this.pressRight()}>
                <Image style={{height: 100, width: 100}} source={ this.state.direction == "right" ? require('../resources/wc_img/arrow_right.png') : require('../resources/wc_img/arrow_right_off.png')} />
                </TouchableOpacity>
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
  