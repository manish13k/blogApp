import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signUp } from '../actions'

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            password: ''
        }
    }

    /*on submit form */
    onSubmit = (event)=> {
        event.preventDefault();
        this.props.signUp(this.state);
        this.setState({userName: '', email: '', password: ''});
    }

    /*display errors  */
    showErrors = () => {
        if(this.props.errorMessage) {
            return (
                <p className='text-center'>
                    {this.props.errorMessage}
                </p>
            );
        }
    }

    /* handle change data */
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    /* register user data */
    registeringUser () {
        if(this.props.isRegistering) {
            return (
            <p className="text-center">Registering User ${this.props.userName}</p>)
        }
        else {
            return (
                <p className='text-center'>
                    <Link to="/signin">Have an account?</Link>
                </p>
            );
        }
    }

    render() {
        const errors = this.showErrors();
        const registeringUser = this.registeringUser();
        return (
        <div className="ui grid container">
            <div className="four wide column"></div>
            <div className="eight wide column">
                <h1 className="text-center">Sign Up</h1>
                {errors}
                {registeringUser}
                
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        <input name="userName" value={this.state.userName} type="text" placeholder="Username" onChange={this.handleChange} required/>
                    </div>
                    <div className="field">
                        <input name="email" value={this.state.email} type="email" placeholder="Email" onChange={this.handleChange} required/>
                    </div>
                    <div className="field">
                        <input name="password" value={this.state.password} minLength="8" type="password" placeholder="Password" onChange={this.handleChange} required/>
                    </div>
                    <div className="field">
                        <button className="ui right floated green button">Sign Up</button>
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
        isRegistering: state.register.isRegistering,
        userName: state.register.userName,
        errorMessage: state.register.errorMessage
    }
}
export default connect(mapStateToProps, {signUp})(SignUp);