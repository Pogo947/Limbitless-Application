import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import prompt from 'react-native-prompt-android';
import {login, register} from "../../Navigation/Actions/actionCreator";
import {connect} from "react-redux"
class LoginFormView extends Component {
    state = { email: '', password: '', error: '', loading: false};
    static navigationOptions = {
		title: "LoginForm"
	};
	
    onLoginPress = async ()=> {
        this.setState({ error: '', loading: true});

        const { email, password} = this.state;

        if(this.state.email == '' || this.state.password == ''){
            return Alert.alert("Please fill in the text fields")
        }

        await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false});

                user = firebase.auth().currentUser

                if(!user.emailVerified){
                    this.setState({ error: 'Account is not verified. Another email verification has been sent', loading: false });
                    firebase.auth().currentUser.sendEmailVerification()

                }
                else{
                    
                    //Alert.alert("Verified")
                    var userData = {
                        name : user.displayName,
                        email : user.email,
                        photoUrl : user.photoURL,
                        emailVerified : user.emailVerified,
                        uid : user.uid,  
                    }

                    firebase.database().ref().child("users/" + user.uid + "/email").set(user.email)

                    AsyncStorage.setItem('userData', JSON.stringify(userData))
                    
                    this.props.login(); 
                }

                
            })
            .catch(() => {
                this.setState({ error: 'Authentication failed.', loading: false });
            });
    }
	forgotPasswordPress(){
        prompt(
            'Enter your email address',
            'A reset password email will be sent to this address',
            [
             {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
             {text: 'OK', onPress: email => this.sendPasswordReset(email)},
            ],
            {   
                cancelable: true,
                placeholder: 'Email',
            }
          )
    }
    sendPasswordReset = async(email) =>{
        try{
            await firebase.auth().sendPasswordResetEmail(email)
        }
        catch(error){
            alert(error)
        }
    }
	onRegisterPress() {
		this.props.register();
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
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <Text style = {{paddingBottom: 40, color: 'rgba(255,255,255,0.8)', fontFamily : "MuseoSans", fontSize: 10}}> Forgot Username? Please contact us! </Text>
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
                    <View style = {{flexDirection: 'row'}}>
                        <Text style= {{margin: 5, color: 'rgba(255,255,255,0.8)', fontFamily : "MuseoSans", fontSize: 10}}> Forgot your password?? </Text>
                        <Text style={styles.signUpText} onPress = {()=> this.forgotPasswordPress()}> Reset Password </Text>
                    </View>
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    {this.renderButtonOrLoading()}
                    <View style = {{flexDirection: 'row', padding: 20}}>
                        <Text style= {{margin: 5, color: 'rgba(255,255,255,0.8)', fontFamily : "MuseoSans",}}> Don't have an account? </Text>
                        <Text style={{margin: 5, color : '#06a7e2',fontFamily : "MuseoSans"}} onPress = {()=> this.onRegisterPress()}> Sign up!</Text>
                    </View>
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
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputBox: {
        paddingVertical: 10,
        fontFamily : "MuseoSans",
        color: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    signUpText: {
        color : '#06a7e2',
        fontFamily : "MuseoSans",
        margin: 5,
        fontSize: 10
    }
};

const mapDispatchToProps = {
	login,
	register
};

const LoginForm = connect(null, mapDispatchToProps)(LoginFormView)

export default LoginForm;