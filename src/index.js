import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {reducer} from './reducers/reducer'
import {BrowserRouter as Router} from 'react-router-dom'



let store = createStore(reducer, applyMiddleware(thunk))


ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));
registerServiceWorker();
