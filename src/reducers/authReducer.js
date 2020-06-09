import { LOGIN_SUCCESS, LOGIN_FAILED, SIGN_OUT, CLEAR_LOGIN_FAILED_MESSGAE } from '../actions/actionTypes';

const initialState = {
    user: null,
    errorMessage: null,
    isSignedIn: null
};

export default (state = initialState, action)=>{
    switch(action.type) {
        case LOGIN_SUCCESS : 
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {...state, isSignedIn: true, user: action.payload, errorMessage: null};
        case LOGIN_FAILED : 
            return {...state, isSignedIn: false, user: null, errorMessage: action.payload}
        case SIGN_OUT: 
            localStorage.removeItem('user');
            return {...state, isSignedIn: false, user: null, errorMessage: null}
        case CLEAR_LOGIN_FAILED_MESSGAE: 
            return {...state, errorMessage: null};
        default: 
            return state;
    }
}