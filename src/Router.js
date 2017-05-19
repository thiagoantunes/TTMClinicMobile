import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ItemCategory from './components/ItemCategory';

import ClinicHome from './components/ClinicHome';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} />
      </Scene>

      <Scene key="main">
        <Scene
          //onRight={() => Actions.employeeCreate()}
          //rightTitle="Add"
          key="clinicHome"
          component={ClinicHome}
          initial
        />
        <Scene key="itemCategory" component={ItemCategory} title="Item" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
