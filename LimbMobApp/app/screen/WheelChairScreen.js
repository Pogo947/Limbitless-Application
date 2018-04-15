import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native';


var wc_on = (require('../resources/wc_img/wc_both_on.png'))
var wc_left = (require('../resources/wc_img/wc_left_on.png'))
var wc_right = (require('../resources/wc_img/wc_right_on.png'))
var wc_off = (require('../resources/wc_img/wc_off.png'))


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
    headControlShow(){
        if(this.state.direction == "backward" || this.state.direction == "forward"){
            return wc_on
        }
        else if(this.state.direction == "left" ){
            return wc_left
        }
        else if(this.state.direction == "right" ){
            return wc_right
        }
        else 
            return wc_off
    }

    render(){

        return(
        <View style={styles.MainContainer}>
        <Text style = {styles.titleText}>
           CONTROL
        </Text>
            <View style = {{flexDirection: 'row'}}>
                <Image fadeDuration={0} style={{height: 50, width: 50, margin: 20}} source={require('../resources/wc_img/wheel_battery.png')} />
                    <ImageBackground style={styles.head} source={wc_off}>
                        <Image fadeDuration={0} style={styles.head} source={this.headControlShow()}/>
                    </ImageBackground>
                <Image fadeDuration={0} style={{height: 50, width: 50, margin: 20}} source={require('../resources/wc_img/headband_battery.png')} />
            </View> 
            <View style = {{flexDirection: 'row', alignItems: 'center', }}>

                <TouchableWithoutFeedback onPress={() => this.pressLeft()}>
                <Image fadeDuration={0} style={styles.buttonStyle}  source={ this.state.direction == "left" ? require('../resources/wc_img/arrow_left.png') : require('../resources/wc_img/arrow_left_off.png')} />
                </TouchableWithoutFeedback>

                  <View fadeDuration={0} style = {{flexDirection: "column", alignItems: 'center', justifyContent: 'center',}}>

                    <TouchableWithoutFeedback onPress={() => this.pressForward()}>
                    <Image fadeDuration={0} style={styles.buttonStyle}  source={ this.state.direction == "forward" ? require('../resources/wc_img/arrow_up.png') : require('../resources/wc_img/arrow_up_off.png')} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.pressStop()}>
                    <Image fadeDuration={0} style={styles.stop} source={this.state.direction == "" ? require('../resources/wc_img/stop.png') : require('../resources/wc_img/stop_off.png')} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.pressBackward()}>
                    <Image fadeDuration={0} style={styles.buttonStyle}  source={ this.state.direction == "backward" ? require('../resources/wc_img/arrow_down.png') : require('../resources/wc_img/arrow_down_off.png')} />
                    </TouchableWithoutFeedback>

                  </View>
                <TouchableWithoutFeedback onPress={() => this.pressRight()}>
                <Image fadeDuration={0} style={styles.buttonStyle} source={ this.state.direction == "right" ? require('../resources/wc_img/arrow_right.png') : require('../resources/wc_img/arrow_right_off.png')} />
                </TouchableWithoutFeedback>
            </View>


       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleText: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },
      head :{
        height: 200, 
        width: 200, 
      },
      buttonStyle: {
        height: 70, 
        width: 70
      },
      stop:{
        height: 100, 
        width: 120
      }

  });
  