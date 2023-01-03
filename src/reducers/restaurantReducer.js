import { SET_RESTAURANTS } from '../actions/restaurantActions';

const initialState = {
  restaurants: [],
};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
      };
    default:
      return state;
  }
}
