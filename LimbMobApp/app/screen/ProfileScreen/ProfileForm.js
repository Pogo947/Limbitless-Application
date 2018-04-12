import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import AvatarComponent from '../../components/AvatarComponent'
import { logout, navigateToLogoutScreen } from "../../Navigation/Actions/actionCreator";
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class ProfileFormView extends Component {

    constructor() {
        super();
        this.state = {
            user: {
              name : "",
              email : "",
              photoUrl : "",
              emailVerified : true,
              uid : "",  
          },
          newName : "",
          newEmail : "",
          newPassword : "",
          };
      }

    fetchDataLocal = async ()=> {
        try{
            let userData = await AsyncStorage.getItem('userData');
            userData = JSON.parse(userData)

            this.setState({ user: userData});
        }
        catch(error) {
            alert(error);
        }
    }

    async componentWillMount(){
        await this.fetchDataLocal().done()
    }

	onLogOut() {
		firebase.auth().signOut();
		this.props.logout();
    }
    
    onUpdateProfilePress = async ()=> {
        try{
            let newName = this.state.newName
            let newEmail = this.state.newEmail

            if(newEmail == "" && newName == ""){
                return alert("nothing to update")
            }

            if(newName){
                await firebase.auth().currentUser.updateProfile({displayName: newName}).then(function() {
                    // Update successful.
                }, function(error) {
                    alert("unable to update name")
                });
            
                var newUserData = this.state.user

                newUserData.name = newName
            
                await AsyncStorage.setItem('userData', JSON.stringify(newUserData))

            }

            if(newEmail){
                await firebase.auth().currentUser.updateEmail(newEmail).then(function() {
            // Update successful.
                }, function(error) {
                    alert("unable to update email")
            });

        var newUserData = this.state.user

        newUserData.email.setItem(newEmail)
            
        await AsyncStorage.setItem('userData',JSON.stringify(newUserData))
        }

        alert("user profile updated!")
        }
        catch(error) {
            alert(error);
        }
    }

    async changePassword(){
        const newPassword = this.state.newPassword

        if(!newPassword == ""){
        await firebase.auth().currentUser.updatePassword(newPassword).then(function() {
            // Update successful.
          }, function(error) {
            alert("unable to update password")
          });
        }
        alert("Password Changed!")
    }

    render() {
        return (
            
            <View style={styles.formStyle}>
            <AvatarComponent/>
                    <Text> Name </Text>
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Name'
                        placeholder= {this.state.user.name}
                        value={this.state.newName}
                        onChangeText={newName => this.setState({ newName })}
                    />
                    <Text> Email </Text>
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Email'
                        placeholder= {this.state.user.email}
                        value={this.state.newEmail}
                        onChangeText={newEmail => this.setState({ newEmail })}
                    />
                    <Text> Password </Text>
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Password'
                        ref={(input)=> this.passwordInput = input}
                        placeholder= {'******'}
                        onChangeText={newPassword => this.setState({ newPassword })}
                        secureTextEntry
                    />
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                        <Button onPress={this.onUpdateProfilePress.bind(this)} title="Update Profile"/>
                        <Button onPress={this.changePassword.bind(this)} title="Change Password"/>
                    </View>
                    <Button onPress={this.onLogOut.bind(this)} title= "Sign out" />
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
        paddingHorizontal: 10,
        backgroundColor: 'rgba(240, 240,240,1)',
    }
};

const mapDispatchToProps = {
	navigateToLogoutScreen,
	logout
};



const ProfileForm = connect(null, mapDispatchToProps)(ProfileFormView);

export default withNavigation(ProfileForm);