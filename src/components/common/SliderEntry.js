import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import CachedImage from 'react-native-cached-image';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string,
        even: PropTypes.bool
    };

    render() {
        const { title, subtitle, illustration, even } = this.props;

        const uppercaseTitle = title ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{title.toUpperCase()}</Text>
        ) : false;

        return (
            <View style={styles.slideInnerContainer}>
                <LinearGradient colors={['#4f4f4f', '#2d2d2d', '#000']} style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
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
