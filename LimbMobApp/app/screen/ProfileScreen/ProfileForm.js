import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, ImageBackground, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import AvatarComponent from '../../components/AvatarComponent'
import { logout, navigateToLogoutScreen, login } from "../../Navigation/Actions/actionCreator";
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
				this.props.login();
            }

            if(newName){
                await firebase.auth().currentUser.updateProfile({displayName: newName}).then(function() {
                    // Update successful.
                }, function(error) {
                    alert("unable to update name")
                });
                
                await firebase.database().ref('users/'+ this.state.user.uid + '/name').set(newName)
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
            await firebase.database().ref('users/'+ this.state.user.uid + '/email').set(newEmail)
            var newUserData = this.state.user
            
            newUserData.email = newEmail
            
            await AsyncStorage.setItem('userData',JSON.stringify(newUserData))
            }

            alert("user profile updated!")
			this.props.login();
            }
            catch(error) {
                alert(error);
        }
    }

    changePassword = async ()=>{
        try{
          //const newPassword = this.state.newPassword
         
          await firebase.auth().sendPasswordResetEmail(this.state.user.email)
          
          alert("Email sent to change your password!")
          this.props.login();
        }
        catch(error) {
          alert(error);
        }
    }	

    render() {
        return (
            
            <View style={styles.formStyle}>
            <AvatarComponent/>

                    <Text style = {{fontFamily : "Klavika-Regular",fontSize: 20}}> Name </Text>
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
                    <Text style = {{fontFamily : "Klavika-Regular",fontSize: 20}}> Email </Text>
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
        paddingBottom: 10,

    },
    inputBox: {
        fontFamily : "Klavika-Regular",
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        //backgroundColor: 'rgba(240, 240,240,1)',
    }
};

const mapDispatchToProps = {
	navigateToLogoutScreen,
	logout,
	login
};



const ProfileForm = connect(null, mapDispatchToProps)(ProfileFormView);

export default withNavigation(ProfileForm);