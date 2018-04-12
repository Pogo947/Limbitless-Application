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
            dataSource: [],
            deletedDeviceRow: null,
        }
    }

    navigate = () => {
		const navigateToAddDevice = NavigationActions.navigate({
			routeName: "screenAddDevice",
			params: {}
		});
		this.props.navigation.dispatch(navigateToAddDevice);
    };

    navigateLevel = () => {
		const navigateToLevel = NavigationActions.navigate({
			routeName: "screenLevel",
			params: {}
		});
		this.props.navigation.dispatch(navigateToLevel);
    }; 

    navigateEMG = (emgvalue, thresholds) => {
        const navigateToEMG = NavigationActions.navigate({
			routeName: "screenEMG",
			params: {emgvalue, thresholds}
		});
		this.props.navigation.dispatch(navigateToEMG);
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

    chooseDeviceDeletion(name, key){
        Alert.alert(
            'Delete device ' + name,
            'Are you sure?',
            [
              {text: 'No', onPress: () => console.log('Canceled deletion')},
              {},
              {text: 'Yes', onPress: () => this.confirmDelete(key)},
            ],
            { cancelable: true }
          )
    }

    confirmDelete(key){

        this.setState({dataSource: this.state.dataSource.filter(item => item.key != key)});

        var savedDevices = this.state.dataSource

        AsyncStorage.removeItem('savedDevices').then(() => {
            AsyncStorage.setItem('savedDevices', JSON.stringify(savedDevices))});
        
        firebase.database().ref().child("users").child(this.state.user.uid).child("devices").set(savedDevices)
        
    }

    levelButton(type){
        if(type == 'arm'){
            return <Button onPress={() => this.navigateLevel()} title="Level" />
        }
    }

    gotoEMGSettingsButton(item){
        if(item.type == 'arm' || item.type == 'band' || item.type == 'head'){
            return <Button onPress={() => this.navEMG(item)} title="EMG setting" />
        }
     }
 

    navEMG = async (item)=> {

        await AsyncStorage.setItem('currentDevice', JSON.stringify(item))
            
        this.navigateEMG()
            
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
            </View>
       </View>
        <FlatList
                data = {this.state.dataSource}
                contentContainerStyle={{paddingBottom:200}}
                renderItem={({ item, index}) => (
                
                    <View style ={{flex: 1, flexDirection: 'column'}}> 
    
                        <View style = {{flex: 1, backgroundColor: '#ffffff', flexDirection: 'row'}}>
                            <TouchableHighlight>
                                <View style={{flex: 1,flexDirection: 'column'}}>
                                    <Text style ={{marginLeft: 20}}> {item.name} </Text>
                    
                                    <Image
                                        source = {deviceImages[item.iconPath]}
                                        style= {{width: 120, height: 120, margin: 5, borderRadius:10, borderColor: 'black', borderWidth: 2}}/>

                                    <Button color = '#E09999' onPress={()=> this.chooseDeviceDeletion(item.name, item.key)} title="Delete Device" />

                                </View>
                            </TouchableHighlight>

                            <View style={{flexDirection: 'column', justifyContent: 'space-between', margin: 10}}> 
                                {this.levelButton(item.type)}
                                {this.gotoEMGSettingsButton(item)}
                                
                            </View> 
                        </View>

                    <View style ={{height: 20}}>
                    </View>
                 </View> 
                )}
        />
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
  