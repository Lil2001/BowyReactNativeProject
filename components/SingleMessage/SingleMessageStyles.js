import { StyleSheet} from 'react-native'


const SingleMessageStyle = StyleSheet.create({
    view: {flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 57
    },
    backIcon:{
        width: 15,
        height: 15,
    },
    line:{
        width: "100%",
        height: 3,
        backgroundColor: "#BABABA",
        marginTop: 30,
        marginBottom: 10
    },
    userMessage1:{
        alignSelf: 'flex-start',
    
        backgroundColor:'#34BE7C',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderBottomLeftRadius: 0
    },

    userMessage2:{
        flex: 1,
        alignSelf: 'flex-end',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        backgroundColor: '#D6F5E9',
     
    },

    pickedPhotoStyle:{
        width: "90%",
        marginTop: 40,

        marginLeft: 10,
        marginBottom: 20
    },
    newMessageStyle:{
        color: '#FFFFFF',
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#34BE7C',
        borderRadius: 10,
        borderBottomRightRadius: 0,
    }


});

export {SingleMessageStyle}
