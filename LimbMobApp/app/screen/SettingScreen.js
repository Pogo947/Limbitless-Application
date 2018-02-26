import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image } from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import { Settings } from '../screenNames';
import HeaderComponent from '../components/HeaderComponent';

export default class SettingScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Settings';
        let drawerIcon = () => (
            <Image
                    source={require('../resources/drawerIcons/Settings_Button.png')}
                    style = {{height: 30, width: 30}}
            /> 
           );
      return {drawerLabel, drawerIcon};
    }
    render(){

        return(
       
        <View style={styles.MainContainer}>

        <HeaderComponent {...this.props}/>

        <Text style= {{fontWeight : 'bold', fontSize: 22, color: 'black'}}
           onPress={() => {
               const {navigate} = this.props.navigation;
               navigate('DrawerOpen');
               }}>
           This is text of the Settings screen, pressing this will
               bring out the drawer </Text>
       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
  });
  