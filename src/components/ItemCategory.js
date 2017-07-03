import _ from 'lodash';
import numeral from 'numeral';
import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ListView,
  StyleSheet,
  WebView,
  NetInfo,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import CachedImage from 'react-native-cached-image';
import DisplayHTML from 'react-native-display-html';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/index.style';

import SliderItemCategory from './common/SliderItemCategory';

const { height: viewportHeight } = Dimensions.get('window');

function hp(percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

class ItemCategory extends Component {
  state = { showModal: false, isConnected: false };

  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });
    this.createImageDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createImageDataSource(nextProps);
  }

  createImageDataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.imageDataSource = ds.cloneWithRows(
      _.isEmpty(this.props.item) ? {} : this.props.item.images);
  }

  renderRow(item) {
    const mappedEntry = {
      ...item,
      illustration: item.src,
      subtitle: item.subtitle ? item.subtitle : '',
      title: item.title ? item.title : '',
      bgColor: 'black'
    };
    return (
      <SliderItemCategory
        {...mappedEntry}
      />
    );
  }

  renderCover() {
    if (!_.isEmpty(this.props.item.cover)) {
      if (this.props.item.cover.videoId && this.state.isConnected) {
        return (
          <WebView
            source={{ uri: 'https://www.youtube.com/embed/' + this.props.item.cover.videoId + '?version=3&enablejsapi=AIzaSyARcPaIYaQGAvVz317-i0wTjaoiXb4ZEp4&rel=0&autoplay=1&showinfo=0&controls=0&modestbranding=1&fs=0&autohide=1&loop=1&mute=1' }}
            style={{ height: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
          />
        );
      }
      return (
        <View style={{ height: 350 }}>
          <CachedImage
            source={{
              uri: this.props.item.cover.src,
            }}
            style={{ flex: 1, resizeMode: 'cover' }}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView
        indicatorStyle={'white'}
        scrollEventThrottle={200}
      >
        <StatusBar
          translucent
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
        />
        <View>
          {this.renderCover()}
        </View>

        <View style={styles.itemHeaderContainer}>
          <TouchableWithoutFeedback onPress={() => { Actions.pop(); }} >
            <View style={styles.itemCover}>
              <Image source={require('../img/back.png')} style={{ height: 24, width: 24 }} />
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flex: 2 }}>
            <Text style={styles.itemTitle}>{this.props.item.title}</Text>
            <Text style={styles.itemSubTitle}> {this.props.item.subTitle ? this.props.item.subTitle.toUpperCase() : ''}</Text>
          </View>
          <View style={styles.itemPriceContainer}>
            {/*<Text style={{ color: 'rgba(0,0,0,0.32)', fontSize: 12, fontFamily: 'Open Sans' }}>{'5x'}</Text>*/}
            <Text style={styles.itemPrice}>{numeral(this.props.item.price).format('$0,0.00')}</Text>
          </View>
        </View>
        <View style={styles.itemHeaderSeparator}></View>
        <View style={styles.itemDescriptionContainer}>
          <DisplayHTML
            containerStyle={{ height: viewportHeight - (hp(25) + 590) }}
            htmlString={this.props.item.description ? this.props.item.description : ''}
            HTMLStyles={'body { color:#666; font-size: 22; background-color: #fff } p { font-size: 22px } li { font-size: 22px } '}
          />
        </View>
        <View style={styles.itemImagesContainer}>
          <ListView
            horizontal
            style={{ flex: 1 }}
            enableEmptySections
            dataSource={this.imageDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }
}

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 22
  },
  h1: {
    fontSize: 36,
  }
});

export default connect(null, {})(ItemCategory);
