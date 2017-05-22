import _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import CachedImage from 'react-native-cached-image';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/index.style';

import SliderEntry from './common/SliderEntry';

class ItemCategory extends Component {
  state = { showModal: false };

  componentWillMount() {
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
      title: item.title ? item.title : ''
    };
    return (
      <SliderEntry
        {...mappedEntry}
      />
    );
  }

  renderCover() {
    if (!_.isEmpty(this.props.item.cover)) {
      if (this.props.item.cover.type === 'image') {
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

        <View style={{ paddingLeft: 48, paddingBottom: 0, paddingTop: 32, paddingRight: 48, flexDirection: 'row', alignItems: 'flex-start' }}>
          <TouchableWithoutFeedback onPress={() => { Actions.pop(); }} >
            <View style={{ marginTop: 5, marginRight: 24 }}>
              <Image source={require('../img/back.png')} style={{ height: 24, width: 24 }} />
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flex: 2 }}>
            <Text style={{ fontSize: 24, marginBottom: 4 }}>{this.props.item.title}</Text>
            <Text style={{ fontFamily: 'OpenSans', fontSize: 12, color: 'rgba(0,0,0,0.32)' }}> {this.props.item.subTitle ? this.props.item.subTitle.toUpperCase() : ''}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ color: 'rgba(0,0,0,0.32)', fontSize: 12, fontFamily: 'OpenSans' }}>{'5x'}</Text>
            <Text style={{ color: 'rgba(0,0,0,0.72)', fontSize: 36, fontFamily: 'OpenSans' }}>{'R$240'}</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 16, marginRight: 48, marginLeft: 96, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.12)' }}></View>
        <View style={{ paddingTop: 40, paddingRight: 48, paddingBottom: 16, paddingLeft: 96 }}>
          <HTMLView
            value={this.props.item.description}
            stylesheet={styles}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 86, marginBottom: 40 }}>
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

export default connect(null, {})(ItemCategory);
