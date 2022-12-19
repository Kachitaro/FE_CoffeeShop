import actionTypes from './actionTypes';
import { createNewUserService, getAllCodeService, handleGetAllUser, handleDeleteUserService, editUserService } from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService('GENDER');
            if(res && res.errCode ===0 ){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed());
            }      
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e);
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if(res && res.errCode ===0 ){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed());
            }   
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e);
        }
    }
}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if(res && res.errCode ===0 ){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed());
            } 
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed',e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new user success!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(e);
        }
    }
}

export const saveUserSuccess= () => ({
    type:actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed= () => ({
    type:actionTypes.CREATE_USER_FAILED
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllUser('All');
            if(res && res.errCode === 0 ){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                dispatch(fetchAllUsersFailed());
            }   
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log(e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUsers = (usersId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteUserService(usersId);
            if(res && res.errCode === 0){
                toast.success("Delete the user Success!");
                dispatch(deleteUsersSuccess())
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Delete the user error!");
                dispatch(deleteUsersFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUsersFailed());
            console.log(e);
        }
    }
}

export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USERS_SUCCESS
})

export const deleteUsersFailed = () => ({
    type: actionTypes.DELETE_USERS_FAILED
})

export const editUsersStart = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(data.name);
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("Update the user Success!");
                dispatch(editUsersSuccess())
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Update the user error!");
                dispatch(editUsersFailed());
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUsersFailed());
            console.log(e);
        }
    }
}

export const editUsersSuccess = () => ({
    type: actionTypes.EDIT_USERS_SUCCESS
})

export const editUsersFailed = () => ({
    type: actionTypes.EDIT_USERS_FAILED
})
