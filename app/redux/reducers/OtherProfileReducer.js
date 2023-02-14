import { combineReducers } from 'redux';
import { SET_OTHER_PROFILE_NEWSFEED, PUSH_OTHER_PROFILE_NEWSFEED, SET_OTHER_PROFILE_USERINFO, OTHER_SOCIAL_CONNECT_SET, RESET_STORE, SET_OTHER_PROFILE_NEWSFEED_LIST, PUSH_OTHER_PROFILE_NEWSFEED_LIST, SET_OTHER_PROFILE_CONTEST, PUSH_OTHER_PROFILE_CONTEST, SET_OTHER_PROFILE_REFRESH_INDICATOR } from '../actions/Constants';
import { map } from 'lodash'

function OtherProfileNewsfeed(state = {}, action) {
    switch (action.type) {
        case SET_OTHER_PROFILE_NEWSFEED:

            return Object.assign({}, state, {
                [action.profileData.id]: {
                    arr: action.profileData.arr,
                    pagination: action.profileData.pagination
                }
            })


        case PUSH_OTHER_PROFILE_NEWSFEED:
            let arr = state[action.profileData.id].arr;
            arr = action.unshift ? concat(action.profileData.arr, arr) : arr.concat(action.profileData.arr)

            state[action.profileData.id] = {
                arr: arr,
                pagination: action.profileData.pagination || state[action.profileData.id].pagination
            };
            return state;

        case RESET_STORE:
            return {};

        default:
            return state || {};
    }
}

function OtherProfileRefreshIndicator(state = { refreshStatus: false, }, action) {
    switch (action.type) {
        case SET_OTHER_PROFILE_REFRESH_INDICATOR:
            return Object.assign({}, state, { refreshStatus: action.status })
        default:
            return state || {};
    }
}


function otherProfileContest(state = {}, action) {
    switch (action.type) {
        case SET_OTHER_PROFILE_CONTEST:

            return Object.assign({}, state, {
                [action.profileData.id]: {
                    arr: action.profileData.arr,
                    pagination: action.profileData.pagination
                }
            })


        case PUSH_OTHER_PROFILE_CONTEST:
            let arr = state[action.profileData.id].arr;
            arr = action.unshift ? concat(action.profileData.arr, arr) : arr.concat(action.profileData.arr)

            state[action.profileData.id] = {
                arr: arr,
                pagination: action.profileData.pagination || state[action.profileData.id].pagination
            };
            return state;

        case RESET_STORE:
            return {};

        default:
            return state || {};
    }
}


function OtherProfileNewsfeedList(state = {}, action) {
    switch (action.type) {
        case SET_OTHER_PROFILE_NEWSFEED_LIST:

            return Object.assign({}, state, {
                [action.profileData.id]: {
                    arr: action.profileData.arr,
                    pagination: action.profileData.pagination
                }
            })

        case PUSH_OTHER_PROFILE_NEWSFEED_LIST:
            let arr = state[action.profileData.id].arr;
            arr = action.unshift ? concat(action.profileData.arr, arr) : arr.concat(action.profileData.arr)

            state[action.profileData.id] = {
                arr: arr,
                pagination: action.profileData.pagination || state[action.profileData.id].pagination
            };
            return state;

        case RESET_STORE:
            return {};

        default:
            return state || {};
    }
}

function OtherProfileUserInfo(state = {}, action) {
    switch (action.type) {
        case SET_OTHER_PROFILE_USERINFO:
            state = { ...state, [action.userInfo.userId]: action.userInfo.data };
            return state;

        case RESET_STORE:
            return {};

        default:
            return state || {};
    }
}

function OtherSocialConnect(state = {}, action = {}) {
    switch (action.type) {
        case OTHER_SOCIAL_CONNECT_SET:
            state = { ...state, [action.socialConnectArr.prop]: action.socialConnectArr.data }
            return state;

        case RESET_STORE:
            return {};

        default:
            return state || {};
    }
}

export default combineReducers({
    otherProfileNewsfeed: OtherProfileNewsfeed,
    OtherProfileNewsfeedList: OtherProfileNewsfeedList,
    otherProfileUserInfo: OtherProfileUserInfo,
    otherSocialConnect: OtherSocialConnect,
    otherProfileContest: otherProfileContest,
    OtherProfileRefreshIndicator: OtherProfileRefreshIndicator
})