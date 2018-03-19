import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image,Picker, Button } from 'react-native';
import firebase from 'react-native-firebase';

var database = firebase.database();



export default class LevelScreen extends Component {
    state = {selectedLevel: "1", level: "", currentUser: "5tHsvBfkfVWmt14amvgbkh6cLyW2"}

    componentDidMount() {
        this.getLevel()
    }

    getLevel(){
        firebase.database().ref('user/'+ this.state.currentUser + '/currentLevel').on("value", snapshot => {
            this.setState({selectedLevel: snapshot.val(), level: snapshot.val()})
             })
    }

    saveCurrentLevel() {

      firebase.database().ref('user/'+ this.state.currentUser + '/currentLevel').set(this.state.selectedLevel)
      .then(function() {
        console.log('Synchronization succeeded');
      })
      .catch(function(error) {
        console.log('Synchronization failed');
      });
      
        firebase.database().ref('user/'+ this.state.currentUser + '/currentLevel').on("value", snapshot => {
            this.setState({level: snapshot.val()})
             })
        
    }

    updateSelectedLevel = (selectedLevel) => {
      this.setState({ selectedLevel: selectedLevel})
    }

    render(){
        return(
        
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
           LEVELS
        </Text>

        <Picker selectedValue = {this.state.selectedLevel} onValueChange = {this.updateSelectedLevel} >

            <Picker.Item label = "Level 1" value = "1" />
            <Picker.Item label = "Level 2" value = "2" />
            <Picker.Item label = "Level 3" value = "3" />
            <Picker.Item label = "Level 4" value = "4" />
            <Picker.Item label = "Level 5" value = "5" />
        </Picker>

        <Text style = {{fontSize: 100, color: 'black'}}>{this.state.selectedLevel}</Text>
        <Button onPress={this.saveCurrentLevel.bind(this)} title="Save Current Level" />
        <Text> Current User is Testuser@gmail.com </Text>
        <Text> Saved Level = {this.state.level} </Text>
        </View>
         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
      },
    titleText: {
        fontWeight : 'bold',
        fontSize: 22, 
        color: 'blue'
    }
  });
  