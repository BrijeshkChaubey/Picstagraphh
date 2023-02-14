import { SET_OTHER_PROFILE_NEWSFEED, PUSH_OTHER_PROFILE_NEWSFEED, SET_OTHER_PROFILE_USERINFO, OTHER_SOCIAL_CONNECT_SET, SET_OTHER_PROFILE_NEWSFEED_LIST, PUSH_OTHER_PROFILE_NEWSFEED_LIST, SET_OTHER_PROFILE_CONTEST, PUSH_OTHER_PROFILE_CONTEST, SET_OTHER_PROFILE_REFRESH_INDICATOR } from './Constants';

export const setOtherProfileNewsfeed = (data) => {
    return {
        type: data.list ? SET_OTHER_PROFILE_NEWSFEED_LIST : SET_OTHER_PROFILE_NEWSFEED,
        profileData: data
    }
}

export const pushOtherProfileNewsfeed = (data, unshift = false) => {
    return {
        type: data.list ? PUSH_OTHER_PROFILE_NEWSFEED_LIST : PUSH_OTHER_PROFILE_NEWSFEED,
        profileData: data,
        unshift
    }
}
export const pushOtherProfileNewsfeedList = (data, unshift = false) => {
    return {
        type: PUSH_OTHER_PROFILE_NEWSFEED_LIST,
        profileData: data,
        unshift
    }
}

export const setOtherProfileContest = (data) => {
    return {
        type: SET_OTHER_PROFILE_CONTEST,
        profileData: data
    }
}

export const pushOtherProfileContest = (data, unshift = false) => {
    return {
        type: PUSH_OTHER_PROFILE_CONTEST,
        profileData: data,
        unshift
    }
}

export const setOtherProfileUserInfo = (data) => {
    return {
        type: SET_OTHER_PROFILE_USERINFO,
        userInfo: data
    }
}

export const setOtherSocialConnect = (data) => {
    return {
        type: OTHER_SOCIAL_CONNECT_SET,
        socialConnectArr: data
    }
}

export const resetOtherSocialConnect = () => {
    return {
        type: OTHER_SOCIAL_CONNECT_SET,
        socialConnectArr: []
    }
}

export const setOtherProfileRefreshIndicator = (data) => {
    return {
        type: SET_OTHER_PROFILE_REFRESH_INDICATOR,
        status: data
    }
}