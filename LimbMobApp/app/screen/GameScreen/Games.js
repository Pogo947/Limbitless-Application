import React, { Component } from 'react';
import {Platform, StyleSheet, Text,  View, TouchableHighlight, Image, FlatList, Alert } from 'react-native';
import firebase from 'react-native-firebase';
//import gameListData from './GamesList'


class FlatListItem extends Component {
    _onPress = () => {
        Alert.alert("You have pressed " + this.props.item.name)
     };

    render(){
      return(
        
        <View style ={{
            flex: 1, 
            flexDirection: 'column'
        }}> 
            <TouchableHighlight onPress={this._onPress}>  
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
            </TouchableHighlight>    
            <View style ={{
                 height: 10, 
                backgroundColor: 'white'
            }}/>

        </View>
        
        )
    }
}

export default class Games extends Component {

    constructor(){
        super()
        this.state = {
            dataSource: []
        }
    }

    componentDidMount(){

        firebase.database().ref('games/').on("value", snapshot => {
            this.setState({dataSource: snapshot.val()})
             })

    }

    render(){

        return(
        <View style={styles.MainContainer}>

        <View style = {{alignItems: 'center'}}>
        <Text style = {styles.titleText}>
           GAMES
        </Text>
        </View>
        <FlatList
                data = {this.state.dataSource}
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
        alignItems: 'center',
        fontFamily : "Klavika Bold",
        fontSize: 40, 
        color: '#1c3d72'
    }
  });
  