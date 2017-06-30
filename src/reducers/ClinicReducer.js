import {
  CLINIC_FETCH_SUCCESS,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_SELECTED,
  BANNERS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  info: {},
  categories: {},
  selectedCategory: {},
  banners: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLINIC_FETCH_SUCCESS:
      // const teste = { 
      //   ...state,
      //   info: {
      //     ...state.info,
      //     [action.payload.key]: action.payload.value
      //   }
      // };
      return { ...state, info: action.payload };
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: action.payload };
    case CATEGORY_SELECTED:
      return { ...state, selectedCategory: action.payload };
    case BANNERS_FETCH_SUCCESS:
      return { ...state, banners: action.payload };
    default:
      return state;
  }
};
