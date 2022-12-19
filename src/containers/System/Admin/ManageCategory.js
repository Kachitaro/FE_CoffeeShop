import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageAdmin.scss';


class ManageCategory extends Component {

    render() {
        return (
            <div className='users-container'>
            <div className="title text-center">Manage Category</div>
            <div className='px-3 mx-3'>
                <button className='btn-add' onClick={() => this.handleAddNewUser()}><i className='fas fa-plus' /> Add user</button>
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
                        {/* {data && data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.gender ? 'Male' : 'Female'}</td>
                                    <td>{item.position}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)} ><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)} ><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        }
                        )} */}
                    </tbody>
                </table>
            </div>
        </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
