import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
    coverContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        position: 'relative'
    },
    cover: {
        flex: 1
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },


    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    color1: {
        flex: 1,
        backgroundColor: colors.background1
    },
    color2: {
        flex: 1,
        backgroundColor: colors.background2
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    title: {
        marginTop: 15,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginBottom: 30
    },
    sliderContainer: {
    },
    header: { paddingTop: 70, paddingBottom: 100, paddingLeft: 96, paddingRight: 48, height: 380, flexDirection: 'row' },
    headerContainer: { flex: 1, justifyContent: 'center' },
    headerTitle: { fontSize: 34, marginBottom: 40, fontFamily: 'MavenPro-Regular', opacity: 0.90 },
    headerDescriptionContainer: { height: 120, marginBottom: 10 }, 
    headerDescription: { fontSize: 20, marginBottom: 8, fontFamily: 'Open Sans', opacity: 0.48 },
    headerCRM: { fontSize: 16, fontFamily: 'Open Sans', opacity: 0.72 },
    homeImagesContainer: { paddingLeft: 96, height: 60 },
    headerInfo: { flex: 2 },
    headerLogo: { alignItems: 'flex-end', flex: 1 },
    logo: { width: 200, height: 200 }, 
    itemHeaderContainer: { 
        paddingBottom: 0, 
        paddingTop: 32, 
        paddingRight: 48, 
        flexDirection: 'row', 
        alignItems: 'flex-start' 
    },
    itemCover: { 
        paddingLeft: 48, 
        paddingTop: 5, 
        paddingRight: 24, 
        height: 50 
    },
    itemTitle: { 
        fontSize: 24, 
        marginBottom: 4 
    },
    itemSubTitle: { 
        fontFamily: 'Open Sans', 
        fontSize: 12, 
        color: 'rgba(0,0,0,0.32)' 
    },
    itemPriceContainer: { 
        flexDirection: 'row', 
        alignItems: 'baseline' 
    },
    itemPrice: { 
        fontSize: 36, 
        fontFamily: 'Open Sans' 
    },
    itemHeaderSeparator: { 
        flex: 1, 
        marginTop: 16, 
        marginRight: 48, 
        marginLeft: 96, 
        borderBottomWidth: 1, 
        borderBottomColor: 'rgba(0,0,0,0.12)' 
    },
    itemDescriptionContainer: { 
        paddingTop: 20,  
        paddingRight: 48,  
        paddingBottom: 16, 
        paddingLeft: 96 
    },
    itemImagesContainer: { 
        flex: 1,  
        paddingTop: 35,
        paddingLeft: 86, 
        marginBottom: 20 
    },


});
