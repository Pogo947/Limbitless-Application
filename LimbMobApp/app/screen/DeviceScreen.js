import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Button, FlatList, AsyncStorage, Alert } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'react-native-firebase';

export default class DeviceScreen extends Component {

    constructor(){
        super()
        this.state = {
            dataSource: []
        }
    }


    fetchData = async ()=> {

        firebase.database().ref('games/').on("value", snapshot => {
            this.setState({dataSource: snapshot.val()})
        })

        /*
        try{
            let deviceData = await AsyncStorage.getItem('@devices');
            
            deviceData = JSON.parse(deviceData)

            this.setState({dataSource: deviceData});
        }
        catch(error) {
            alert(error);
        }
        */
    }

    async componentWillMount(){
        this.fetchData().done()
    }

    navigate = () => {
		const navigateToAddDevice = NavigationActions.navigate({
			routeName: "screenAddDevice",
			params: {}
		});
		this.props.navigation.dispatch(navigateToAddDevice);
    };

    deleteDevice(){

    }

    render(){

        return(
        <View >

        <View style ={{alignItems: 'center'}}>
        <Text style = {styles.titleText}>
           DEVICES
        </Text>
        </View>
        <FlatList
                data = {this.state.dataSource}
                renderItem ={({item,index})=>{
                    return(
                            <FlatListItem item ={item} index={index}/>
                    );
                }}

        />
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                <Button onPress={this.navigate} title="Add New Device" />
                <Button onPress={this.deleteDevice.bind(this)} title="Delete Device" />
            </View>
       </View>

       </View> 
         )
    }
}

class FlatListItem extends Component {
    _onPress = () => {
        Alert.alert("You have pressed " + this.props.item.name)
     };

    render(){
      return(
        
        <View style ={{
            flex: 1, 
            flexDirection: 'column'
        }}> 
            <TouchableHighlight onPress={this._onPress}>  
                <View style = {{
                    flex:1, backgroundColor: '#00acea', flexDirection: 'row'
                }}>

                    <Image
                        source = {{uri: this.props.item.imageURL}}
                        style= {{width: 120, height: 120, margin: 5}}/>
                    <View style={{
                     flex: 1,
                        flexDirection: 'column'
                    }}>

                    <Text> {this.props.item.name} </Text>
                    <Text> {this.props.item.description} </Text>
                    </View>

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
    }
  });
  