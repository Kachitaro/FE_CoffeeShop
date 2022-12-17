import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { LANGUAGE } from '../../utils';
import './Header.scss';

class Header extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    }
    render() {
        const { processLogout, language } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <span className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span>
                    <span className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                {/* nút logout */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
