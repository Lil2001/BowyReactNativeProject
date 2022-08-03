import React, {Component, useState} from 'react';

import {
    View, Platform, TextInput, StyleSheet, StatusBar, Dimensions, ScrollView, Image,
    Text, TouchableOpacity, createStackNavigator, Modal, TouchableHighlight, Alert, FlatList, SafeAreaView
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import Svg, {Path, Rect, Defs, Stop, LinearGradient as LinearGradient1,} from 'react-native-svg';


import {feedsStyles} from './feedsStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from '@expo/vector-icons';


const sortByValues = [
    {
        key: 'default',
        text: 'По умолчанию',
    },
    {
        key: 'date',
        text: 'По дате',
    },
    {
        key: 'min_price',
        text: 'Дешевле',
    },
    {
        key: 'max_price',
        text: 'Дороже',
    }
];


export default class FeedsScreenComponent extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();


        this.state = {
            wishListId: [],
            filterModalVisible: false,
            filterSortBy: null,
            filterCategory: null,
            locationCity: null,


            carCategoryOpen: false,
            carCategoryValue: null,
            carCategoryItems: [],

            regionCategoryOpen: false,
            regionCategoryValue: null,
            regionCategoryItems: [],

            cityListOpen: false,
            cityListValue: null,
            cityListItems: [],


            products: [],
            products1: [],

            streetValue: "",
            minCost: "",
            maxCost: "",

            usersID: [],
            loggedUserID: "",
            searchValue: "",
            isFilterCleared: false,
        };
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
                    this.setState({wishListId: res["0"].map((item) => item.id)})
                })
                .catch((e) => {
                    //////
                })
        } catch (e) {
            /////
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
                body: JSON.stringify({user_id: userID, product_id: productID})
            })
                .then(res => res.json())
                .catch((e) => {
                    ////
                })
        } catch (e) {
            ////
        }
    }
    focusSearchItem = () => {
        this.myRef.current.focus()
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
                    /////
                })
        } catch (e) {
            /////
        }
    }

    getProducts = async () => {
        try {

            let userID = await AsyncStorage.getItem("loggedUserID")
            let userToken = await AsyncStorage.getItem('userToken');

            console.log(userID, 'userid feeds screen');


            let AuthStr = 'Bearer ' + userToken;

            console.log(AuthStr, 'token feeds screen');


            fetch('http://bowy.ru/api/allproducts', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': AuthStr,
                },
            })
                .then((response) => response.json())
                .then((res) => {

                        this.setState({
                            loggedUserID: userID,
                            products: res.product_data,
                            products1: res.product_data
                        })
                     
                        console.log(res,'product data feeds screen');
                    }
                )
                .catch((e) => {
                    /////
                })

        } catch (e) {
            /////////////
        }
    }

    getRegions = () => {
        fetch('http://bowy.ru/api/home')
            .then(res => res.json())
            .then((res) => {
                const carCategory = []
                res[1].forEach((item) => {
                    let picker = {}
                    picker.label = item.name
                    picker.value = item.name
                    picker.id = item.id
                    carCategory.push(picker)
                    console.log(carCategory,"kkkk")
                })
                this.setState({regionCategoryItems: carCategory})
            })
            .catch(() => {
                /////////
            })
    }

    getCities = async (regionId) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch(`http://bowy.ru/api/city`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': AuthStr,
                }
            })
                .then(response => response.json())
                .then((response) => {
                    let arr = []
                    response[1]
                        .filter((item) => item.region_id === regionId)
                        .map((item) => {
                            let picker = {}
                            picker.label = item.name
                            picker.value = item.name
                            picker.id = item.id
                            arr.push(picker)
                        })
                    this.setState({cityListItems: arr})
                })
                .catch((e) => {
                  console.log(e, 'error');
                })
        } catch (e) {
            console.log(e, 'error');
        }
    }

    setModalVisible(visible) {
        this.setState(state => {
            return this.state.filterModalVisible = visible
        });
    }

    openSingleCar = (data) => {
        this.props.navigation.navigate('SingleCar', {
            params: data,
            navigation: JSON.stringify(this.props.navigation)
        })
    };

    getCategories = () => {
        fetch('http://bowy.ru/api/home')
            .then(res => res.json())
            .then((res) => {
                const carCategory = []
                res[0].forEach((item) => {
                    let picker = {}
                    picker.label = item.name
                    picker.value = item.id
                    picker.id = item.id
                    carCategory.push(picker)
                })
                this.setState({carCategoryItems: carCategory})
            })
            .catch((e) => {
                /////
            })
    }

    searchItems = (value) => {
        const {products} = this.state
        const filteredProducts = []
        if (value.trim().length > 2) {
            products.forEach((item) => {
                if (item.car_model.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.address.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.description.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.headline.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                } else if (item.headline.toLowerCase().includes(value.trim().toLowerCase())) {
                    filteredProducts.push(item)
                }
                this.setState({products: filteredProducts})
            })
        } else {
            this.setState({products: this.state.products1})
        }
    }

    check = () => {

        const {products} = this.state
        let filteredProduct = JSON.parse(JSON.stringify(products))
        if (this.state.carCategoryValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return Number(item.category_id) === Number(this.state.carCategoryValue)
            })
        }

        if (this.state.regionCategoryValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return item.region === this.state.regionCategoryValue
            })
        }

        if (this.state.cityListValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return item.city === this.state.cityListValue
            })

        }
        if (this.state.streetValue) {
            filteredProduct = filteredProduct.filter((item) => {
                return item.address.toLowerCase().includes(this.state.cityListValue.trim().toLowerCase())
            })

        }
        if (this.state.minCost) {
            filteredProduct = filteredProduct.filter((item) => {
                return Number(item.price) >= Number(this.state.minCost)
            })

        }
        if (this.state.maxCost) {
            filteredProduct = filteredProduct.filter((item) => {
                return Number(item.price) <= Number(this.state.maxCost)
            })

        }

        if (this.state.filterSortBy) {

            if (this.state.filterSortBy === "min_price") {
                filteredProduct = filteredProduct.sort((a, b) => Number(a.price) - Number(b.price))


            } else if (this.state.filterSortBy === "max_price") {
                filteredProduct = filteredProduct.sort((a, b) => Number(b.price) - Number(a.price))

            } else if (this.state.filterSortBy === "date") {
                filteredProduct = filteredProduct.reverse()
            }
        }
        this.setState({products: filteredProduct})
    }

    filterItems = async () => {

        try {
            await this.setState({products: JSON.parse(JSON.stringify(this.state.products1))})
            await this.check()
            await this.setState({filterModalVisible: false, isFilterCleared: true})
        } catch (e) {
            ///
        }


    }


    componentDidMount() {

        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getProducts()
            this.getCategories()
            this.getRegions()
            this.getFavouriteItems()
        });

        this.focusListener = this.props.navigation.addListener("blur", () => {
         this.setState({

         })

        })
    }


    
    componentWillUnmount() {
        // Remove the event listener
        if (this.focusListener) {
            this.focusListener();

        }
            // this.focusListener();

    }

    clearFilter = () => {
        this.setState({
            isFilterCleared: false,
            products: JSON.parse(JSON.stringify(this.state.products1)),
            carCategoryValue: null,
            regionCategoryValue: null,
            cityListValue: null,
            streetValue: "",
            minCost: "",
            maxCost: "",
            filterSortBy: null,
            filterModalVisible: false,
        })
    }


    render() {
        return (
            <View style={feedsStyles.container}>
                {/*Search Filter form*/}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.filterModalVisible}
                    style={{flex: 1, width: "100%"}}
                >
                    <View style={feedsStyles.modalContainer}>

                        <View style={feedsStyles.modalContainer2}>
                            <Text style={feedsStyles.modalContainerTitle}>Фильтры</Text>

                            <TouchableOpacity onPress={() => {
                                this.setState({filterModalVisible: false})
                                this.setState({products: this.state.products1})
                            }}>
                                <Image style={feedsStyles.closeModal}
                                       source={require('../../assets/img/close_modal.png')}/>
                            </TouchableOpacity>

                        </View>


                        <ScrollView

                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            style={feedsStyles.filterFieldsWrapper}
                        >

                            <View style={feedsStyles.category1}>
                                <DropDownPicker
                                    open={this.state.carCategoryOpen}
                                    value={this.state.carCategoryValue}
                                    items={this.state.carCategoryItems}
                                    setOpen={() => {
                                        this.setState((state) => ({carCategoryOpen: !state.carCategoryOpen}))
                                    }}
                                    maxHeight={200}
                                    setValue={(call) => this.setState((value) => ({carCategoryValue: call(value)}))}
                                    placeholder="Категория"
                                    style={{
                                        width: '100%',
                                        borderWidth: 0,
                                        height: 55,
                                        backgroundColor: '#F0F4F8',
                                        marginBottom: 15,
                                    }}
                                    placeholderStyle={{color: "grey",}}
                                    onOpen={() => {
                                        this.setState({regionCategoryOpen: false})
                                        this.setState({cityListOpen: false})
                                    }}
                                    zIndex={10}
                                    listMode="SCROLLVIEW"
                                />


                                <DropDownPicker
                                    open={this.state.regionCategoryOpen}
                                    value={this.state.regionCategoryValue}
                                    items={this.state.regionCategoryItems}
                                    setOpen={() => {
                                        this.setState((state) => ({regionCategoryOpen: !state.regionCategoryOpen}))
                                    }}
                                    maxHeight={200}
                                    setValue={(call) => this.setState((value) => ({regionCategoryValue: call(value)}))}
                                    placeholder="Область"
                                    style={{
                                        width: '100%',
                                        borderWidth: 0,
                                        height: 55,
                                        borderColor: '#E0E5ED',
                                        backgroundColor: '#F0F4F8',
                                        borderRadius: 0,
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderBottomWidth: 1,

                                    }}
                                    language="RU"
                                    placeholderStyle={{color: "grey",}}
                                    onOpen={() => {
                                        this.setState({carCategoryOpen: false})
                                        this.setState({cityListOpen: false})
                                    }}
                                    listMode="SCROLLVIEW"
                                    zIndex={9}
                                    onSelectItem={(item) => {
                                        this.getCities(item.id)
                                    }}

                                />

                                <DropDownPicker
                                    open={this.state.cityListOpen}
                                    value={this.state.cityListValue}
                                    items={this.state.cityListItems}
                                    setOpen={() => {
                                        this.setState((state) => ({cityListOpen: !state.cityListOpen}))
                                    }}
                                    language="RU"
                                    maxHeight={200}
                                    setValue={(call) => this.setState((value) => ({cityListValue: call(value)}))}
                                    placeholder="Город"
                                    style={{
                                        width: '100%',
                                        borderWidth: 0,
                                        height: 55,
                                        borderColor: '#E0E5ED',
                                        backgroundColor: '#F0F4F8',
                                        borderRadius: 0,
                                        borderBottomWidth: 1,
                                    }}
                                    placeholderStyle={{color: "grey",}}
                                    onOpen={() => {
                                        this.setState({carCategoryOpen: false})
                                        this.setState({regionCategoryOpen: false})
                                    }}
                                    listMode="SCROLLVIEW"
                                    zIndex={8}
                                    disabled={!!!this.state.regionCategoryValue}

                                />

                                <TextInput
                                    style={[feedsStyles.costCategory, {
                                        borderBottomRightRadius: 15,
                                        borderBottomLeftRadius: 15,
                                        marginBottom: 15,
                                    }]}
                                    editable={!!this.state.cityListValue ? true : false}
                                    underlineColorAndroid="transparent"
                                    placeholder="Улица"
                                    value={this.state.streetValue}
                                    onChangeText={(streetValue) => this.setState({streetValue})}
                                />


                                {/*<Slider min={0} max={40} step={1}*/}
                                {/*        valueOnChange={value => this.setState({*/}
                                {/*            value: value*/}
                                {/*        })}*/}
                                {/*        initialValue={12}*/}
                                {/*        knobColor='red'*/}
                                {/*        valueLabelsBackgroundColor='black'*/}
                                {/*        inRangeBarColor='purple'*/}
                                {/*        outOfRangeBarColor='orange'*/}
                                {/*        style={{zIndex:5}}*/}
                                {/*/>*/}

                                <TextInput
                                    style={[feedsStyles.costCategory, {
                                        borderBottomWidth: 1,
                                        borderColor: "#E0E5ED",
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Цена от"
                                    keyboardType={"numeric"}
                                    value={this.state.minCost}
                                    onChangeText={(minCost) => this.setState({minCost})}
                                />


                                <TextInput
                                    style={[feedsStyles.costCategory, {
                                        borderBottomRightRadius: 15,
                                        borderBottomLeftRadius: 15,
                                    }]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Цена до"
                                    keyboardType={"numeric"}
                                    value={this.state.maxCost}
                                    onChangeText={(maxCost) => this.setState({maxCost})}
                                />

                            </View>


                            <View style={feedsStyles.sortByWrapper}>

                                <Text style={feedsStyles.sortByTitile}>
                                    Сортировать
                                </Text>

                                {sortByValues.map(res => {
                                    return (
                                        <View key={res.key} style={feedsStyles.rbWrapper}>
                                            <TouchableOpacity
                                                style={{
                                                    justifyContent: 'flex-start',
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    height: 20
                                                }}
                                                onPress={() => {
                                                    this.setState({
                                                        filterSortBy: res.key,
                                                    });
                                                }}>

                                                <TouchableOpacity style={feedsStyles.rbStyle}>
                                                    {this.state.filterSortBy === res.key &&
                                                        <View style={feedsStyles.selected}/>}
                                                </TouchableOpacity>
                                                <Text style={feedsStyles.filterSortLabel}>{res.text}</Text>

                                            </TouchableOpacity>

                                        </View>
                                    );
                                })}

                            </View>
                            <TouchableOpacity onPress={this.filterItems}>
                                <LinearGradient colors={['#34BE7C', '#2EB6A5']}
                                                style={feedsStyles.filterSearchButton}>

                                    <Text style={{color: 'white'}}>
                                        Показать результаты
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>

                        </ScrollView>


                    </View>
                </Modal>

                {/*Search form*/}

                <View style={feedsStyles.textInputWrapperStyle}>

                    <View style={feedsStyles.textInputContainerStyle}>
                        <TouchableOpacity onPress={this.focusSearchItem}>
                            <Svg
                                width={20}
                                height={20}
                                style={{marginRight: 16}}
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
                            ref={this.myRef}
                            style={feedsStyles.textInputStyle}
                            underlineColorAndroid="transparent"
                            placeholder="Поиск авто"
                            value={this.state.searchValue}
                            onChangeText={(text) => {
                                this.setState({searchValue: text})
                                this.searchItems(text)
                            }}
                        />


                        <TouchableOpacity onPress={() => {
                            this.setModalVisible(!this.state.filterModalVisible);
                        }}>
                            <Svg
                                style={{
                                    width: 18,
                                    height: 18,
                                    marginLeft: 17
                                }}
                                viewBox="0 0 686 610"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M236.063 116.466c0 63.933-52.707 115.753-117.782 115.753C53.245 232.219.5 180.399.5 116.466.5 52.57 53.245.75 118.281.75c65.075 0 117.782 51.82 117.782 115.716zm397.835-50.698c28.465 0 51.603 22.731 51.603 50.698 0 28.003-23.138 50.735-51.603 50.735H408.686c-28.503 0-51.641-22.732-51.641-50.735 0-27.966 23.138-50.698 51.641-50.698h225.212zM52.141 444.56h225.212c28.503 0 51.641 22.732 51.641 50.735 0 27.966-23.138 50.736-51.641 50.736H52.141C23.638 546.031.5 523.261.5 495.295c0-28.003 23.138-50.735 51.641-50.735zM567.72 609.639c65.075 0 117.781-51.82 117.781-115.716 0-63.933-52.706-115.753-117.781-115.753-65.037 0-117.781 51.82-117.781 115.753 0 63.896 52.744 115.716 117.781 115.716z"
                                    fill="url(#paint0_linear_366_57)"
                                />
                                <Defs>
                                    <LinearGradient1
                                        id="paint0_linear_366_57"
                                        x1={0.5}
                                        y1={0.75}
                                        x2={735.223}
                                        y2={68.2246}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <Stop stopColor="#34BE7C"/>
                                        <Stop offset={1} stopColor="#2EB6A5"/>
                                    </LinearGradient1>
                                </Defs>
                            </Svg>


                        </TouchableOpacity>


                    </View>


                </View>


                <View style={feedsStyles.safeArea}>
                    {this.state.isFilterCleared &&
                        <TouchableOpacity style={feedsStyles.resetFilter}
                                          onPress={this.clearFilter}>
                            <Text style={feedsStyles.filterText}>Очистить фильтрацию</Text>
                            <Ionicons name="close" size={24} color="black"/>
                        </TouchableOpacity>
                    }
                    <FlatList
                        extraData={this.state}
                        data={this.state.products}
                        renderItem={({item}) => {

                            return <View style={feedsStyles.feedsCarItems}>


                                <View style={feedsStyles.feedsCarImgWrapper} key={item.id}>
                                    <Image style={feedsStyles.feedsCaritemsImg}
                                           source={{uri: `http://bowy.ru/storage/uploads/${item.image[0]?.image}`}}/>
                                    {Number(item.user_id) !== Number(this.state.loggedUserID) &&
                                        <TouchableOpacity style={feedsStyles.addinwish}
                                                          onPress={() => {
                                                              if (this.state.wishListId.includes(item.id)) {
                                                                  this.setState(prev => ({wishListId: prev.wishListId.filter(items => item.id !== items)}))
                                                                  this.removeFromFavourites(item.id)

                                                              } else {
                                                                  this.addToFavourites(item.user_id, item.id)
                                                                  this.setState((prev) => ({wishListId: [...prev.wishListId, item.id]}))
                                                              }
                                                          }}>


                                            {this.state.wishListId.includes(item.id)
                                                ?
                                                <Svg
                                                    width={28}
                                                    height={28}
                                                    viewBox="0 0 28 28"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <Rect opacity={0.4} width={28} height={28} rx={8} fill="#000"/>
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
                                                    <Rect opacity={0.4} width={28} height={28} rx={8} fill="#000"/>
                                                    <Path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M16.887 6.876c.473 0 .946.066 1.395.217 2.768.9 3.766 3.938 2.933 6.593a9.546 9.546 0 01-2.257 3.606 28.841 28.841 0 01-4.748 3.72l-.188.114-.195-.121a28.57 28.57 0 01-4.776-3.72 9.7 9.7 0 01-2.259-3.6c-.847-2.654.15-5.692 2.949-6.608a3.39 3.39 0 01.666-.156h.09c.211-.031.42-.045.63-.045h.083c.472.014.93.096 1.373.247h.044c.03.014.053.03.068.044.165.054.322.114.472.196l.285.128c.07.036.146.092.213.141.043.03.08.058.11.076l.037.022c.064.037.131.077.188.12a4.697 4.697 0 012.887-.974zm1.995 5.4a.617.617 0 00.593-.571v-.09a2.475 2.475 0 00-1.583-2.37.6.6 0 00-.757.376c-.105.315.06.66.375.771.48.18.802.654.802 1.178v.023a.644.644 0 00.143.465.628.628 0 00.427.218z"
                                                        fill="#fff"
                                                        opacity={0.7}
                                                    />
                                                </Svg>

                                            }
                                        </TouchableOpacity>}
                                </View>


                                <View style={feedsStyles.feedsCarItemRight}>

                                    <TouchableOpacity onPress={() => this.openSingleCar(item)}

                                    >

                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '400',
                                                color: '#424A55',
                                                marginBottom: 5,
                                                width: "100%",
                                            }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '700',
                                                color: '#424A55',

                                            }}>{"Заголовок" + " - "}</Text>{item.headline}</Text>


                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                width: "100%",
                                                fontSize: 12,
                                                fontWeight: '400',
                                                color: '#424A55',
                                                marginBottom: 5
                                            }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '700',
                                                color: '#424A55',
                                            }}>{"Цена" + " - "}</Text>{item.price+" ₽"} </Text>


                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                width: "100%",
                                                fontSize: 12,
                                                fontWeight: '400',
                                                color: '#424A55',
                                                marginBottom: 5
                                            }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '700',
                                                color: '#424A55',
                                            }}>{"Адрес" + " - "}</Text>{item.address}</Text>

                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                width: "100%",
                                                fontSize: 12,
                                                fontWeight: '400',
                                                color: '#424A55',
                                                marginBottom: 5
                                            }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '700',
                                                color: '#424A55',
                                                marginBottom: 10
                                            }}>{"Опубликован" + " - "}</Text>
                                            {item.updated_at.split("").slice(0, 10).join("")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }}

                    />
                </View>
            </View>
        )
    }
}
