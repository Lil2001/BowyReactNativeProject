import { Dimensions, StatusBar, StyleSheet} from 'react-native'

const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 23,
    },
    text: {
        fontSize: 42,
    },
    wishhListScreenMainView:{
        flex: 1,
        // width: Dimensions.get('window').width,
        paddingTop: StatusBar.currentHeight+23,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'

    },
    wishhListCaritems: {
        height: 125,
        alignSelf: 'stretch',
        width:Dimensions.get('window').width,
        marginBottom:0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow:'hidden',
        borderBottomWidth:1,
        borderBottomColor:'#F0F3F9',
       
    },
    wishhListCarImgWrapper: {
        width:55,
        height:55,
        overflow:'hidden',
        borderRadius:50,
        marginRight:15,
        marginTop:10
    
    },
    wishhListCaritemsImg: {
        width:'100%',
        height:'100%'
    },
    wishhListCarItemRight: {
        padding:0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width:'100%'
    },
    addinwish: {
        position:'absolute',
        width: 28,
        height: 28,
        right:10,
        bottom:10,
        zIndex: 1,
    },
    textInputStyle: {
        height:40,
        flex:1,
        color:'#424A55'
    },
    textInputWrapperStyle: {
        width: "90%",
        marginBottom:30,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInputContainerStyle: {
        backgroundColor: '#F0F4F8',
        borderRadius: 16,
        overflow: 'hidden',
        paddingLeft:12,
        paddingRight:17,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // width:'90%'
        marginRight:16,
        flex:1
    },
    textInputImg: {
        width:20,
        height:20,
        marginRight: 16
    },
    textInputImgFilterIcon: {
        width:20,
        height:17,
        marginLeft: 17
    },
    searchLine: {
        width:1,
        height:24,
        backgroundColor: '#DAE1EC',
        marginLeft: 10,
        marginRight: 10,
    },
    modalContainer: {
        marginTop: 22,
        marginRight: 22,
        marginLeft: 22,
    },
    modalContainer2: {
        width:"100%",
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:38
    },
    modalContainerTitle: {
        fontSize: 18,
        color: '#424A55',
        fontWeight: 'bold'
    },
    closeModal: {
        width:24,
        height:24
    },

    filterSearchButton: {
        width:'100%',
        height:50,
        backgroundColor: 'green',
        color:'white',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:8
    },
    sortByWrapper: {
        width:'100%',
        height: 169,
        marginTop:20,
        backgroundColor:'#F0F4F8',
        borderRadius:10,
        padding: 15
    },
    filterFieldsWrapper: {
        marginBottom:59
    },
    minMaxPriceWrapper: {
        width:'100%',
        height: 96,
        marginTop:20,
        backgroundColor:'#F0F4F8',
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
    },
    minPriceWrapper:{
        height:48,
        borderBottomColor: "#a2abc25c",
        borderBottomWidth: 1
    },
    maxPriceWrapper: {
        height:48
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
        marginRight:12
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
    sortByTitile:{
        color: "#A7AEBA",
        fontSize: 11,
        marginBottom: 17
    },

    wishTitleWrapper:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'100%',
        paddingLeft:23,
        paddingRight:20,
        marginBottom:30
    },
    wishTitle:{
        fontSize:24,
        color:'#424A55',
        fontWeight:'bold'
    },

});

export {ChatStyles};