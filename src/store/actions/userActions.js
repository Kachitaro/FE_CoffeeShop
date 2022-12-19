import actionTypes from './actionTypes';
import {handleLogin} from '../../services/userService';
import { toast } from 'react-toastify';
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLogin = (userInfo) => {
    return async (dispatch, getState) =>{
        try {
            let res = await handleLogin(userInfo);
            if(res && res.errCode === 0){
                toast.success("Login Success")
                dispatch(userLoginSuccess(res.user))
            }else{
                toast.error("Login Fail");
                dispatch(userLoginFail());
            }
            
        } catch (e) {
            dispatch(userLoginFail());
            console.log(e);
        }
    }
}

export const userLoginSuccess = (data) =>({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: data
})

export const userLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})