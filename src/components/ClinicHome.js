import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListView,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  Animated
} from 'react-native';
import CachedImage from 'react-native-cached-image';
import { Actions } from 'react-native-router-flux';
import { clinicFetch, categoriesFetch, categorySelected, bannersFetch, logOut } from '../actions';


import SliderEntry from './common/SliderEntry';
import Banner from './common/Banner';
import styles from '../styles/index.style';

class ClinicHome extends Component {

  state = { pressAction: new Animated.Value(0), logOutTimeout: 0 };

  componentWillMount() {
    this.props.categoriesFetch();
    this.props.clinicFetch();
    this.props.bannersFetch();

    this.createCategoriesDataSource(this.props);
    this.createCategoryItemsDataSource(this.props);

    this.state.pressAction.addListener((v) => this.setState({ logOutTimeout: v.value }));
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.selectedCategory) && nextProps.categories.length > 0) {
      this.props.categorySelected(nextProps.categories[0].uid);
    }

    this.createCategoriesDataSource(nextProps);
    this.createCategoryItemsDataSource(nextProps);
  }

  onCategoryPress(item) {
    this.props.categorySelected(item.uid);
  }

  createCategoryItemsDataSource({ categories, selectedCategory }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const cat = _.find(categories, { uid: selectedCategory });
    this.categoryItemsDataSource = ds.cloneWithRows(_.isEmpty(cat) ? {} : cat.items);
  }

  createCategoriesDataSource({ categories, banners }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const all = categories.concat(banners);

    this.categoriesDataSource = ds.cloneWithRows(all);
  }

  handlePressIn() {
    Animated.timing(this.state.pressAction, {
      duration: 2000,
      toValue: 1
    }).start((() => { console.log(this.state.logOutTimeout); if (this.state.logOutTimeout === 1) { this.props.logOut(); } }));
  }

  handlePressOut() {
    Animated.timing(this.state.pressAction, {
      duration: this.state.logOutTimeout * 2000,
      toValue: 0
    }).start();
  }

  renderCategoryItemsRow(item) {
    console.log(item);
    const mappedEntry = { ...item, illustration: item.cover.src, subtitle: item.subtitle };
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => { Actions.itemCategory({ item }); }}
      >
        <SliderEntry
          {...mappedEntry}
        />
      </TouchableOpacity>
    );
  }

  renderCategoriesRow(item) {
    return (
      <TouchableWithoutFeedback onPress={this.onCategoryPress.bind(this, item)} >
        <View style={{ paddingRight: 12 }}>
          <Text style={{ color: this.props.info.fontcolor, fontSize: 12, opacity: item.uid === this.props.selectedCategory ? 1 : 0.48 }}>
            {item.name ? item.name.toUpperCase() : ''}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderLogo() {
    if (!_.isEmpty(this.props.info.logo)) {
      return (
        <TouchableWithoutFeedback onPressIn={this.handlePressIn.bind(this)} onPressOut={this.handlePressOut.bind(this)} >
          <CachedImage
            source={{
              uri: this.props.info.logo.src
            }}
            style={styles.logo}
          />
        </TouchableWithoutFeedback>
      );
    }
  }

  renderContent() {
    const cat = _.find(this.props.categories, { uid: this.props.selectedCategory });
    const ban = _.find(this.props.banners, { uid: this.props.selectedCategory });
    if (!_.isEmpty(cat)) {
      return (
        <ListView
          horizontal
          style={{ flex: 1 }}
          enableEmptySections
          dataSource={this.categoryItemsDataSource}
          renderRow={this.renderCategoryItemsRow.bind(this)}
        />
      );
    } else if (!_.isEmpty(ban)) {
      const mappedEntry = { ...ban, src: ban.src };
      return (
        <Banner
          {...mappedEntry}
        />
      );
    }
  }

  render() {
    return (

      <View style={{ backgroundColor: this.props.info.bgcolor, flex: 1, justifyContent: 'center' }}>
        <StatusBar
          translucent
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
        />

        <View style={styles.header}>

          <View style={styles.headerInfo}>

            <Text style={{ color: this.props.info.fontcolor, fontSize: 32, marginBottom: 40, fontFamily: 'MavenProRegular', opacity: 0.90 }}>
              {this.props.info.name}
            </Text>

            <Text style={{ color: this.props.info.fontcolor, fontSize: 16, marginBottom: 8, fontFamily: 'OpenSans', opacity: 0.48 }}>
              {this.props.info.description}
            </Text>

            <Text style={{ color: this.props.info.fontcolor, fontSize: 16, fontFamily: 'OpenSans', opacity: 0.72 }}>
              {'CRM: '}{ this.props.info.crm ? this.props.info.crm.toUpperCase() : ''}
            </Text>

          </View>

          <View style={styles.headerLogo}>
            {this.renderLogo()}
          </View>

        </View>


        <View style={{ flex: 1 }}>
          <View style={{ paddingLeft: 96, height: 50 }}>
            <ListView
              horizontal
              style={{ flex: 1 }}
              enableEmptySections
              dataSource={this.categoriesDataSource}
              renderRow={this.renderCategoriesRow.bind(this)}
            />
          </View>

          <View style={{ flex: 1, paddingLeft: 86 }}>
            {this.renderContent()}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const categories = _.map(state.clinic.categories, (val, uid) => {
    const items = _.map(val.items, (valItem, uidItem) => {
      const images = _.map(valItem.images, (valImage, uidImage) => {
        return { ...valImage, uid: uidImage };
      });
      return { ...valItem, uid: uidItem, images };
    });
    return { ...val, uid, items };
  });
  const info = state.clinic.info;
  const selectedCategory = state.clinic.selectedCategory;
  const banners = _.map(state.clinic.banners, (val, uid) => {
    return { ...val, uid };
  });

  return { info, categories, selectedCategory, banners };
};

export default connect(mapStateToProps, {
  clinicFetch,
  categoriesFetch,
  categorySelected,
  bannersFetch,
  logOut
})(ClinicHome);
