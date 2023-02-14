import { SET_LIKE_LIST, PUSH_LIKE_LIST } from './Constants';

export const setLikeList = (data) => {
    return {
        type: SET_LIKE_LIST,
        likeData: data
    }
}

export const pushLikeList = (data) => {
    return {
        type: PUSH_LIKE_LIST,
        likeData: data
    }
}