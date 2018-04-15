import React, { Component } from 'react';
import {Platform, Button, StyleSheet, Linking, Text,  View, ImageBackground, TouchableHighlight, Image, FlatList, Alert, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation'

const widthScreen = Dimensions.get('window').width
const heightScreen =  Dimensions.get('window').height

class FlatListItem extends Component {

    _onPress = () => {
        Alert.alert(
            'Go to Google Play Store to download ' + this.props.item.name +'?',
            '' + this.props.item.description,
            [
              {text: 'No', onPress: () => console.log('Canceled Game Selection')},
              {},
              {text: 'Yes', onPress: () => Linking.openURL(this.props.item.link)},
            ],
            { cancelable: true }
          )

        
     };
  
    render(){
      return(
        <View style ={{flexDirection: 'column'}}> 
            <TouchableHighlight onPress={this._onPress}>  
                <View style = {{ backgroundColor: '#00acea', flexDirection: 'row'}}>
                <ImageBackground

                        source = {{uri: this.props.item.imageURL}}
                        style= {{width: widthScreen, height: 100, margin: 5}}>
                    <View style = {styles.backdrop} >
                        <Text style = {styles.displayText}> {this.props.item.name} </Text>
                    </View>
                </ImageBackground>
                </View>
            </TouchableHighlight>    
            <View style ={{
                 height: 10, 
                backgroundColor: 'white'
            }}/>

        </View>
        
        )
    }
}

export default class Games extends Component {

	navigate = () => {
		const navigateToProfile = NavigationActions.navigate({
			routeName: "Profile",
			params: {}
		});
		this.props.navigation.dispatch(navigateToProfile);
	};
	
    constructor(){
        super()
        this.state = {
            dataSource: []
        }
    }

    componentDidMount(){

        firebase.database().ref('games/').on("value", snapshot => {
            this.setState({dataSource: snapshot.val()})
             })

    }

    render(){

        return(
        <View style={styles.MainContainer}>
        <View style={styles.ProfileButtonStyle}>
		<Button onPress={this.navigate} title='Settings'/>
		</View>
        <View style = {{alignItems: 'center'}}>
        <Text style = {styles.titleText}>
           GAMES
        </Text>
        </View>
        <FlatList
                data = {this.state.dataSource}
                contentContainerStyle={{paddingBottom:50}}
                renderItem ={({item,index})=>{
                    return(
                            <FlatListItem item ={item} index={index}/>
                    );
                }}

        />
       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
      },
    titleText: {
        alignItems: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },
    displayText : {
        fontSize: 32, 
        color: '#ffffff'
    },
    backdrop : {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: 100,
    },
	ProfileButtonStyle: {
		alignSelf: 'flex-start',
		position: 'absolute',
		top: 0
	},
  });
  