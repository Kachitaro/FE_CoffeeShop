import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { USER_ROLE } from '../utils';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            path:''
        }
        
    }

    componentDidMount(){
        let {userInfo} = this.props.userInfo;
        let pathMenu = '';
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN){
                pathMenu = '/system/user-staff';
            }

            if (role === USER_ROLE.STAFF){
                pathMenu = '/staff/order';
            }
        }

        this.setState({
            path: pathMenu
        })
    }

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? this.state.path : '/homepage';

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
