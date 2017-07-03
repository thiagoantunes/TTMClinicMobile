import React, { Component } from 'react';
import { View } from 'react-native';
import CachedImage from 'react-native-cached-image';
import styles from '../../styles/SliderHome.style';

export default class Banner extends Component {

    render() {
        return (
            <View style={styles.bannerInnerContainer}>
                <View style={styles.bannerContainer}>
                    <CachedImage
                        source={{ uri: this.props.src }}
                        style={styles.banner}
                    />
                </View>
            </View>
        );
    }
}
