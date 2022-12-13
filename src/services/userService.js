import axios from '../axios';

const handleLogin = (userEmail, password) => {
    return axios.post('/api/login', {email: userEmail,password: password})
};

export  {
    handleLogin
}