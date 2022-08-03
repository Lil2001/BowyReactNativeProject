import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button, LogBox, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Modal } from 'react-native-paper';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

WebBrowser.maybeCompleteAuthSession();

export default function App(props) {
    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
    const [message, setMessage] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const { navigation } = props;

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "562234603734-g3ba8ovikekq3faqk4slhrkup8neeb43.apps.googleusercontent.com",
        iosClientId: "562234603734-rei7a3maqi29kekt5k8dktpelc3c5592.apps.googleusercontent.com",
        expoClientId: "562234603734-o35qjfbb42kb6hkv7fvlm00jsfpnntl4.apps.googleusercontent.com"
    });




    React.useEffect(() => {
        setMessage(JSON.stringify(response));
        if (response?.type === "success") {

            setAccessToken(response.authentication.accessToken);

            console.log(response.authentication.accessToken, 'response.authentication.accessToken')

        }
    }, [response]);

    async function getUserData() {

        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        userInfoResponse.json().then(data => {
            setUserInfo(data);
            let email = data.email
            console.log(email, 'email');
            sendUserData(email);

        });
    }


    async function setStorage(id, token, callback) {

        await AsyncStorage.setItem("loggedUserID", `${id}`)
        await AsyncStorage.setItem("userToken", `${token}`)

        callback();
    }

    async function sendUserData(userEmail) {
        fetch("http://bowy.ru/api/auth/google/callback", {
            method: "POST",
            body: JSON.stringify({
                email: userEmail
            }),
            headers: {
                "Content-type": "application/json;",
                Authorization: `Bearer + ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(json => {
                // setAccessToken(json.token)
                let token = json.token
                let userId = json.userdata.id

                setStorage(userId, token, function () {

                    navigation.navigate("Feeds")

                })
            })
    };



    if(accessToken) {
        return (

            <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute'
            }}>


                
                <Button
                        title={"Продолжить через Google!"}
                        onPress={getUserData}
                        style={{
                            position: 'absolute', 
                            top: 0
                            
                        }}
                    /> 
                
            </View>
    
        )
    }



    return (
        <View style={styles.container}>

          
            {!accessToken &&
                <TouchableOpacity
                    onPress={() => {
                        promptAsync({ useProxy: true, showInRecents: true })
                        if (promptAsync) {
                            setModalVisible(!modalVisible)
                        }
                    }}
                >
                    <Svg
                        width={32}
                        height={32}
                        viewBox="0 0 815 815"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"

                    >
                        <Path
                            d="M764.098 415.42c0-29.317-2.427-50.711-7.681-72.897H414.813v132.323h200.514c-4.041 32.884-25.871 82.406-74.384 115.684l-.68 4.43 108.009 82 7.483.732c68.724-62.201 108.343-153.72 108.343-262.272z"
                            fill="#4285F4"
                        />
                        <Path
                            d="M414.79 764.063c98.235 0 180.704-31.696 240.941-86.368L540.92 590.532c-30.724 20.998-71.96 35.657-126.13 35.657-96.214 0-177.875-62.199-206.985-148.171l-4.267.355-112.309 85.18-1.468 4.001c59.83 116.478 182.727 196.509 325.029 196.509z"
                            fill="#34A853"
                        />
                        <Path
                            d="M207.827 478.02c-7.681-22.186-12.127-45.959-12.127-70.521 0-24.564 4.446-48.334 11.722-70.52l-.203-4.725-113.717-86.547-3.72 1.734c-24.66 48.335-38.809 102.612-38.809 160.058s14.15 111.721 38.809 160.056l118.045-89.535z"
                            fill="#FBBC05"
                        />
                        <Path
                            d="M414.792 188.808c68.32 0 114.405 28.921 140.684 53.09l102.683-98.254c-63.064-57.446-145.132-92.706-243.367-92.706-142.303 0-265.2 80.028-325.031 196.504l117.641 89.538c29.514-85.971 111.175-148.172 207.39-148.172z"
                            fill="#EB4335"
                        />
                    </Svg>
                </TouchableOpacity>
            }

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // userInfo: {
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'red'

    // },
    profilePic: {
        width: 50,
        height: 50
    }
});
