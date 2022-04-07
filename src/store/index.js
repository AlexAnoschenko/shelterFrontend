import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { roomReducer } from './reducers/roomReducer';

const rootReducer = combineReducers({ room: roomReducer });

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
