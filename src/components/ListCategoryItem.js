import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
//import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { categorySelected } from '../actions';

class ListCategoryItem extends Component {
  onRowPress() {
    this.props.categorySelected(this.props.employee.uid);
    //Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default connect(null, { categorySelected })(ListCategoryItem);
