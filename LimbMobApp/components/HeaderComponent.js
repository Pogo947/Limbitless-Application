
import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import {Home, Game, Settings} from '../screenNames'

export default class HeaderComponent extends Component<{}> {
    render(){
        return(
        <View style= {{
            height: 90,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>

        <TouchableHighlight
        style={{marginLeft:10, marginTop:20}}
        onPress={() => {
                    const {navigate} = this.props.navigation;
                    navigate('DrawerOpen');
                    }}>
            <Image
                style={{width: 30, height: 30}}
                source ={require('../resources/drawerIcons/Drawer_Button.png')}
                />
        </TouchableHighlight>
        </View>
        )
    }
}