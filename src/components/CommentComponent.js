import React from 'react';

const Comment = (props) => {   
    return (               <div className="comments-section">
    <div className="ui comments">
        <form className="ui reply form">
            <div className="field">
            <textarea name="comment" onBlur={props.changeData}></textarea>
            </div>
            <div className="ui primary submit labeled icon button text-center" onClick={props.submitData}>
                <i className="icon edit"></i> Post Comment
            </div>  
        </form>
        {props.deleteComment()}
        {props.commentList()}
    </div>
</div>);
  };

  export default Comment;
