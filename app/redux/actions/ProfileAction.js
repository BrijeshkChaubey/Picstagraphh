import { SET_PROFILE_PROP, PUSH_PROFILE_PROP, SET_PROFILE_REFRESH_INDICATOR, SET_PROFILE_LIST_PAGINATION } from './Constants';

export const setProfileDataProp = (data) => {
    return {
        type: SET_PROFILE_PROP,
        profileData: data
    }
}
export const setProfileListPagination = (data) => {
    return {
        type: SET_PROFILE_LIST_PAGINATION,
        pagination: data
    }
}

export const pushProfileDataProp = (data, unshift = false) => {
    return {
        type: PUSH_PROFILE_PROP,
        profileData: data,
        unshift
    }
}

export const setProfileRefreshIndicator = (data) => {
    return {
        type: SET_PROFILE_REFRESH_INDICATOR,
        status: data
    }
}
