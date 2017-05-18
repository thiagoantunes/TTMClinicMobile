import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { clinicFetch, categoriesFetch, categorySelected } from '../actions';
import ListCategoryItem from './ListCategoryItem';
import ListItemCategoryItem from './ListItemCategoryItem';
import { Card, CardSection } from './common';

class ClinicHome extends Component {
  componentWillMount() {
    this.props.categoriesFetch();
    this.props.clinicFetch();

    this.createCategoriesDataSource(this.props);
    this.createCategoryItemsDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    if (_.isEmpty(nextProps.selectedCategory) && nextProps.categories.length > 0) {
      this.props.categorySelected(nextProps.categories[0].uid);
    }

    this.createCategoriesDataSource(nextProps);
    this.createCategoryItemsDataSource(nextProps);
  }

  createCategoriesDataSource({ categories }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.categoriesDataSource = ds.cloneWithRows(categories);
  }

  createCategoryItemsDataSource({ categories, selectedCategory }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const cat = _.find(categories, { uid: selectedCategory });

    this.categoryItemsDataSource = ds.cloneWithRows(_.isEmpty(cat) ? {} : cat.items);
  }

  renderCategoriesRow(categorie) {
    return <ListCategoryItem employee={categorie} />;
  }

  renderCategoryItemsRow(item) {
    return <ListItemCategoryItem employee={item} />;
  }

  render() {
    return (
      
      <Card>
        <Text>
          {this.props.info.name}
        </Text>

        <Text>
          {this.props.info.crm}
        </Text>

        <Text>
          {this.props.info.description}
        </Text>


        <CardSection>
          <ListView
            enableEmptySections
            dataSource={this.categoriesDataSource}
            renderRow={this.renderCategoriesRow}
          />
        </CardSection>

        <CardSection>
          <ListView
            enableEmptySections
            dataSource={this.categoryItemsDataSource}
            renderRow={this.renderCategoryItemsRow}
          />
        </CardSection>

      </Card>
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
  categorySelected 
})(ClinicHome);
