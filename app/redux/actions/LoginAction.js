import { SET_LOGIN_DATA, SET_LOGIN_PROP, RESET_STORE } from './Constants';

export const setLoginData = (data) => {
    return {
        type: SET_LOGIN_DATA,
        loginData: data
    }
}

export const setLoginProp = (data) => {
    return {
        type: SET_LOGIN_PROP,
        loginProp: data
    }
}

export const resetStore = () => {
    return {
        type: RESET_STORE,
        resetData: {}
    }
}