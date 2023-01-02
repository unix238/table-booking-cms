import axios from 'axios';
import config from '../config/config';
// Constants
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action creators
const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

// Async action
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${config}/cms/auth/login`, {
        login: username,
        password,
      });
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.response.data.error));
    }
  };
};
