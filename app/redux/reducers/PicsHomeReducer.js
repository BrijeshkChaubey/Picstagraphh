import { combineReducers } from 'redux';
import { SET_PICS_USER_DATA, PUSH_PICS_USER_DATA, SET_PICS_VALUE, SET_PICS_DATA, PUSH_PICS_DATA, RESET_STORE, ADD_STORY_DATA, CHANGE_STORY_INDEX, CHANGE_STORY_FLAG, SET_STORY_REFRESH_INDICATOR } from '../actions/Constants';
import { map, intersectionBy } from 'lodash'
import { storyManipulator } from '../../configs/libs/helpers';

const INITIAL_STATE = { subscribedData: null, exploreData: null, activeStory: null, refreshStatus: false, singleUser: null, callSubscribed: true, callExplore: true };

function users(state = INITIAL_STATE, action) {
    switch (action.type) {

        case SET_PICS_VALUE:
            return Object.assign({}, state, { [action.prop]: action.value })

        case SET_PICS_USER_DATA:

            const updatedData = storyManipulator(action.picsData, action.userId, action.prop, action.adId)
            let x = ''
            let newData = []

            if (action.prop.toLocaleLowerCase() == 'singleuser') {
                const z = intersectionBy(updatedData, state.subscribedData, 'userId')
                x = z.length > 0 ? 'subscribedData' : ''

                newData = z.length > 0 ? map(state.subscribedData, sub => {
                    if (sub.userId == z[0].userId) {
                        return z[0]
                    }
                    else {
                        return sub;
                    }
                })
                    : state.subscribedData
            }
            else if (action.prop.toLocaleLowerCase() == 'subscribeddata') {
                const z = intersectionBy(updatedData, state.singleUser, 'userId')

                x = z.length > 0 ? 'singleUser' : ''

                newData = z.length > 0 ? map(state.singleUser, sub => {
                    if (sub.userId == z[0].userId) {
                        return z[0]
                    }
                    else {
                        return sub;
                    }
                })
                    : state.singleUser
            }

            return Object.assign({}, state, x == '' ? { [action.prop]: updatedData } : { [action.prop]: updatedData, [x]: newData });

        case PUSH_PICS_USER_DATA:
            return Object.assign({}, state, { [action.prop]: storyManipulator(action.picsData.concat(state[action.prop]), action.userId, action.prop, action.adId) });

        case SET_STORY_REFRESH_INDICATOR:
            return Object.assign({}, state, { refreshStatus: action.status })

        case ADD_STORY_DATA:
            return Object.assign({}, state, { activeStory: action.storyData });

        case CHANGE_STORY_INDEX:
            return Object.assign({}, state, {
                [action.prop]: map(state[action.prop], dt => {
                    if (dt.userId == action.userId) {
                        return Object.assign({}, dt, { currentIndex: action.index })
                    }
                    else {
                        return dt
                    }
                })
            });

        case CHANGE_STORY_FLAG:
            return Object.assign({}, state, {
                [action.prop]: map(state[action.prop], dt => {
                    return Object.assign({}, dt, {
                        userPics: map(dt.userPics, pic => {
                            if (pic._id == action.id) {
                                return Object.assign({}, pic, { [action.flag]: action.value ? action.value : true })
                            }
                            else {
                                return pic
                            }
                        })
                    })
                })
            });

        case RESET_STORE:
            return INITIAL_STATE;

        default:
            return state || INITIAL_STATE
    }
}

const PICS_STATE = {}

function picsData(state = PICS_STATE, action) {
    switch (action.type) {
        case SET_PICS_DATA:
            state = { ...state, [action.picsData.id]: action.picsData.data }
            return state;

        case PUSH_PICS_DATA:
            let arr = action.picsData.id;
            arr.concat(action.picsData.data);
            state = { ...state, [action.picsData.id]: arr }
            return state.concat(action.picsData);

        case RESET_STORE:
            return PICS_STATE;

        default:
            return state || PICS_STATE
    }
}

export default combineReducers({
    users,
    picsData
})