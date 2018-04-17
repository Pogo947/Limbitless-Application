import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, Dimensions,
   PermissionsAndroid, View, FlatList, 
  TouchableHighlight, TouchableOpacity, Image, Alert, 
  Button, AsyncStorage,  NativeAppEventEmitter,  NativeEventEmitter, NativeModules, ListView, ScrollView} from 'react-native';
import prompt from 'react-native-prompt-android';
import firebase from 'react-native-firebase';
import {connect} from "react-redux"
import { NavigationActions } from "react-navigation";
import BleManager from 'react-native-ble-manager';
import '../../shim'
import $ from 'buffer';

var headIcon = require('../resources/device_icons/headIcon.png')
var bandIcon = require('../resources/device_icons/bandIcon.png')
var wheelIcon = require('../resources/device_icons/wheelIcon.png')
var armIcon = require('../resources/device_icons/armIcon.png')
var deleteIcon = require('../resources/device_icons/deleteIcon.png')

const deviceImages = [headIcon, bandIcon, wheelIcon, armIcon];

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var accels = [0.0,0.0,0.0];
var gyros = [0.0,0.0,0.0];
var temp = 0.0;
var name = "name";
var led = 0;
var count = 0
var curItem;
var savedAccels = [];
var savedAccelsx = [];
var savedGyros = [];
var savedTemps = [];

export default class AddDeviceScreen extends Component {

