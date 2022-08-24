import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  SLIDER_DETAILS_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  SLIDER_DETAILS_FAIL,
  BROWSER_PRODUCTS_SUCCESS,
  BROWSER_PRODUCTS_FAIL,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_CATEGORY_SUCCESS,
  PRODUCTS_CATEGORY_FAIL,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SET_EMPTY_FILTER_DATA,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PLACE_PRODUCT_SUCCESS,
  PLACE_PRODUCT_FAIL,
  FETCH_PLACE_PTODUCT_SUCCESS,
  FETCH_PLACE_PTODUCT_FAIL,
  EMPTY_PLACE_PRODUCT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  slider: [],
  browserProducts: [],
  products: [],
  filterProducts: [],
  searchProduct: [],
  singleProduct: null,
  updateProduct: null,
  deleteMsg: '',
  placeProduct: null,
  getPlaceProduct: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case SLIDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        // isAuthenticated: true,
        slider: payload,
      };
    case BROWSER_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        browserProducts: payload,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case PRODUCTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        filterProducts: payload,
      };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        singleProduct: payload,
      };
    case SET_EMPTY_FILTER_DATA:
      return {
        ...state,
        loading: false,
        filterProducts: payload,
      };
    case SEARCH_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        searchProduct: payload,
      };
    }
    case UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        updateProduct: payload,
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        deleteMsg: payload,
      };
    }
    case PLACE_PRODUCT_SUCCESS: {
      return {
        ...state,
        placeProduct: payload,
        loading: false,
      };
    }
    case FETCH_PLACE_PTODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        getPlaceProduct: payload,
      };
    }
    case EMPTY_PLACE_PRODUCT: {
      return {
        ...state,
        loading: false,
        placeProduct: payload,
      };
    }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case SLIDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case BROWSER_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PRODUCTS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PRODUCTS_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SEARCH_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PLACE_PRODUCT_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_PLACE_PTODUCT_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
