import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    /*handle change data */
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    /*on submit data */
    onSubmit = (event)=> {
        event.preventDefault();
        this.props.signIn(this.state);
        this.setState({email: '', password: ''})
    }

    /* display errors */
    showErrorMessage = () => {
        if(this.props.errorMessage){
            return (
                <p className="text-center">
                    {this.props.errorMessage}
                </p>
            )
        }
    }

    render() {
        const errorMessage = this.showErrorMessage();
        return (
            <div className="ui grid container">
                <div className="four wide column"></div>
                <div className="eight wide column">
                    <h1 className="text-center">Sign In</h1>
                    <p className="text-center">
                        <Link to='/signup'>Need an account?</Link>
                    </p>
                    {errorMessage}
                    <form className="ui form" onSubmit={this.onSubmit}>
                        <div className="field">
                            <input name="email" value={this.state.email} type="email" placeholder="Email" onChange={this.handleChange} required />
                        </div>
                        <div className="field">
                            <input name="password" minLength = "8" value={this.state.password} type="password" placeholder="Password"  onChange={this.handleChange} required />
                        </div>
                        <div className="field">
                            <button className="ui right floated green button">Sign In</button>
                        </div>
                    </form>
                </div>
                <div className="four wide column"></div>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, {signIn})(SignIn);