import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import RootReducer from "./reducers/RootReducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>
    <BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
