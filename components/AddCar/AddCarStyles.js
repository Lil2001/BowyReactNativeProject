import {StyleSheet} from 'react-native'


const addCarStyle = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        paddingHorizontal: 15,
        alignItems: "center",
        marginTop: 40,
    },

    titleStyles: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 5,
        width: '100%',
    },

    characteristicsView: {
        width: '100%',
        backgroundColor: '#F0F4F8',
        borderRadius: 10,
        paddingHorizontal: 13,
    },
    feature: {
        backgroundColor: "white",
        width: "100%",
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "flex-start"
    },

    inputStyles: {
        width: '100%',
        borderBottomWidth: 1,
        height: 60,
        borderColor: '#A2ABC2',
        zIndex: 0,
        paddingHorizontal: 10

    },
    imagePicker: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#AFB7C5',
        borderRadius: 10,

    },
    imagePickerIcon: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        fontSize: 50,
        color: '#AFB7C5',
        zIndex: 1,
    },
    pickedPhotoStyle: {
        height: 100,
        marginLeft: 10,
        zIndex: 1,

    },

    firstSide:{
      borderRadius: 15,
        backgroundColor: '#F0F4F8',
        zIndex: 100
    },
    removeCarStyle: {
        width: 20,
        height: 20,
        backgroundColor: '#FF5B37',
        borderRadius: 10,
        padding: 4,
        alignSelf: 'flex-end',
        position: 'absolute',
        left: 90,
        top: -1,
        zIndex: 1
    },
    linearGradient: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 40,
    }


})
export {addCarStyle}
