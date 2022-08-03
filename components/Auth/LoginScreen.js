import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../AuthContext/context"
import Svg, { Path, Rect } from 'react-native-svg';
import GoogleComponent from '../SocialLinks/GoogleComponent'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'yurbagdasaryan96@gmail.com',
            password: 'asdasd',
            emailError: false,
            passwordError: false,
            location: ''
        };
    }

    static contextType = AuthContext

    goToFeeds = () => {

        fetch('http://bowy.ru/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }
            )
        })
            .then(response => response.json())
            .then(async (res) => {
                // console.log(res, "login")
                try {
                    if (res.data) {
                        if (res.data.email) {
                            this.setState({ emailError: res.data.email[0] })
                        } else {
                            this.setState({ emailError: false })
                        }
                        if (res.data.password) {
                            this.setState({ passwordError: res.data?.password[0] })
                        } else {
                            this.setState({ passwordError: false })
                        }
                        return
                    } else {
                        this.setState({ emailError: false, passwordError: false })
                    }


                    if (res.error_message) {
                        this.setState({ passwordError: res.error_message })
                        return;
                    } else {
                        this.setState({ emailError: false, passwordError: false })
                    }


                    if (res.token) {
                        await AsyncStorage.setItem("loggedUserID", `${res.user.id}`)
                        await AsyncStorage.setItem("userToken", `${res.token}`)
                        // await AsyncStorage.setItem("location", `${res.location}`)

                        if (Number(res.user.verified_code) === 1) {
                            this.props.navigation.navigate("Feeds")
                        } else {
                            this.props.navigation.navigate('ConfirmEmail')

                        }

                        const foundUser = {
                            email: this.state.email,
                            password: this.state.password,
                            token: res.token,
                            location: res.location
                        }
                        this.context.signIn(foundUser);

                        this.setState({
                            email: '',
                            password: '',
                            emailError: false,
                            passwordError: false,
                            location: ''
                        })
                    }
                } catch (e) {
                    console.log(e, "catch promise")
                }
            }).catch((e) => {
                console.log(e, "catch async")
            })
    }


    handleAuth = () => {
        this.props.navigation.navigate('Feeds')
    }

    goToRegister = () => {
        this.props.navigation.navigate('Register')
    }

    handleResetPassword = () => {
        this.props.navigation.navigate('ResetPassword')
    }






    // com
    //     () {
    //         this.focusListener = this.props.navigation.addListener("blur", () => {
    //             console.log("Gago")
    //
    //         })
    //     }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerComponent}>
                    <Text style={styles.inputText}>
                        Вход или {"\n"}
                        регистрация
                    </Text>
                </View>


                <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                    
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer}
                        style={{ width: "100%" }}
                    >

                        <View style={styles.inputView}>
                            {this.state.emailError !== false ? <Text
                                style={{
                                    width: "80%",
                                    textAlign: "left",
                                    color: 'red',
                                    fontSize: 12,
                                    marginBottom: 3,
                                    marginLeft: 4,
                                }}>
                                {this.state.emailError}
                            </Text> : null}
                            <TextInput
                                value={this.state.email}
                                onChangeText={(email) => this.setState({ email })}
                                placeholder='Логин'
                                style={styles.input}
                                underlineColorAndroid="transparent"
                            />
                        </View>

                        <View style={styles.inputView}>
                            {this.state.passwordError !== false ?
                                <Text style={{
                                    width: "80%",
                                    textAlign: "left",
                                    color: 'red',
                                    marginBottom: 3,
                                    marginLeft: 4,
                                    fontSize: 12,
                                }}>
                                    {this.state.passwordError}
                                </Text> : null}
                            <TextInput
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={true}
                                style={styles.input}
                                underlineColorAndroid='transparent'
                                placeholder="Пароль"
                            />
                        </View>


                        <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linearGradient}>

                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => this.goToFeeds()}
                            >
                                <Text style={styles.loginButtonText}>Войти</Text>
                            </TouchableOpacity>

                        </LinearGradient>


                        <Text style={styles.dontHaveAccount}>
                            Еще нет аккаунта?
                        </Text>

                        <TouchableOpacity style={styles.goToRegister} onPress={() => this.goToRegister()}>
                            <Text style={styles.goToRegisterText}>Зарегистрироваться</Text>
                        </TouchableOpacity>

                        <Text style={styles.dontHaveAccount}>
                            Забыли пароль?
                        </Text>
                        <TouchableOpacity style={styles.goToRegister} onPress={() => this.handleResetPassword()}>
                            <Text style={styles.goToRegisterText}>Восстановить Пароль</Text>
                        </TouchableOpacity>

                        {/* 
                        <View style={styles.socLinksWrapper}> */}

                        {/* 

                            <TouchableOpacity>
                                <Svg
                                    width={32}
                                    height={32}
                                    viewBox="0 0 815 815"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Rect
                                        x={50.9375}
                                        y={50.938}
                                        width={713.125}
                                        height={713.125}
                                        rx={6}
                                        fill="#2789F6"
                                    />
                                    <Path
                                        d="M583.828 466.947c-5.486-7.445-6.716-14.98-3.717-22.616 7.481-20.371 116.444-149.756 71.052-149.756-31.192.415-68.703 0-98.607 0-5.552 1.352-9.144 4.265-11.391 10.192-17.487 40.321-38.885 89.527-70.246 121.151-4.126 3.327-6.699 3.185-11.399 1.955-21.998-23.16 1.458-102.507-11.919-133.86-2.637-6.137-8.408-8.909-14.313-10.47-29.866-7.118-98.076-2.881-109.206 11.447-3.181 4.096-3.625 6.331-1.328 6.698 10.604 1.673 18.111 5.675 22.529 12.002 8.335 18.356 14.477 116.131-10.071 116.131-24.549 0-64.135-95.956-75.009-122.556-2.894-8.01-10.261-12.602-18.024-13.957l-72.626.555c-12.766 0-19.901 6.298-15.376 18.985 37.827 93.896 120.605 275.898 247.565 271.342 12.718 0 34.598 4.882 44.531-6.144 13.651-18.109-2.997-50.362 20.41-62.663 5.903-3.141 12.022-.508 17.093 3.354 26.036 19.825 39.859 54.621 71.967 65.185 5.645 1.859 10.592 2.325 14.839 1.395l67.852-1.115c12.598 0 25.007-5.605 22.4-20.665-9.892-32.297-49.31-65.496-77.006-96.59z"
                                        fill="#fff"
                                    />
                                </Svg>
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <FontAwesome5 name="odnoklassniki-square" size={32.5} color="orange" />
                            </TouchableOpacity> */}


                        {/* </View> */}
                        <GoogleComponent navigation={this.props.navigation} />

                        {/* 
                        <GoogleComponent /> */}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight + 30,
        paddingHorizontal: 20,
        position: 'relative'

    },
    headerComponent: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 30
    },
    inputText: {
        width: "100%",
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 38.4,
        fontSize: 32,
        color: '#424A55',
    },

    contentContainer: {
        // width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    inputView: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",

    },
    input: {
        width: "80%",
        height: 58,
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
    },

    loginButton: {
        fontSize: 14,
        color: 'white',
        width: 240,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'

    },
    loginButtonText: {
        color: 'white'
    },
    linearGradient: {
        width: "80%",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20
    },
    dontHaveAccount: {
        marginTop: 23,
        marginBottom: 5,
        fontWeight: 'normal',
        fontSize: 14,
        color: '#8B94A3'
    },
    goToRegister: {}, goToRegisterText: {
        color: '#34BE7C',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 20
    },
    socLinksWrapper: {
        marginVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "70%",
    },
    socLinkImg: {
        width: 32,
        height: 32
    }
});
