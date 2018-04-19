import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, AsyncStorage, Image, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {registersuccess, logout} from "../../Navigation/Actions/actionCreator";
import {connect} from 'react-redux';
import {NavigationActions} from "react-navigation";
 class SignupFormView extends Component {

    state = {name: '', nickname:'', email: '', password: '', confirmPassword: '', loading: false, error: '', agree: false};

    loadingText(){
        if(this.state.loading == true){
            return "Loading... Please wait"
        }
        else {
            return 
        }
    }
	static navigationOptions = {
		title: "SignupForm"
	};
	
	navigate = () => {
		const navigateToLogin = NavigationActions.navigate({
			routeName: "login",
			params: {}
		});
		this.props.navigation.dispatch(navigateToLogin);
	};
    createAccountPress = async ()=> {
      try{

        if(this.state.email == '' || this.state.password == ''  || this.state.username == '' || this.state.name == ''){
            return Alert.alert("Please fill in the text fields")
        }

        if(this.state.agree == false){
            return Alert.alert("Please accept our terms and conditions")
        }

        if(this.state.password == this.state.confirmPassword){

            const email = this.state.email
            const password = this.state.password
            const name = this.state.name
            const nickname = this.state.nickname

            await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
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
                         this.setState({loading: true})
                         AsyncStorage.setItem('level', "1")
                         AsyncStorage.setItem('maxlevel', "5")
                        }
                    }
                })
                .catch(() => {
                    this.setState({ error: 'Account creation failed', loading: false });
                    return
                });
            //quickly logs onto user and sends email verfication, then logs off
            await this.sendmail();

            }
        }
      catch(error) {
            alert(error);
      }
    }

    sendmail= async ()=>{
      try{
        const LogEmail = this.state.email
        const LogPassword = this.state.password
  
        await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(LogEmail, LogPassword)
            .then(firebase.auth().currentUser.sendEmailVerification())
            .catch(() => { Alert.alert("Email verfication was not sent")});

        Alert.alert("Verfication Email has been sent! Please check your email.")
        
        this.setState({loading: false})

        }
      catch(error) {
            alert(error);
      }

    }

    setTermsandConditions(){
        if(this.state.agree == true){
            this.setState({agree: false})
        }
        else{
            this.setState({agree: true})
        }
        
    }
    showTermsandConditions(){

        if(this.state.agree == true){

            return (
                <TouchableOpacity onPress={()=> this.setTermsandConditions()}>
                    <Image
                        source = {require('../../resources/checkbox_yes.png')} 
                        style= {{width: 30, height: 30, margin: 5}}/>
                </TouchableOpacity>)
        }
        else{

            return (
                <TouchableOpacity onPress={()=> this.setTermsandConditions()}>
                    <Image
                        source = {require('../../resources/checkbox_no.png')} 
                        style= {{width: 30, height: 30, margin: 5}}/>
                </TouchableOpacity>)
        }

    }

    textTermsandConditions(){
        Alert.alert(
            'Terms and Conditions',
            'Terms and conditions go here, Vivamus vitae sodales neque. Duis eu urna sit amet augue faucibus ultrices in vel lectus. Curabitur est dui, tempus sit amet libero quis, ullamcorper viverra arcu. Nam et risus ac sapien hendrerit luctus. Curabitur commodo magna vel mi tempor, eu cursus libero molestie. Curabitur commodo pharetra iaculis. Suspendisse eleifend porta risus sed semper. Phasellus sollicitudin, nibh pharetra tincidunt posuere, erat massa iaculis ipsum, a aliquet eros lorem eu nibh. Mauris turpis nunc, iaculis ac sem id, scelerisque faucibus dolor. Sed at augue neque. Mauris at dolor at velit ultricies gravida. Aliquam semper lacus non convallis vehicula. In hac habitasse platea dictumst. Vivamus ultricies tellus quis libero tincidunt, at aliquam justo blandit.',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Accept', onPress: () => this.setTermsandConditions()},
            ],
            { cancelable: true }
          )
    }


    render() {
        return (
            
            <View style={styles.formStyle}>
            <Text style = {styles.titleText}> Signup </Text>
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(255,255,255,0.5)'
                        placeholderTextColor='rgba(255,255,255,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Name'
                        placeholder= 'Name'
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        onSubmitEditing={() => this.nickname.focus()}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(255,255,255,0.5)'
                        placeholderTextColor='rgba(255,255,255,0.8)'
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
                        underlineColorAndroid='rgba(255,255,255,0.5)'
                        placeholderTextColor='rgba(255,255,255,0.8)'
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
                        underlineColorAndroid='rgba(255,255,255,0.5)'
                        placeholderTextColor='rgba(255,255,255,0.8)'
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
                        underlineColorAndroid='rgba(255,255,255,0.5)'
                        placeholderTextColor='rgba(255,255,255,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Confirm Password'
                        ref={(input)=> this.confirmPassword = input}
                        placeholder='Confirm Password'
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        secureTextEntry
                    />
                    <Text style = {{color: 'white'}}>{this.loadingText()}</Text>
                    <View style = {{flexDirection: 'row', padding: 5, justifyContent: 'center'}}>
                        {this.showTermsandConditions()}
                        <View style = {{flexDirection: 'row', padding: 5, justifyContent: 'center'}}>
                            <Text style= {{color: 'rgba(255,255,255,0.8)', fontFamily : "MuseoSans", marginTop: 5}} >Please accept our </Text>
                            <Text style = {styles.signUpText} onPress = {() => this.textTermsandConditions()}>terms and conditions  </Text>
                        </View>
                    </View>
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    <Button onPress={this.createAccountPress.bind(this)} title= "Create Account" />
                    <View style = {{flexDirection: 'row', padding: 20, justifyContent: 'center'}}>
                        <Text style= {{margin: 5, color: 'rgba(255,255,255,0.8)', fontFamily : "MuseoSans",}}> Already have an account? </Text>
                        <Text style={styles.signUpText} onPress = {() => this.props.logout()}> Log in!</Text>
                    </View>
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        color: '#E64A19',
        fontFamily : "MuseoSans",
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
        fontFamily : "MuseoSans",
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16

    },
    titleText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily : "MuseoSans",
        fontSize: 30, 
        color: '#ffffff'
    },
	signUpText: {
        color : '#06a7e2',
        fontFamily : "MuseoSans",
        margin: 5
    }
};

const mapDispatchToProps = {
	registersuccess,
	logout
};

const SignupForm = connect(null, mapDispatchToProps)(SignupFormView)

export default SignupForm;
