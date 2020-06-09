import axios from '../services';
import createBrowserHistory from '../webHistory.js';
import {REGISTERING, REGISTRATION_SUCCESS, REGISTRATION_FAILED, CLEAR_REGISTRATION_FAILED_ERROR_MESSAGE } from './actionTypes'

/* register user data */
export const signUp = (formValues) => {
    return async (dispatch) => {
        const {userName, email, password} = formValues; 
        try {
            dispatch({type: REGISTERING, payload: {userName}});
            const response = await axios.post('/users', {'user':{username: userName, email, password}});
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: response.data
            });
            createBrowserHistory.push('/signIn');
        } catch(error) {
            const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
            dispatch({
                type: REGISTRATION_FAILED,
                payload: key + ' ' + errorStatement
            });
            setTimeout(()=>dispatch({type:CLEAR_REGISTRATION_FAILED_ERROR_MESSAGE}), 3000);
        }
        
    }
}