import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManage.scss';

class TableManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArr: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            let arrUsers = this.props.listUsers;
            this.setState({
                usersArr: arrUsers,
                listUsers: arrUsers && arrUsers.length > 0 ? arrUsers[0].key : ''
            })
            
        } 
    }

    render() {
        let arrUsers = this.state.usersArr;
        return (
            <div className='users-container'>
                <div className='users-table mt-3 mx-3'>
                    <table id="TableManage">
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
                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) =>{
                                    return (
                                        <tr key={index} >
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.position}</td>
                                        <td>
                                            <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers : state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUser:() => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
