import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import AvatarComponent from '../../components/AvatarComponent'

export default class ProfileForm extends Component {

    state = {name: '', username:'', email: '', password: '', confirmPassword: '', loading: false, error: ''};

    createAccountPress() {

        if(this.state.email == '' || this.state.password == ''  || this.state.username == '' || this.state.name == ''){
            return Alert.alert("Please fill in the text fields")
        }

        if(this.state.password == this.state.confirmPassword){

            const email = this.state.email
            const password = this.state.password

            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                    .then(() => { this.setState({ error: '', loading: false }); })
                    .catch(() => {
                        this.setState({ error: 'Account creation failed', loading: false });
                    });
        }
        else{
           return this.setState({error: 'Account creation failed, please recheck the information and password'})
        }
            
    }
    render() {
        return (
            
            <View style={styles.formStyle}>
            <Text style = {styles.titleText}> Signup </Text>
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Name'
                        placeholder= 'Name'
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Username'
                        placeholder='Username'
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Password'
                        ref={(input)=> this.passwordInput = input}
                        placeholder='Password'
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Confirm Password'
                        ref={(input)=> this.passwordInput = input}
                        placeholder='Confirm Password'
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        secureTextEntry
                    />
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    <Button onPress={this.createAccountPress.bind(this)} title= "Create Account" />
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
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16

    },
    titleText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight : 'bold',
        fontSize: 30, 
        color: '#0b2c60'
    }
};
