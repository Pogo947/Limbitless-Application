import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, Button, FlatList, AsyncStorage, Alert } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'react-native-firebase';


headIcon = require('../resources/device_icons/headIcon.png')
bandIcon = require('../resources/device_icons/bandIcon.png')
wheelIcon = require('../resources/device_icons/wheelIcon.png')
armIcon = require('../resources/device_icons/armIcon.png')

const deviceImages = [headIcon, bandIcon, wheelIcon, armIcon];

export default class DeviceScreen extends Component {

    constructor(){
        super()
        this.state = {
            user: null,
            dataSource: []
        }
    }

    
    fetchData = async ()=> {

        try{
            let userData = await AsyncStorage.getItem('userData');
            let deviceData = await AsyncStorage.getItem('savedDevices');

            deviceData = JSON.parse(deviceData)
            userData = JSON.parse(userData)

            this.setState({
                user: userData, dataSource: deviceData});
        }
        catch(error) {
            alert(error);
        }
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
    navigate1 = () => {
		const navigateToLevel = NavigationActions.navigate({
			routeName: "screenLevel",
			params: {}
		});
		this.props.navigation.dispatch(navigateToLevel);
    };

    deleteDevice(){
        showDeletion();
    }

    render(){

        return(
        <View>
        <View style ={{alignItems: 'center'}}>
            <Text style = {styles.titleText}>
                DEVICES
            </Text>
        </View>
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                <Button onPress={this.navigate} title="Add New Device" />
                <Button onPress={this.deleteDevice.bind(this)} title="Delete Device" />
            </View>
       </View>
        <FlatList
                data = {this.state.dataSource}
                renderItem ={({item,index})=>{
                    return(
                            <FlatListItem item ={item} index={index} navigation={this.props.navigation} extraData = {this.state}/>
                    );
                }}
        />
       </View> 
         )
    }
}

class FlatListItem extends Component {

    _onPress = () => {
        Alert.alert("You have pressed " + this.props.item.name)
     };
    
     levelButton(){
        if(this.props.item.type == 'arm'){
            return <Button onPress={this.navigate1} title="Level" />
        }
     }
     navigate1 = () => {
		const navigateToLevel = NavigationActions.navigate({
			routeName: "screenLevel",
			params: {}
		});
		this.props.navigation.dispatch(navigateToLevel);
    };
     gotoDeviceSettings(){
        if(this.props.item.type == 'arm' || this.props.item.type == 'band' || this.props.item.type == 'head'){
            return <Button onPress={this.gotoDeviceSettings.bind(this)} title="EMG setting" />
        }
        
     }    
    render(){

      return(
        
        <View style ={{flex: 1, flexDirection: 'column'}}> 

             

                <View style = {{flex: 1, backgroundColor: '#ffffff', flexDirection: 'row'}}>

                    <View style={{flex: 1,flexDirection: 'column'}}>

                    <Image
                        source = {deviceImages[this.props.item.iconPath]}
                        style= {{width: 120, height: 120, margin: 5, borderRadius:2, borderColor: 'black', borderWidth: 2}}/>
                    <Text style ={{marginLeft: 20}}> {this.props.item.name} </Text>

                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10}}> 
                        {this.levelButton()}
                        {this.gotoDeviceSettings()}
                    </View> 
                </View>

              

            <View style ={{height: 20}}/>

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
  