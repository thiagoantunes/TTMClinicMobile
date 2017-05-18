import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';

class ItemCategory extends Component {
  state = { showModal: false };

  componentWillMount() {
    console.log(this.props.employee);
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Button>
            Save Changes
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default connect(null, { })(ItemCategory);
