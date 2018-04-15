import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  FlatList,
  ScrollView,
  AppState,
  Dimensions,
  AsyncStorage,
  Button
} from 'react-native';
import prompt from 'react-native-prompt-android';
import BleManager from 'react-native-ble-manager';
import '../../shim'
import { NavigationActions } from "react-navigation";
import $ from 'buffer';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

var accels = [0.0,0.0,0.0];
var gyros = [0.0,0.0,0.0];
var temp = 0.0;
var name = "name";
var led = 0;
var curItem;
var savedAccels = [];
var savedAccelsx = [];
var savedGyros = [];
var savedTemps = [];

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: '',
      connected: "",
      savedAccelsx: []
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false});

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

    this.startScan()
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

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
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
       {text: 'OK', onPress: (code) => this.checkLength(curItem, 0, code)},
      ],
      {   
          type: 'numeric',
          cancelable: true,
          placeholder: '12345',
      }
    )
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

  latestArrayData(accels, gyros, temp){

    var tempaccels = [];

    tempaccels[0] = accels[0].toFixed(2)
    tempaccels[1] = accels[1].toFixed(2)
    tempaccels[2] = accels[2].toFixed(2)

    //gyros[0] = gyros[0].toFixed(5)
    //gyros[1] = gyros[1].toFixed(5)
    //gyros[2] = gyros[2].toFixed(5)

    if(savedAccels.length > 20){
      savedAccels.pop()
      savedAccelsx.pop()
      savedGyros.pop()
      savedTemps.pop()
    }
    else{
      savedAccels.unshift(tempaccels)
      savedAccelsx.unshift(tempaccels[0])
      savedGyros.unshift(gyros)
      savedTemps.unshift(temp)
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

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then((results) => {
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
        this.setState({savedAccelsx: savedAccelsx})
        AsyncStorage.setItem('lastAccelsData', JSON.stringify(savedAccelsx))
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals});
          }
          console.log('Connected to ' + peripheral.id);
		  curItem = peripheral;

          AsyncStorage.setItem("lastConnectedDevice", JSON.stringify(peripheral))

          setTimeout(() => {

            //Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);

              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              var service = 'fe84-0000-1000-8000-00805f9b34fb';
              var readCharacteristic = '2d30c082-f39f-4ce6-923f-3484ea480596';
              var writeCharacteristic = '2d30c083-f39f-4ce6-923f-3484ea480596';

              setTimeout(() => {
                BleManager.startNotification(peripheral.id, service, readCharacteristic).then((readData) => {
                  console.log('Started notification on ' + peripheral.id);
                  /*setTimeout(() => {
                    BleManager.write(peripheral.id, service, writeCharacteristic, [1]).then(() => {
                      console.log('Writed 1 to device');
                     /* BleManager.write(peripheral.id, service, writeCharacteristic, [1,95]).then(() => {
                        console.log('Writed 351 temperature, the pizza should be BAKED');
                        /*
                        var PizzaBakeResult = {
                          HALF_BAKED: 0,
                          BAKED:      1,
                          CRISPY:     2,
                          BURNT:      3,
                          ON_FIRE:    4
                        };///
                      });
                    });
                  }, 1500);*/
                }).catch((error) => {
                  console.log('Notification error', error);
                });
              }, 200);
            });

          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }
  }

  navigateToSavedDevice = () => {
    const navigateToSavedDevice = NavigationActions.navigate({
      routeName: "screenDevice",
      params: {}
    });
    this.props.navigation.dispatch(navigateToSavedDevice);
  };

  navigateToGraphDevice = () => {
    const navigateToGraphDevice = NavigationActions.navigate({
      routeName: "screenGraphDevice",
      params: {}
    });
    this.props.navigation.dispatch(navigateToGraphDevice);
  };

  storehere(){
    /*
    <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.startScan() }>
    <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
  </TouchableHighlight>
  <TouchableHighlight style={{marginTop: 0,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.retrieveConnected() }>
    <Text>Retrieve connected peripherals</Text>
  </TouchableHighlight>
<TouchableHighlight style={{marginTop: 0,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.handleWriteCharacteristic(curItem, 1) }>
    <Text>Toggle Orange LED On/Off</Text>
  </TouchableHighlight>
  */
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const dataSource = ds.cloneWithRows(list);


    return (
      <View style={styles.container}>
      <View style ={{alignItems: 'center'}}>
            <Text style = {styles.titleText}>
                SCAN DEVICES
            </Text>
        </View>
        <Button onPress={() => this.navigateToSavedDevice()} title="Saved Devices" />
        <Button onPress={() => this.navigateToGraphDevice()} title="View graphs of data" />

        <View style = {{justifyContent: 'center', margin:10}}>
          <Button onPress={() => this.startScan() } title= {this.state.scanning ? "Scan Bluetooth (on)" : "Scan Bluetooth (off)"} />
          <Button onPress={() => this.retrieveConnected() } title= "Retrieve connected peripherals" />
          <Button onPress={() => this.handleWriteCharacteristic(curItem, 1) } title= "Toggle Orange LED On/Off" />
        </View>

        <Button onPress={this.confirmDevicePrompt.bind(this)} title="Start reading values" />

        <Text> Last 20 accel values :[{savedAccels}] </Text>

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
              const color = item.connected ? 'green' : '#fff';
              return (
                <TouchableHighlight onPress={() => this.test(item) }>
                  <View style={[styles.row, {backgroundColor: color}]}>
                    <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                    <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
  titleText: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily : "Klavika Bold",
    fontSize: 40, 
    color: '#1c3d72'
},
});
