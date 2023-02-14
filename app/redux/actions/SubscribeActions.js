import { SET_SUBSCRIBED_LIST, SET_SUBSCRIBERS_LIST, PUSH_SUBSCRIBED_LIST, PUSH_SUBSCRIBERS_LIST } from './Constants';

export const setSubscribedList = (data) => {
    return {
        type: SET_SUBSCRIBED_LIST,
        subscribedList: data
    }
}

export const pushSubscribedList = (data) => {
    return {
        type: PUSH_SUBSCRIBED_LIST,
        subscribedList: data
    }
}

export const setSubscribersList = (data) => {
    return {
        type: SET_SUBSCRIBERS_LIST,
        subscribersList: data
    }
}

export const pushSubscribersList = (data) => {
    return {
        type: PUSH_SUBSCRIBERS_LIST,
        subscribersList: data
    }
}