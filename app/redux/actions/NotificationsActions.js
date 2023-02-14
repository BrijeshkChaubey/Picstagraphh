import { SET_NOTIFICATIONS_DATA, SET_NOTIFICATIONS_PENDING_REQUESTS, SET_NOTIFICATIONS_LIKE_YOU, PUSH_NOTIFICATIONS_DATA } from './Constants';

function getType(type) {
    let action = '';
    switch (type) {
        case 'notifications':
            action = SET_NOTIFICATIONS_DATA
            break;
        case 'requests':
            action = SET_NOTIFICATIONS_PENDING_REQUESTS
            break;
        case 'likeYou':
            action = SET_NOTIFICATIONS_LIKE_YOU
            break;
        default:
            break;
    }
    return action;
}

export const setNotificationsData = (data) => {
    return {
        type: getType(data.prop),
        data: data.arr
    }
}
export const pushNotificationsData = (data, unshift = false) => {
    return {
        type: PUSH_NOTIFICATIONS_DATA,
        data: data.arr,
        unshift
    }
}    
