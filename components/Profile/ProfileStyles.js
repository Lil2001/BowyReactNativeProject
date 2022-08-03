import {Dimensions, StatusBar, StyleSheet} from 'react-native'

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        width: "100%"
    },
    text: {
        fontSize: 42,
    },
    profileScreenMainView: {
        flex: 1,
        // width: Dimensions.get('window').width,
        paddingTop: StatusBar.currentHeight + 23,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        zIndex: 1,
        paddingHorizontal: 20,


    },
    profileCaritems: {
        height: 130,
        alignSelf: 'stretch',
        width: "100%",
        marginBottom: 20,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 13,
        overflow: 'hidden',
        backgroundColor: '#F0F4F8',
    },
    profileCarImgWrapper: {
        width: "45%"
    },
    profileCaritemsImg: {},
    profileCarItemRight: {
        width: "55%",
        borderRadius: 13,
        justifyContent: "center",
        marginLeft: 7,
        paddingRight: 7
    },
    addinwish: {
        position: 'absolute',
        width: 28,
        height: 28,
        right: 10,
        bottom: 10,
        zIndex: 1,
    },
    textInputStyle: {
        height: 40,
        flex: 1,
        color: '#424A55'
    },
    textInputWrapperStyle: {
        width: Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 30,
    },
    textInputContainerStyle: {
        backgroundColor: '#F0F4F8',
        borderRadius: 16,
        overflow: 'hidden',
        paddingLeft: 12,
        paddingRight: 17,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInputImg: {
        width: 20,
        height: 20,
        marginRight: 16
    },
    textInputImgFilterIcon: {
        width: 20,
        height: 17,
        marginLeft: 17
    },
    searchLine: {
        width: 2,
        height: 24,
        backgroundColor: '#DAE1EC',
        marginLeft: 17
    },
    modalContainer: {
        marginTop: 22,
        marginRight: 22,
        marginLeft: 22,
    },
    modalContainer2: {
        width: "100%",
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 38
    },
    modalContainerTitle: {
        fontSize: 18,
        color: '#424A55',
        fontWeight: 'bold'
    },
    closeModal: {
        width: 24,
        height: 24
    },

    filterSearchButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'green',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    sortByWrapper: {
        width: '100%',
        height: 169,
        marginTop: 20,
        backgroundColor: '#F0F4F8',
        borderRadius: 10,
        padding: 15
    },
    filterFieldsWrapper: {
        marginBottom: 59
    },
    minMaxPriceWrapper: {
        width: '100%',
        height: 96,
        marginTop: 20,
        backgroundColor: '#F0F4F8',
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    minPriceWrapper: {
        height: 48,
        borderBottomColor: "#a2abc25c",
        borderBottomWidth: 1
    },
    maxPriceWrapper: {
        height: 48
    },
    rbWrapper: {
        marginBottom: 21,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    filterSortLabel: {
        marginRight: 36,
        fontSize: 14,
        color: '#8B94A3',
        fontWeight: 'normal'
    },
    rbStyle: {
        height: 10,
        width: 10,
        borderRadius: 110,
        borderWidth: 1,
        borderColor: '#8B94A3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    selected: {
        width: 4,
        height: 4,
        borderRadius: 55,
        backgroundColor: '#2EB6A5',
    },
    result: {
        marginTop: 22,
        color: 'white',
        fontWeight: '600',
        backgroundColor: 'blue',
    },
    sortByTitile: {
        color: "#A7AEBA",
        fontSize: 11,
        marginBottom: 17
    },

    profileTitleWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // paddingLeft: 23,
        // paddingRight: 20,
        marginBottom: 20
    },
    wishTitle: {
        fontSize: 24,
        color: '#424A55',
        fontWeight: 'bold',
        zIndex: 1
    },
    profileNot: {
        width: 20,
        height: 21
    },
    profileSetting: {
        width: 21,
        height: 22
    },
    profilePhoto: {
        width: 80,
        height: 80
    },
    profilePhotoWrapper: {
        marginRight: 25,
        width: 80,
        height: 80,
    },
    addPhotoIcon: {
        position: "relative",
        bottom: 20,
        left: 67
    },
    userName: {
        fontSize: 18,
        color: '#424A55',
        marginBottom: 8,
    },
    profileCall: {
        width: 15,
        height: 16,
        marginRight: 10
    },
    profileMail: {
        width: 17,
        height: 16,
        marginRight: 10
    },
    profileLocation: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    profile: {},


    profileInfo: {
        width: "100%",
        backgroundColor: '#F0F4F8',
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "flex-start"


    },

    userInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: "100%",
        padding: 5


    },

    profileUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        width: '100%',
        zIndex: 1
    },
    profileUserInfoTwoWrapper: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-around"
    },


    profileUserInfoTwo: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        zIndex: 1
    },
    profileNumberLabel: {
        color: '#818B9B',
        fontSize: 14,
        marginRight: 10
    },
    profileNumber: {
        fontSize: 14,
        color: "#424A55"
    },
    tabsWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        paddingLeft: 22,
        paddingRight: 22,
        marginBottom: 20
    },
    tabWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
        flexWrap: 'wrap',
        height: 40,
    },
    tabLabel: {
        color: "#818B9B",
        marginBottom: 10,
        width: '100%',
        textAlign: "center",
    },
    tabLine: {
        width: 40,
        height: 3,
        backgroundColor: "#2EB6A5",
        marginTop: 10
    },
    carsInfo: {
        fontSize: 14,
        fontWeight: '700',
        color: '#424A55',
        marginBottom: 10,
    },
    refactorInput: {
        borderBottomWidth: 2,
        borderColor: 'green',
        fontSize: 15,
        width: '100%',
        maxWidth: 200,
        padding: 3
    },
    modalView: {
        paddingTop: 20,
        justifyContent: "space-between",
        alignItems: "center",
        width: "60%",
        height: 300,
        backgroundColor: "#F0F4F8",
        borderRadius: 10,
        alignSelf: 'flex-end',
        // opacity: 0.7,
        marginTop: 100


    },
    changeUserData: {
        alignItems: "center",
        color: "white"
    },

    settingView: {
        width: 170,
        height: 70,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#F0F4F8',
        position: "absolute",
        right: 0,
        zIndex: 10,
        top: StatusBar.currentHeight + 5
    },
    editProfileButtons: {
        width: "100%",
        paddingVertical: 12,
        paddingHorizontal: 5,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly",
        marginTop: 10
    },
    editButton: {
        backgroundColor: "#33BD84",
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 10,
        marginHorizontal: 17,
        width: '50%',
        height: 50,
        justifyContent: 'center',

    },
    errorMessage: {
        fontSize: 12,
        color: "red",
        alignSelf: "flex-start",
        paddingLeft: 22,

    }
});

export {ProfileStyles};
