import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
//import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        };
    }

    handelChangeUser(e) {
        this.setState({
            username: e.target.value
        })
    }
    handelChangePass(e) {
        this.setState({
            password: e.target.value
        })
    }

    isShowPassword() {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handelLogin() {
        
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label className='form-label'>Username:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.username} 
                                placeholder="Enter your username"
                                onChange={(e) => {this.handelChangeUser(e)}}
                                />
                        </div>
                        <div className='col-12 form-group'>
                            <label className='form-label' >Password:</label>
                            <div className='customs-eye'>
                                <input 
                                    type= {this.state.isShowPassword ? "text" : "password"}
                                    className="form-control" 
                                    value={this.state.password} 
                                    placeholder="Enter your password"
                                    onChange={(e) => {this.handelChangePass(e)}}
                                />
                                <span>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye':'fas fa-eye-slash'} onClick={() => {this.isShowPassword()}}></i>
                                </span>
                                
                            </div>
                        </div>
                        <div className='col-12 group-btn'>
                                <button type="submit" className="btn" onClick={() => {this.handelLogin()}}>Login</button>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
