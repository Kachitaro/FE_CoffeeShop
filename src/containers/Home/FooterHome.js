import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss'
 


class FooterHome extends Component {
    
    render() {
        return (
            <React.Fragment>
                <div className="home-footer-container">
                    <div className="home-footer-content">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h3>About</h3>
                                <p>Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <h3>Giới thiệu</h3>
                                <ul className="footer-links">
                                    <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                                    <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
                                    <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                                    <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
                                    <li><a href="http://scanfcode.com/category/android/">Android</a></li>
                                    <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="home-footer-content">
                        <div className="row">
                            <div class="col-6 col-md-4"></div>
                            <div className="col-6 col-md-4"><p>Copyright &copy; 2017 All Rights Reserved by.</p></div>
                            <div class="col-6 col-md-4"></div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterHome);
