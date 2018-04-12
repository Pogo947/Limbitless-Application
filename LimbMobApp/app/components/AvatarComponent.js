import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image} from 'react-native';

const avatarSize = 128

export default class AvatarComponent extends Component {

    
    render(){
        return(
        <View style= {{
            alignItems: 'center',
            justifyContent: 'center',
        }}>

        <Image
                style ={{height:avatarSize, width: avatarSize, borderRadius: avatarSize/2, borderColor:'#0b2c60', 
                        borderWidth: 4}}
                source={require('../resources/testAvatar.png')}/>
         
        </View>
        )
    }
}
