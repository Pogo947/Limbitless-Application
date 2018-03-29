import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image,Picker, Button } from 'react-native';
import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation';

var database = firebase.database();

class LevelScreen extends Component {
    state = {selectedLevel: "", level: "", currentUser: "5tHsvBfkfVWmt14amvgbkh6cLyW2"}
	navigate = () => {
		const navigateToHome = NavigationActions.navigate({
			routeName: "home",
			params: {}
		});
		this.props.navigation.dispatch(navigateToHome);
	};
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
        this.navigate();
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
        justifyContent: 'center',
      },
    titleText: {
        fontFamily : "Klavika Bold",
        fontSize: 22, 
        color: '#1c3d72'
    }
  });
  