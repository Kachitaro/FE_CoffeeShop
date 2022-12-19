import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import AdminManage from '../containers/System/Admin/ManageAdmin';
import Header from '../containers/Header/Header';
import _ from 'lodash';
import { USER_ROLE } from '../utils';
import ManageCategory from '../containers/System/Admin/ManageCategory';
class System extends Component {
    constructor(props){
        super(props);

        this.state = {
            checkUser: false
        }
    }


    componentDidMount(){
        let {userInfo} = this.props.userInfo;
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN){
                this.setState({
                    checkUser: true
                })
            }
        }
    }
    render() {
        // {this.props.isLoggedIn && <Header />}
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-admin" component={AdminManage} />
                            <Route path="/system/user-staff" component={UserManage} />
                            <Route path="/system/manage-category" component={ManageCategory}/>
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
