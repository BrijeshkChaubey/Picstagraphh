import { SET_COMMENTS, PUSH_COMMENT } from './Constants';

export const setComments = (data) => {
    return {
        type: SET_COMMENTS,
        commentsData: data
    }
}

export const pushComment = (data) => {
    return {
        type: PUSH_COMMENT,
        commentData: data
    }
}