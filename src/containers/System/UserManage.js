import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { handleGetAllUser, createNewUserService, handleDeleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userEdit: {},
            isOpenModalAddNew: false,
            isOpenModalEdit: false,
        };
    }
    async componentDidMount() {
        await this.getAllUser();
    }

    getAllUser = async () => {
        let data = await handleGetAllUser('All');
        if (data && data.errCode === 0) {
            this.setState({
                users: data.users
            })
        }
    }
    handleAddNewUser = () => {
         this.setState({
            isOpenModalAddNew: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalAddNew: !this.state.isOpenModalAddNew,
        })
    }

    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        })
    }

    addDefaultDate = (data) => {
        let position = data.position;
        if(position === 'Shift leader') {
            data.salary = 8000000;
            data.roleId = 'R2';
            data.password ='SL123456';
        } else if(position === 'cashier') {
            data.salary = 6500000;
            data.roleId = 'R2';
            data.password ='SL123456';
        } else {
            data.salary = 6000000;
            data.roleId = 'R2';
            data.password ='SL123456';
        }
    }

    editDefaultDate = (data) => {
        let position = data.position;
        if(position === 'Shift leader') {
            data.salary = 8000000;
            data.roleId = 'R2';
        } else if(position === 'cashier') {
            data.salary = 6500000;
            data.roleId = 'R2';
        } else {
            data.salary = 6000000;
            data.roleId = 'R2';
        }
    }

    createNewUser = async (data) => {
        //set salary, roleId, password from position
        this.addDefaultDate(data);
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.message);
                
            } else {
                await this.getAllUser();
                this.toggleUserModal();
            }
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (data) => {
        try {   
            let response = await handleDeleteUserService(data.id);
            console.log(response);
            if(response && response.errCode === 0) {
                await this.getAllUser();
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = (data) => {
        console.log(data);
        this.setState({
            isOpenModalEdit: true,
            userEdit: data
        })
    }

    handleUserEdit = async (data) => {
        this.editDefaultDate(data);
        let response = await editUserService(data);
        if(response && response.errCode === 0) {
            await this.getAllUser();
            this.toggleUserModalEdit();
        } else {
            alert(response.message);
        }
    }


    render() {
        let data = this.state.users;
        return (
            <div className='users-container'>
                <div className="title text-center">Manage users with ADMIN</div>
                <div className='px-3 mx-3'>
                    <button className='btn-add' onClick={() => this.handleAddNewUser()}><i className='fas fa-plus'/> Add user</button>
                </div>
                <div className='users-table mt-3 mx-3'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>PhoneNumber</th>
                                <th>Gender</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.gender?'Male':'Female'}</td>
                                        <td>{item.position}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)} ><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)} ><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
                <ModalUser
                    isOpen={this.state.isOpenModalAddNew}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                { 
                    this.state.isOpenModalEdit && <ModalEditUser
                    isOpen={this.state.isOpenModalEdit}
                    toggleUserModal={this.toggleUserModalEdit}
                    currentUser={this.state.userEdit}
                    editUser={this.handleUserEdit}
                    />
                }
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
