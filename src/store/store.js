import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
// import thunk
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);
