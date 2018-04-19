import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, TouchableOpacity, Image, Button, FlatList, AsyncStorage, Alert } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'react-native-firebase';

var headIcon = require('../resources/device_icons/headIcon.png')
var bandIcon = require('../resources/device_icons/bandIcon.png')
var wheelIcon = require('../resources/device_icons/wheelIcon.png')
var armIcon = require('../resources/device_icons/armIcon.png')
var deleteIcon = require('../resources/device_icons/deleteIcon.png')

const deviceImages = [headIcon, bandIcon, wheelIcon, armIcon];

export default class DeviceScreen extends Component {

    constructor(){
        super()
        this.state = {
            user: null,
            dataSource: [],
            delete: false
        }
    }
	navigate = () => {
		const navigateToProfile = NavigationActions.navigate({
			routeName: "Profile",
			params: {}
		});
		this.props.navigation.dispatch(navigateToProfile);
	};
    navigateAddDevice = () => {
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

    navigateEMG = () => {
        const navigateToEMG = NavigationActions.navigate({
			routeName: "screenEMG",
			params: {}
		});
		this.props.navigation.dispatch(navigateToEMG);
    }

    navigateToScanDevice = () => {
        const navigateToScanDevice = NavigationActions.navigate({
          routeName: "screenScanDevice",
          params: {}
        });
        this.props.navigation.dispatch(navigateToScanDevice);
        };

    navigateWheel = () => {
        const navigateWheel = NavigationActions.navigate({
			routeName: "screenWheel",
			params: {}
		});
		this.props.navigation.dispatch(navigateWheel);
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

    setDeletion(){
        if(this.state.delete == false){
            this.setState({delete: true})
        }
        else
            this.setState({delete: false})
    }
    showDeviceDeletion(item){
        if(this.state.delete == true){
            return (
                <TouchableOpacity onPress={()=> this.chooseDeviceDeletion(item.name, item.key)}>
                    <Image style = {{paddingLeft: 0, width: 40, height:40}} source= {deleteIcon} />
                </TouchableOpacity>
            )
        }
        else 
            return (<View style = {{paddingLeft: 40, paddingBottom: 20}}/>) 
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

    gotoEMGServiceButton(item){
        if(item.type == 'arm' || item.type == 'band' || item.type == 'head'){
            return <Button onPress={() => this.navEMG(item)} title="EMG Service" />
        }
     }
 

    navEMG = async (item)=> {
        await AsyncStorage.setItem('currentDevice', JSON.stringify(item))

        this.navigateToScanDevice()
        //this.navigateEMG()
    }

    gotoWheelButton(item){
        if(item.type == 'wheel'){
            return <Button onPress={() => this.navigateWheel(item)} title="Control" />
        }
    }

    showUpdates(item){
        //if require updates ...

        return <Button onPress={() => this.doUpdates(item)} title="Updates" />
    }
    doUpdates(item){
        //do something with update button
        return
    }

    render(){

        return(
        <View>
		<View style={styles.ProfileButtonStyle}>
            <TouchableOpacity onPress={this.navigate}>
                <Image style = {{width: 70, height: 70}}source = {require("../resources/tab_icons/Settings_Button_Topleft.png")}/> 
            </TouchableOpacity>
		</View>
        <View style ={{alignItems: 'center'}}>
            <Text style = {styles.titleText}>
                DEVICES
            </Text>
        </View>
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                <Button onPress={this.navigateAddDevice} title="Add New Device" />
                <Button color = '#E09999' onPress={()=> this.setDeletion()} title="Remove Device" />
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
                                    <View style = {{flexDirection: 'row'}}>
                                        {this.showDeviceDeletion(item)}
                                        <Text style ={{marginLeft: 20, marginBottom:10}}> {item.name} </Text>
                                    </View>
                                    <Image
                                        source = {deviceImages[item.iconPath]}
                                        style= {{width: 120, height: 120, margin: 5, borderRadius:10, borderColor: 'black', borderWidth: 2}}/>

                                </View>
                            </TouchableHighlight>

                            <View style={{flexDirection: 'column', justifyContent: 'space-between', padding: 10}}> 
                                {this.gotoEMGServiceButton(item)}
                                {this.gotoWheelButton(item)}
                            </View> 
                            <View style={{flexDirection: 'column', justifyContent: 'space-between', padding: 10}}> 
                                {this.showUpdates(item)}
                                {this.levelButton(item.type)}
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
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },
	ProfileButtonStyle: {
		alignSelf: 'flex-start',
		position: 'absolute',
		top: 0
	}
  });
  