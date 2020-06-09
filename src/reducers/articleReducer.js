import { FETCHING_ARTICLES, FETCHING_ARTICLES_SUCCESS, FETCHING_ARTICLES_FAILED, CLEAR_FETCHING_ARTICLES,
         FETCHING_MY_ARTICLES_DATA, FETCHING_MY_ARTICLES_DATA_SUCCESS, FETCHING_MY_ARTICLES_DATA_FAILED, CLEAR_FETCHING_MY_ARTICLES_DATA,
         CREATING_ARTICLE_DATA, CREATING_ARTICLE_DATA_SUCCESS, CREATING_ARTICLE_DATA_FAILED, CLEAR_CREATING_ARTICLE_DATA,
         ARTICLE_DETAILS, ARTICLE_DETAILS_SUCCESS, ARTICLE_DETAILS_FAILED,CLEARING_ARTICLE_DETAILS, DELETING_ARTICLE_SUCCESS, DELETING_ARTICLE_FAILED,
         CLEAR_DELETING_ARTICLE, ARTICLE_DETAILS_FOR_EDIT, ARTICLE_DETAILS_FOR_EDIT_SUCCESS,
         ARTICLE_DETAILS_FOR_EDIT_FAILED, CLEAR_FETCHING_FOR_EDIT, UPDATING_ARTICLE, UPDATING_ARTICLE_SUCCESS, CLEAR_UPDATING_ARTICLE,
        UPDATING_ARTICLE_FAILED, ADDING_COMMENT_TO_ARTICLE, ADDING_COMMENT_TO_ARTICLE_SUCCESS,
        ADDING_COMMENT_TO_ARTICLE_FAILED, CLEAR_ADDING_COMMENT_TO_ARTICLE,FETCHING_COMMENT_OF_ARTICLE, FETCHING_COMMENT_OF_ARTICLE_SUCCESS, FETCHING_COMMENT_OF_ARTICLE_FAILED,
        CLEAR_FETCHING_COMMENT_OF_ARTICLE, DELETING_COMMENT, DELETING_COMMENT_SUCCESS, DELETING_COMMENT_FAILED,
        CLEAR_DELETING_COMMENT,  DELETING_ARTICLE, } from '../actions/actionTypes';

const initialState = {
    creatingArticle: false,
    createdArticle: null,
    creatingArticleFailed: null,
    fetchingDetailedArticle: false,
    fetchedDetailedArticle: null,
    fetchedDetailedArticleFailed: null,
    addingCommentToArticle:false,
    addedCommentToArticle:false,
    failedAddingCommentToArticle:false,
    fetchingCommentOfArticle: false,
    fetchingCommentsOfArticleSuccess: false,
    fetchingCommentsOfArticleFailed: false,
    fetchedCommentofArticle: null,

    deletingComment: false,
    deletingCommentSuccessfully: false,
    deletingCommentFailed: false,
    deletingArticle: false,
    myArticlesTotalCount: 10,
    fetchingArticles: false,
    fetchingMyArticles: false,
    errorMessage: null,
    updatingArticle: false,
    updatingArticleSuccess: false,
    updatingArticleFailed: false,
    updatingArticleError: null,
    updatedArticleResult: null,
    deletingArticleSuccessfully: false,
    deletingArticleFailed: false,
    fetchingArticleDetailsForEdit: false,
    fetchingArticleDetailsForEditSuccessfully: false,
    fetchingArticleDetailsForEditFailed: false,
    fetchedArticleDetailsForEdit: [],
    feedArticles: [],
    myArticles: [],
    feedArticlesTotalCount: 10,
};


