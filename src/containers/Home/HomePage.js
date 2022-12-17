import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadersHome from './HeaderHome';
import Banner from './Section/Banner';
import FooterHome from './FooterHome';
class HomePage extends Component {

    render() {

        return (
            <>
                <HeadersHome />
                <Banner />
                <Banner />
                <FooterHome />
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