    constructor(){
      super()
        this.state = {
          selectedColor: '#06a7e2',
          type: "", 
          loading: false, 
          user: null,
          accessCode: "",
          deviceData: null,
          scanning:false,
          peripherals: new Map(),
          connected_peripheral: "",
        }
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);

    }
    
    navigate = () => {
      const navigateToDevice = NavigationActions.navigate({
        routeName: "screenDevice",
        params: {}
      });
      this.props.navigation.dispatch(navigateToDevice);
    };

    navigateToScanDevice = () => {
      const navigateToScanDevice = NavigationActions.navigate({
        routeName: "screenScanDevice",
        params: {}
      });
      this.props.navigation.dispatch(navigateToScanDevice);
      };

    fetchDataLocal = async ()=> {
      try{

          let userData = await AsyncStorage.getItem('userData');
          
          userData = JSON.parse(userData)

          this.setState({
              user: userData, loading: false});
      }
      catch(error) {
          alert(error);
      }
    }

    fetchDatabase = async (code)=> {
      try{
        await firebase.database().ref().child("users").child(this.state.user.uid).child("devices")
        .child("savedDevices").on("value", snapshot => {
          this.setState({deviceData: snapshot.val(), accessCode: code})
          })
      }
      catch(error) {
          alert(error);
      }
    }

    async confirmCode(code){

      var codeLength = code.length.toString()
      if(codeLength != 5){
        return alert("Invalid access code")
      }

      this.fetchDatabase(code).done()

      alert("Synced!")
    }

    async componentWillMount(){
      this.fetchDataLocal().done()

      BleManager.enableBluetooth()
        .then(() => {
          console.log('Bluetooth is already enabled');
        })
        .catch((error) => {
          Alert.alert('You need to enable bluetooth to use this app.');
      });

      BleManager.start({showAlert: false});
    }

    componentDidMount() {
  
    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );

      if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
              if (result) {
                console.log("Permission is OK");
              } else {
                PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                  if (result) {
                    console.log("User accept");
                  } else {
                    console.log("User refuse");
                  }
                });
              }
        });
      }
      
    }

    componentWillUnmount() {
      this.handlerDiscover.remove();
      this.handlerStop.remove();
      this.handlerDisconnect.remove();
      this.handlerUpdate.remove();
    }

    handleAppStateChange(nextAppState) {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!')
        BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
          console.log('Connected peripherals: ' + peripheralsArray.length);
        });
      }
      this.setState({appState: nextAppState});
    }

    handleDisconnectedPeripheral(data) {
      let peripherals = this.state.peripherals;
      let peripheral = peripherals.get(data.peripheral);
      if (peripheral) {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);
        this.setState({peripherals, connected: "no"});
      }
      console.log('Disconnected from ' + data.peripheral);
    }

    confirmDevicePrompt(){
      prompt(
        'Enter Access code',
        'Access codes are 5 digits long, only numbers are allowed',
        [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'OK', onPress: code => this.confirmCode(code)},
        ],
        {   
            type: 'phone-pad',
            cancelable: true,
            defaultValue: this.state.accessCode,
            placeholder: '12345',
        }
      )
    }

    async createDevice(){
      
      if(this.state.accessCode == ""){
        return alert("Please Sync Device!")
      }
      else{
      var savedDevices = this.state.deviceData 
      //var iconType = this.pickIconType()

      if(!savedDevices){
        let addDevice = [{
          key: this.state.connected_peripheral.id + "_" + this.state.connected_peripheral.name ,
          id : this.state.connected_peripheral.id,
          name: this.state.connected_peripheral.name,
          code: this.state.accessCode,
          type: this.state.type, //set to arm when connecting to device
          emg: 0,
          thresholds: [0,0,0,0],
          iconPath: 3  //3 is arm 
        }]
        savedDevices = addDevice
        firebase.database().ref().child("users").child(this.state.user.uid).child("devices").set({savedDevices})
        AsyncStorage.setItem('accessCode', JSON.stringify(this.state.accessCode))
        AsyncStorage.setItem('savedDevices', JSON.stringify(savedDevices))

        this.navigate();
      }
      else{
        let addDevice = {
          key: this.state.connected_peripheral.id + "_" + this.state.connected_peripheral.name ,
          id : this.state.connected_peripheral.id,
          name: this.state.connected_peripheral.name,
          code: this.state.accessCode,
          type: this.state.type, //set to arm when connecting to device
          emg: 0,
          thresholds: [0,0,0,0],
          iconPath: 3 //3 is arm 
        }

        savedDevices.push(addDevice)

        var userID = this.state.user.uid

      firebase.database().ref().child("users").child(this.state.user.uid).child("devices").set({savedDevices})
      AsyncStorage.setItem('accessCode', JSON.stringify(this.state.accessCode))
      AsyncStorage.setItem('savedDevices', JSON.stringify(savedDevices))
      
      this.navigate();
    }
    }
    }

    checkLength(curItem, command, input){
      var codeLength = input.length.toString()
      if(codeLength != 5){
        return alert("Invalid access code")
      }
      else{
        return this.handleWriteCharacteristic(curItem, command, input)
      }
    }

    handleWriteCharacteristic(peripheral, command, input) {

      if(peripheral == null){
        return (alert("No device connected"))
      }
  
      BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
        console.log(peripheralInfo);
        var service = 'fe84-0000-1000-8000-00805f9b34fb';
        var readCharacteristic = '2d30c082-f39f-4ce6-923f-3484ea480596';
        var writeCharacteristic = '2d30c083-f39f-4ce6-923f-3484ea480596';
        
        if (command == 1)
        {
          if (led == 0) {
            BleManager.write(peripheral.id, service, writeCharacteristic, [1, 1]).then(() => {
              console.log('Turned LED on');
            });
            led = 1;
          }
          else if (led == 1) {
            BleManager.write(peripheral.id, service, writeCharacteristic, [1, 0]).then(() => {
              console.log('Turned LED off');
            });
            led = 0;
          }
        }
        else if (command == 0)
        {
          var arr = Array.from(input);
          var send = [];
          for (var i=0; i<input.length; i++)
            send[i] = Number(arr[i]);
          
          console.log('User input was: '+input);
          console.log('Access code sending: '+send);
          BleManager.write(peripheral.id, service, writeCharacteristic, [0, send[0], send[1], send[2], send[3], send[4]]).then(() => {
            console.log('Access code sent');
          });
        }
      });
    }
  
    handleUpdateValueForCharacteristic(data) {
      console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    
    var buf = Buffer.from(data.value);
    name = buf.toString('utf8', 0, 4);
    if (name == "acel")
    {
      // reads byte sets of 4 into appropriate variable in array
      accels[0] = buf.readFloatLE(4);
      accels[1] = buf.readFloatLE(8);
      accels[2] = buf.readFloatLE(12);
    }
    else if (name == "gyro")
    {
      gyros[0] = buf.readFloatLE(4);
      gyros[1] = buf.readFloatLE(8);
      gyros[2] = buf.readFloatLE(12);
    }
    else if (name == "temp")
    {
      temp = buf.readFloatLE(4);
    }
    else
      console.log("Unable to read sensor data");
    
    console.log("Accel: "+accels[0]+" "+accels[1]+" "+accels[2]+
      "\nGyro: "+gyros[0]+" "+gyros[1]+" "+gyros[2]+"\nTemp: "+temp);
      
    this.latestArrayData(accels, gyros, temp)
    }
  
    latestArrayData(accels, gyros, temp){
  
      var tempaccels = [];
  
      tempaccels[0] = accels[0].toFixed(2)
      tempaccels[1] = accels[1].toFixed(2)
      tempaccels[2] = accels[2].toFixed(2)
  
      if(savedAccels.length > 20){
        savedAccels.pop()
        savedAccelsx.pop()
        savedGyros.pop()
        savedTemps.pop()
      }
      else if(count == 25){
        savedAccels.unshift(tempaccels)
        savedAccelsx.unshift(tempaccels[0])
        savedGyros.unshift(gyros)
        savedTemps.unshift(temp)
        count = 0
        
        this.setState({savedAccelsx: savedAccelsx})
        }
      
        count = count + 1;
  
      
    }
  
    handleStopScan() {
      console.log('Scan is stopped');
      this.setState({ scanning: false });
    }
  
    startScan() {
      if (!this.state.scanning) {
        this.setState({peripherals: new Map()});
        BleManager.scan([], 2, true).then((results) => {
          console.log('Scanning...');
          this.setState({scanning:true});
        });
      }
      this.retrieveConnected()
    }
  
    retrieveConnected(){
      if(this.state.peripherals == null){
        return
      }
      BleManager.getConnectedPeripherals([]).then((results) => {
        console.log(results);
        var peripherals = this.state.peripherals;
        for (var i = 0; i < results.length; i++) {
          var peripheral = results[i];
          peripheral.connected = true;
          peripherals.set(peripheral.id, peripheral);
          this.setState({ peripherals, connected: "yes" });
        }
      });
    }
  
    handleDiscoverPeripheral(peripheral){
      var peripherals = this.state.peripherals;
  
      if(peripheral == null){
        return
      }
      if (!peripherals.has(peripheral.id)){
        console.log('Got ble peripheral', peripheral);
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals })
      }
    }
  
    test(peripheral) {
      if (peripheral){
        if (peripheral.connected){
          BleManager.disconnect(peripheral.id);
          this.setState({connected_peripheral: ""})
        }else{
          BleManager.connect(peripheral.id).then(() => {
            let peripherals = this.state.peripherals;
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              this.setState({peripherals: peripherals, type: 'arm'});
            }
            console.log('Connected to ' + peripheral.id);
          }).catch((error) => {
            console.log('Connection error', error);
          });

          this.setState({connected_peripheral: peripheral})

        }
      }
    }
  

    checkDeviceName(name){
      thisname =(JSON.stringify(name))
      thisname = thisname.toLowerCase()
      checkname = "simblee"
      if(thisname.indexOf(checkname) > -1){
        return( 
          <Image
            source = {armIcon} 
            style= {{width: 100, height: 100, margin: 5, borderRadius:10, borderColor: '#06a7e2', borderWidth: 1}}
          />)
      }
      else 
        return <Text> Not Simblee Device </Text>
    }

    render() {
      const list = Array.from(this.state.peripherals.values());
      const dataSource = ds.cloneWithRows(list);
  
      return (
        <View style={styles.container}>
        <View style ={{alignItems: 'center'}}>
              <Text style = {styles.titleText}>
                  ADD DEVICE
              </Text>
          </View>
  
          <View style = {{flexDirection: 'row', justifyContent: 'center', margin:10}}>
            <TouchableHighlight style={{margin: 10, padding:10, backgroundColor:'#06a7e2'}} onPress={() => this.startScan() }>
                <Text style = {styles.buttonText}>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
            </TouchableHighlight>
          </View>

          <View style = {{flexDirection: 'row', justifyContent: 'center'}}> 
           <TouchableHighlight style={{margin: 10, padding:10, backgroundColor:'#06a7e2', justifyContent:'center'}} onPress={this.confirmDevicePrompt.bind(this)}>
                <Text style = {styles.buttonText}>Sync Device</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{margin: 10, padding:10, backgroundColor:'#06a7e2', justifyContent:'center'}} onPress={()=> this.createDevice()}>
                <Text style = {styles.buttonText}>Add  Device</Text>
          </TouchableHighlight>
          </View>

  
          <ScrollView style={styles.scroll}>
            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            }
            <ListView
              enableEmptySections={true}
              contentContainerStyle={{paddingBottom:100}}
              dataSource={dataSource}
              renderRow={(item) => {
                const color = item.connected ? '#06a7e2' : '#fff';
                return (

                  <TouchableOpacity onPress={() => this.test(item) }>
                    <View style={[styles.row, {backgroundColor: color}]}>
                      <View style = {{flexDirection: 'row'}}>
                        {this.checkDeviceName(item.name)}
                        <Text style={{ fontFamily : "Klavika-Regular", fontSize: 14,textAlign: 'center', color: item.connected ? '#ffffff' : '#333333', padding: 10}}>{item.name}</Text>
                        <Text style={{fontFamily : "Klavika-Regular", fontSize: 14, textAlign: 'center', color: item.connected ? '#ffffff' : '#333333', padding: 10}}>{item.id}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
                );
              }}
            />
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    row : {
      margin: 15,
    },
    titleText: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    },
    buttonText: {
      fontFamily : "MuseoSans",
      color: '#ffffff',
      fontSize: 14,
      textAlign: 'center',
    },
    touchableIcon: {
        margin: 10, 
        borderRadius: 5, 
        borderWidth: 5
    },
    textStyle: {
      fontFamily : "Klavika-Regular",
      fontSize: 20,
      margin: 5,
      color: 'black'
    }
  });
  