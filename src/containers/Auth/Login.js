import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLogin } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';
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

    handelChangeUser(e) {
        this.setState({
            email: e.target.value
        })
    }
    handelChangePass(e) {
        this.setState({
            password: e.target.value
        })
    }

    handelLogin = async () => {
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLogin(this.state.email, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
               this.props.userLoginSuccess(data.data);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({
                    errorMessage: error.response.data.message
                })
            }
        }
    }

    render() {
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
                                value={this.state.email} 
                                placeholder="Enter your email"
                                onChange={(e) => {this.handelChangeUser(e)}}
                                />
                        </div>
                        <div className='col-12 form-group'>
                            <label className='form-label' >Password:</label>
                            <div className='customs-eye'>
                                <input 
                                    type= 'password'
                                    className="form-control" 
                                    value={this.state.password} 
                                    placeholder="Enter your password"
                                    onChange={(e) => {this.handelChangePass(e)}}
                                />
                            </div>
                        </div>
                        <div className='col-12' style={{ fontSize:'20px' ,color: 'red'}}>
                            {this.state.errorMessage}
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
        //adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (adminInfo) => dispatch(actions.userLoginSuccess(adminInfo)),
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
