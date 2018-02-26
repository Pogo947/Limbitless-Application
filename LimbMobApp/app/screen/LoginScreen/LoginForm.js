import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import { TabNavigator} from 'react-navigation';
import { Home }  from '../screenNames';


export default class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false, loggedIn: false };
    onLoginPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;

        if(this.state.email == '' || this.state.password == ''){
            return Alert.alert("Please fill in the text fields")
        }

        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        /*
            .then(() => { this.setState({ error: '', loading: false}); })
            .catch(() => {
                //this.setState({ error: 'Authentication failed.', loading: false });
             //Login was not successful, let's create a new account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => { this.setState({ error: '', loading: false }); })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false });
                    });
                 
            });
            */
			if(this.state.loggedIn == true){
				navigate('HomeScreen');
			}
    }
    renderButtonOrLoading() {
        if (this.state.loading) {
            <Text>Loading</Text>
        }
        return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
    }
    render() {
        return (
            <View style={styles.formStyle}>
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(255,255,255,0.5)'
                        placeholderTextColor='rgba(255,255,255,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Email Address'
                        placeholder='Email Address'
                        value={this.state.email}g
                        onChangeText={email => this.setState({ email })}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(255,255,255,0.5)'
                        placeholderTextColor='rgba(255,255,255,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Password'
                        ref={(input)=> this.passwordInput = input}
                        placeholder='Password'
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    {this.renderButtonOrLoading()}
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    formStyle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputBox: {
        paddingVertical: 10,
        color: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0)',
    },
};