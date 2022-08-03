import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ScrollView,
    Animated,
    Modal
} from 'react-native';
import {AntDesign, FontAwesome5} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, {Path, Rect} from 'react-native-svg';


class ModalPopup extends Component {
    constructor(props) {
        super(props);
        this.shown = React.createRef();
        this.shown.current = new Animated.Value(0)
    }

    toggleModal = () => {
        if (this.props.modalVisible) {
            Animated.timing(this.shown.current, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true
            }).start()
        } else {
            Animated.spring(this.shown.current, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }).start()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.toggleModal()
    }

    render() {
        return (
            <Modal transparent
                   visible={this.props.visible}>
                <View style={styles.modalBackground}>
                    <Animated.View style={[styles.modalContainer, {transform: [{scale: this.shown.current}]}]}>
                        <View style={{alignItems: "center"}}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={this.props.closePopup}>
                                    <AntDesign name="closecircleo" size={24} color="black"/>
                                </TouchableOpacity>
                            </View>
                            <Svg
                                style={{width: 150, height: 150, marginVertical: 15,}}
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 117.72 117.72"
                                xmlSpace="preserve"
                                enableBackground="new 0 0 117.72 117.72"

                            >
                                <Path
                                    d="M58.86 0c9.13 0 17.77 2.08 25.49 5.79-3.16 2.5-6.09 4.9-8.82 7.21a48.673 48.673 0 00-16.66-2.92c-13.47 0-25.67 5.46-34.49 14.29-8.83 8.83-14.29 21.02-14.29 34.49 0 13.47 5.46 25.66 14.29 34.49 8.83 8.83 21.02 14.29 34.49 14.29s25.67-5.46 34.49-14.29c8.83-8.83 14.29-21.02 14.29-34.49 0-3.2-.31-6.34-.9-9.37 2.53-3.3 5.12-6.59 7.77-9.85a58.762 58.762 0 013.21 19.22c0 16.25-6.59 30.97-17.24 41.62-10.65 10.65-25.37 17.24-41.62 17.24-16.25 0-30.97-6.59-41.62-17.24C6.59 89.83 0 75.11 0 58.86c0-16.25 6.59-30.97 17.24-41.62S42.61 0 58.86 0zM31.44 49.19L45.8 49l1.07.28c2.9 1.67 5.63 3.58 8.18 5.74a56.18 56.18 0 015.27 5.1c5.15-8.29 10.64-15.9 16.44-22.9a196.16 196.16 0 0120.17-20.98l1.4-.54H114l-3.16 3.51C101.13 30 92.32 41.15 84.36 52.65a325.966 325.966 0 00-21.41 35.62l-1.97 3.8-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63-4.77-5.88-10.32-11.1-16.79-15.54l1.17-3.84z"
                                    fill="#01a601"
                                />
                            </Svg>
                            <Text style={{
                                marginTop: 30,
                                fontSize: 20,
                                textAlign: "center"
                            }}>Вы успешно {"\n"} зарегистрировались{"\n"} </Text>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}


export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.pin1Ref = React.createRef()
        this.pin2Ref = React.createRef()
        this.pin3Ref = React.createRef()
        this.pin4Ref = React.createRef()
        this.pin5Ref = React.createRef()
        this.pin6Ref = React.createRef()


        this.state = {
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: "",
            modalVisible: false,
            wrongVerificationMessage: false,
            sendBan: false,
            sendAgainTime: 10
        };
    }

    async componentDidMount() {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let userID = await AsyncStorage.getItem("loggedUserID")
            let location = await AsyncStorage.getItem('location')
            console.log(userToken, "token")
            console.log(userID, "id")
            console.log(location,'location')
        } catch (e) {
            //
        }

    }

    repeatVerifyCode = async () => {
        this.setState({
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: "",
            wrongVerificationMessage: false,
        })
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            console.log(AuthStr)
            fetch("http://bowy.ru/api/coderepeat", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    'Authorization': AuthStr,
                },
            })
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    console.log(res, "krknel")
                    this.setState({sendBan: true})
                    const int = setInterval(() => {
                        this.setState(prevState => {
                            return {
                                sendAgainTime: prevState.sendAgainTime - 1
                            }
                        })
                        if (this.state.sendAgainTime === 0) {
                            // this.setState({sendBan: true})
                            clearInterval(int)
                            this.setState({
                                sendAgainTime: 10,
                                sendBan: false
                            })
                        }
                    }, 1000)
                }).catch(() => {
                console.log("catch")
            })


        } catch (e) {
        }
    }

    handleRegistration = async () => {
        const {pin1, pin2, pin3, pin4, pin5, pin6} = this.state
        const authCode = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            let location = await AsyncStorage.getItem("location")
            fetch("http://bowy.ru/api/verifycode", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthStr,
                },
                body: JSON.stringify({verified_code: Number(authCode)})
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res, "res")
                    if (res.success) {
                        this.setState({
                            pin1: "",
                            pin2: "",
                            pin3: "",
                            pin4: "",
                            pin5: "",
                            pin6: "",
                            modalVisible: true,
                            wrongVerificationMessage: false,
                        })
                        setTimeout(() => {
                            this.setState({
                                modalVisible: false,
                            })
                            this.props.navigation.navigate("Feeds")
                        }, 1500)
                    } else {
                        this.setState({wrongVerificationMessage: true})
                    }


                }).catch(() => {
                console.log("catch")
            })


        } catch (e) {
        }
    }


    render() {
        const {pin1, pin2, pin3, pin4, pin5, pin6} = this.state
        return (
            <View style={styles.container}>

                <ModalPopup visible={this.state.modalVisible} closePopup={() => {
                    this.setState({modalVisible: false})
                }}>

                </ModalPopup>
                

                <View style={styles.header}>
                    <Text style={styles.headerText}>Подтверждение {"\n"} электронного {"\n"} адреса</Text>
                </View>

                <Text style={styles.messageInfo}>
                    На вашу электронную почту отправлен код подтверждения. Введите его ниже, чтобы закончить
                    регистрацию
                </Text>

                {this.state.wrongVerificationMessage &&
                <Text style={styles.errorMessage}>Неверный код подтверждения</Text>}
                <View style={styles.confirmView}>
                    <TextInput
                        ref={this.pin1Ref}
                        value={pin1}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        onChangeText={(pin1) => {
                            this.setState({pin1})
                            if (pin1.length) {
                                this.pin2Ref.current.focus()
                            }else {
                                this.pin1Ref.current.blur()
                            }
                        }
                        }
                        maxLength={1}
                    />
                    <TextInput
                        ref={this.pin2Ref}
                        value={pin2}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        onChangeText={(pin2) => {
                            this.setState({pin2})
                            if (pin2.length) {
                                this.pin3Ref.current.focus()
                            }else{
                                this.pin1Ref.current.focus()
                            }
                        }
                        }
                        maxLength={1}
                    />
                    <TextInput
                        ref={this.pin3Ref}
                        value={pin3}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        onChangeText={(pin3) => {
                            this.setState({pin3})
                            if (pin3.length) {
                                this.pin4Ref.current.focus()
                            }else{
                                this.pin2Ref.current.focus()
                            }
                        }
                        }
                        maxLength={1}
                    />
                    <TextInput
                        ref={this.pin4Ref}

                        value={pin4}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        onChangeText={(pin4) => {
                            this.setState({pin4})
                            if (pin4.length) {
                                this.pin5Ref.current.focus()
                            }else{
                                this.pin3Ref.current.focus()
                            }
                        }
                        }
                        maxLength={1}
                    />
                    <TextInput
                        ref={this.pin5Ref}

                        value={pin5}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        onChangeText={(pin5) => {
                            this.setState({pin5})
                            if (pin5.length) {
                                this.pin6Ref.current.focus()
                            }else{
                                this.pin4Ref.current.focus()
                            }
                        }
                        }
                        maxLength={1}
                    />
                    <TextInput
                        ref={this.pin6Ref}
                        value={pin6}
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        onChangeText={(pin6) => {
                            this.setState({pin6})
                            if (pin6.length) {
                                this.pin6Ref.current.blur()
                            }else{
                                this.pin5Ref.current.focus()
                            }
                        }
                        }
                        maxLength={1}
                    />
                </View>

                <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linearGradient}>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.handleRegistration}

                    >
                        <Text style={styles.loginButtonText}>Подтвердить</Text>
                    </TouchableOpacity>

                </LinearGradient>


                {!this.state.sendBan ?
                    <TouchableOpacity onPress={this.repeatVerifyCode}>
                        <Text style={{textAlign: "center", color: "gray", fontSize: 16, marginTop: 10}}>Запросить код
                            повторно</Text>
                    </TouchableOpacity> :
                    <View>
                        <Text style={{
                            textAlign: "center",
                            color: "gray",
                            fontSize: 16,
                            marginTop: 10
                        }}>{`Отправить еще раз через ${this.state.sendAgainTime} секунд`}</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight + 10,
        paddingHorizontal: 20,
    },
    header: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        width: "80%",
        textAlign: 'left',
        fontWeight: 'bold',
        lineHeight: 38.4,
        marginBottom: 20,
        fontSize: 32,
        color: '#424A55'
    },
    messageInfo: {
        width: "80%",
        textAlign: 'left',
        lineHeight: 20,
        marginBottom: 20,
        fontSize: 16,
        color: '#424A55'
    },
    confirmView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    textInput: {
        width: 45,
        height: 52,
        borderRadius: 7,
        paddingHorizontal: 18,
        backgroundColor: "#E9E9E9"
    },
    linearGradient: {
        width: "80%",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
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
        color: 'white',
        fontSize: 18,
        fontWeight: "700"
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    },
    modalHeader: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    errorMessage: {
        color: "#940000",
        fontSize: 15,
        marginVertical: 5,
        fontWeight: "300"
    }


});


