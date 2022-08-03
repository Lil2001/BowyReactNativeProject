
import { SingleMessageStyle } from './SingleMessageStyles';
import * as ImagePicker from 'expo-image-picker';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Pressable, FlatList, ActivityIndicator, TextInput, Modal, TouchableWithoutFeedback, Dimensions, Button, ScrollView, InteractionManager, PermissionsAndroid, Platform, Linking
} from 'react-native'
import React, { Component } from 'react';
// import RNFetchBlob from 'rn-fetch-blob'
import Svg, { Path, Defs, Stop } from "react-native-svg"
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from 'lodash'
import ArrowGreenIcon from '../../assets/img/ArrowGreenRightIcon';
import GreyArrowIcon from '../../assets/img/GreyArrowIcon';
import AddFilesIcon from '../../assets/img/AddFilesIcon';
import CloseIconComponent from '../../assets/img/CloseIcon';
import { LinearGradient } from 'expo-linear-gradient';
import FileIconComponent from '../../assets/img/FileIcon';


const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

export default class SingleMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            isBottomModalVisible: false,
            messages: '',
            group_massages: [],
            count: [],
            loading: true,
            share_topic_modal: false,
            email_for_send: '',
            selectedImages: [],
            product_id: this.props.product_id,
            group_massages: {},
            receiver_user_data: [],
            data: [],
            name: this.props.name,
            image: this.props.image,
            price: this.props.price,
            refreshing: true,
            userData: [],
            loggedUserID: null,
            headline: this.props.headline,
            is_open_big_image: false,
            big_image_url: ''
        }
        let _isMounted = false
    }

    handleSetModalVisible = (isModalVisible) => {
        this.setState({
            isModalVisible
        })
    }
    handleSetBottomModalVisible = (isBottomModalVisible) => {
        this.setState({
            isBottomModalVisible
        })
    }
    handleShareTopic = (share_topic_modal, handleSetModalVisible) => {
        this.setState({
            handleSetModalVisible,
            share_topic_modal
        })
    }

    handleRemoveCar = (uri) => {
        let { selectedImages } = this.state;
        selectedImages = selectedImages.filter(el => el !== uri);

        this.setState({
            selectedImages
        })
    };

    renderPicketPhoto = () => {
        let { selectedImages } = this.state;

        if (selectedImages.length) {
            return (
                <ScrollView horizontal={true}>
                    {selectedImages.map(item => (
                        <View style={{ width: 100, height: 100, marginRight: 20 }}>
                            <TouchableOpacity style={addCarStyle.removeCarStyle} onPress={() => {
                                this.handleRemoveCar(item)
                            }}>
                                <Image
                                    style={{ justifyContent: 'center' }}
                                    source={require('../../assets/img/trashicon.png')} />
                            </TouchableOpacity>
                            <Image source={{ uri: item }} style={{
                                width: 100,
                                height: 100,
                                borderWidth: 3,
                                borderRadius: 10,
                            }}
                            />
                        </View>
                    ))}
                </ScrollView>
            );
        }
    };




    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        // let { selectedImages } = this.state;
        // selectedImages.push(pickerResult.uri);


        let uri = pickerResult.uri;



        console.log(selectedImages);
        // this.setState({
        //     selectedImages
        // })
    };





    handleRemoveCar = (uri) => {
        let { selectedImages } = this.state;
        selectedImages = selectedImages.filter(el => el !== uri);

        this.setState({
            selectedImages
        })
    };



    // checkPermision = async () => {
    //     if (Platform.OS === 'ios') {
    //         this.downloadImage()
    //     } else {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 {
    //                     title: 'Storage Permission Required',
    //                     message: 'App needs access to your storage to download Photos'
    //                 }
    //             )

    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 console.log('Storage Permission Granted.');
    //                 this.downloadImage()
    //             } else {
    //                 alert('Storage Permission Not Granted.')
    //             }

    //         } catch (error) {
    //             console.warn(error)
    //         }
    //     }
    // }

    downloadImage = async () => {
        let url = this.state.big_image_url;
        await Linking.canOpenURL(url);
        Linking.openURL(url);
    }

    downloadFile = async (download_url) => {
        await Linking.canOpenURL(download_url);
        Linking.openURL(download_url);
    }


    openBigImage = (big_image) => {
        this.setState({
            is_open_big_image: true,
            big_image_url: big_image
        })
    }

    closeBigImage = (big_image) => {
        this.setState({
            is_open_big_image: false,
            big_image_url: ''
        })
    }

    handleSendMessage = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = this.props.product_id
        let loggedUserID = await AsyncStorage.getItem('loggedUserID')
        let { messages } = this.state
        if (!messages) {
            return false
        }

        fetch(`http://bowy.ru/api/chat`, {
            method: 'POST',
            headers: {
                'Authorization': AuthStr,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                product_id: product_id,
                messages: this.state.messages,
                receiver_id: this.state.receiver_id
            })
        }).then((response) => response.json())
            .then((res) => {
                console.log(res, 'res send message')
                if (res.success === true) {
                    this.handleGetMessages()
                }

                this.setState({
                    messages: ''
                })
            })
    }

    selectImage = async () => {
        // No permissions request is necessary for launching the image library
        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;

        let receiver_id = this.state.receiver_id
        let product_id = this.props.product_id

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result, 'result')
        if (!result.cancelled) {


            this.setState({
                user_image: result.uri
            })

            let res = result.uri.split('.');
            let type = res[res.length - 1];


            let form = new FormData();
            form.append("file", {
                uri: result.uri,
                type: 'image/jpg',
                name: 'photo.jpg',
            });

            form.append('receiver_id', receiver_id);
            form.append('product_id', product_id);

            console.log(form, 'form')
            fetch('http://bowy.ru/api/send-file',
                {
                    body: form,
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": " multipart/form-data",
                        'Authorization': AuthStr,
                    }
                }
            ).then((response) => response.json())
                .catch((error) => {
                    console.log("ERROR ", error)

                })
                .then((responseData) => {
                    console.log(responseData, 'photo user')
                    if (responseData.success === true) {
                        this.handleGetMessages()

                    }
                }).done();
        }
    }


    handleGetMessages = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let AuthStr = 'Bearer ' + userToken;
        let product_id = this.props.product_id;
        let loggedUserID = await AsyncStorage.getItem('loggedUserID')

        try {
            fetch(`http://bowy.ru/api/chat/` + product_id, {
                method: 'GET',
                headers: {
                    'Authorization': AuthStr,
                    "content-type": "application/json",
                },
            }).then((response) => {
                return response.json()

            }).then((res) => {

                let data = res.data
                let product_id = this.props.product_id
                let receiver_id = res.receiver_id
                if (data.length > 0 && data[0].hasOwnProperty('created_at')) {
                    for (const item in data) {
                        if (data[item].file !== null) {
                            let type = data[item].file.split('.')
                            type = type[type.length - 1]

                            if (type === 'png' || type === 'jpeg' || type === 'jpg') {
                                data[item].file_type = 'img'
                            } else {
                                data[item].file_type = 'file'
                            }

                        }
                    }
                }

                this.setState({
                    data: data,
                    product_id: product_id,
                    loggedUserID: loggedUserID,
                    receiver_id: receiver_id
                })
                if (this.state.group_massages.length === 0) {
                    this.setState({
                        group_massages: data

                    })

                }

                if (!_.isEqual(data, product_id, this.state.group_massages)) {
                    this.setState({
                        group_massages: data
                    })
                }
            })
        } catch (e) {
            console.log(e, 'catch error')
        }
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.handleGetMessages()

        this.focusListener = navigation.addListener("focus", () => {
            this.handleGetMessages()
            //     this._isMounted = true;
            // this.interval = setInterval(async () => {
            //     await this.handleGetMessages()
            // }, 2000)
        });
    }

    componentWillUnmount() {

        if (this.focusListener) {
            this.focusListener();
            // this._isMounted = false
            // if (this._isMounted === false) {
            //     clearInterval(this.interval)
            // }
        }
    }





    render() {
        // console.log(this.state.data, 'Datas');
        if (this.state.is_open_big_image) {
            return (
                <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                    <View
                        style={{
                            marginLeft: 42,
                            textAlign: 'center',
                            marginTop: 45,
                            backgroundColor: 'white'
                        }}
                    >
                        <TouchableOpacity onPress={() => { this.closeBigImage() }}>
                            <CloseIconComponent />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginLeft: 45,
                            textAlign: 'center',
                            marginTop: 35
                        }}>
                        <Image
                            style={{
                                width: '90%',
                                height: '85%',
                                backgroundColor: 'white'
                            }}
                            source={{ uri: this.state.big_image_url }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '100%'
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={['#34BE7C', '#2EB6A5']}
                            style={{
                                width: "80%",
                                alignItems: "center",
                                borderRadius: 10,
                                height: 50,
                                paddingTop: 15
                            }}
                        >
                            <TouchableOpacity onPress={() => { this.downloadImage() }}>
                                <Text style={{ color: 'white' }}>Скачать</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        style={styles.top_icon_box}
                        onPress={() => {
                            this.props.navigation.navigate('Chat')
                        }}>
                        <GreyArrowIcon />
                    </Pressable>
                    <Image style={{
                        width: 60,
                        height: 60,
                        borderWidth: 3,
                        borderRadius: 50,
                        marginLeft: 25,
                        marginRight: 25
                    }}
                        source={{ uri: `http://bowy.ru/storage/uploads/${this.props.image}` }} />
                    <View>

                        <View >
                            <Text style={{ color: '#424A55', fontSize: 14, fontWeight: '700' }}>{this.props.name}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginBottom: 13,
                                    borderColor: '#F0F3F9',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    padding: 5,
                                    marginTop: 10,
                                    marginLeft: 5
                                }}
                            >
                                <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#818B9B', marginLeft: 5 }}>{this.props.headline}</Text>
                                <View style={{ width: 1, height: 18, backgroundColor: '#CBD3E0', marginLeft: 10 }}></View>
                                <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#818B9B', marginLeft: 10 }}>{this.props.price}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, marginTop: 10, width: "100%", padding: 15, backgroundColor: 'white' }}>


                    <View>
                        {this.state.data.map((item, index) =>
                            <View key={index} style={{ flex: 1, justifyContent: "flex-start", alignItems: 'center', }}>

                                {item.receiver_id == this.state.loggedUserID &&

                                    <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={SingleMessageStyle.userMessage1}>
                                        {item.file && item.file_type === 'img' &&
                                            <TouchableOpacity
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    borderRadius: 10,
                                                }}
                                                onPress={() => { this.openBigImage(`http://bowy.ru/storage/uploads/${item.file}`) }}
                                            >
                                                <Image
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        borderRadius: 10,
                                                    }}
                                                    source={{ uri: `http://bowy.ru/storage/uploads/${item.file}` }}

                                                />
                                            </TouchableOpacity>

                                        }

                                        {item.file && item.file_type === 'file' &&

                                            <TouchableOpacity
                                                onPress={() => { this.downloadFile(`http://bowy.ru/storage/uploads/${item.file}`) }}
                                            >

                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                    source={require('../../assets/img/FileSaveIcon.png')} />
                                                <Text> {item.file}</Text>
                                            </TouchableOpacity>

                                        }

                                        {item.messages &&
                                            <Text style={{ color: 'white' }}>{item.messages}</Text>

                                        }
                                    </LinearGradient>
                                }


                                {item.sender_id == this.state.loggedUserID &&

                                    <View key={index} style={SingleMessageStyle.userMessage2}>
                                        {item.file && item.file_type === 'img' &&
                                            <TouchableOpacity
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    borderRadius: 10,
                                                }}
                                                onPress={() => { this.openBigImage(`http://bowy.ru/storage/uploads/${item.file}`) }}
                                            >
                                                <Image
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        borderRadius: 10,
                                                    }}
                                                    source={{ uri: `http://bowy.ru/storage/uploads/${item.file}` }}

                                                />

                                            </TouchableOpacity>

                                        }

                                        {item.file && item.file_type === 'file' &&

                                            <TouchableOpacity
                                                onPress={() => { this.downloadFile(`http://bowy.ru/storage/uploads/${item.file}`) }}
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around'
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                    source={require('../../assets/img/FileSaveIcon.png')} />
                                                <Text> {item.file.split('.')

                                                }</Text>
                                            </TouchableOpacity>

                                        }

                                        {item.messages &&
                                            <Text>{item.messages}</Text>
                                        }
                                    </View>
                                }
                            </View>)}
                    </View>




                </ScrollView>
                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <TouchableOpacity onPress={() => this.selectImage()} >
                                <AddFilesIcon />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.input}>
                            <View >
                                <TextInput
                                    value={this.state.messages}
                                    onChangeText={(messages) => this.setState({ messages })}
                                    selectionColor={'#55A1DB'}
                                    placeholder='Напишите...'
                                    style={{ width: 230 }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.handleSendMessage()}>
                                <ArrowGreenIcon />
                            </TouchableOpacity>
                        </View>

                    </View>



                    <Modal
                        visible={this.state.isBottomModalVisible}
                        value={this.state.messages}
                        onChangeText={(messages) => this.setState({ messages })}
                        animationType="fade"
                        transparent={true}
                        onRequestClose={() => {
                            this.handleSetBottomModalVisible(false)
                        }}>
                        <View style={styles.bottom_modal}>
                            <Pressable style={{ marginBottom: 15 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.buttons_icon}>
                                        <Svg
                                            width={20}
                                            height={18}
                                            viewBox="0 0 20 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <Path
                                                d="M10.582 5.488v.75h.75v-.75h-.75zm-8.878 9.876h-.75a.75.75 0 001.191.607l-.441-.607zm8.878-3.288h.75v-.75h-.75v.75zm0 4.369h-.75a.75.75 0 001.255.554l-.505-.554zm7.788-7.1l.506.555a.75.75 0 00.022-1.087l-.528.533zM10.582 1.63l.528-.533a.75.75 0 00-1.278.533h.75zm0 3.108c-1.562 0-3.95.973-5.928 2.718-2.009 1.773-3.7 4.434-3.7 7.908h1.5c0-2.945 1.424-5.223 3.192-6.783 1.8-1.588 3.85-2.343 4.936-2.343v-1.5zM2.145 15.97c.709-.516 2.007-1.31 3.55-1.973 1.55-.665 3.286-1.172 4.887-1.172v-1.5c-1.887 0-3.837.59-5.479 1.294-1.647.708-3.043 1.558-3.84 2.138l.882 1.213zm7.687-3.895v4.369h1.5v-4.369h-1.5zm9.066-3.263L11.11 1.097l-1.056 1.065 7.789 7.716 1.055-1.065zM9.832 1.63v3.858h1.5V1.63h-1.5zm8.033 7.161l-7.788 7.1 1.01 1.108L18.877 9.9l-1.01-1.109z"
                                                fill="#A0AEC0"
                                            />
                                        </Svg>
                                    </Text>
                                    <Text style={styles.buttons_title}>
                                        Reply
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable style={{ marginBottom: 15 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.buttons_icon}>
                                        <Svg
                                            width={18}
                                            height={19}
                                            viewBox="0 0 18 19"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <Path
                                                d="M12.352 14.679l-7.198-3.825m7.198-6.533l-7.184 3.84m11.202 7.203c0 1.108-.927 2.006-2.07 2.006-1.144 0-2.071-.898-2.071-2.006 0-1.108.927-2.006 2.07-2.006 1.144 0 2.071.898 2.071 2.006zm0-11.728c0-1.108-.927-2.006-2.07-2.006-1.144 0-2.071.898-2.071 2.006 0 1.108.927 2.006 2.07 2.006 1.144 0 2.071-.898 2.071-2.006zM5.697 9.5c0-1.108-.927-2.006-2.07-2.006-1.144 0-2.071.898-2.071 2.006 0 1.108.927 2.006 2.07 2.006 1.144 0 2.071-.898 2.071-2.006z"
                                                stroke="#A0AEC0"
                                                strokeWidth={1.5}
                                            />
                                        </Svg>
                                    </Text>
                                    <Text style={styles.buttons_title}>
                                        Share
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable style={{ marginBottom: 15 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.buttons_icon}>
                                        <Svg
                                            width={17}
                                            height={17}
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <Path
                                                d="M13.466 7.227L5.474 15.3c-.349.353-.92.44-1.162.44H2.277c-.34 0-1.017-.205-1.017-1.027s-.001-1.761 0-2.055c0-.293.117-.706.436-1.027.121-.123 4.681-4.628 8.132-8.08m3.639 3.676c.691-.7 1.337-1.351 1.889-1.909.29-.293.697-1.057 0-1.761l-1.89-1.909c-.697-.704-1.453-.293-1.743 0-.558.563-1.204 1.212-1.895 1.903m3.639 3.676L9.828 3.55"
                                                stroke="#A0AEC0"
                                                strokeWidth={1.5}
                                            />
                                        </Svg>
                                    </Text>
                                    <Text style={styles.buttons_title}>
                                        Edit
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable style={styles.buttons}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.buttons_icon}>
                                        <Svg
                                            width={18}
                                            height={21}
                                            viewBox="0 0 18 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <Path
                                                d="M3.614 7.45a.75.75 0 00-1.5 0h1.5zm9.898 12.772v.75h.035l.036-.003-.07-.747zM15.96 7.451a.75.75 0 00-1.5 0h1.5zm-3.395 1.916a.75.75 0 00-1.5 0h1.5zm-1.5 7.024a.75.75 0 001.5 0h-1.5zM9.787 9.367a.75.75 0 00-1.5 0h1.5zm-1.5 7.024a.75.75 0 001.5 0h-1.5zM7.01 9.367a.75.75 0 00-1.5 0h1.5zm-1.5 7.024a.75.75 0 001.5 0h-1.5zM1.63 3.827a.75.75 0 100 1.5v-1.5zm14.816 1.5a.75.75 0 000-1.5v1.5zM2.115 7.451v11.015h1.5V7.451h-1.5zm0 11.015c0 .408.111 1.006.473 1.526.39.56 1.04.98 1.974.98v-1.5c-.424 0-.623-.164-.743-.337a1.263 1.263 0 01-.205-.669h-1.5zm2.447 2.506H13.512v-1.5H4.562v1.5zm9.02-.003a2.902 2.902 0 001.45-.572c.515-.398.928-1.034.928-1.93h-1.5c0 .38-.154.595-.345.742-.22.17-.501.25-.673.267l.14 1.493zm2.378-2.503v-.007-.008-.008-.008-.008-.008-.008-.009-.008-.009-.009-.009-.009-.009-.009-.01-.009-.01-.009-.01-.01-.01-.01-.01-.01-.011-.01-.012-.01-.011-.011-.012-.011-.011-.012-.012-.011-.012-.012-.012-.012-.013-.012-.013-.012-.013-.013-.013-.013-.013-.013-.013-.014-.013-.014-.014-.014-.014-.014-.014-.014-.014-.015-.014-.015-.015-.015-.015-.015-.015-.015-.015-.016-.015-.016-.016-.015-.016-.016-.016-.017-.016-.016-.017-.016-.017-.016-.017-.017-.017-.017-.017-.017-.018-.017-.018-.017-.018-.018-.017-.018-.018-.019-.018-.018-.018-.019-.018V17v-.018-.02-.018-.019-.019-.019-.019-.02-.018-.02-.02-.019-.02-.019-.02-.02-.02-.02-.02-.02-.02-.02-.02-.02-.02-.021-.02-.022-.02-.021-.02-.022-.02-.022-.021-.021-.021-.022-.021-.022-.021-.022-.021-.022-.022-.022-.021-.023-.021-.023-.022-.022-.022-.022-.023-.022-.023-.022-.023-.022-.023-.023-.023-.022-.023-.023-.023-.024-.023-.023-.023-.023-.024-.023-.023-.024-.023-.024-.024-.023-.024-.024-.024-.024-.023-.024-.024-.024-.024-.025-.024-.024-.024-.025-.024-.024-.025-.024-.025-.024-.025-.024-.025-.025-.024-.025-.025-.025-.025-.025-.025-.025-.025-.025-.025-.025-.025-.025-.025-.026-.025-.025-.026-.025-.026-.025-.025-.026-.025-.026-.025-.026-.026-.025-.026-.026-.025-.026-.026-.026-.026-.026-.025-.026-.026-.026-.026-.026-.026-.026-.026-.026-.026-.026-.026-.026-.026-.027-.026-.026-.026-.026-.027-.026-.026-.026-.027-.026-.026-.027-.026-.026-.026-.027-.026-.027-.026-.026-.027-.026-.027-.026-.026-.027-.026-.027-.026-.027-.026-.026-.027-.026-.027-.026-.027-.026-.027-.026-.026-.027-.026-.027-.026-.027-.026-.026-.027-.026-.027-.026-.027-.026-.027-.026-.026-.027-.026-.026-.027-.026-.026-.027-.026-.026-.027-.026-.026-.026-.027-.026-.026-.026-.027-.026-.026-.026-.026-.026-.026-.026-.026-.027-.026-.026-.026-.025-.026-.026-.026-.026-.026-.026-.026-.025-.026-.026-.026-.025-.026-.026-.025-.026-.025-.026-.026-.025-.025-.026-.025-.026-.025-.025-.026-.025-.025-.025-.025-.025-.025-.026-.025-.025-.024-.025-.025-.025-.025-.025-.024-.025-.025-.024-.025V9.8v-.025-.024-.025-.024-.025-.024-.024-.024-.024-.025-.024-.024-.024-.024-.024-.023-.024-.024-.024-.023-.024-.024-.023-.024V9.2v-.023-.024-.023-.023-.023-.023-.023-.024-.022-.023-.023-.023V8.9v-.022-.023-.023-.022-.023-.022-.022-.023-.022-.022-.022-.022-.022-.022-.022-.022-.022-.021-.022-.021-.022-.021-.022-.021-.021-.021-.022-.02-.022-.02-.021-.021-.02-.021-.021-.02V8.1v-.02-.02-.02-.021V8v-.02-.02-.02-.02-.02-.019-.02-.019-.02-.019-.019-.02-.018-.02-.018-.02-.018-.019-.018-.019-.018-.019-.018-.018-.018-.018-.018-.018-.018h-1.5V18.466h1.5zm-4.895-9.1v7.025h1.5V9.367h-1.5zm-2.778 0v7.025h1.5V9.367h-1.5zm-2.778 0v7.025h1.5V9.367h-1.5zM1.63 5.328h4.63v-1.5H1.63v1.5zm4.63 0h10.186v-1.5H6.259v1.5zM5.51 3.46v1.117h1.5V3.46h-1.5zm1.5 0c0-.178.058-.457.205-.67.12-.172.32-.336.743-.336v-1.5c-.935 0-1.585.42-1.974.98A2.758 2.758 0 005.51 3.46h1.5zm4.056 0v1.117h1.5V3.46h-1.5zm1.5 0c0-.408-.112-1.007-.474-1.526-.39-.56-1.04-.98-1.974-.98v1.5c.424 0 .623.164.743.337.147.212.205.491.205.669h1.5zM10.117.954h-2.16v1.5h2.16v-1.5z"
                                                fill="#DE3A3A"
                                            />
                                        </Svg>
                                    </Text>
                                    <Text style={[styles.buttons_title, { color: '#DE3A3A', fontWeight: '500' }]}>
                                        Delete
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                        <TouchableWithoutFeedback onPress={() => {
                            this.handleSetBottomModalVisible(!this.state.isBottomModalVisible)
                        }} style={{ width: '100%', height: screenHeight }}>
                            <View style={{ height: screenHeight, width }}></View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </SafeAreaView>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    chat_wrapper: {
        flex: 1
    },
    header: {
        backgroundColor: '#FFFFFF',
        height: 110,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: 40,
        paddingTop: 50,
        marginTop: 20,
        zIndex: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F3F9',

    },

    chat_title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',

    },
    chat_description: {
        color: 'white'
    },
    footer: {
        backgroundColor: 'white',
        height: 70,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F3F9'
    },
    input: {
        marginLeft: 10,
        marginTop: 35,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 264,
        height: 55,
        marginBottom: 40,
        backgroundColor: '#F0F4F8',
        padding: 10,
        borderRadius: 12,

    },
    send_sms: {
        backgroundColor: '#3465B4',
        width: 70,
        height: 70,
        borderRadius: 100,
        bottom: 50
    },
    send_sms_item: {
        alignSelf: 'center',
        top: 22
    },
    buttons: {
        marginBottom: 20
    },
    buttons_icon: {
        width: 40
    },
    buttons_title: {
        fontWeight: 'bold'
    },
    any_user_sms: {
        backgroundColor: '#FFFFFF',
        alignItems: "flex-start",
        padding: 12,
        marginVertical: 2,
        borderRadius: 6,
        maxWidth: '80%'

    },
    user_sms: {
        backgroundColor: '#EFFEDD',
        borderRadius: 5,
        padding: 12,
        marginVertical: 2,
        maxWidth: '80%'
    },
    top_modal: {
        backgroundColor: 'white',
        width: '80%',
        height: 152,
        alignSelf: 'flex-end',
        borderRadius: 10,
        right: 15,
        top: 10,
        padding: 20
    },
    bottom_modal: {
        width: '100%',
        height: 198,
        backgroundColor: 'white',
        top: '80%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20
    },
    input_send: {
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 3,
        marginTop: 5
    },
})
