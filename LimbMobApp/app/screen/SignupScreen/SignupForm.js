import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput} from 'react-native';
import firebase from 'react-native-firebase';
import AvatarComponent from '../../components/AvatarComponent'

export default class ProfileForm extends Component {

    state = {name: '', nickname:'', email: '', password: '', confirmPassword: '', loading: false, error: ''};

    createAccountPress() {

        if(this.state.email == '' || this.state.password == ''  || this.state.username == '' || this.state.name == ''){
            return Alert.alert("Please fill in the text fields")
        }

        if(this.state.password == this.state.confirmPassword){

            const email = this.state.email
            const password = this.state.password
            const name = this.state.name
            const nickname = this.state.nickname

            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                .then((user) => {
                    if (firebase.auth().currentUser) {
                        const userId = firebase.auth().currentUser.uid;

                        firebase.auth().currentUser.updateProfile({displayName: this.state.name})

                        if (userId) {
                            firebase.database().ref().child("users").child(userId).set({
                                uid: userId,
                                name: name,
                                email: email,
                                nickname: nickname,
                                devices: [],
                                currentlevel: 1,
                                maxlevel: 5
                         })
                        }
                    }
                })
                .catch(() => {
                    this.setState({ error: 'Account creation failed', loading: false });
                    return
                });
            //quickly logs onto user and sends email verfication, then logs off
            this.sendmail();
                
        }
        else{
           return this.setState({error: 'Account creation failed, please recheck the information or connection'})
        }
    }

    sendmail=()=>{
        const LogEmail = this.state.email
        const LogPassword = this.state.password
        setTimeout(function(){
            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(LogEmail, LogPassword)
            .then(firebase.auth().currentUser.sendEmailVerification())
            .catch(() => { Alert.alert("Email verfication was not sent")});

            Alert.alert("Verfication Email has been sent! Please check your email.")
        }, 5000);

        setTimeout(function(){
           firebase.auth().signOut()
           // Alert.alert("Signed Out")
        }, 10000);

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
                        onSubmitEditing={() => this.nickname.focus()}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Nickname'
                        placeholder='Nickname'
                        value={this.state.nickname}
                        ref={(input)=> this.nickname = input}
                        onChangeText={nickname => this.setState({ nickname })}
                        onSubmitEditing={() => this.email.focus()}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        ref={(input)=> this.email = input}
                        onChangeText={email => this.setState({ email })}
                        onSubmitEditing={() => this.passwordInput.focus()}
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
                        onSubmitEditing={() => this.confirmPassword.focus()}
                        secureTextEntry
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='white'
                        placeholderTextColor='white'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Confirm Password'
                        ref={(input)=> this.confirmPassword = input}
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
        color: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16

    },
    titleText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight : 'bold',
        fontSize: 30, 
        color: '#ffffff'
    }
};
