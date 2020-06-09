import axios from '../services';
import createBrowserHistory from '../webHistory.js';
import getAuthHeader from './authToken';
import { LOGIN_SUCCESS, LOGIN_FAILED, SIGN_OUT, CLEAR_LOGIN_FAILED_MESSGAE } from './actionTypes'

/* get current user data */
export const getCurrentUser = () =>{
    return async (dispatch) => {
        try {
            const headers = getAuthHeader();
            let response;
            if(headers.Authorization) {
                response = await axios.get('/user', {headers: headers});
                dispatch({type:LOGIN_SUCCESS, payload: response.data});
            }
        }catch(error){
            dispatch({type:LOGIN_FAILED, payload: error});
        }
    }
}

/* signin user data */
export const signIn = (formValues) => {
    return async (dispatch) => {
        const {email, password} = formValues; 
        try {
            const response = await axios.post('/users/login', {'user':{email, password}});
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            createBrowserHistory.push('/');
        } catch(error) {
            const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
            dispatch({
                type: LOGIN_FAILED,
                payload: key + ' ' + errorStatement
            });
            setTimeout(()=>dispatch({type:CLEAR_LOGIN_FAILED_MESSGAE}), 3000);
        }
    }
}

/* signout user */
export const signOut = () => {
    createBrowserHistory.push('/');
    return {
        type: SIGN_OUT,
    }
}