import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

function hp(percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

const slideHeight = hp(25);
const slideWidth = wp(65); 
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        marginLeft: 10,
        marginRight: 2 * itemHorizontalMargin,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 21,
        elevation: 10,
        backgroundColor: 'transparent',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,

        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.6,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,

        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        padding: 16,
        position: 'absolute',
        bottom: 0
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Open Sans',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 3,
        color: 'white',
        opacity: 0.75,
        fontSize: 12,
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },

    bannerInnerContainer: {
        width: wp(75) + itemHorizontalMargin * 2,
        height: slideHeight,
        marginLeft: 10,
        marginRight: 2 * itemHorizontalMargin,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 21,
        elevation: 10,
        backgroundColor: 'transparent',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    bannerContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,

        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    banner: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,

        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
});
