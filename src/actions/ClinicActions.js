import {
  CLINIC_FETCH_SUCCESS,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_SELECTED,
  BANNERS_FETCH_SUCCESS
} from './types';
import firebase from '../firebase';

export const clinicFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/clinics/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: CLINIC_FETCH_SUCCESS, payload: snapshot.val() }); 
      });
  };
};

export const categoriesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/categories/${currentUser.uid}`).orderByKey()
      .on('value', snapshot => {
        dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const bannersFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/banners/${currentUser.uid}`).orderByKey()
      .on('value', snapshot => {
        dispatch({ type: BANNERS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const categorySelected = (category) => {
  return {
    type: CATEGORY_SELECTED,
    payload: category
  };
};

