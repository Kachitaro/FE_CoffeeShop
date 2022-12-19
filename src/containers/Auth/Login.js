import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
//import { userLoginSuccess } from '../../store/actions';
//import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
        };
    }

    handelChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }


    handelLogin = () => {
        this.props.userLogin({
            email: this.state.email,
            password: this.state.password
        })
    }

    render() {

        let {email, password, errorMessage} = this.state;
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label className='form-label'>Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                placeholder="Enter your email"
                                onChange={(e) => { this.handelChangeInput(e,'email') }}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label className='form-label' >Password:</label>
                            <div className='customs-eye'>
                                <input
                                    type='password'
                                    className="form-control"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(e) => { this.handelChangeInput(e,'password') }}
                                />
                            </div>
                        </div>
                        <div className='col-12' style={{ fontSize: '20px', color: 'red' }}>
                            {errorMessage}
                        </div>
                        <div className='col-12 group-btn'>
                            <button type="submit" className="btn" onClick={() => this.handelLogin()}>Login</button>
                            <button type="submit" className="btn">Register</button>
                        </div>
                        <div className='col-12 forgot-password'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12'></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLogin: (adminInfo) => dispatch(actions.userLogin(adminInfo)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
