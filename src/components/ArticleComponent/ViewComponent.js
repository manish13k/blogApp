import React from 'react';
import { connect } from 'react-redux';
import createBrowserHistory from '../../webHistory.js';
import { fetchArticleBySlug, addCommentToArticle, clearFetchingComments,clearAddingComment, deleteComment, deleteArticle } from '../../actions';

class ArticleView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            loggedInUser:'',
            currentArticle:''
        }
    }

    componentDidMount() {
        this.props.clearAddingComment();
        this.props.clearFetchingComments();
        const id = this.props.match.params.id;
        this.setState({currentArticle: id});
        this.props.fetchArticleBySlug(id);
    }

    /*handle click */
    handleClick = (e) => {
        e.preventDefault();
    }

    /*handle delete article */
    deleteArticle= (event)=> {
        event.preventDefault();
        const articleId = this.state.currentArticle;
        this.props.deleteArticle(articleId);

    }

    /*handle edit article */
    handleEditArticle = ()=> {
        const articleId = this.state.currentArticle;
        createBrowserHistory.push(`/articles/edit/${articleId}`);
    }

    /*handle display button */
    displayButton = (articleUser) => {
        if(this.props.user){
            const {user} = this.props.user;
            if(articleUser === user.username) {
                return (
                    <ul className="ui floated left article-taglist-ul">
                        <li className="article-taglist-li" onClick={this.handleEditArticle}>
                             Edit Article
                        </li>
                        <li className="article-taglist-li " onClick={this.deleteArticle}>
                             Delete Article
                        </li>
                    </ul>
                )
            }
        }

    }

    /*delete comment data */
    deleteComment=(event)=>{
        event.preventDefault();
        const commentId = event.target.getAttribute('data');
        const articleId = this.state.currentArticle;
        this.props.deleteComment(articleId, commentId);

    }
    renderDeleteCommentButton = (loggedInUser, commentUser, key)=> {
        if(loggedInUser && loggedInUser=== commentUser ) {
            return (
                <i className="trash icon color-grey" data={key} onClick={this.deleteComment}></i>
            )
        }
    }
    renderComments = () => {
        if(this.props.fetchedCommentofArticle && this.props.fetchedCommentofArticle.comments &&
            this.props.fetchedCommentofArticle.comments.length>0){
            const {comments} = this.props.fetchedCommentofArticle;
            let user = this.props.user;
            const loggedInUsername = user ? user.user.username: null;
            const comment = comments.map((comment)=>{
                return (
                        <div className="comment  comment-border" key={comment.id}>
                        <a href="/" className="ui avatar image" onClick={this.handleClick}>
                        <img src={comment.author.image} className="ui image" alt= 'na'/>
                        </a>
                        <a href="/" className="display-right mouse-pointer" onClick={this.handleClick}>
                            {this.renderDeleteCommentButton(loggedInUsername, comment.author.username, comment.id)}
                        </a>
                        <div className="content">
                            <a href="/" className="author" onClick={this.handleClick}>{comment.author.username}</a>
                            <div className="metadata">
                                <div className="date">{new Date(comment.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div className="text">
                                {comment.body}
                            </div>
                        </div>
                        </div>
                )
            });
            return (
                <React.Fragment>
                    {comment}
                </React.Fragment>
                    
            )
        }
    }

    handleDeleteCommentNotification=()=> {
        if(this.props.deletingComment){
            return (
                <div>Deleting Commment.....</div>
            )
            
        } else if(this.props.deletingCommentSuccessfully){
            return (
                <div>Deleting Successfully.....</div>
            )
        }
        else if(this.props.deletingCommentFailed){
            return (
                <div>Failed to delete the comment.....</div>
            )
        }
    }
    handleCommentBox = () =>{
        let user = this.props.user;
        const loggedInUsername = user ? user.user.username: null;
        if(loggedInUsername) {
            return (
                // <Comment
                //     changeData={this.handleChange}
                //     submitData={this.onSubmit}
                //     deleteComment={this.handleDeleteCommentNotification}
                //     commentList={this.renderComments}
                //  />
                <div className="comments-section">
                    <div className="ui comments">
                        <form className="ui reply form" onSubmit={this.onSubmit}>
                            <div className="field">
                            <textarea name="comment" required onBlur={this.handleChange} defaultValue={this.state.comment}></textarea>
                            </div>
                            <input className="ui green submit button text-center" type='submit' name='submit' value='Submit Comment'/>
                            </form>

                        {this.handleDeleteCommentNotification()}
                        {this.renderComments()}
                    </div>
                </div>
            );
        }
    }
    getHeaderSection=()=> {
        if(this.props.article && ! this.props.isloading && !this.props.failedMessgae) {
            const {article} = this.props.article;
            const header= article.title,
                userName= article.author.username,
                date= new Date(article.createdAt).toLocaleDateString(),
                body= article.body,
                tags= article.tagList,
                imgSrc = article.author.image
            const userButton = this.displayButton(userName);
            const commentBox = this.handleCommentBox();
            return (
                <React.Fragment>
                    <div className="banner text-break">    
                        <div className="content">
                            <h1>{header}</h1>
                        </div>
                        
                        <div className="content">
                            <img src={imgSrc} alt="not available" className="ui floated left avatar image"/>
                            <div>
                            {userName}<br/>
                                {date}
                            </div>
                            <div>
                            {userButton}
                            </div>
                        </div>
                        
                        <br/>
                    </div>
                    <div className="ui container grid text-break">
                        <div className="one wide column"></div>
                        <div className="fifteen wide column">
                            <div className="article-body ">
                                <h3>{body}</h3>
                            </div>
                            <div>
                                <ul className="article-taglist-ul">
                                    {tags?tags.map(tag=><li className="article-taglist-li" key={tag}>{tag}</li>):''}
                                </ul>
                            </div>
                            
                            <hr/>
                            {commentBox}
                        </div>
                    </div>
                    
                </React.Fragment>
            );
        }
        else if(this.props.isloading){
            return (
                <React.Fragment><div className='loading'></div></React.Fragment>
            )
        }
        else if(this.props.failedMessgae) {
            return(
                <React.Fragment>this.props.failedMessgae</React.Fragment>
            )
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        
    }
    onSubmit =(event)=>{
        event.preventDefault();
        const {currentArticle, comment}=  this.state;
        this.props.addCommentToArticle(currentArticle, {body: comment});
    }

    render() {
        const headerSection = this.getHeaderSection();
        return (
            <React.Fragment>
                    {headerSection} 
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        article: state.articles.fetchedDetailedArticle,
        isloading: state.articles.fetchingDetailedArticle,
        failedMessgae: state.articles.fetchedDetailedArticleFailed,
        user: state.auth.user,
        addingCommentToArticle: state.articles.addingCommentToArticle,
        addedCommentToArticle:state.articles.addedCommentToArticle,
        failedAddingCommentToArticle: state.articles.failedAddingCommentToArticle,
        fetchingComments: state.articles.fetchingCommentOfArticle,
        fetchingCommentsOfArticleSuccess: state.articles.fetchingCommentsOfArticleSuccess,
        fetchingArticleFailed: state.articles.fetchingCommentsOfArticleFailed,
        fetchedCommentofArticle: state.articles.fetchedCommentofArticle,
        deletingComment: state.articles.deleteComment,
        deletingCommentSuccessfully: state.articles.deletingCommentSuccessfully,
        deletingCommentFailed: state.articles.deletingCommentFailed,
        deletingArticle: state.articles.deletingArticle,
        deletingArticleSuccessfully: state.articles.deletingArticleSuccessfully,
        deletingArticleFailed: state.articles.deletingArticleFailed
    }
}

const action = {
        fetchArticleBySlug, addCommentToArticle, clearFetchingComments,
        clearAddingComment, deleteComment, deleteArticle
} 


export default connect(mapStateToProps, action)(ArticleView);