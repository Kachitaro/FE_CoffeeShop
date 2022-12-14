import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        }
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA',() => {
            this.setState({
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
            })
        })
    }

    componentDidMount() {
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
        let arrInput = ['name', 'email', 'address', 'phoneNumber', 'gender', 'birthDate', 'position'];
        for (let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]) {
                isValidate = false;
                break;
            }  
        }
        return isValidate;
    }

    handleAddNewUser = () => {
        if(this.checkValidate()) {
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => this.toggle()}>Add New Staff</ModalHeader>
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
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                className='input'
                                onChange={(e) => this.handleOnchangeInput(e, "email")}
                                value={this.state.email}/>
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
                        <div className='input-container'>
                            <label>Birth Date</label>
                            <input 
                                type="date" 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "birthDate")} 
                                value={this.state.birthDate}
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
                    <Button color="primary" className='px-3' onClick={() => this.handleAddNewUser()}>
                        Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


