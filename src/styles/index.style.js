import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({

    header: {
        paddingTop: 70,
        paddingBottom: 100,
        paddingLeft: 96,
        paddingRight: 48,
        height: 350,
        flexDirection: 'row'
    },
    headerInfo: {
        flex: 2
    },
    headerLogo: {
        alignItems: 'flex-end',
        flex: 1
    },
    logo: { width: 100, height: 100 },
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
    }
});
