import * as React from 'react';
import {
    Button,
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert,
    BackHandler
} from 'react-native';


import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WishListComponent from './components/WishList/WishList';
import EditPassword from "./components/EditPassword/EditPassword";
import FeedsScreenComponent from './components/Feeds/FeedsScreen';
import LoginComponent from './components/Auth/LoginScreen';
import RegisterComponent from './components/Auth/RegisterScreen';
import ConfirmEmail from "./components/Auth/ConfirmEmail";
import SingleCarComponent from './components/SingleCar/SingleCarScreen';
import ProfileComponent from './components/Profile/ProfileScreen';
import ChatComponent from './components/Chats/Chat';
import AddCarComponent from "./components/AddCar/AddCar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from './components/AuthContext/context';
import { StackActions } from '@react-navigation/native';
import Test from './components/SocialLinks/GoogleComponent'

import SingleMessageComponent from "./components/SingleMessage/SingleMessageScreen";

import ResetPasswordComponent from "./components/Auth/ResetPassword";
import EditCarComponent from "./components/EditCar/EditCarScreen";
import Svg, { G, Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"

// import {LinearGradient} from 'expo-linear-gradient';
import { useEffect } from "react";


function TestScreen({ navigation }) {
    return (
        <Test navigation={navigation} />
    )
}

function SingleCarScreen({ route, navigation }) {
    const { params } = route.params;
    return (
        <SingleCarComponent auto_data={params} navigation={navigation} />
    );
}

function FeedsScreen({ navigation }) {
    return (
        <FeedsScreenComponent navigation={navigation} />
    );
}

function WishListScreen({ navigation }) {
    return (
        <WishListComponent navigation={navigation} />
    );
}



function AddCarScreen({ navigation }) {
    const { params } = route.params;
    return (
        <AddCarComponent navigation={navigation} />
    )
}

function ChatScreen({ navigation, route }) {
    return (
        <ChatComponent navigation={navigation} />
    );
}

function ProfileScreen({ navigation }) {
    return (
        <ProfileComponent navigation={navigation} />
    );
}

function LoginScreen({ navigation }) {
    return (
        <LoginComponent navigation={navigation} />
    );
}

function RegisterScreen({ navigation }) {
    return (
        <RegisterComponent navigation={navigation} />
    );
}


function EditCarScreen({ route, navigation }) {
    const { params } = route.params;
    return (
        <EditCarComponent auto_data={params} navigation={navigation} />
    );
}

function SingleMessageScreen({ navigation, route }) {
    const { params, data, same, coins, header } = route.params
    return (
        <SingleMessageComponent navigation={navigation} product_id={params} name={data} image={same} price={coins} headline={header} />
    );
}

export default function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
        isLoading: true,
        userEmail: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userEmail: action.email,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (foundUser) => {
            // setIsLoading(true);
            const userToken = foundUser.token.toString();
            const userEmail = foundUser.email;


            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', email: userEmail, token: userToken });
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
            // setIsLoading(false);
        }
    }), []);

    React.useEffect(() => {
        setTimeout(async () => {

            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
    }, []);


    const Tab = createBottomTabNavigator();


    const tabBarStyle = {
        height: 60,
        backgroundColor: 'white',
        elevation: 0,
        borderTopColor: 'white',
        width: Dimensions.get('window').width - 50,
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    };


    return (
        <AuthContext.Provider value={authContext}>
            <StatusBar
                animated={true}
                hidden={false}
            // StatusBarStyle={"light-content"}
            />


            <NavigationContainer>

                <Tab.Navigator
                    initialRouteName="Login"
                    backBehavior={"history"}
                    unmountOnBlur={true}
                    screenOptions={({ route }) => ({
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarActiveTintColor: '#2EB6A5',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: tabBarStyle,
                        tabBarIcon: ({ focused }) => {
                            switch (route.name) {
                                case 'Feeds':
                                    return focused ? <Svg
                                        width={30}
                                        height={30}
                                        viewBox="0 0 743 743"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"

                                    >
                                        <Path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M.247 322.121C.247 144.357 142.82.251 318.692.251c84.457 0 165.455 33.91 225.175 94.273s93.27 142.232 93.27 227.597c0 177.765-142.573 321.871-318.445 321.871C142.82 643.992.247 499.886.247 322.121zm631.621 259.295l94.842 76.556h1.646c19.188 19.395 19.188 50.839 0 70.233-19.187 19.394-50.297 19.394-69.484 0l-78.706-90.204c-7.441-7.495-11.623-17.675-11.623-28.293 0-10.617 4.182-20.798 11.623-28.292 14.35-14.253 37.352-14.253 51.702 0z"
                                            fill="url(#paint0_linear_366_32)"
                                        />
                                        <Defs>
                                            <LinearGradient
                                                id="paint0_linear_366_32"
                                                x1={0.247314}
                                                y1={0.250488}
                                                x2={798.043}
                                                y2={65.3767}
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <Stop stopColor="#34BE7C" />
                                                <Stop offset={1} stopColor="#2EB6A5" />
                                            </LinearGradient>
                                        </Defs>
                                    </Svg> :
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 743 743"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <Path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M.247 322.121C.247 144.357 142.82.251 318.692.251c84.457 0 165.455 33.91 225.175 94.273s93.27 142.232 93.27 227.597c0 177.765-142.573 321.871-318.445 321.871C142.82 643.992.247 499.886.247 322.121zm631.621 259.295l94.842 76.556h1.646c19.188 19.395 19.188 50.839 0 70.233-19.187 19.394-50.297 19.394-69.484 0l-78.706-90.204c-7.441-7.495-11.623-17.675-11.623-28.293 0-10.617 4.182-20.798 11.623-28.292 14.35-14.253 37.352-14.253 51.702 0z"
                                                fill="#D1DAE6"
                                            />
                                        </Svg>

                                    break;

                                case 'WishList':
                                    return focused ? <Svg
                                        width={30}
                                        height={30}
                                        viewBox="0 0 743 707"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"

                                    >
                                        <Path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M514.422.838c23.425 0 46.814 3.305 69.052 10.767 137.029 44.55 186.405 194.906 145.159 326.328-23.389 67.16-61.628 128.453-111.709 178.535-71.689 69.423-150.356 131.051-235.039 184.139l-9.281 5.606-9.652-5.977c-84.979-52.717-164.093-114.345-236.45-184.14-49.747-50.081-88.023-111.003-111.783-178.163-41.951-131.422 7.425-281.778 145.939-327.108a167.767 167.767 0 0133.004-7.759h4.455c10.432-1.522 20.79-2.228 31.185-2.228h4.083c23.389.706 46.035 4.79 67.976 12.252h2.191c1.485.705 2.598 1.485 3.341 2.19 8.204 2.636 15.964 5.606 23.389 9.69l14.107 6.31c3.409 1.819 7.235 4.597 10.542 6.998 2.095 1.521 3.982 2.89 5.422 3.77.606.357 1.222.716 1.842 1.079 3.184 1.858 6.499 3.793 9.295 5.937C412.736 17.544 462.818.467 514.422.838zm98.752 267.3c15.221-.408 28.215-12.622 29.329-28.252v-4.418c1.114-52.012-30.405-99.123-78.334-117.315-15.221-5.234-31.927 2.97-37.496 18.563-5.197 15.592 2.97 32.67 18.562 38.202 23.798 8.91 39.724 32.335 39.724 58.286v1.151c-.705 8.501 1.856 16.706 7.054 23.017 5.197 6.311 12.994 9.987 21.161 10.766z"
                                            fill="url(#paint0_linear_366_100)"
                                        />
                                        <Defs>
                                            <LinearGradient
                                                id="paint0_linear_366_100"
                                                x1={0.239746}
                                                y1={0.83252}
                                                x2={797.474}
                                                y2={69.3383}
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <Stop stopColor="#34BE7C" />
                                                <Stop offset={1} stopColor="#2EB6A5" />
                                            </LinearGradient>
                                        </Defs>
                                    </Svg>
                                        :
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 743 707"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"

                                        >
                                            <Path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M514.422.838c23.425 0 46.814 3.305 69.052 10.767 137.029 44.55 186.405 194.906 145.159 326.328-23.389 67.16-61.628 128.453-111.709 178.535-71.689 69.423-150.356 131.051-235.039 184.139l-9.281 5.606-9.652-5.977c-84.979-52.717-164.093-114.345-236.45-184.14-49.747-50.081-88.023-111.003-111.783-178.163-41.951-131.422 7.425-281.778 145.939-327.108a167.767 167.767 0 0133.004-7.759h4.455c10.432-1.522 20.79-2.228 31.185-2.228h4.083c23.389.706 46.035 4.79 67.976 12.252h2.191c1.485.705 2.598 1.485 3.341 2.19 8.204 2.636 15.964 5.606 23.389 9.69l14.107 6.31c3.409 1.819 7.235 4.597 10.542 6.998 2.095 1.521 3.982 2.89 5.422 3.77.606.357 1.222.716 1.842 1.079 3.184 1.858 6.499 3.793 9.295 5.937C412.736 17.544 462.818.467 514.422.838zm98.752 267.3c15.221-.408 28.215-12.622 29.329-28.252v-4.418c1.114-52.012-30.405-99.123-78.334-117.315-15.221-5.234-31.927 2.97-37.496 18.563-5.197 15.592 2.97 32.67 18.562 38.202 23.798 8.91 39.724 32.335 39.724 58.286v1.151c-.705 8.501 1.856 16.706 7.054 23.017 5.197 6.311 12.994 9.987 21.161 10.766z"
                                                fill="#D1DAE6"
                                            />
                                        </Svg>


                                    break;

                                case 'Chat':
                                    return focused ?
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 743 743"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"

                                        >
                                            <Path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M.251 372.058C.251 176.487 156.548.25 372.244.25c210.87 0 370.507 172.891 370.507 370.693 0 229.405-187.11 371.808-371.25 371.808-60.885 0-128.452-16.36-182.655-48.335-18.933-11.526-34.897-20.078-55.316-13.386l-74.992 22.309c-18.934 5.949-36.011-8.923-30.443-29.001l24.874-83.285c4.084-11.526 3.341-23.796-2.599-33.463C18.443 498.845.251 434.522.251 372.058zm322.988 0c0 26.399 21.161 47.592 47.52 47.963 26.358 0 47.52-21.564 47.52-47.591 0-26.398-21.162-47.591-47.52-47.591-25.988-.372-47.52 21.193-47.52 47.219zm171.146.372c0 26.027 21.161 47.591 47.52 47.591s47.52-21.564 47.52-47.591c0-26.398-21.161-47.591-47.52-47.591s-47.52 21.193-47.52 47.591zm-294.772 47.591c-25.988 0-47.52-21.565-47.52-47.591 0-26.398 21.161-47.591 47.52-47.591 26.358 0 47.52 21.193 47.52 47.591 0 26.026-21.162 47.22-47.52 47.591z"
                                                fill="url(#paint0_linear_366_105)"
                                            />
                                            <Defs>
                                                <LinearGradient
                                                    id="paint0_linear_366_105"
                                                    x1={0.251465}
                                                    y1={0.250488}
                                                    x2={798.047}
                                                    y2={65.3767}
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <Stop stopColor="#34BE7C" />
                                                    <Stop offset={1} stopColor="#2EB6A5" />
                                                </LinearGradient>
                                            </Defs>
                                        </Svg> :
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 743 743"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"

                                        >
                                            <Path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M.251 372.058C.251 176.487 156.548.25 372.244.25c210.87 0 370.507 172.891 370.507 370.693 0 229.405-187.11 371.808-371.25 371.808-60.885 0-128.452-16.36-182.655-48.335-18.933-11.526-34.897-20.078-55.316-13.386l-74.992 22.309c-18.934 5.949-36.011-8.923-30.443-29.001l24.874-83.285c4.084-11.526 3.341-23.796-2.599-33.463C18.443 498.845.251 434.522.251 372.058zm322.988 0c0 26.399 21.161 47.592 47.52 47.963 26.358 0 47.52-21.564 47.52-47.591 0-26.398-21.162-47.591-47.52-47.591-25.988-.372-47.52 21.193-47.52 47.219zm171.146.372c0 26.027 21.161 47.591 47.52 47.591s47.52-21.564 47.52-47.591c0-26.398-21.161-47.591-47.52-47.591s-47.52 21.193-47.52 47.591zm-294.772 47.591c-25.988 0-47.52-21.565-47.52-47.591 0-26.398 21.161-47.591 47.52-47.591 26.358 0 47.52 21.193 47.52 47.591 0 26.026-21.162 47.22-47.52 47.591z"
                                                fill="#D1DAE6"
                                            />
                                        </Svg>
                                    break;

                                case 'Profile':

                                    return focused ?
                                        <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 891 891"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"

                                        >
                                            <Path
                                                d="M445.5 74.25c-97.267 0-176.344 79.076-176.344 176.344 0 95.411 74.622 172.631 171.889 175.972 2.97-.371 5.94-.371 8.168 0h2.598c95.04-3.341 169.662-80.561 170.033-175.972 0-97.268-79.077-176.344-176.344-176.344z"
                                                fill="url(#paint0_linear_366_113)"
                                            />
                                            <Path
                                                d="M634.095 525.319c-103.579-69.053-272.497-69.053-376.819 0-47.148 31.556-73.136 74.25-73.136 119.913 0 45.664 25.988 87.987 72.765 119.172C308.88 799.301 377.19 816.75 445.5 816.75s136.62-17.449 188.595-52.346c46.778-31.557 72.765-73.879 72.765-119.914-.371-45.664-25.987-87.986-72.765-119.171z"
                                                fill="url(#paint1_linear_366_113)"
                                            />
                                            <Defs>
                                                <LinearGradient
                                                    id="paint0_linear_366_113"
                                                    x1={269.156}
                                                    y1={74.25}
                                                    x2={648.104}
                                                    y2={105.217}
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <Stop stopColor="#34BE7C" />
                                                    <Stop offset={1} stopColor="#2EB6A5" />
                                                </LinearGradient>
                                                <LinearGradient
                                                    id="paint1_linear_366_113"
                                                    x1={184.14}
                                                    y1={473.529}
                                                    x2={740.925}
                                                    y2={542.752}
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <Stop stopColor="#34BE7C" />
                                                    <Stop offset={1} stopColor="#2EB6A5" />
                                                </LinearGradient>
                                            </Defs>
                                        </Svg>
                                        : <Svg
                                            width={30}
                                            height={30}
                                            viewBox="0 0 891 891"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"

                                        >
                                            <Path
                                                d="M445.5 74.25c-97.267 0-176.344 79.076-176.344 176.344 0 95.411 74.622 172.631 171.889 175.972 2.97-.371 5.94-.371 8.168 0h2.598c95.04-3.341 169.662-80.561 170.033-175.972 0-97.268-79.077-176.344-176.344-176.344zM634.095 525.319c-103.579-69.053-272.497-69.053-376.819 0-47.148 31.556-73.136 74.25-73.136 119.913 0 45.664 25.988 87.987 72.765 119.172C308.88 799.301 377.19 816.75 445.5 816.75s136.62-17.449 188.595-52.346c46.778-31.557 72.765-73.879 72.765-119.914-.371-45.664-25.987-87.986-72.765-119.171z"
                                                fill="#D1DAE6"
                                            />
                                        </Svg>

                                    break;
                                default:
                            }

                        }
                    })}
                >
                    {/* <Tab.Screen name='Test' component={Test}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })} /> */}

                    <Tab.Screen name='ResetPassword' component={ResetPasswordComponent}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })} />

                    <Tab.Screen name="Feeds" component={FeedsScreen} />
                    <Tab.Screen name="WishList" component={WishListScreen}
                        options={{
                            title: 'Избранное',
                            headerShown: false,
                            headerTitleStyle: {
                                // paddingLeft: 6,
                            },
                        }}
                    />
                    {/*boxShadow:'0px 4px 30px #30b99966'*/}

                    <Tab.Screen name='AddCarComponent' component={AddCarScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <View style={{
                                    width: 50,
                                    flex: 1,
                                    marginTop: -45,
                                    justifyContent: 'center',
                                    marginLeft: -65
                                }}>
                                    <Svg
                                        style={{ width: 56, height: 56 }}
                                        width={116}
                                        height={114}
                                        viewBox="0 0 116 114"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <G filter="url(#filter0_d_888_281)">
                                            <Circle cx={58} cy={54} r={28} fill="url(#paint0_linear_888_281)" />
                                        </G>
                                        <Path
                                            d="M56.417 46v6.416H50a1.583 1.583 0 100 3.167h6.417V62a1.583 1.583 0 103.166 0v-6.417H66a1.583 1.583 0 000-3.166h-6.417V46a1.583 1.583 0 00-3.166 0z"
                                            fill="#fff"
                                            stroke="#fff"
                                            strokeWidth={0.5}
                                        />
                                        <Defs>
                                            <LinearGradient
                                                id="paint0_linear_888_281"
                                                x1={30}
                                                y1={26}
                                                x2={90.1705}
                                                y2={30.9119}
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <Stop stopColor="#34BE7C" />
                                                <Stop offset={1} stopColor="#2EB6A5" />
                                            </LinearGradient>
                                        </Defs>
                                    </Svg>
                                </View>
                            )
                        }}
                    />


                    {/*<Tab.Screen name="AddAuto" component={AddAutoScreen}*/}
                    {/*    options={{*/}
                    {/*        tabBarIcon: ({ color}) => (*/}
                    {/*            <View style={{width:50,flex: 1,marginTop:-30,justifyContent: 'center'  }}>*/}
                    {/*                    <Image style={{width: 56,height: 56 }} source={require('./assets/img/add_auto1.png')}/>*/}
                    {/*            </View>*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*/>*/}


                    <Tab.Screen name="Chat" component={ChatScreen}
                        options={({ route }) => ({

                        })}
                    />
                    <Tab.Screen name="Profile" component={ProfileScreen} />


                    <Tab.Screen name="SingleCar" component={SingleCarScreen}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })} />
                    <Tab.Screen name="Login" component={LoginScreen}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })}
                    />
                    <Tab.Screen name="Register" component={RegisterScreen}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })}
                    />
                    <Tab.Screen name="ConfirmEmail" component={ConfirmEmail}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })}
                    />

                    <Tab.Screen name="SingleMessage" component={SingleMessageScreen}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })} />

                    <Tab.Screen name="EditPassword" component={EditPassword}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })} />
                    <Tab.Screen name="EditCar" component={EditCarScreen}
                        options={({ route }) => ({
                            tabBarButton: () => null,
                            tabBarStyle: { display: 'none' }
                        })} />

                </Tab.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

