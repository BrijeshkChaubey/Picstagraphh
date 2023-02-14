import { SET_USER_INFO, SET_USER_INFO_PROP } from './Constants';

export const setUserInfo = (data) => {
    return {
        type: SET_USER_INFO,
        userInfo: data
    }
}

export const setUserInfoProp = (data) => {
    return {
        type: SET_USER_INFO_PROP,
        userInfo: data
    }
}