import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, Platform, Image, ActivityIndicator,TouchableOpacity, AsyncStorage, PermissionsAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import { logout, navigateToLogoutScreen, login } from "../../Navigation/Actions/actionCreator";
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob' 
import ImagePicker from 'react-native-image-picker'


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
          uploadURL: "",
          newPic : false, 
          changePic: false,
          loading: false, 
          };
    }

    _pickImage = async () => {

        await this.setState({loading: true})
    
        await ImagePicker.launchImageLibrary({}, response  => {
          this.uploadImage(response.uri)
            .then(url => this.setState({ uploadURL: url, changePic: true, loading: false }))
            .catch(error => alert(error))
        })

        await this.storeUploadURL()
    }

    uploadImage = async (uri, mime = 'application/octet-stream') => {
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

        var uid = this.state.user.uid

        return new Promise((resolve, reject) => {
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
          let uploadBlob = null
          const sessionId = this.state.user.uid
          const imageRef = firebase.storage().ref('images/').child(uid)
      
          fs.readFile(uploadUri, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
              uploadBlob = blob
              return imageRef.put(uri, { contentType: mime });
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
            })
            .then((url) => {
              resolve(url)
            })
            .catch((error) => {
              reject(error)
          })
        })
      }

    storeUploadURL = async () => {
      try{
        
       const photoURL = this.state.uploadURL
       await AsyncStorage.setItem('uploadURL', photoURL)

        this.setState({changePic: false})

        alert("profile picture saved!")
        }
        catch(error){
            alert(error)
        }
    }

    fetchDataLocal = async ()=> {
        try{
            let userData = await AsyncStorage.getItem('userData');
            let uploadURL = await AsyncStorage.getItem('uploadURL');

            userData = JSON.parse(userData)

            this.setState({ user: userData, uploadURL: uploadURL});
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

    changeAvatar(){
        if(this.state.changePic == true){
        return (
            <View style = {{flexDirection: "row" ,justifyContent: 'space-between'}}>
                <Text style={{margin: 10, color : '#06a7e2',fontFamily : "MuseoSans"}} onPress = {()=> this._pickImage()}> 
                    Choose Profile Picture
                </Text>
                <Text style={{margin: 10, color : '#06a7e2',fontFamily : "MuseoSans"}} onPress = {()=> this.storeUploadURL()}> 
                    Save Profile Picture
                </Text>
            </View>
        )
        }
        else 
            return (
            <View style = {{flexDirection: "row" ,justifyContent: 'space-between'}}>
                <Text style={{margin: 10, color : '#06a7e2',fontFamily : "MuseoSans"}} onPress = {()=> this._pickImage()}> 
                    Choose Profile Picture
                </Text>
            </View>
            )
    }
    checkUploadURL(){
        if(this.state.uploadURL == "" || this.state.uploadURL == null){
            return (require('../../resources/testAvatar.png'))
        }
        else
            return ({uri: this.state.uploadURL})
    }
    showLoadingorPicture(){
        if(this.state.loading == true){
            return <ActivityIndicator size="large"/>
        }
        else if(this.state.newPic == true){
            return (
            <View style= {{alignItems: 'center',justifyContent: 'center',}}>
            <Image
                style ={{height:128, width: 128, borderRadius: 128/2, borderColor:'#0b2c60', 
                        borderWidth: 4}}
                source={{uri: this.state.uploadURL}}/>
            </View>)
        }
        else {
            return (
            <View style= {{alignItems: 'center',justifyContent: 'center',}}>
            <Image
                style ={{height:128, width: 128, borderRadius: 128/2, borderColor:'#0b2c60', 
                        borderWidth: 4}}
                source={this.checkUploadURL()}/>
            </View>
            )
        }
    }

    render() {
        return (
            
            <View style={styles.formStyle}>
                {this.changeAvatar()}
                {this.showLoadingorPicture()}
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
        flex: 0.9,
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
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 128
     }
};

const mapDispatchToProps = {
	navigateToLogoutScreen,
	logout,
	login
};



const ProfileForm = connect(null, mapDispatchToProps)(ProfileFormView);

export default withNavigation(ProfileForm);