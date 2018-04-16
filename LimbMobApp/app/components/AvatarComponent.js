import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, AsyncStorage} from 'react-native';

const avatarSize = 176

export default class AvatarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            key: ""
          };
    }

    async componentWillMount(){
        this.fetchDataLocal().done()
    }

    checkUploadURL(){
        if(this.state.image == "" || this.state.image == null){
            return (require('../resources/testAvatar.png'))
        }
        else
            return ({uri: this.state.image})
    }

    fetchDataLocal = async ()=> {
        try{
            let uploadURL = await AsyncStorage.getItem('uploadURL');

            this.setState({image: uploadURL});

        }
        catch(error) {
            alert(error);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          image: nextProps.image,
          key : nextProps.key 
        })
    }

    render(){

        imageSource = this.state.image
        sentKey = this.state.key

        return(
        <View style= {{
            alignItems: 'center',
            justifyContent: 'center',
        }}>

        <Image
                key={sentKey}
                fadeDuration={1}
                style ={{height:avatarSize, width: avatarSize, borderRadius: avatarSize/2, borderColor:'#0b2c60', 
                        borderWidth: 4}}
                source={this.checkUploadURL()}/>
         
        </View>
        )
    }
}
