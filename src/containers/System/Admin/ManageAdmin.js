import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGE } from '../../../utils';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import './ManageAdmin.scss';


class ManageAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr:[],
            roleArr: [],
            previewImgURL:'',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }


    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.gender !== this.props.gender){
            this.setState({
                genderArr: this.props.gender
            })
            
        }
        if(prevProps.role !== this.props.role){
            this.setState({
                roleArr: this.props.role
            })
        }
        if(prevProps.position !== this.props.position){
            this.setState({
                positionArr: this.props.position
            })
        }  
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true
        })
    }


    render() {
        let gender = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isLoading = this.props.isLoading;
        return (
            <div className='manage-admin-container'>
                <div className='manage-admin-content'>
                    <div className="title text-center">{isLoading === true ? 'Loading data': 'ADMIN'}</div>
                    <div className="row m-3">
                            <form className="row mx-auto">
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label  className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" name="phoneNumber" />
                                </div>  
                                <div className="col-md-3 mt-3">
                                    <label className="form-label">Gender</label>
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
                                    <label className="form-label">ROLE</label>
                                    <select className="form-select">
                                        {roles && roles.length> 0 && 
                                            roles.map((item, index) => {
                                                return(
                                                    <option key={index}>{language ===  LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <label className="form-label">Position</label>
                                    <select className="form-select">
                                        {positions && positions.length> 0 && 
                                            positions.map((item, index) => {
                                                return(
                                                    <option key={index}>{language ===  LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Image</label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnChangeImage(event)} />
                                        <label className='label-upload'htmlFor='previewImg' >Tải ảnh <i className='fas fa-upload'/> </label>
                                        <div className='preview-image' style={{backgroundImage: `url(${this.state.previewImgURL})`}} onClick={() => this.openPreviewImage()}></div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="px-3 btn btn-primary">Sign in</button>
                                </div>
                            </form>
                    </div>
                </div>
                { this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({isOpen: false})}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gender: state.admin.genders,
        role: state.admin.roles,
        position: state.admin.positions,
        isLoading: state.admin.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
