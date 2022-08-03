import React, {Component} from 'react';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Modal, FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {EvilIcons} from '@expo/vector-icons';


import * as ImagePicker from 'expo-image-picker';
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {feedsStyles} from "../Feeds/feedsStyles";
import {editCarStyles} from "./EditCarStyles";


export default class EditCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carCategoryOpen: false,
            carCategoryValue: null,
            carCategoryItems: [],

            regionCategoryOpen: false,
            regionCategoryValue: null,
            regionCategoryItems: [],

            cityListOpen: false,
            cityListValue: null,
            cityListItems: [],

            carAgeOpen: false,
            carAgeValue: null,
            carAgeItems: [],


            bodyTypeOpen: false,
            bodyTypeValue: null,
            bodyTypeItems: [
                {label: "Седан", value: "Седан"},
                {label: "Универсал", value: "Универсал"},
                {label: "Хэтчбэк", value: "Хэтчбэк"},
                {label: "Купе", value: "Купе"},
                {label: "Лимузин", value: "Лимузин"},
                {label: "Микроавтобус", value: "Микроавтобус"},
                {label: "Минивэн", value: "Минивэн"},
                {label: "Хардтоп", value: "Хардтоп"},
                {label: "Таун", value: "Таун"},
                {label: "Лифтбэк", value: "Лифтбэк"},
                {label: "Фастбэк", value: "Фастбэк"},
                {label: "Кабриолет", value: "Кабриолет"},
                {label: "Родстер", value: "Родстер"},
                {label: "Ландо", value: "Ландо"},
                {label: "Брогам", value: "Брогам"},
                {label: "Тарга", value: "Тарга"},
                {label: "Спайдер", value: "Спайдер"},
                {label: "Шутингбрейк", value: "Шутингбрейк"},
                {label: "Пикап", value: "Пикап"},
                {label: "Фургон", value: "Фургон"}
            ],

            gearBoxOpen: false,
            gearBoxValue: null,
            gearBoxItem: [
                {label: "Механическая коробка передач", value: "Механическая"},
                {label: "Автоматическая коробка передач", value: "Автоматическая"},
            ],

            carModelOpen: false,
            carModelValue: null,
            carModelItems: [],

            rudderOpen: false,
            rudderValue: null,
            rudderItems: [
                {label: "левый", value: "левый"},
                {label: "правый", value: "правый"},
            ],


            selectedImages: [],
            imageIdList: [],
            imageError: null,


            title: "",
            price: null,
            address: "",
            description: "",

        }
    }


    handleBack = () => {
        this.props.navigation.navigate("SingleCar", {
            navigation: JSON.stringify(this.props.navigation)
        })
    };
    renderPicketPhoto = () => {
        let {selectedImages} = this.state;
        if (selectedImages.length) {
            return (
                <View style={{width: "100%"}}>
                    <FlatList
                        horizontal
                        data={selectedImages}
                        extraData={this.state}
                        renderItem={({item}) => {
                            return <View style={{width: 100, height: 100, marginRight: 20}} key={item.key}>
                                <TouchableOpacity style={editCarStyles.removeCarStyle} onPress={() => {
                                    this.handleRemoveCar(item)
                                }}>
                                    <Image
                                        style={{justifyContent: 'center'}}
                                        source={require('../../assets/img/trashicon.png')}/>
                                </TouchableOpacity>
                                <Image style={{
                                    width: 100,
                                    height: 100,
                                    borderWidth: 3,
                                    borderRadius: 10,
                                }}
                                       source={{uri: item.uri ? item.uri : `http://bowy.ru/storage/uploads/${item?.image}`}}/>

                            </View>
                        }}
                        keyExtractor={item => item.id}
                    />

                </View>
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


        pickerResult.id = pickerResult.uri
        let res = pickerResult.uri.split('.');
        let type = res[res.length - 1];


        if (type !== 'jpg' && type !== 'png' && type !== 'jpeg') {
            Alert.alert("формат картинки должен быть JPEG, PNG или JPG")
            return
        }


        let {selectedImages} = this.state;


        selectedImages.push(pickerResult);
        this.setState({selectedImages})
    };


    handleRemoveCar = (item) => {
        let {selectedImages, imageIdList} = this.state;
        selectedImages = selectedImages.filter(el => el !== item);
        imageIdList.push(item.id)

        this.setState({
            selectedImages,
            imageIdList
        })


    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.state.selectedImages, "images")
        console.log(this.state.imageIdList, "id")
        // console.log(this.state.selectedImages)

    }

    deleteImage = async (id) => {
        try {
            let userToken = await AsyncStorage.getItem("userToken")
            let AuthStr = "Bearer " + userToken
            fetch("http://bowy.ru/api/delete-image/" + id, {
                method: "GET",

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': AuthStr,
                },
            })
                .then(response => response.json())
                .then((res) => {
                    console.log("jnjel")
                    console.log(res)
                }).catch((e) => {
                console.log("errrrror")
            })
        } catch (e) {
            console.log("catch jnjel")
        }
    }
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
            .catch(() => {
                // console.log("Hi")
            })
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
                })
                this.setState({regionCategoryItems: carCategory})
            })
            .catch(() => {
                console.log("Hello")
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
                        .filter((item) => item.region_id == regionId)
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
                    // console.log(e)
                })
        } catch (e) {
            // console.log(e)
        }
    }
    getCarYears = () => {
        let arr = []
        let maxCarAge = new Date().getFullYear().toString()
        for (let i = maxCarAge; i >= 1950; i--) {
            let picker = {}
            picker.label = i
            picker.value = i
            arr.push(picker)
        }
        this.setState({carAgeItems: arr})
    }
    getCarModel = async () => {
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
                    response[0].map((item) => {
                        let picker = {}
                        picker.label = item.name
                        picker.value = item.name
                        picker.id = item.id
                        arr.push(picker)
                    })
                    this.setState({carModelItems: arr})
                })
                .catch((e) => {
                    // console.log(e)
                })
        } catch (e) {

        }
    }
    getImages = () => {
        this.setState({selectedImages: this.props.auto_data?.image}, ()=>{
            console.log(this.state.selectedImages)
        })
    }

    editCar = async () => {
        let {selectedImages} = this.state
        try {
            if (!selectedImages.length) {
                this.setState({imageError: "добавить картинки обязательно"})
                return
            }

            selectedImages = selectedImages.filter(item => item.uri)
            console.log(selectedImages)
            console.log(this.state.imageIdList, "idList")


            const form = new FormData();
            if (selectedImages.length) {
                form.append('image', {
                    uri: selectedImages[0]["uri"],
                    type: 'image/jpg',
                    name: 'image.jpg',
                });
            }



            form.append("headline", this.state.title)
            form.append("region", this.state.regionCategoryValue);
            form.append("city", this.state.cityListValue);
            form.append("price", this.state.price);
            form.append("address", this.state.address);
            form.append("car_model", this.state.carModelValue);
            form.append("description", this.state.description);
            form.append("body_type", this.state.bodyTypeValue);
            form.append("rudder", this.state.rudderValue);
            form.append("year_of_issue", this.state.carAgeValue);
            form.append("transmission", this.state.gearBoxValue);
            form.append("category_id", this.state.carCategoryValue);
            form.append("product_id", this.props.auto_data.id);


            const userToken = await AsyncStorage.getItem("userToken")
            const AuthStr = "Bearer " + userToken


            await fetch("http://bowy.ru/api/update-products/" + this.props.auto_data.id, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': AuthStr,
                },
                body: form
            })
                .then(response => response.json())
                .then((res) => {
                    console.log(res, "edit")
                    if (res.success) {
                        this.setState({
                            selectedImages: [],
                            carCategoryValue: null,
                            regionCategoryValue: null,
                            cityListValue: null,
                            carAgeValue: null,
                            bodyTypeValue: null,
                            gearBoxValue: null,
                            carModelValue: null,
                            rudderValue: null,
                            imageError: null,
                            title: "",
                            price: "",
                            address: "",
                            description: "",
                        })
                        if (this.state.imageIdList.length) {

                            this.state.imageIdList.forEach((item) => {
                                console.log(item, "edo")
                                this.deleteImage(item)
                            })
                        }
                        this.props.navigation.navigate("Profile")
                    }
                })
                .catch((res) => {
                    console.log("catch promise")
                })


        } catch (e) {
            console.log("catch async")
        }
    }

    getCarInfo = () => {
        this.setState({
            description: this.props.auto_data.description,
            title: this.props.auto_data.headline,
            price: String(this.props.auto_data.price),
            carCategoryValue: this.props.auto_data.category_id,
            regionCategoryValue: String(this.props.auto_data.region_name),
            cityListValue: this.props.auto_data.city_name,
            address: this.props.auto_data.address,
            carModelValue: this.props.auto_data.car_model,
            rudderValue: this.props.auto_data.rudder,
            gearBoxValue: this.props.auto_data.transmission,
            carAgeValue: Number(this.props.auto_data.year_of_issue),
            bodyTypeValue: this.props.auto_data.body_type
        })
    }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getCategories()
            this.getRegions()
            this.getCarYears()
            this.getCarModel()
            this.getImages()
            this.getCarInfo()
            this.getCities(this.props.auto_data.region)
        });

    }


    render() {
        return (

            <View style={{width: '100%', height: '100%', backgroundColor: 'white', paddingHorizontal: 20}}>

                <View style={editCarStyles.container}>

                    <View style={editCarStyles.titleStyles}>
                        <Text style={{fontSize: 18}}>
                            Редактирование объявления
                        </Text>
                        <TouchableOpacity onPress={this.handleBack}>
                            <EvilIcons name="close" size={23} color="black"/>
                        </TouchableOpacity>
                    </View>


                    <ScrollView style={{width: "100%", flex: 1}}
                                contentContainerStyle={editCarStyles.scrollComponents}

                    >

                        <View style={editCarStyles.characteristicsView}>
                            <TextInput
                                style={editCarStyles.inputStyles}
                                placeholderTextColor="#424A55"
                                placeholder='Заголовок объявления'
                                value={this.state.title}
                                onChangeText={(title) => this.setState({title})}
                            />

                            <TextInput
                                keyboardType={"numeric"}
                                placeholderTextColor="#424A55"
                                style={editCarStyles.inputStyles}
                                placeholder='Стоимость'
                                value={this.state.price}
                                onChangeText={(price) => this.setState({price})}
                            />


                            <DropDownPicker
                                open={this.state.carCategoryOpen}
                                value={this.state.carCategoryValue}
                                items={this.state.carCategoryItems}
                                setOpen={() => {
                                    this.setState((state) => ({carCategoryOpen: !state.carCategoryOpen}))
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({carCategoryValue: call(value)}))}
                                placeholder="Выберите категорию"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                    console.log(this.state.carCategoryValue)
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
                                placeholder="Выберите область"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                onOpen={() => {
                                    this.setState({carCategoryOpen: false})
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
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({cityListValue: call(value)}))}
                                placeholder="Выберите город"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                onOpen={() => {
                                    this.setState({carCategoryOpen: false})
                                    console.log(this.state.cityListValue)
                                }}
                                listMode="SCROLLVIEW"
                                zIndex={8}
                            />


                            <TextInput
                                style={editCarStyles.inputStyles}
                                placeholderTextColor="#424A55"
                                placeholder='Адрес'
                                value={this.state.address}
                                onChangeText={(address) => this.setState({address})}
                            />

                            <DropDownPicker
                                open={this.state.carModelOpen}
                                value={this.state.carModelValue}
                                items={this.state.carModelItems}
                                setOpen={() => {
                                    this.setState((state) => ({carModelOpen: !state.carModelOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({carModelValue: call(value)}))}
                                placeholder="Марка автомобиля"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                onOpen={() => {
                                    this.setState({carCategoryOpen: false})
                                }}
                                listMode="SCROLLVIEW"
                                zIndex={7}
                            />


                            <TextInput
                                style={{width: '100%', height: 60, paddingLeft: 13}}
                                placeholderTextColor="#424A55"
                                placeholder='Описание объявления'
                                value={this.state.description}
                                onChangeText={(description) => this.setState({description})}
                            />


                            <View style={editCarStyles.feature}>
                                <Text style={{textAlign: "left", width: "100%", fontSize: 17}}>
                                    Характеристики
                                </Text>
                            </View>

                            <DropDownPicker
                                open={this.state.rudderOpen}
                                value={this.state.rudderValue}
                                items={this.state.rudderItems}
                                setOpen={() => {
                                    this.setState((state) => ({rudderOpen: !state.rudderOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({rudderValue: call(value)}))}
                                placeholder="Руль"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                }}
                                zIndex={6}
                                listMode="SCROLLVIEW"
                            />


                            <DropDownPicker
                                open={this.state.gearBoxOpen}
                                value={this.state.gearBoxValue}
                                items={this.state.gearBoxItem}
                                setOpen={() => {
                                    this.setState((state) => ({gearBoxOpen: !state.gearBoxOpen}))
                                }}
                                maxHeight={220}
                                setValue={(call) => this.setState((value) => ({gearBoxValue: call(value)}))}
                                placeholder="Коробка передач"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                    this.setState({carCategoryOpen: false})
                                }}
                                zIndex={5}
                                listMode="SCROLLVIEW"
                            />


                            <DropDownPicker
                                open={this.state.carAgeOpen}
                                value={this.state.carAgeValue}
                                items={this.state.carAgeItems}
                                setOpen={() => {
                                    this.setState((state) => ({carAgeOpen: !state.carAgeOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({carAgeValue: call(value)}))}
                                placeholder="Год выпуска"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                    this.setState({carCategoryOpen: false})
                                }}
                                zIndex={4}
                                listMode="SCROLLVIEW"
                            />


                            <DropDownPicker
                                open={this.state.bodyTypeOpen}
                                value={this.state.bodyTypeValue}
                                items={this.state.bodyTypeItems}
                                setOpen={() => {
                                    this.setState((state) => ({bodyTypeOpen: !state.bodyTypeOpen}))
                                }}
                                maxHeight={200}
                                setValue={(call) => this.setState((value) => ({bodyTypeValue: call(value)}))}
                                placeholder="Тип кузова"
                                style={{
                                    width: '100%',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 60,
                                    borderColor: '#A2ABC2',
                                    backgroundColor: '#F0F4F8',
                                }}
                                placeholderStyle={{
                                    color: "#424A55"
                                }}
                                onOpen={() => {
                                    this.setState({regionCategoryOpen: false})
                                }}
                                zIndex={3}
                                listMode="SCROLLVIEW"
                            />


                            <View style={{flexDirection: "column", width: "100%", alignItems: "center"}}>
                                {this.state.imageError ? <Text style={{
                                    width: "70%",
                                    alignSelf: "flex-start",
                                    color: 'red',
                                    marginBottom: 3,
                                    fontSize: 13,
                                }}>
                                    {this.state.imageError}
                                </Text> : null}

                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>

                                    <TouchableOpacity style={editCarStyles.imagePicker}
                                                      onPress={this.openImagePickerAsync}>
                                        <Text style={editCarStyles.imagePickerIcon}>
                                            +
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={editCarStyles.pickedPhotoStyle}>
                                        {this.renderPicketPhoto()}
                                    </View>
                                </View>


                            </View>


                            <TouchableOpacity onPress={this.editCar}>
                                <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={editCarStyles.linearGradient}>
                                    <Text style={{textAlign: 'center', color: 'white'}}>
                                        Разместить Объявление
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>


                        </View>


                    </ScrollView>
                </View>
            </View>
        )
    }
}


// import React, {Component} from 'react';
// import {
//     Text,
//     Alert,
//     Button,
//     View,
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     StatusBar,
//     Platform,
//     NativeModules,
//     ScrollView,
//     Linking,
//     TextInput,
//     FlatList,
//
//
//
// } from 'react-native';
//
// import {editCarStyles} from './EditCarStyles';
//
// import * as ImagePicker from 'expo-image-picker';
//
// import {LinearGradient} from "expo-linear-gradient";
// import { EvilIcons } from '@expo/vector-icons';
//
// export default class EditCarScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedImages: [],
//             selectedImagesUri: '',
//
//             addedCarDetails: {
//                 headline: '',
//                 adDescription: '',
//                 address: '',
//                 price: '',
//                 carModel: '',
//                 headLine2: '',
//                 adDescription2: '',
//                 price2: '',
//                 address2: '',
//             },
//         }
//     }
//
//
//
//
//
//     handleBack = () => {
//         this.props.navigation.navigate('Feeds');
//     };
//     openImagePickerAsync = async () => {
//         let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//
//         if (permissionResult.granted === false) {
//             alert("Permission to access camera roll is required!");
//             return;
//         }
//
//         let pickerResult = await ImagePicker.launchImageLibraryAsync();
//         if (pickerResult.cancelled === true) {
//             return;
//         }
//         let {selectedImages} = this.state;
//         selectedImages.push(pickerResult.uri);
//
//         console.log(selectedImages);
//         this.setState({
//             selectedImages
//         })
//     };
//     renderPicketPhoto = () => {
//         let {selectedImages} = this.state;
//         if (selectedImages.length) {
//             return (
//
//                 <ScrollView style={{}} horizontal={true}>
//                     {selectedImages.map(item => (
//                         <View style={{width: 100, height: 100, marginRight: 20}}>
//                             <TouchableOpacity style={editCarStyles.removeCarStyle} onPress={() => {
//                                 this.handleRemoveCar(item)
//                             }}>
//                                 <Image
//                                     style={{justifyContent: 'center'}}
//                                     source={require('../../assets/img/trashicon.png')}/>
//                             </TouchableOpacity>
//                             <Image source={{uri: item}} style={{
//                                 width: 100,
//                                 height: 100,
//                                 borderWidth: 3,
//                                 borderRadius: 10,
//                             }}
//                             />
//                         </View>
//                     ))}
//
//                 </ScrollView>
//             );
//         }
//     };
//     handleRemoveCar = (uri) => {
//         let {selectedImages} = this.state;
//         selectedImages = selectedImages.filter(el => el !== uri);
//
//         this.setState({
//             selectedImages
//
//         })
//     };
//
//     render() {
//
//         return (
//             <View style={editCarStyles.mainView}>
//                 <View style={editCarStyles.container}>
//
//                     <View style={editCarStyles.titleStyles}>
//                         <Text style={{fontSize: 18}}>
//                             Редактирование объявления
//                         </Text>
//                         <TouchableOpacity onPress={this.handleBack}>
//                             <EvilIcons name="close" size={23} color="black" />
//                         </TouchableOpacity>
//                     </View>
//                     <ScrollView style={{width: "100%"}}>
//
//
//
//                             {/*Создание объявления*/}
//
//                              <View style={editCarStyles.characteristicsView}>
//                                 <TextInput
//                                     style={editCarStyles.inputStyles}
//                                     placeholder='Загаловок объявления'
//                                     value={this.props.auto_data.title}
//                                     onChangeText={(headline) => this.setState({headline})}
//
//                                 />
//                                 <TextInput
//                                     style={editCarStyles.inputStyles}
//                                     placeholder='Описание объявления'
//                                     value={this.props.auto_data.body_type}
//                                     onChangeText={(adDescription) => this.setState({adDescription})}
//                                 />
//                                 <TextInput
//                                     style={editCarStyles.inputStyles}
//                                     placeholder='Стоимость'
//                                     value={this.props.auto_data.price}
//                                     onChangeText={(price) => this.setState({price})}
//                                 />
//                                 <TextInput
//                                     style={editCarStyles.inputStyles}
//                                     placeholder='Адрес'
//                                     value={this.props.auto_data.address}
//                                     onChangeText={(address) => this.setState({address})}
//                                 />
//                                 <TextInput
//                                     style={editCarStyles.inputStyles}
//                                     placeholder='Марка автомобиля'
//                                     value={this.props.auto_data.autoMark}
//                                     onChangeText={(carModel) => this.setState({carModel})}
//                                 />
//                                 <TextInput
//                                     style={{width: '100%', height: 60,}}
//                                     placeholder='Описание объявления'
//                                     value={this.props.auto_data.title}
//                                 />
//
//
//                             </View>
//                             <View style={{marginTop: 30}}>
//                                 <Text>
//                                     Характеристики
//                                 </Text>
//                                 <View style={editCarStyles.characteristicsView}>
//                                     <TextInput
//                                         style={editCarStyles.inputStyles}
//                                         placeholder='Описание объявления'
//                                         value={this.props.auto_data.title}
//                                         onChangeText={(headLine2) => this.setState({headLine2})}
//                                     />
//                                     <TextInput
//                                         style={editCarStyles.inputStyles}
//                                         placeholder='Описание объявления'
//                                         value={this.props.auto_data.description}
//                                         onChangeText={(adDescription2) => this.setState({adDescription2})}
//                                     />
//                                     <TextInput
//                                         style={editCarStyles.inputStyles}
//                                         placeholder='Стоимость'
//                                         value={this.props.auto_data.price}
//                                         onChangeText={(price2) => this.setState({price2})}
//                                     />
//                                     <TextInput style={{width: '100%', height: 60,}}
//                                                placeholder='Адрес'
//                                                value={this.props.auto_data.address}
//                                                onChangeText={(address2) => this.setState({address2})}
//                                     />
//
//                                 </View>
//                             </View>
//                             <View style={{width: '100%', flexDirection: 'row',}}>
//                                 <TouchableOpacity style={editCarStyles.imagePicker} onPress={this.openImagePickerAsync}>
//                                     <Text style={editCarStyles.imagePickerIcon}>
//
//                                         +
//                                     </Text>
//                                 </TouchableOpacity>
//
//                                 <View style={editCarStyles.pickedPhotoStyle}>
//                                     {this.renderPicketPhoto()}
//
//                                 </View>
//                             </View>
//                             <LinearGradient colors={['#34BE7C', '#2EB6A5']} style={editCarStyles.linearGradient}>
//                                 <TouchableOpacity>
//                                     <Text style={{textAlign: 'center', color: 'white'}}>
//                                         Сохранить
//                                     </Text>
//                                 </TouchableOpacity>
//                             </LinearGradient>
//
//                     </ScrollView>
//                 </View>
//             </View>
//         )
//     }
//
//
// }
