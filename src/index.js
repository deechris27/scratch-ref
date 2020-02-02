import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';
import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(logger));

const renderApp = (Component) =>{
    ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
        document.getElementById('root'))
};

renderApp(App);

