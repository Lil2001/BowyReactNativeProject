import React, {Component} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert, StatusBar} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {editCarStyles} from "../EditCar/EditCarStyles";


export default class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

            confirmCode: '',
            password: "",
            resetPassword: "",

            confirmCodeError: null,
            passwordError: null,
            resetPasswordError: null,
            successMessage: false
        }
    }

    changePassword = () => {


        if (!this.state.confirmCode.length || !this.state.password.length || !this.state.resetPassword.length) {
            if (!this.state.confirmCode.length) {
                this.setState({confirmCodeError: "Данное поле необходимо заполнить"})
            }else {
                this.setState({confirmCodeError: null})
            }
            if (!this.state.password.length) {
                this.setState(
                    {passwordError: "Данное поле необходимо заполнить"})
            }else {
                this.setState({passwordError: null})
            }
            if (!this.state.resetPassword.length) {
                this.setState({resetPasswordError: "Данное поле необходимо заполнить"})
            }else {
                this.setState({resetPasswordError: null})
            }
            return;
        }else {
            this.setState({
                confirmCodeError: null,
                passwordError: null,
                resetPasswordError: null,
            })
        }

        if (this.state.password !== this.state.resetPassword) {
            this.setState({passwordError: "Пароли не совпадают"})
            return
        }


        fetch("http://bowy.ru/api/restore-password", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                random_int: this.state.confirmCode,
                password: this.state.password,
                password_confirmation: this.state.resetPassword
            })
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status) {
                    this.setState({
                        confirmCode: '',
                        password: "",
                        resetPassword: "",
                        successMessage: true
                    })

                    setTimeout(() => {
                        this.setState({successMessage: false})
                        this.props.navigation.navigate("Login")
                    }, 2000)
                } else if (res.status === false) {

                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.inputText}>
                    Восстановить пароль?
                </Text>


                {this.state.successMessage &&
                <Text style={styles.successMessageStyle}>Ваш пароль успешно изменен!</Text>}
                <View style={styles.inputComponent}>


                    <View style={{alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
                        {this.state.confirmCodeError && <Text style={{
                            width: "100%",
                            textAlign: "left",
                            color: 'red',
                            marginBottom: 3,
                            marginLeft: 4,
                            fontSize: 12,
                        }}>
                            {this.state.confirmCodeError}
                        </Text>}
                        <TextInput
                            value={this.state.confirmCode}
                            onChangeText={(confirmCode) => this.setState({confirmCode})}
                            style={[styles.input, this.state.confirmCodeError ? {
                                borderWidth: 1,
                                borderColor: "red"
                            } : null]}
                            underlineColorAndroid='transparent'
                            placeholder="Код подтверждения"
                            keyboardType={"numeric"}
                        />
                    </View>


                    <View style={{alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
                        {this.state.passwordError && <Text style={{
                            width: "100%",
                            textAlign: "left",
                            color: 'red',
                            marginBottom: 3,
                            marginLeft: 4,
                            fontSize: 12,
                        }}>
                            {this.state.passwordError}
                        </Text>}
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            style={[styles.input, this.state.passwordError ? {
                                borderWidth: 1,
                                borderColor: "red"
                            } : null]}
                            underlineColorAndroid='transparent'
                            placeholder="Пароль"
                            secureTextEntry={true}
                        />

                    </View>


                    <View style={{alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
                        {this.state.resetPasswordError && <Text style={{
                            width: "100%",
                            textAlign: "left",
                            color: 'red',
                            marginBottom: 3,
                            marginLeft: 4,
                            fontSize: 12,
                        }}>
                            {this.state.resetPasswordError}
                        </Text>}
                        <TextInput
                            value={this.state.resetPassword}
                            onChangeText={(resetPassword) => this.setState({resetPassword})}
                            secureTextEntry={true}
                            style={[styles.input, this.state.resetPasswordError ? {
                                borderWidth: 1,
                                borderColor: "red"
                            } : null]}
                            underlineColorAndroid='transparent'
                            placeholder="Повторить пароль"
                        />

                    </View>


                    <TouchableOpacity style={{width: "90%", alignItems: "center"}} onPress={this.changePassword}>
                        <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={styles.linearGradient}>

                            <Text style={{textAlign: 'center', color: 'white'}}>
                                Продолжить
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight + 5,
        paddingHorizontal: 30,
    },
    inputText: {
        width: "100%",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#424A55',
        paddingTop: 20,
        marginBottom: 20
    },
    inputComponent: {
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    input: {
        width: "100%",
        height: 58,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
    },
    linearGradient: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 5,
    },
    successMessageStyle: {
        color: "green",
        fontSize: 15,
        textAlign: "center"
    },
})
