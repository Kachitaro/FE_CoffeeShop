import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { handleGetAllUser, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModal: false,
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
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
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
        } catch (error) {
            console.log(error);
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
                                        <td>
                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
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
