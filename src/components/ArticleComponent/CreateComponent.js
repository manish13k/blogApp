import React from 'react';
import { connect } from 'react-redux';
import {createArticle, clearCreateArticleForm} from '../../actions';

class CreateArticle extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            body: '',
            tag: '',
            taglist: []
        }
    }

    componentDidMount(){
        this.props.clearCreateArticleForm();
    }

    /*on article submit */
    onSubmitArticle = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.createArticle(this.state);
        this.setState({description: '', title: '',body: '', taglist:[] , tag: ''});
    }

    /*handle change data */
    handleChange = (event) => {
        const {name, value} = event.target;
        if(name === 'tag') {
            const values = value.split(' ');
            this.setState({taglist: values, tag: value});
        } else {
            this.setState({[name]: value});
        }
    }

    /*on article validation */
    submitValidation=()=> {
        if(this.props.creatingArticle){
            return (
                <p className="text-center">Form is Submitting....</p>
            )
        }
        else if(this.props.createdArticle){
            return (
                <p className="text-center">Article has created successfully!</p>
            )
        }
        else if(this.props.creatingArticleFailed){
            return (
                <p className="text-center">Article has failed to create</p>
            )
        }
    }

    render() {
        const creatingFlag = this.submitValidation();
        return (
            <div className="ui grid container">
                <div className="two wide column"></div>
                <div className="twelve wide column">
                    {creatingFlag}
                    <form className="ui form" onSubmit={this.onSubmitArticle}>
                        <div className="field">
                            <input name= 'title' value={this.state.title} type="text" placeholder="Article Title" onChange={this.handleChange} required/>
                        </div>
                        <div className="field">
                            <input name="description" value={this.state.description}  type="text" placeholder="What's this article about?" onChange={this.handleChange} required/>
                        </div>
                        <div className="field">
                            <textarea name="body" value={this.state.body}   type="text" placeholder="Write Your Article (In Markdown)" onChange={this.handleChange} required />
                        </div>
                        <div className="field">
                            <input name="tag" value={this.state.tag}  type="text"  placeholder="Enter tags" onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui right floated green button">Create Article</button>
                        </div>
                    </form>
                </div>
                <div className="two wide column"></div>
            </div>
        )
        
    }
}
const mapStateToProps= (state)=> {
    return {
        creatingArticle: state.articles.creatingArticle,
        createdArticle: state.articles.createdArticle,
        creatingArticleFailed: state.articles.creatingArticleFailed
    }
}


export default connect(mapStateToProps,{createArticle, clearCreateArticleForm})(CreateArticle);