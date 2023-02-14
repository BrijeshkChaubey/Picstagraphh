import { SET_PROFILE_PROP, PUSH_PROFILE_PROP, RESET_STORE, SET_PROFILE_REFRESH_INDICATOR, SET_PROFILE_LIST_PAGINATION } from '../actions/Constants';
import { concat } from 'lodash';

const INITIAL_STATE = {
    newsFeed: null,
    saved: null,
    refreshStatus: false,
    newsFeedList: null,
    contest: null,
    newsFeedListPagination:null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PROFILE_PROP:
            return { ...state, [action.profileData.prop]: action.profileData.arr };
        case SET_PROFILE_LIST_PAGINATION:
            return { ...state, newsFeedListPagination: action.pagination };
        case PUSH_PROFILE_PROP:
            let arr = action.unshift ? concat(action.profileData.arr, state[action.profileData.prop]) : state[action.profileData.prop].concat(action.profileData.arr)
            return { ...state, [action.profileData.prop]: arr };

        case SET_PROFILE_REFRESH_INDICATOR:
            return Object.assign({}, state, { refreshStatus: action.status })

        case RESET_STORE:
            return INITIAL_STATE;

        default:
            return state || INITIAL_STATE;
    }
}
