import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouteComponent from './route';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import { blogReducers } from './blog/reducers';

const rootReducer = combineReducers({
  'blogs': blogReducers,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><RouteComponent /></BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
