import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native'
import { AreaChart  } from 'react-native-svg-charts'
import { Path } from 'react-native-svg'
import * as shape from 'd3-shape'

export default class DeviceGraphsScreen extends Component {
    constructor() {
        super();
        this.state = { 
            data: [0,1,2,3,4,5],
            lastConnectedDevice: null 
        } 
      }
    
    async componentWillMount(){
        this.fetchDataLocal().done()
    }

    fetchDataLocal = async ()=> {
        try{
  
            let lastConnectedDevice = await AsyncStorage.getItem('lastConnectedDevice')
            let lastAccelsData = await AsyncStorage.getItem('lastAccelsData')
            
            lastAccelsData = JSON.parse(lastAccelsData)
            lastConnectedDevice = JSON.parse(lastConnectedDevice)
  
            //alert(lastAccelsData)
            let arrayData = []

            for(var x in lastAccelsData){
                arrayData.push(lastAccelsData[x])
            }

            this.setState({
                data: arrayData, lastConnectedDevice: lastConnectedDevice});
        }
        catch(error) {
            alert(error);
        }
    }


    render() {

        var data= []
        var temp = this.state.data

        for(i = 0; i < temp.length; i++){
            data[i] = Number.parseFloat(temp[i])
        }

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                fill={'none'}
            />
        )


        return (
            <AreaChart
                style={{ height: 100 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                extras={[ Line ]}
            />
        )
    }

}
