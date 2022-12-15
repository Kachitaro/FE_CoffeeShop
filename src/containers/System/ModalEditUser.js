import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { editUserService } from '../../services/userService';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
            gender: '',
            birthDate: '',
            salary: '',
            position: '',
            roleId: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                address: user.address,
                birthDate: user.birthDate,
                phoneNumber: user.phoneNumber,
                position: user.position,
                salary: user.salary,
                roleId: user.roleId,
            })
        }
    }

    toggle = () => {
        this.props.toggleUserModal();
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidate = () => {
        let isValidate = true;
        // check validate
        let arrInput = ['name', 'address', 'phoneNumber', 'position','gender'];
        for (let i = 0; i < arrInput.length; i++) {
            if(this.state[arrInput[i]] === null) {
                isValidate = false;
                break;
            }  
        }
        return isValidate;
    }

    handleEditUser = () => {
        if(this.checkValidate()) {
            this.props.editUser(this.state);
        } else {
            alert('Please fill all input');
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                className="modal-user-container"
            >
                <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                    <div className='input-container'>
                            <label>Name</label>
                            <input 
                                type='text' 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "name")} 
                                value={this.state.name}
                            />
                        </div>
                        <div className='input-container' hidden>
                            <label>Email</label>
                            <input
                                type='text'
                                className='input'
                                onChange={(e) => this.handleOnchangeInput(e, "email")}
                                value={this.state.email}
                                disabled/>
                        </div>
                        <div className='input-container'>
                            <label>Gender</label>
                            <select 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "gender")} 
                                value={this.state.gender}
                                >   
                                    <option disabled={true} value=""> --- Select Gender ---</option>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input 
                                type='text' 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")} 
                                value={this.state.phoneNumber}
                                />
                        </div>
                        <div className='input-container' hidden>
                            <label>Birth Date</label>
                            <input 
                                type="date" 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "birthDate")} 
                                value={this.state.birthDate}
                                disabled
                                />
                        </div>
                        <div className='input-container'>
                            <label>Position</label>
                            <select 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "position")}
                                value={this.state.position}
                                >
                                <option disabled={true} value=""> --- Select position ---</option>
                                <option value="Shift leader">Shift Leader</option>
                                <option value="cashier">Cashier</option>
                                <option value="service">Service</option>
                            </select>
                        </div>
                        <div className='input-container input-container-full'>
                            <label>Address</label>
                            <input 
                                type='text' 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "address")} 
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleEditUser()}>
                        Save Changes
                    </Button>
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


