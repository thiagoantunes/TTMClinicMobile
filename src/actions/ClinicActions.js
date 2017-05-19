import {
  CLINIC_FETCH_SUCCESS,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_SELECTED
} from './types';
import firebase from '../firebase';

export const clinicFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/clinics/${currentUser.uid}`)
      .once('value', snapshot => {
        dispatch({ type: CLINIC_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const categoriesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/categories/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const categorySelected = (category) => {
  return {
    type: CATEGORY_SELECTED,
    payload: category
  };
};

