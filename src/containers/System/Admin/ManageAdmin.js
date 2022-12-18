import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGE } from '../../../utils';
import * as actions from '../../../store/actions'
class ManageAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        
    }


    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.gender !== this.props.gender){
            this.setState({
                genderArr: this.props.gender
            })
        }
    }


    render() {
        let gender = this.state.genderArr;
        let language = this.props.language;
        console.log(this.props.gender);
        return (
            <div className='manage-admin-container'>
                <div className='manage-admin-content'>
                    <div className="title text-center">ADMIN</div>
                    <div className="row m-3">
                            <form className="row mx-auto">
                                <div className="col-md-6 mt-3">
                                    <label for="inputEmail4" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label for="inputPassword4" className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label for="inputAddress" className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label for="inputCity" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" name="phoneNumber" />
                                </div>  
                                
                                <div className="col-md-3 mt-3">
                                    <label for="inputState" className="form-label">Gender</label>
                                    <select className="form-select">
                                        {gender && gender.length> 0 && 
                                            gender.map((item, index) => {
                                                return(
                                                    <option key={index}>{language ===  LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <label for="inputState" className="form-label">ROLE</label>
                                    <select className="form-select">
                                        {gender && gender.length> 0 && 
                                            gender.map((item, index) => {
                                                return(
                                                    <option key={index}>{language ===  LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label for="inputState" className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" />
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="px-3 btn btn-primary">Sign in</button>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gender: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageRedux: (language) => dispatch(actions.changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
