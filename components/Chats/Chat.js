import React, { Component } from 'react';
import {
    View,
    Platform,
    TextInput, StyleSheet, StatusBar, Dimensions, ScrollView, Image, Text, TouchableOpacity, createStackNavigator,
    Modal, TouchableHighlight, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatStyles } from './ChatStyles';
import { feedsStyles } from "../Feeds/feedsStyles";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";



const wishIcons = [
    require('../../assets/img/addinwishactive.png')
];



export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userChatData: [],
            userChatDataFirst: [],
            searchValue: "",
        };
    }

    openSingleMessage = (data) => {
        this.props.navigation.navigate('SingleCar', {
            params: data,
        })
    };




    searchItems = (value) => {
        const { userChatData } = this.state
        const filteredProducts = []

        if (value.trim().length > 1) {
            userChatData.map((item) => {
                if (item.user_name.toUpperCase().includes(value.trim().toUpperCase())) {
                    filteredProducts.push(item)
                }
                this.setState({ userChatData: filteredProducts })
            })
        } else if (value.trim().length === 1) {
            this.setState({ userChatData: this.state.userChatDataFirst })
            console.log(userChatData, 'dgr')
        }

    }


    sendToSingleMessage = (result) => {


        this.props.navigation.navigate('SingleMessage', {
            params: result.product_id,
            data: result.user_name,
            same: result.user_image,
            coins: result.product_price,
            header: result.product_headline
        })

    }

    handleGetChat = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        fetch(`http://bowy.ru/api/rightsidechat`, {
            method: 'GET',
            headers: {
                'Authorization': AuthStr,
                "content-type": "application/json",
            },
        }).then(response => response.json())
            .then((res) => {
                let userschatdata = res.userschatdata
                this.setState({
                    userschatdata: userschatdata
                })

                if (this.state.userChatData.length === 0) {
                    this.setState({
                        userChatData: userschatdata,
                        userChatDataFirst: userschatdata

                    })

                }

            })
    }



    componentDidMount() {
        const { navigation } = this.props;

        this.handleGetChat();
        this.focusListener = navigation.addListener("focus", () => {
            this.handleGetChat();

        });
    }

    render() {
        return (
            <View style={ChatStyles.wishhListScreenMainView}>

                <View style={ChatStyles.textInputWrapperStyle}>

                    <View style={ChatStyles.textInputContainerStyle}>

                        <TouchableOpacity>
                            <Svg
                                style={ChatStyles.textInputImg}
                                viewBox="0 0 630 630"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"

                            >
                                <Path
                                    d="M497.21 453.435l132.594 132.563-43.806 43.807L453.434 497.21a277.383 277.383 0 01-173.893 60.957C125.74 558.167.917 433.343.917 279.542S125.74.917 279.54.917c153.801 0 278.625 124.824 278.625 278.625a277.39 277.39 0 01-60.956 173.893zm-62.103-22.971a215.995 215.995 0 0061.143-150.922c0-119.747-96.993-216.708-216.709-216.708-119.746 0-216.708 96.961-216.708 216.708 0 119.716 96.962 216.708 216.708 216.708a215.996 215.996 0 00150.922-61.142l4.644-4.644z"
                                    fill="#9AA1B4"
                                />
                            </Svg>
                        </TouchableOpacity>

                        <TextInput
                            style={ChatStyles.textInputStyle}
                            underlineColorAndroid="transparent"
                            placeholder="Поиск по сообщениям"
                            value={this.state.searchValue}
                            onChangeText={(text) => {
                                this.setState({ searchValue: text })
                                this.searchItems(text)
                            }}
                        />
                    </View>

                </View>

                <ScrollView style={ChatStyles.scrollView} >

                    {this.state.userChatData.map((result) => (
                        <TouchableOpacity key={result.product_id} style={ChatStyles.wishhListCaritems} onPress={() => { this.sendToSingleMessage(result) }}>

                            <View style={ChatStyles.wishhListCarImgWrapper}>
                                <Image style={ChatStyles.wishhListCaritemsImg} source={{ uri: `http://bowy.ru/storage/uploads/${result.user_image}` }} />
                            </View>

                            <View style={ChatStyles.wishhListCarItemRight} >
                                <TouchableOpacity onPress={this.singleMessage} >
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#424A55', marginBottom: 5, marginLeft:2 }}>{result.user_name}</Text>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            borderColor: '#F0F3F9',
                                            borderRadius: 8,
                                            borderWidth: 1,
                                            padding: 5,
                                            marginTop:10
                                        }}
                                    >
                                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#818B9B', }}>{result.product_headline}</Text>
                                        <View style={ChatStyles.searchLine}></View>
                                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#818B9B' }}>{result.product_price}</Text>
                                    </View>
                                    {result.messages === null ?
                                        <Text>Файл</Text>
                                        :
                                        <Text style={{ fontSize: 12, marginTop:15, fontWeight: '400', color: '#424A55', marginBottom: 10, lineHeight:14,marginLeft:2 }}>{result.messages}</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>

            </View>
        )
    }
}



