import React, { Component } from 'react';
import numeral from 'numeral';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

  componentWillMount() {
    numeral.zeroFormat('');
    numeral.nullFormat('');
    numeral.register('locale', 'pt-br', {
      delimiters: {
        thousands: '.',
        decimal: ','
      },
      currency: {
        symbol: 'R$'
      }
    });
    numeral.locale('pt-br');
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
