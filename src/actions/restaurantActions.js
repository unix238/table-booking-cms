import axios from 'axios';
import config from '../config/config';

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';

export const fetchRestaurants = (state) => {
  return (dispatch) => {
    // Make API call to fetch restaurants
    return axios
      .get(`${config.url}/restaurant/getRestaurants`)
      .then((response) => {
        dispatch(setRestaurants(response.data, state));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setRestaurants = (restaurants, state) => {
  state(restaurants);
  return {
    type: SET_RESTAURANTS,
    restaurants,
  };
};
