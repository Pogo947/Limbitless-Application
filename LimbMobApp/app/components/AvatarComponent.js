import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image} from 'react-native';

const avatarSize = 156

export default class AvatarComponent extends Component {

    
    render(){
        return(
        <View style= {{
            alignItems: 'center',
            justifyContent: 'center',
        }}>

        <Image
                style ={{height:avatarSize, width: avatarSize, borderRadius: avatarSize/2, borderColor:'#0b2c60', 
                        borderWidth: 7}}
                source={require('../resources/testAvatar.png')}/>
         
        </View>
        )
    }
}
