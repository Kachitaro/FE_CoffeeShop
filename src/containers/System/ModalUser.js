import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            address: '',
            phone: '',
            gender: 0,
            birthDate: '',
            salary: '',
            position: '',
        }
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
        }, () => {
            console.log(this.state)
        })
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
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input 
                                type='text' 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "phone")} 
                                value={this.state.phone}
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
                            <label>Address</label>
                            <input 
                                type='text' 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "address")} 
                                value={this.state.address}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Position</label>
                            <select 
                                className='input' 
                                onChange={(e) => this.handleOnchangeInput(e, "position")}
                                value={this.state.position}
                                >
                                <option value="Shift leader">Shift Leader</option>
                                <option value="cashier">Cashier</option>
                                <option value="service">Service</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.toggle()}>
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


