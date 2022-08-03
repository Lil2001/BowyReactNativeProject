import {StyleSheet, StatusBar} from 'react-native';


const editCarStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: StatusBar.currentHeight+5,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    characteristicsView:{
        width: '100%',
        marginTop: 30,
        backgroundColor: '#F0F4F8',
        borderRadius: 10,
        padding: 10,
    },
    titleStyles:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,

    },
    inputStyles:{
        width: '100%',
        borderBottomWidth: 1,
        height: 60,
        borderColor: '#A2ABC2',
        color: '#424A55',
        paddingLeft: 13
    },
    imagePicker:{
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#AFB7C5',
        borderRadius: 10,
        marginTop: 20
    },
    imagePickerIcon: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        fontSize: 50,
        color: '#AFB7C5'
    },
    pickedPhotoStyle: {
        width: 250,
        height: 100,
        marginTop: 40,
        marginLeft: 10,
    },
    removeCarStyle:{
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
    linearGradient:{
        width: '90%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    scrollComponents:{
        justifyContent: "flex-start",
        alignItems: "center",
    }


})
export {editCarStyles}
