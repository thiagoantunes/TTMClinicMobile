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
  Animated,
  ScrollView
} from 'react-native';
import CachedImage from 'react-native-cached-image';
import { Actions } from 'react-native-router-flux';
import { clinicFetch, categoriesFetch, categorySelected, bannersFetch, logOut } from '../actions';


import SliderHome from './common/SliderHome';
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
    if ((_.isEmpty(nextProps.selectedCategory) || !_.some(nextProps.categories, { uid: nextProps.selectedCategory })) && nextProps.categories.length > 0) {
      this.props.categorySelected(nextProps.categories[0].uid);
    }

    this.createCategoriesDataSource(nextProps);
    this.createCategoryItemsDataSource(nextProps);
  }

  onCategoryPress(item) {
    if (this.itemsListView) {
      this.itemsListView.scrollTo({ x: 0, y: 0, animated: true });
    }
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
    const mappedEntry = { ...item, illustration: item.cover.src, subtitle: item.subtitle, bgColor: this.props.info.bgcolor ? this.props.info.bgcolor : 'black' };
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => { Actions.itemCategory({ item }); }}
      >
        <SliderHome
          {...mappedEntry}
        />
      </TouchableOpacity>
    );
  }

  renderCategoriesRow(item) {
    return (
      <TouchableWithoutFeedback onPress={this.onCategoryPress.bind(this, item)} >
        <View style={{ paddingRight: 20, paddingTop: 15 }}>
          <Text style={{ color: this.props.info.fontcolor, fontSize: 16, opacity: item.uid === this.props.selectedCategory ? 1 : 0.48 }}>
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
          ref={(listview) => { this.itemsListView = listview; }}
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
      <ScrollView
        style={{ backgroundColor: this.props.info.bgcolor }}
      >
        <View style={styles.headerContainer}>
          <StatusBar
            translucent
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
          />

          <View style={styles.header}>

            <View style={styles.headerInfo}>

              <Text style={[styles.headerTitle, { color: this.props.info.fontcolor }]}>
                {this.props.info.name}
              </Text>

              <View style={styles.headerDescriptionContainer}>
                <ScrollView
                  horizontal={false}
                >
                  <Text style={[styles.headerDescription, { color: this.props.info.fontcolor }]}>
                    {this.props.info.description}
                  </Text>
                </ScrollView>
              </View>

              <Text style={[styles.headerCRM, { color: this.props.info.fontcolor }]}>
                {'CRM: '}{this.props.info.crm ? this.props.info.crm.toUpperCase() : ''}
              </Text>

            </View>

            <View style={styles.headerLogo}>
              {this.renderLogo()}
            </View>

          </View>


          <View style={{ flex: 1 }}>
            <View style={styles.homeImagesContainer}>
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
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const categories = _.sortBy(_.map(state.clinic.categories, (val, uid) => {
    const items = _.sortBy(_.map(val.items, (valItem, uidItem) => {
      const images =  _.sortBy(_.map(valItem.images, (valImage, uidImage) => {
        return { ...valImage, uid: uidImage };
      }), ['uid']);
      return { ...valItem, uid: uidItem, images };
    }), ['uid']);
    return { ...val, uid, items };
  }), ['uid']);
  const info = state.clinic.info;
  const selectedCategory = state.clinic.selectedCategory;
  const banners = _.sortBy(_.map(state.clinic.banners, (val, uid) => {
    return { ...val, uid };
  }), ['uid']);

  return { info, categories, selectedCategory, banners };
};

export default connect(mapStateToProps, {
  clinicFetch,
  categoriesFetch,
  categorySelected,
  bannersFetch,
  logOut
})(ClinicHome);
