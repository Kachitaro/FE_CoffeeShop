import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGE, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import TableManage from './TableManage';
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

            actions: '',
            usersEditId: ''
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
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGender = this.props.gender;
            let arrRole = this.props.role;
            let arrPosition = this.props.position;
            this.setState({
                name: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key:'',
                birthDate: '',
                salary: '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key:'',
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].key:'',
                avatar: '',
                actions: CRUD_ACTIONS.CREATE,
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
        let {actions} = this.state;
        if(actions=== CRUD_ACTIONS.CREATE){
            let isValidate = this.checkValidateInput();
            if (isValidate === false) return;

            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                position: this.state.position,
                roleId: this.state.roleId,
                avatar: this.state.avatar,
            })
        }
        if (actions === CRUD_ACTIONS.EDIT){
            this.props.editUsers({
                id: this.state.usersEditId,
                email: this.state.email,
                //password: this.state.password,
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                birthDate: this.state.birthDate,
                salary: this.state.salary,
                position: this.state.position,
                roleId: this.state.roleId,
            })
        }  
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
    
    editUsers = (user) => {
        this.setState({
            usersEditId: user.id,
            email: user.email,
            name: user.name,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            birthDate: user.birthDate,
            salary: user.salary,
            position: user.position,
            roleId: user.roleId,
            avatar: '',
            actions: CRUD_ACTIONS.EDIT,

        })
    }


    render() {
        let genderA = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isLoading = this.props.isLoading;
        let {email, password,gender,position,role , name, address, phoneNumber} = this.state;
        return (
            <div className='manage-admin-container'>
                <div className='manage-admin-content'>
                    <div className="title text-center">{isLoading === true ? 'Loading data': 'ADMIN'}</div>
                    <div className="row m-3">
                            <form className="row mx-auto">
                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" 
                                        autoComplete="on" 
                                        value={email} 
                                        onChange={(e) => {this.onChangeInput(e,'email')}}
                                        disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false} 
                                        />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label  className="form-label">Password</label>
                                    <input type="password" 
                                        autoComplete="current-password" 
                                        className="form-control" 
                                        value={password} 
                                        onChange={(e) => {this.onChangeInput(e,'password')}}
                                        disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false}
                                        />
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
                                    <select className="form-select" onChange={(e) => {this.onChangeInput(e,'gender')}} value={gender} >
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
                                    <select className="form-select" onChange={(e) => {this.onChangeInput(e,'roleId')}} value={role}>
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
                                    <select className="form-select" onChange={(e) => {this.onChangeInput(e,'position')}} value={position}>
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
                                    <button 
                                        className={this.state.actions === CRUD_ACTIONS.EDIT ? "btn btn-warning":"btn btn-primary" } 
                                        onClick={() => this.handleSave()}>
                                            {this.state.actions === CRUD_ACTIONS.EDIT ? 'SAVE' : 'ADD' }
                                        </button>
                                </div>
                            </form>
                            <div className='col-12 my-3'>
                                <TableManage
                                    editUsers={this.editUsers}
                                    actions={this.state.actions}
                                />
                            </div>
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
        listUsers : state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUsers:(data) => dispatch(actions.editUsersStart(data))
        //fetchUser: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