export default (state = initialState, action) =>{
    switch(action.type) {
        case FETCHING_ARTICLES:
            return {...state, fetchingArticles:true, feedArticles: [], errorMessage: null};
        case FETCHING_ARTICLES_SUCCESS:
            return {...state, fetchingArticles:false, feedArticles: action.payload.articles, errorMessage: null, feedArticlesTotalCount: action.payload.articlesCount};
        case FETCHING_ARTICLES_FAILED:
            return {...state, fetchingArticles:false, feedArticles: [], errorMessage: action.payload, feedArticlesTotalCount: 10};
        case CLEAR_FETCHING_ARTICLES:
            return {...state, feedArticlesTotalCount:10}
        case FETCHING_MY_ARTICLES_DATA:
            return{...state, fetchingMyArticles:true, myArticles:[], errorMessage: null};
        case FETCHING_MY_ARTICLES_DATA_SUCCESS:
            return {...state, fetchingMyArticles: false, myArticles: action.payload.articles, errorMessage: null, myArticlesTotalCount: action.payload.articlesCount};
        case FETCHING_MY_ARTICLES_DATA_FAILED:
            return {...state, fetchingMyArticles: false, myArticles: [], errorMessage: action.payload, myArticlesTotalCount: 10};
        case CLEAR_FETCHING_MY_ARTICLES_DATA:
            return {...state, myArticlesTotalCount:10};
        case CREATING_ARTICLE_DATA:
            return {...state, creatingArticle:true, createdArticle: null, creatingArticleFailed: null };
        case CREATING_ARTICLE_DATA_SUCCESS:
            return {...state, creatingArticle: false, createdArticle: action.payload, creatingArticleFailed: null};
        case CREATING_ARTICLE_DATA_FAILED:
            return {...state, creatingArticle: false, createdArticle: null, creatingArticleFailed: action.payload};
        case CLEAR_CREATING_ARTICLE_DATA:
        return {...state, creatingArticle: false, createdArticle: null, creatingArticleFailed: null};
        case ARTICLE_DETAILS:
            return {...state, fetchingDetailedArticle: true, fetchedDetailedArticle: null, fetchedDetailedArticleFailed: null};
        case ARTICLE_DETAILS_SUCCESS:
            return {...state, fetchingDetailedArticle: false, fetchedDetailedArticle: action.payload};
        case ARTICLE_DETAILS_FAILED:
            return {...state, fetchingDetailedArticle: false, fetchedDetailedArticleFailed: action.payload};
        case CLEARING_ARTICLE_DETAILS:
            return {...state, fetchingDetailedArticle: false, fetchedDetailedArticle: null, fetchedDetailedArticleFailed: null};
        case ADDING_COMMENT_TO_ARTICLE:
            return {...state, addingCommentToArticle:true, addedCommentToArticle:false, failedAddingCommentToArticle:false};
        case ADDING_COMMENT_TO_ARTICLE_SUCCESS:
            return {...state, addingCommentToArticle:true, addedCommentToArticle:true, failedAddingCommentToArticle:false};
        case ADDING_COMMENT_TO_ARTICLE_FAILED:
            return {...state, addingCommentToArticle:false, addedCommentToArticle:false, failedAddingCommentToArticle:true};
        case CLEAR_ADDING_COMMENT_TO_ARTICLE:
            return {...state, addingCommentToArticle:false, addedCommentToArticle:false, failedAddingCommentToArticle:false};
        case FETCHING_COMMENT_OF_ARTICLE: 
            return {...state, fetchingCommentOfArticle: true, fetchingCommentsOfArticleSuccess:false, fetchingCommentsOfArticleFailed:false,
                fetchedCommentofArticle: null};
        case FETCHING_COMMENT_OF_ARTICLE_SUCCESS: 
            return {...state, fetchingCommentOfArticle: false, fetchingCommentsOfArticleSuccess:true, fetchingCommentsOfArticleFailed:false,
                fetchedCommentofArticle: action.payload};
        case FETCHING_COMMENT_OF_ARTICLE_FAILED: 
            return {...state, fetchingCommentOfArticle: false, fetchingCommentsOfArticleSuccess:false, fetchingCommentsOfArticleFailed:true,
                fetchedCommentofArticle: null};
        case CLEAR_FETCHING_COMMENT_OF_ARTICLE:
            return {...state, fetchingCommentOfArticle: false, fetchingCommentsOfArticleSuccess:false, fetchingCommentsOfArticleFailed:false,
                fetchedCommentofArticle: null};

        case DELETING_COMMENT:
            return  {...state, deletingComment: true, deletingCommentSuccessfully: false, deletingCommentFailed: false}
        case DELETING_COMMENT_SUCCESS:
            return  {...state, deletingComment: false, deletingCommentSuccessfully: true, deletingCommentFailed: false}
        case DELETING_COMMENT_FAILED: 
            return  {...state, deletingComment: false, deletingCommentSuccessfully: false, deletingCommentFailed: true}
        case CLEAR_DELETING_COMMENT:
            return  {...state, deletingComment: false, deletingCommentSuccessfully: false, deletingCommentFailed: false}
        case DELETING_ARTICLE:
            return  {...state, deletingArticle:true, deletingArticleSuccessfully:false, deletingArticleFailed:false}
        case DELETING_ARTICLE_SUCCESS:
            return {...state, deletingArticle:false, deletingArticleSuccessfully:true, deletingArticleFailed:false}
        case DELETING_ARTICLE_FAILED:
            return {...state, deletingArticle:false, deletingArticleSuccessfully:false, deletingArticleFailed:true}
        case CLEAR_DELETING_ARTICLE:
            return {...state, deletingArticle:false, deletingArticleSuccessfully:false, deletingArticleFailed:false}
        case ARTICLE_DETAILS_FOR_EDIT:
            return {...state, fetchingArticleDetailsForEdit:true,fetchingArticleDetailsForEditSuccessfully: false,
                            fetchingArticleDetailsForEditFailed: false, fetchedArticleDetailsForEdit: []};
        case ARTICLE_DETAILS_FOR_EDIT_SUCCESS:
            return {...state, fetchingArticleDetailsForEdit:false, fetchingArticleDetailsForEditSuccessfully: true,
                fetchingArticleDetailsForEditFailed: false, fetchedArticleDetailsForEdit: action.payload};
        case ARTICLE_DETAILS_FOR_EDIT_FAILED:
            return {...state, fetchingArticleDetailsForEdit:false, fetchingArticleDetailsForEditSuccessfully: false,
                    fetchingArticleDetailsForEditFailed: true, fetchedArticleDetailsForEdit: []};
        case CLEAR_FETCHING_FOR_EDIT:
            return {...state, fetchingArticleDetailsForEdit:false, fetchingArticleDetailsForEditSuccessfully: false,
                fetchingArticleDetailsForEditFailed: false, fetchedArticleDetailsForEdit: []};
        case UPDATING_ARTICLE: 
            return {...state, updatingArticle: true, updatingArticleSuccess:false, updatingArticleFailed:false, updatedArticleResult: null, updatingArticleError:null};
        case UPDATING_ARTICLE_SUCCESS: 
            return {...state, updatingArticle: false, updatingArticleSuccess:true, updatingArticleFailed:false, updatedArticleResult: action.payload, updatingArticleError: null};
        case UPDATING_ARTICLE_FAILED:
            return {...state, updatingArticle: false, updatingArticleSuccess:false, updatingArticleFailed:true, updatedArticleResult: null, updatingArticleError:action.payload};
        case CLEAR_UPDATING_ARTICLE: 
            return {...state, updatingArticle: false, updatingArticleSuccess:false, updatingArticleFailed:false, updatedArticleResult: null, updatingArticleError:null};
        default:
            return state;
    }

}