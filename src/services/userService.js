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

export  {
    handleLogin,
    handleGetAllUser,
    createNewUserService
}