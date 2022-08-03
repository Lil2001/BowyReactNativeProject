import {Dimensions, StatusBar, StyleSheet} from 'react-native'

const feedsStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: StatusBar.currentHeight + 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    safeArea: {
        flex: 1,
        width: "100%",
        marginTop: 15,

    },
    feedsCarImgWrapper:{
      width: "45%"
    },
    text: {
        fontSize: 42,
    },

    feedsCarItems: {
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
    feedsCaritemsImg: {
        width: "100%",
        height: 130,

    },
    feedsCarItemRight: {
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
        height: 45,
        flex: 1,
        color: '#424A55'
    },
    textInputWrapperStyle: {
        width: "100%",
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
        marginTop: 59,
        width: '100%',
        height: 50,
        backgroundColor: 'green',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    sortByWrapper: {
        width: '100%',
        height: 210,
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
    locationWrapper: {
        width: '100%',
        height: 'auto',
        marginTop: 20,
        backgroundColor: '#F0F4F8',
        borderRadius: 10,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        zIndex: 5
    },
    minPriceWrapper: {
        height: 48,
        borderBottomColor: "#a2abc25c",
        borderBottomWidth: 1
    },
    streetWrapper: {
        height: 48,
        borderBottomColor: "#a2abc25c",
        borderBottomWidth: 1,
        borderWidth: 0,
        marginBottom: 50,
        paddingLeft: 2
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
    category1: {
        borderRadius: 15,
        marginBottom: 25,
        zIndex: 10
    },

    costCategory: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#F0F4F8',

    },
    resetFilter: {
        alignSelf: "flex-start",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: '#F0F4F8',
        paddingVertical: 5,
        paddingHorizontal: 9,
        borderRadius: 5
    },
    filterText: {
        fontSize: 16,
        marginRight: 5,

    },
    rightSide:{

    }

});

export {feedsStyles};
