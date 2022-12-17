import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadersHome from './HeaderHome';

class HomePage extends Component {

    render() {

        return (
            <>
                <HeadersHome />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
