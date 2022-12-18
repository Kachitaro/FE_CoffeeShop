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
            isOpen: false,

            name: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            gender: '',
            birthDate: '',
            salary: '',
            position: '',
            roleId: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }


    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.gender !== this.props.gender){
            let arrGender = this.props.gender;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
            
        }
        if(prevProps.role !== this.props.role){
            let arrRole = this.props.role;
            this.setState({
                roleArr: arrRole,
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : '' 
            })
        }
        if(prevProps.position !== this.props.position){
            let arrPosition = this.props.position;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '' 
            })
        }  
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true
        })
    }
    handleSave = () => {
        let isValidate = this.checkValidateInput();
        if (isValidate === false) return;

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            birthDate: this.state.gender,
            salary: this.state.salary,
            position: this.state.position,
            roleId: this.state.roleId,
            avatar: this.state.avatar,
        })
    }

    checkValidateInput = () => {
        let isValidate = true;
        let arrCheck = ['email','password','name','phoneNumber']
        for (let i = 0 ; i <arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValidate = false;
                alert('this input is required' + arrCheck[i])
                break;
            }
        }
        return isValidate;
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    render() {
        let genderA = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isLoading = this.props.isLoading;
        let {email, password, name, address, phoneNumber} = this.state;
        return (
            <div className='manage-admin-container'>
                <div className='manage-admin-content'>
                    <div className="title text-center">{isLoading === true ? 'Loading data': 'ADMIN'}</div>
                    <div className="row m-3">
                            <form className="row mx-auto">
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" autoComplete="off" value={email} onChange={(e) => {this.onChangeInput(e,'email')}} />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label  className="form-label">Password</label>
                                    <input type="password" name="password" autoComplete="current-password" className="form-control" value={password} onChange={(e) => {this.onChangeInput(e,'password')}} />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => {this.onChangeInput(e,'name')}} />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" value={phoneNumber} onChange={(e) => {this.onChangeInput(e,'phoneNumber')}} />
                                </div>  
                                <div className="col-md-3 mt-3">
                                    <label className="form-label">Gender</label>
                                    <select className="form-select" onChange={(e) => {this.onChangeInput(e,'gender')}} >
                                        {genderA && genderA.length> 0 && 
                                            genderA.map((item, index) => {
                                                return(
                                                    <option key={index} value={item.key}>{language ===  LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <label className="form-label">ROLE</label>
                                    <select className="form-select" onChange={(e) => {this.onChangeInput(e,'roleId')}}>
                                        {roles && roles.length> 0 && 
                                            roles.map((item, index) => {
                                                return(
                                                    <option key={index} value={item.key}>{language ===  LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <label className="form-label">Position</label>
                                    <select className="form-select" onChange={(e) => {this.onChangeInput(e,'position')}}>
                                        {positions && positions.length> 0 && 
                                            positions.map((item, index) => {
                                                return(
                                                    <option key={index} value={item.key}>{language ===  LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" value={address} onChange={(e) => {this.onChangeInput(e,"address")}} />
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
                                    <button className="px-3 btn btn-primary" onClick={() => this.handleSave()}>Sign in</button>
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
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
