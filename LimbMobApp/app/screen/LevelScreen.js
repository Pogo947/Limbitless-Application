import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Picker, Button, AsyncStorage, Alert} from 'react-native';
import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation';

var database = firebase.database();

class LevelScreen extends Component {

  constructor(){
    super()
      this.state = {
        selectedLevel: "", 
        level: "",
        maxlevel: "", 
        user: null 
      }
  }

	navigate = () => {
    const navigateToDevice = NavigationActions.navigate({
      routeName: "screenDevice",
      params: {}
    });
    this.props.navigation.dispatch(navigateToDevice);
  };

  
  async componentWillMount() {
        await this.fetchDataLocal()
        await this.fetchLevel()
    }

    fetchDataLocal = async ()=> {
      try{

          let userData = await AsyncStorage.getItem('userData');
          let maxlevel = await AsyncStorage.getItem('maxlevel')
          let level = await AsyncStorage.getItem('level');

          userData = JSON.parse(userData)
          level = JSON.parse(level)

          this.setState({
              user: userData,
              level: level,
              maxlevel: maxlevel});
      }
      catch(error) {
          alert(error);
      }
    }

    fetchLevel = async ()=> {
      try{
        await firebase.database().ref('users/'+ this.state.user.uid + '/currentlevel').on("value", snapshot => 
              {this.setState({selectedLevel: snapshot.val(), level: snapshot.val()})})
      
        await firebase.database().ref('users/'+ this.state.user.uid + '/maxlevel').on("value", snapshot => 
              {this.setState({maxlevel: snapshot.val()})})
        }
      catch(error) {
            alert(error);
        }
        
    }

    saveCurrentLevel() {

      if(this.state.selectedLevel > this.state.maxlevel){
        return alert("Max level is too low")
      }

      firebase.database().ref('users/'+ this.state.user.uid + '/currentlevel').set(this.state.selectedLevel)
      .then(function() {
        console.log('Synchronization succeeded');
      })
      .catch(function(error) {
        console.log('Synchronization failed');
      });
      
      firebase.database().ref('users/'+ this.state.user.uid + '/currentlevel').on("value", snapshot => {
            this.setState({level: snapshot.val()})})

      AsyncStorage.setItem('level', (this.state.selectedLevel))
        
        this.navigate();
    }

    updateSelectedLevel = (selectedLevel) => {
      this.setState({ selectedLevel: selectedLevel})
    }

    render(){
        return(
        <View style={styles.MainContainer}>

        <View style = {{alignItems: 'center'}}>
        <Text style = {styles.titleText}>
           LEVELS
        </Text>
        </View>
        <Picker selectedValue = {this.state.selectedLevel} onValueChange = {this.updateSelectedLevel} >

            <Picker.Item label = "Level 1" value = "1" />
            <Picker.Item label = "Level 2" value = "2" />
            <Picker.Item label = "Level 3" value = "3" />
            <Picker.Item label = "Level 4" value = "4" />
            <Picker.Item label = "Level 5" value = "5" />
        </Picker>

        <Text style = {{fontSize: 100, color: 'black'}}>{this.state.selectedLevel}</Text>
        <Button onPress={this.saveCurrentLevel.bind(this)} title="Save Current Level" />
        <Text> Saved Level = {this.state.level} </Text>
        <Text> Max Level = {this.state.maxlevel} </Text>
        </View>
         )
    }
}
  /*
const mapStateToProps = (state) => {
    return {
      currentLevel: state.configuration.currentLevel
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      changeLevel: (level) => {
        dispatch({
          type: 'CHANGE_LEVEL',
          payload: level,
        });
      },
    };
  };
  */
  
  //const Level = connect(mapStateToProps)(LevelScreen)
  
  export default LevelScreen;


const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center'
      },
      titleText: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },
  });
  