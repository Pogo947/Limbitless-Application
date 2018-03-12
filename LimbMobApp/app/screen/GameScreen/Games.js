import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, FlatList, Alert } from 'react-native';
import gameListData from './GamesList'


class FlatListItem extends Component {
    _onPress = () => {
        Alert.alert("You have pressed " + this.props.item.name)
     };

    render(){
      return(
        <TouchableHighlight onPress={this._onPress}>  
        <View style ={{
            flex: 1, 
            flexDirection: 'column'
        }}> 
            
                <View style = {{
                    flex:1, backgroundColor: '#00acea', flexDirection: 'row'
                }}>

                    <Image
                        source = {{uri: this.props.item.imageURL}}
                        style= {{width: 100, height: 100, margin: 5}}/>
                    <View style={{
                     flex: 1,
                        flexDirection: 'column'
                    }}>

                    <Text> {this.props.item.name} </Text>
                    <Text> {this.props.item.description} </Text>
                    </View>

                </View>
            
            <View style ={{
                 height: 10, 
                backgroundColor: 'white'
            }}/>

        </View>
        </TouchableHighlight>
        )
    }
}

export default class Games extends Component {

    render(){

        return(
        <View style={styles.MainContainer}>

        <Text style = {styles.titleText}>
           GAMES
        </Text>

        <FlatList
                data = {gameListData}
                renderItem ={({item,index})=>{
                    return(
                            <FlatListItem item ={item} index={index}/>
                    );
                }}

        />
       </View>

         )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
      },
    titleText: {
        fontWeight : 'bold',
        fontSize: 22, 
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0b2959'
    }
  });
  