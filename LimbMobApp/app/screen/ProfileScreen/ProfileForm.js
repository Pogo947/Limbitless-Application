import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import AvatarComponent from '../../components/AvatarComponent'
import { logout, navigateToLogoutScreen } from "../../Navigation/Actions/actionCreator";
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class ProfileFormView extends Component {

    state = {name: '', username:'', nickname: '', email: '', password: '', error: '', loading: false};
	onLogOut() {
		firebase.auth().signOut();
		this.props.logout();
	}
    onChangePasswordPress() {
        /*
        const emailCred  = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser, currentPass);

        firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(emailCred)
            .then(()=> {
                const newPassword = password;
    
                return (firebase.auth().currentUser.updatePassword(newPass));
            })
            .catch(error => {
                
              });
              */
            
    }
    renderButtonOrLoading() {
        if (this.state.loading) {
            <Text>Loading</Text>
        }
        return <Button onPress={this.onChangePasswordPress.bind(this)} title="Change Password"/>;
    }
    render() {
        return (
            
            <View style={styles.formStyle}>
            <AvatarComponent/>
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Name'
                        placeholder= 'Name'
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Username'
                        placeholder='Username'
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        autoCapitalize="none"
                        autoCorrect = {false}
                        label='Nickname'
                        placeholder='Nickname'
                        value={this.state.nickname}
                        onChangeText={nickname => this.setState({ nickname })}
                    />
                    <TextInput style = {styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0.5)'
                        placeholderTextColor='rgba(0,0,0,0.8)'
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
                    <Button onPress={this.onLogOut.bind(this)} title= "sign out" />
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
        color: '#ffffff',
        backgroundColor: 'rgba(200,200,200,1)',
    }
};

const mapDispatchToProps = {
	navigateToLogoutScreen,
	logout
};



const ProfileForm = connect(null, mapDispatchToProps)(ProfileFormView);

export default withNavigation(ProfileForm);