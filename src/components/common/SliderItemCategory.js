import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CachedImage from 'react-native-cached-image';
import styles from '../../styles/SliderItemCategory.style';

export default class SliderItemCategory extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string,
        even: PropTypes.bool,
        bgColor: PropTypes.string
    };

    render() {
        const { title, subtitle, illustration, even, bgColor } = this.props;

        const uppercaseTitle = title ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{title.toUpperCase()}</Text>
        ) : false;

        return (
            <View style={styles.slideInnerContainer}>
                <LinearGradient colors={[bgColor, bgColor, 'black']} style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    <CachedImage
                        source={{ uri: illustration }}
                        style={styles.image}
                    />
                    <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                        {uppercaseTitle}
                        <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>{subtitle ? subtitle.toUpperCase() : ''}</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}
