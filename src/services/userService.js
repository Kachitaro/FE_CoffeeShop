import axios from '../axios';

const handleLogin = (userEmail, password) => {
    return axios.post('/api/login', {email: userEmail,password: password})
};

const handleGetAllUser = (UserId) => {
    return axios.get(`/api/get-all-user?UserId=${UserId}`)
};

export  {
    handleLogin,
    handleGetAllUser
}