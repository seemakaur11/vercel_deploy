import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  SLIDER_DETAILS_SUCCESS,
  SLIDER_DETAILS_FAIL,
  BROWSER_PRODUCTS_SUCCESS,
  BROWSER_PRODUCTS_FAIL,
  SERVICE_PRODUCTS_SUCCESS,
  SERVICE_PRODUCTS_FAIL,
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
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register =
  ({
    first_name,
    last_name,
    street_address,
    suburb,
    state,
    postcode,
    phone,
    email,
    password,
  }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      first_name,
      last_name,
      street_address,
      suburb,
      state,
      postcode,
      phone,
      email,
      password,
    });
    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout / clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// home slider
export const getHomeSliders = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get('/api/home-slider', config);
    return dispatch({
      type: SLIDER_DETAILS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SLIDER_DETAILS_FAIL,
    });
  }
};

// browser products
export const getBrowserProducts = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get('/api/browser-slider/products', config);
    return dispatch({
      type: BROWSER_PRODUCTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: BROWSER_PRODUCTS_FAIL,
    });
  }
};
// our services
export const getServicesProducts = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get('/api/our-service/images', config);
    return dispatch({
      type: SERVICE_PRODUCTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SERVICE_PRODUCTS_FAIL,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get('/api/product', config);
    return dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
    });
  }
};
// get products through filter
export const getProductsByFilter = (filter) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const productFilter = await axios.get(
      `api/product/filter?filter=${filter}`,
      config
    );
    return await dispatch({
      type: PRODUCTS_CATEGORY_SUCCESS,
      payload: productFilter.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PRODUCTS_CATEGORY_FAIL,
    });
  }
};

// get product by id
export const getProductById = (productId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const product = await axios.get(`/api/product/find/${productId}`, config);

    return await dispatch({
      type: SINGLE_PRODUCT_SUCCESS,
      payload: product.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
    });
  }
};
// empty data
export const setEmptyFilterData = () => async (dispatch) => {
  return await dispatch({
    type: SET_EMPTY_FILTER_DATA,
    payload: [],
  });
};
// search product
export const searchProductItems = (keyword) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const searchProduct = await axios.get(
      `api/product/filter?keyword=${keyword}`,
      config
    );
    return await dispatch({
      type: SEARCH_PRODUCT_SUCCESS,
      payload: searchProduct.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
    });
  }
};

// update products
export const updateProductsItems = (product) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const updatedProduct = await axios.put(
      `/api/product/${product._id}`,
      product,
      config
    );
    console.log('updatedProduct in action====>', updatedProduct);
    return await dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: updatedProduct.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
    });
  }
};
// delete product
export const deleteProductItems = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const deleteProduct = await axios.delete(`/api/product/${id}`, config);
    return await dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: deleteProduct.data.msg,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: DELETE_PRODUCT_FAIL,
    });
  }
};

// create place product
export const createPlaceProduct =
  ({ productId, name, category, price, image, quantity, total }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      productId,
      name,
      category,
      price,
      image,
      quantity,
      total,
    });
    try {
      const product = await axios.post('/api/place-product', body, config);
      dispatch({
        type: PLACE_PRODUCT_SUCCESS,
        payload: product.data.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PLACE_PRODUCT_FAIL,
      });
    }
  };

// get place product
export const getPlaceProduct = (id) => async (dispatch) => {
  console.log('id --------->', id);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const product = await axios.get(`/api/place-product/find/${id}`, config);
    console.log('fetch place product action---->', product);
    dispatch({
      type: FETCH_PLACE_PTODUCT_SUCCESS,
      payload: product.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: FETCH_PLACE_PTODUCT_FAIL,
    });
  }
};
// empty place product
export const setEmptyPlaceProduct = () => async (dispatch) => {
  return await dispatch({
    type: EMPTY_PLACE_PRODUCT,
    payload: ' ',
  });
};
