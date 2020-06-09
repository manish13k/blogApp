import axios from '../services';
import getAuthHeader from './authToken';
import createBrowserHistory from '../webHistory';
import { ADDING_COMMENT_TO_ARTICLE_FAILED, CLEAR_ADDING_COMMENT_TO_ARTICLE,
        FETCHING_COMMENT_OF_ARTICLE, FETCHING_COMMENT_OF_ARTICLE_SUCCESS, FETCHING_COMMENT_OF_ARTICLE_FAILED,
        CLEAR_FETCHING_COMMENT_OF_ARTICLE, DELETING_COMMENT, DELETING_COMMENT_SUCCESS, DELETING_COMMENT_FAILED,
        CLEAR_DELETING_COMMENT, DELETING_ARTICLE, DELETING_ARTICLE_SUCCESS, DELETING_ARTICLE_FAILED,
        CLEAR_DELETING_ARTICLE, ARTICLE_DETAILS_FOR_EDIT, ARTICLE_DETAILS_FOR_EDIT_SUCCESS,
        ARTICLE_DETAILS_FOR_EDIT_FAILED, CLEAR_FETCHING_FOR_EDIT, UPDATING_ARTICLE, UPDATING_ARTICLE_SUCCESS,
        UPDATING_ARTICLE_FAILED, CLEAR_UPDATING_ARTICLE,FETCHING_ARTICLES, FETCHING_ARTICLES_SUCCESS, FETCHING_ARTICLES_FAILED, CLEAR_FETCHING_ARTICLES,
        FETCHING_MY_ARTICLES_DATA, FETCHING_MY_ARTICLES_DATA_SUCCESS, FETCHING_MY_ARTICLES_DATA_FAILED, CLEAR_FETCHING_MY_ARTICLES_DATA,
        CREATING_ARTICLE_DATA, CREATING_ARTICLE_DATA_SUCCESS, CREATING_ARTICLE_DATA_FAILED,
        CLEAR_CREATING_ARTICLE_DATA, ARTICLE_DETAILS, ARTICLE_DETAILS_SUCCESS, ARTICLE_DETAILS_FAILED,
        CLEARING_ARTICLE_DETAILS, ADDING_COMMENT_TO_ARTICLE, ADDING_COMMENT_TO_ARTICLE_SUCCESS} from './actionTypes';

    /* create article data */
    export const createArticle = (formValues) => {
        return async (dispatch) =>{
            try{
                dispatch({type:CREATING_ARTICLE_DATA});
                const headers = getAuthHeader();
                const article = formValues;
                const response = await axios.post('/articles', {article: article}, {headers: headers});
                dispatch({type: CREATING_ARTICLE_DATA_SUCCESS, payload: response.data});
            } catch(error) {
                dispatch({type: CREATING_ARTICLE_DATA_FAILED, payload: error});
            }
        }
    }

    /* fetch article data */
    export const fetchArticles = (offset) =>{
        return async (dispatch) => {
            try {
                dispatch({type: FETCHING_ARTICLES});
                if(offset===0){
                    dispatch({type: CLEAR_FETCHING_ARTICLES});
                }
                const response = await axios.get(`/articles?limit=10&offset=${offset?offset:0}`);
                dispatch({type: FETCHING_ARTICLES_SUCCESS, payload: response.data});

            } catch(error) {
                dispatch({type: FETCHING_ARTICLES_FAILED, payload: error});
            }
        }
    }

    /* fetch my article data */
    export const fetchMyArticles = (offset) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type:FETCHING_MY_ARTICLES_DATA});
                if(offset===0){
                    dispatch({type: CLEAR_FETCHING_MY_ARTICLES_DATA});
                }
                const {user} = getState().auth.user;
                const userName = user.username;
                const response = await axios.get(`/articles?limit=10&offset=${offset?offset:0}&author=${userName}`);
                dispatch({type:FETCHING_MY_ARTICLES_DATA_SUCCESS, payload: response.data});
            }   catch(error) {
                dispatch({type:FETCHING_MY_ARTICLES_DATA_FAILED, payload:error});
            }
        }
    }

    /* addred comment to article */
    export const addCommentToArticle = (articledata, formValues) =>{
        return async(dispatch) => {
            dispatch({type:ADDING_COMMENT_TO_ARTICLE});
            try{
                const headers = getAuthHeader();
                const data = {
                    comment: formValues
                }
                const response = await axios.post(`/articles/${articledata}/comments`, data ,{headers: headers});
                dispatch({type: ADDING_COMMENT_TO_ARTICLE_SUCCESS, payload:response.data});
                dispatch(fetchCommentsOfArticle(articledata));
            } catch(error) {
                dispatch({type: ADDING_COMMENT_TO_ARTICLE_FAILED, payload:error});
            }
            
        }
    }

    /* clear article */
    export const clearAddingComment = () => {
        return {
            type: CLEAR_ADDING_COMMENT_TO_ARTICLE
        }
    }

    /* fetch comments of article */
    export const fetchCommentsOfArticle = (articledata) =>{
        return async(dispatch) => {
            dispatch({type:FETCHING_COMMENT_OF_ARTICLE});
            try{
                const response = await axios.get(`/articles/${articledata}/comments`);
                dispatch({type: FETCHING_COMMENT_OF_ARTICLE_SUCCESS, payload:response.data});

            } catch(error) {
                dispatch({type: FETCHING_COMMENT_OF_ARTICLE_FAILED, payload:error});
            }
            
        }
    }

    /* clear comments of article */
    export const clearFetchingComments = () => {
        return {
            type: CLEAR_FETCHING_COMMENT_OF_ARTICLE
        }
    }

    /* edit article */
    export const fetchArticleForEdit = (articledata) => {
        return async (dispatch) => {
            try {
                dispatch({type: ARTICLE_DETAILS_FOR_EDIT});
                const response = await axios.get(`/articles/${articledata}`);
                dispatch({type: ARTICLE_DETAILS_FOR_EDIT_SUCCESS, payload: response.data});
            } catch(error) {
                const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
                dispatch({type: ARTICLE_DETAILS_FOR_EDIT_FAILED, payload: key+ ' '+ errorStatement});
            }
        }
    }

    /* clear article data */
    export const clearFetchingForEdit = ()=>{
        return {
            type: CLEAR_FETCHING_FOR_EDIT
        }
    }

    /* update article data */
    export const updateArticle = (formValues) => {
        return async (dispatch) => {
            dispatch({type: UPDATING_ARTICLE});
            const {slug, title, description, body,tagList} = formValues;
            const payload = {title,description, body, tagList};
            const headers = getAuthHeader();
            try{
                const response = await axios.put(`/articles/${slug}`, {article: payload}, {headers: headers});
                dispatch({type:UPDATING_ARTICLE_SUCCESS, payload: response.data});
                setTimeout(() => {
                    dispatch({type:CLEAR_UPDATING_ARTICLE});
                }, 3000);
            }catch(error){
                const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
                dispatch({type:UPDATING_ARTICLE_FAILED, payload: key+ ' '+ errorStatement});
                setTimeout(() => {
                    dispatch({type:CLEAR_UPDATING_ARTICLE});
                }, 3000);
            }
        }
    }

    /* clear article form data */
    export const clearCreateArticleForm = () =>{
        return {
            type: CLEAR_CREATING_ARTICLE_DATA
        }
    }

    /* fetch article data */
    export const fetchArticleBySlug = (articledata) => {
        return async (dispatch) => {
            try {
                dispatch({type: ARTICLE_DETAILS});
                const response = await axios.get(`/articles/${articledata}`);
                dispatch({type: ARTICLE_DETAILS_SUCCESS, payload: response.data});
                dispatch(fetchCommentsOfArticle(articledata));
            } catch(error) {
                dispatch({type: ARTICLE_DETAILS_FAILED, payload: error});
            }
        }
    }

    /* clear article data */
    export const clearFetchedArticleDetails= () => {
        return {
            type: CLEARING_ARTICLE_DETAILS
        }
    }

    /* delete comment data */
    export const deleteComment = (articledata) => {
        return async (dispatch) => {
            dispatch({type: DELETING_COMMENT});
            try{
                dispatch({type: DELETING_COMMENT_SUCCESS});
                dispatch(fetchCommentsOfArticle(articledata));
                setTimeout(()=>{
                    dispatch(clearDeletingComment());
                },2000);
            }catch(error) {
                dispatch({type: DELETING_COMMENT_FAILED, payload: error});
            }   
        }
    }

    /* clear delete comment data */
    export const clearDeletingComment = () => {
        return {
            type: CLEAR_DELETING_COMMENT
        }
    }

    /* delete article data */
    export const deleteArticle = (articledata)=> {
        return async(dispatch) => {
            dispatch({type:DELETING_ARTICLE});
            try{
                const headers = getAuthHeader();
                const response = await axios.delete(`/articles/${articledata}`, {headers: headers});
                dispatch({type: DELETING_ARTICLE_SUCCESS, payload:  response.data});
                createBrowserHistory.push('/');
                dispatch({type: CLEAR_DELETING_ARTICLE});
            }catch(error){
                dispatch({type: DELETING_ARTICLE_FAILED, payload: error});
            }
        }
    }

    /* clear delete article data */
    export const clearDeletingArticle = () => {
        return {
            type: CLEAR_DELETING_ARTICLE
        }
    }


 