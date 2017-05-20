import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ListView, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  StatusBar, 
  ScrollView } from 'react-native';
import CachedImage from 'react-native-cached-image';
import Carousel from 'react-native-snap-carousel';
import { clinicFetch, categoriesFetch, categorySelected, logOut } from '../actions';
import { Button } from './common';


import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './common/SliderEntry';
import styles from '../styles/index.style';

class ClinicHome extends Component {
  componentWillMount() {
    this.props.categoriesFetch();
    this.props.clinicFetch();

    this.createCategoriesDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    if (_.isEmpty(nextProps.selectedCategory) && nextProps.categories.length > 0) {
      this.props.categorySelected(nextProps.categories[0].uid);
    }

    this.createCategoriesDataSource(nextProps);
  }

  onButtonPress() {
    this.props.logOut();
  }

  onCategoryPress(item) {
    this.props.categorySelected(item.uid);
  }

  getSlides() {
    const cat = _.find(this.props.categories, { uid: this.props.selectedCategory });
    if (!cat || !cat.items) {
      return false;
    }

    return _.map(cat.items, (entry, index) => {
      const mappedEntry = { ...entry, illustration: entry.cover.src, subtitle: entry.subtitle };
      return (
        <SliderEntry
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          {...mappedEntry}
        />
      );
    });
  }

  get example1() {
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={1}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.6}
        enableMomentum={false}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid
        removeClippedSubviews={false}
      >
        {this.getSlides()}
      </Carousel>
    );
  }

  createCategoriesDataSource({ categories }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.categoriesDataSource = ds.cloneWithRows(categories);
  }

  renderCategoriesRow(item) {
    return (
      <TouchableWithoutFeedback onPress={this.onCategoryPress.bind(this, item)} >
        <View style={{ paddingRight: 12 }}>
          <Text style={{ color: this.props.info.fontcolor, fontSize: 12 }}>
            {item.name ? item.name.toUpperCase() : ''}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderLogo() {
    if (!_.isEmpty(this.props.info.logo)) {
      return (
        <CachedImage
          source={{
            uri: this.props.info.logo.src
          }}
          style={styles.logo}
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

            <Text style={{ color: this.props.info.fontcolor, fontSize: 32, marginBottom: 40, fontFamily: 'MavenProRegular' }}>
              {this.props.info.name}
            </Text>

            <Text style={{ color: this.props.info.fontcolor, fontSize: 16, marginBottom: 8, fontFamily: 'OpenSans' }}>
              {this.props.info.description}
            </Text>

            <Text style={{ color: this.props.info.fontcolor, fontSize: 16, fontFamily: 'OpenSans' }}>
              {this.props.info.crm ? this.props.info.crm.toUpperCase() : ''}
            </Text>

          </View>

          <View style={styles.headerLogo}>
            {this.renderLogo()}
          </View>

        </View>


        <View style={{ flex: 2.5 }}>
          <View style={{ paddingLeft: 96, height: 50 }}>
            <ListView
              horizontal
              style={{ flex: 1 }}
              enableEmptySections
              dataSource={this.categoriesDataSource}
              renderRow={this.renderCategoriesRow.bind(this)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView
              style={styles.scrollview}
              indicatorStyle={'white'}
              scrollEventThrottle={200}
            >
              {this.example1}
            </ScrollView>
          </View>
        </View>
        <View style={{ height: 50 }}>
          <Button onPress={this.onButtonPress.bind(this)}>
            Logout
        </Button>
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

  return { info, categories, selectedCategory };
};

export default connect(mapStateToProps, {
  clinicFetch,
  categoriesFetch,
  categorySelected,
  logOut
})(ClinicHome);
