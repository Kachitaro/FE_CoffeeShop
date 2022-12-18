import axios from '../axios';

const handleLogin = (userEmail, password) => {
    return axios.post('/api/login', {email: userEmail,password: password})
};

const handleGetAllUser = (UserId) => {
    return axios.get(`/api/get-all-user?UserId=${UserId}`)
};

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
};

const handleDeleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
          id: userId
        }
      });
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
}

const getAllCodeService = (data) => {
    return axios.get(`/api/get-all-code?type=${data}`)
}

export  {
    handleLogin,
    handleGetAllUser,
    createNewUserService,
    handleDeleteUserService,
    editUserService,
    getAllCodeService,
}