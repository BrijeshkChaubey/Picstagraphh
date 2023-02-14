import { SET_HOME_PROP, PUSH_HOME_PROP, SET_REFRESH_INDICATOR } from './Constants';

export const setHomeDataProp = (data) => {
    return {
        type: SET_HOME_PROP,
        homeData: data
    }
}

export const pushHomeDataProp = (data, unshift = false) => {
    return {
        type: PUSH_HOME_PROP,
        homeData: data,
        unshift
    }
}

export const setRefreshIndicator = (data) => {
    return {
        type: SET_REFRESH_INDICATOR,
        status: data
    }
}
