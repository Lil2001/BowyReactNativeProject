import React, { Component } from 'react';
import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    NativeModules,
    ScrollView,
    Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Svg, { Path, Rect, } from 'react-native-svg';
import { singleCarStyles } from './singleCarStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { log } from 'react-native-reanimated';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;




export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            current_slide: 1,
            autoData: {},
            userData: {},
            userID: "",
            userAnnouncements: "",
            imageList: [],
            settingComponent: false,
            wishListId: []
        };
    }


    getInfo = async () => {
        try {
            await this.setState({ autoData: this.props.auto_data })
            let arr = []
            await this.props.auto_data.image.forEach((item) => {
                arr.push("http://bowy.ru/storage/uploads/" + item.image)
            })


            await this.setState({ imageList: arr })

            fetch(`http://bowy.ru/api/announcement-unlogged/${this.props.auto_data.user_id}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    this.setState({ userData: res[0] })
                })
                .catch((e) => {
                    console.log(e, 'getinfo')
                })

        } catch (e) {
            // console.log(e, 'getinfo')
        }

    }
    addToFavourites = async (userID, productID) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch("http://bowy.ru/api/favourites", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },
                body: JSON.stringify({ user_id: userID, product_id: productID })
            })
                .then(res => res.json())
                .then((res) => {
                })
                .catch((e) => {
                    console.log(e, 'add to fav')
                })
        } catch (e) {
            console.log(e, 'add to favsws')
        }
    }
    removeFromFavourites = async (itemID) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch(`http://bowy.ru/api/favourites/${itemID}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },
            })
                .then((res) => res.json())
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }
    getFavouriteItems = async () => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch("http://bowy.ru/api/favourites", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                },

            })
                .then(res => res.json())
                .then(res => {
                    this.setState({ wishListId: res["0"].map((item) => item.id) });
                })
        } catch (e) {
            console.log(e)
        }
    }
    hideSettings = () => {
        this.setState((prev) => ({ settingComponent: !prev.settingComponent }))
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getInfo()
            this.getUserID()
            this.getFavouriteItems()
            this.setState({ settingComponent: false, })
        });



        this.focusListener = this.props.navigation.addListener("blur", () => {
            this.setState({
                width: 0,
                current_slide: 1,
                autoData: {},
                userData: {},
                userID: "",
                userAnnouncements: "",
                imageList: [],
                settingComponent: false,
                wishListId: [],
            })
        })
    }

    redirectToSingleMessage = () => {
        let product_id = this.state.autoData.id
        let name = this.state.userData?.name
        let image = this.state.userData?.image
        let price = this.state.autoData?.price + " ₽"
        let headline = this.state.autoData?.headline

        this.props.navigation.navigate('SingleMessage', {
            params: product_id,
            data: name,
            same: image,
            coins: price,
            header: headline
        })


        // this.props.navigation.navigate('Chat', {
        //    id: product_id,
        //     // data: name,
        //     // same: image,
        //     // coins: price,
        //     // header:headline
        // })
        console.log(product_id, 'autoData')

    }


    getUserID = async () => {
        try {
            const ID = await AsyncStorage.getItem("loggedUserID")
            this.setState({ userID: ID })
        } catch (e) {

        }
    }
    handleBackButtonClick = () => {
        this.props.navigation.navigate('Feeds');

    };
    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    };
    deleteProduct = async () => {

        Alert.alert("", "вы уверены что хотите удалить", [
            {
                text: "Да", onPress: async () => {
                    try {

                        let userToken = await AsyncStorage.getItem("userToken")
                        let AuthStr = "Bearer " + userToken
                        fetch("http://bowy.ru/api/products/" + this.state.autoData.id, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': AuthStr,
                            },
                        })
                            .then(res => res.json())
                            .then((res) => {
                                if (res.success) {
                                    this.setState({ settingComponent: false })
                                    this.props.navigation.navigate("Feeds")
                                }
                            })
                    } catch (e) {
                        console.log(e, 'sdsdsd')
                    }
                }
            },
            {
                text: "Нет", onPress: () => {
                    this.setState({ settingComponent: false })
                }
            }


        ])


    }
    editProduct = () => {
        this.props.navigation.navigate("EditCar", {
            params: this.state.autoData,
            navigation: JSON.stringify(this.props.navigation)
        }
        )
    }




    render() {
        return (
            <View style={{ width: '100%', flex: 1 }}>
                <StatusBar
                    hidden
                />

                <View onLayout={this.onLayout} style={{ width: '100%' }}>

                    <SliderBox images={this.state.imageList}
                        // onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
                        currentImageEmitter={index => this.setState({
                            current_slide: index + 1
                        })}
                        parentWidth={this.state.width}
                        sliderBoxHeight={300}
                        dotStyle={{ width: 0 }}
                        circleLoop

                    />

                    <TouchableOpacity style={{
                        width: 30,
                        height: 20,
                        zIndex: 55,
                        position: 'absolute',
                        left: 22,
                        top: STATUSBAR_HEIGHT + 22
                    }} onPress={() => {
                        this.handleBackButtonClick();
                    }}>
                        <Svg
                            style={{ width: '100%', height: '100%' }}
                            viewBox="0 0 587 391"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"

                        >
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M331.41 195.715l-.05 11.523c-.395 45.704-3.15 86.481-7.902 112.323 0 .466-5.183 26.095-8.484 34.627-5.183 12.331-14.555 22.797-26.306 29.429-9.407 4.731-19.276 7.133-29.606 7.133-8.121-.376-21.513-4.463-31.071-7.889l-7.943-3.044c-52.611-20.898-153.18-89.183-191.698-130.943l-2.84-2.919-12.673-13.678C4.849 221.811.625 209.014.625 195.249c0-12.331 3.763-24.662 11.289-34.627 2.253-3.228 5.882-7.37 9.112-10.869l12.336-12.913c42.45-43.01 134.359-103.338 182-123.327 0-.43 29.607-12.797 43.7-13.263h1.881c21.62 0 41.819 12.33 52.149 32.26 2.822 5.45 5.529 16.122 7.588 25.496l3.701 17.699c4.224 28.461 7.029 72.121 7.029 120.01zm206.047-49.624c27.015 0 48.918 22.116 48.918 49.395 0 27.278-21.903 49.395-48.918 49.395l-120.379-10.646c-21.194 0-38.375-17.314-38.375-38.749 0-21.4 17.181-38.749 38.375-38.749l120.379-10.646z"
                                fill="#fff"
                            />

                        </Svg>
                    </TouchableOpacity>


                    {Number(this.state.userID) !== Number(this.state.userData?.id) ?
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 19,
                                zIndex: 55,
                                position: 'absolute',
                                right: 20,
                                top: STATUSBAR_HEIGHT + 22
                            }}
                            onPress={() => {
                                if (this.state.wishListId.includes(this.state.autoData.id)) {
                                    this.setState(prev => ({ wishListId: prev.wishListId.filter(items => this.state.autoData.id !== items) }))
                                    this.removeFromFavourites(this.state.autoData.id)

                                } else {
                                    this.setState((prev) => ({ wishListId: [...prev.wishListId, this.state.autoData.id] }))
                                    this.addToFavourites(this.state.autoData.user_id, this.state.autoData.id)
                                }
                            }}>

                            {this.state.wishListId.includes(this.state.autoData?.id)
                                ?
                                <Svg
                                    width={28}
                                    height={28}
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Rect opacity={0.4} width={28} height={28} rx={8} fill="#000" />
                                    <Path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.887 6.876c.473 0 .946.066 1.395.217 2.768.9 3.766 3.938 2.933 6.593a9.546 9.546 0 01-2.257 3.606 28.841 28.841 0 01-4.748 3.72l-.188.114-.195-.121a28.57 28.57 0 01-4.776-3.72 9.7 9.7 0 01-2.259-3.6c-.847-2.654.15-5.692 2.949-6.608a3.39 3.39 0 01.666-.156h.09c.211-.031.42-.045.63-.045h.083c.472.014.93.096 1.373.247h.044c.03.014.053.03.068.044.165.054.322.114.472.196l.285.128c.07.036.146.092.213.141.043.03.08.058.11.076l.037.022c.064.037.131.077.188.12a4.697 4.697 0 012.887-.974zm1.995 5.4a.617.617 0 00.593-.571v-.09a2.475 2.475 0 00-1.583-2.37.6.6 0 00-.757.376c-.105.315.06.66.375.771.48.18.802.654.802 1.178v.023a.644.644 0 00.143.465.628.628 0 00.427.218z"
                                        fill="#FF4141"
                                    />
                                </Svg>
                                :
                                <Svg
                                    width={28}
                                    height={28}
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Rect opacity={0.4} width={28} height={28} rx={8} fill="#000" />
                                    <Path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.887 6.876c.473 0 .946.066 1.395.217 2.768.9 3.766 3.938 2.933 6.593a9.546 9.546 0 01-2.257 3.606 28.841 28.841 0 01-4.748 3.72l-.188.114-.195-.121a28.57 28.57 0 01-4.776-3.72 9.7 9.7 0 01-2.259-3.6c-.847-2.654.15-5.692 2.949-6.608a3.39 3.39 0 01.666-.156h.09c.211-.031.42-.045.63-.045h.083c.472.014.93.096 1.373.247h.044c.03.014.053.03.068.044.165.054.322.114.472.196l.285.128c.07.036.146.092.213.141.043.03.08.058.11.076l.037.022c.064.037.131.077.188.12a4.697 4.697 0 012.887-.974zm1.995 5.4a.617.617 0 00.593-.571v-.09a2.475 2.475 0 00-1.583-2.37.6.6 0 00-.757.376c-.105.315.06.66.375.771.48.18.802.654.802 1.178v.023a.644.644 0 00.143.465.628.628 0 00.427.218z"
                                        fill="#fff"
                                        opacity={0.7}
                                    />
                                </Svg>

                            }
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this.hideSettings} style={{
                            width: 30,
                            height: 30,
                            zIndex: 55,
                            position: 'absolute',
                            right: 20,
                            top: STATUSBAR_HEIGHT + 22
                        }}>
                            <Ionicons name="ios-settings-sharp" size={24} color="white"
                                style={{ width: '100%', height: '100%' }} />
                        </TouchableOpacity>}


                    {this.state.settingComponent &&
                        <View style={[singleCarStyles.settingView, { top: STATUSBAR_HEIGHT + 50 }]}>
                            <TouchableOpacity onPress={this.deleteProduct}><Text>Снять объявление</Text></TouchableOpacity>
                            <TouchableOpacity style={{ paddingTop: 5 }} onPress={this.editProduct}><Text>Изменить объявление</Text></TouchableOpacity>
                        </View>}


                    <View style={{
                        justifyContent: "center",
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 25,
                        width: '100%'
                    }}>
                        <View style={{
                            width: 44,
                            height: 24,
                            zIndex: 55,
                            backgroundColor: '#0000008a',
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: 'white' }}>
                                {this.state.current_slide} - {this.state.imageList.length}
                            </Text>
                        </View>

                    </View>

                </View>

                <View style={singleCarStyles.whiteWrapper}>


                    <ScrollView>
                        <Text style={singleCarStyles.autoTitle}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#424A55',
                            }}>{"Заголовок" + " - "}</Text>
                            {this.state.autoData?.headline}
                        </Text>

                        <Text style={singleCarStyles.autoDescription}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#424A55',
                            }}>{"Описание" + " - "}</Text>
                            {this.state.autoData?.description}
                        </Text>


                        <Text style={singleCarStyles.autoPrice}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '700',
                                color: '#424A55',
                            }}>{"Цена" + " - "}</Text>
                            {this.state.autoData?.price + " ₽"}
                        </Text>


                        {Number(this.state.userID) === Number(this.state.autoData.user_id) ? <Text style={singleCarStyles.autoDate}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: '#424A55',
                            }}>{"Опубликован" + " - "}</Text>
                            {this.state.autoData?.updated_at?.split("").slice(0, 10).join("")}
                        </Text> : null}

                        <Text style={singleCarStyles.autoAddress}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: '#424A55',
                            }}>{"Адрес" + " - "}</Text>
                            {this.state.autoData?.region_name + ", " + this.state.autoData?.city_name + ", " + "Ул. " + this.state.autoData?.address}
                        </Text>



                        {/*    /!* info items*!/*/}

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Марка автомобиля</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.car_model} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Тип кузова</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.body_type} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Год выпуска</Text>
                            </View>

                            <View>
                                <Text
                                    style={singleCarStyles.infoValue}>{this.state.autoData?.year_of_issue} </Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Коробка передач</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.transmission}</Text>
                            </View>
                        </View>

                        <View style={singleCarStyles.infoWrapper}>

                            <View style={singleCarStyles.infoLabelWrapper}>
                                <Text style={singleCarStyles.infoLabel}>Руль</Text>
                            </View>

                            <View>
                                <Text style={singleCarStyles.infoValue}>{this.state.autoData?.rudder} </Text>
                            </View>

                        </View>



                        <View style={singleCarStyles.userWrapper}>

                            <View style={singleCarStyles.userImageWrapper}>
                                <Image style={singleCarStyles.userImage}
                                    source={{ uri: `http://bowy.ru/storage/uploads/${this.state.userData?.image}` }}
                                />
                            </View>

                            <View>
                                <Text style={singleCarStyles.userName}>{this.state.userData?.name}</Text>
                                <Text
                                    style={singleCarStyles.postCount}>{this.state.userData?.products?.length} объявлений</Text>
                            </View>
                        </View>


                    </ScrollView>

                    <View style={singleCarStyles.actionButtonsWrapper}>

                        <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={singleCarStyles.callButton}>
                            <TouchableOpacity style={singleCarStyles.callButtonToch} onPress={() => {
                                Linking.openURL('tel:' + this.state.userData.number);
                            }}>
                                <Text style={{ color: 'white' }}>
                                    Позвонить
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient colors={['#63DAFF', '#33B5FF']} style={singleCarStyles.writeUser}>
                            <TouchableOpacity style={singleCarStyles.writeUserToch}
                                onPress={() => { this.redirectToSingleMessage() }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Написать
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>


                    </View>

                </View>

            </View>

        )

    }
}


