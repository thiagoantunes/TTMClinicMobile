import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import ItemCategory from './components/ItemCategory';
import ClinicHome from './components/ClinicHome';
import { checkLoginStatus } from './actions';
import firebase from './firebase';

class RouterComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,
      loading: true,
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          logged: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <View><Text>Loading...</Text></View>;
    }
    return (
      <Router>
        <Scene key="auth" initial={!this.state.logged}>
          <Scene
            key="login"
            hideNavBar
            component={LoginForm}
            panHandlers={null}
          />
        </Scene>

        <Scene key="main" initial={this.state.logged}>
          <Scene
            //onRight={() => Actions.employeeCreate()}
            //rightTitle="Add"
            panHandlers={null}
            hideNavBar
            key="clinicHome"
            component={ClinicHome}
            initial
          />
          <Scene 
            panHandlers={null}
            key="itemCategory" 
            hideNavBar 
            component={ItemCategory} 
          />
        </Scene>
      </Router>
    );
  }
}

export default connect(null, { checkLoginStatus })(RouterComponent);