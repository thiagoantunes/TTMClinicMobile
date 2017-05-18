import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import RNFirebase from 'react-native-firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyARcPaIYaQGAvVz317-i0wTjaoiXb4ZEp4',
      authDomain: 'ttmclinic-d86fa.firebaseapp.com',
      databaseURL: 'https://ttmclinic-d86fa.firebaseio.com',
      projectId: 'ttmclinic-d86fa',
      storageBucket: 'ttmclinic-d86fa.appspot.com',
      messagingSenderId: '65238345155'
    };

    const configurationOptions = {
      debug: true,
      persistence: true
    };

    RNFirebase.initializeApp(configurationOptions);

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
