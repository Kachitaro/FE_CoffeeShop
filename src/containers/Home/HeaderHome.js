import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../utils/constant';
import { changeLanguage } from '../../store/actions';
import './Home.scss'
 


class HeaderHome extends Component {
    
    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    }


    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i style={{paddingLeft:'10px',fontSize:'24px'}} className='fas fa-bars'/>
                        <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.tea'/></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.coffee'/></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.menu'/></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.story'/></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.store'/></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.Career'/></b></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.cloudFee'/></b></div>
                            </div>
                        </div>
                        <div className='right-content'>
                        <div className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span></div>
                        <div className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
        changeLanguageRedux: (language) => dispatch(changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
