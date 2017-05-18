import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClinicReducer from './ClinicReducer';

export default combineReducers({
  auth: AuthReducer,
  clinic: ClinicReducer
});
