import {combineReducers } from 'redux';

import authReducer from './authReducer';
import registeredReducer from './registerUserReducer';
import articleReducer from './articleReducer';

export default combineReducers({
    auth: authReducer,
    register: registeredReducer,
    articles: articleReducer
});