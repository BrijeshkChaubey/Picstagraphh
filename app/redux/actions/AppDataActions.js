import { SET_APP_DATA, PUSH_APP_DATA } from './Constants';

export const setAppData = (data) => {
    return {
        type: SET_APP_DATA,
        appData: data
    }
}

export const pushAppData = (data) => {
    return {
        type: PUSH_APP_DATA,
        appData: data
    }
}