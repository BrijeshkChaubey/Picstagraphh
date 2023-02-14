import { SET_SUBSCRIBE_MESSAGE_DATA, PUSH_SUBSCRIBE_MESSAGE_DATA, SET_USER_MESSSAGES } from '../actions/Constants';
import { MESSAGE_TYPE } from '../../configs/libs/globals';

function getType(messageType, dataType) {
    let actionType = null;
    if(dataType === 'SET') {
        switch (messageType) {
            case MESSAGE_TYPE[0]:
                actionType = SET_SUBSCRIBE_MESSAGE_DATA;
                break;
            case MESSAGE_TYPE[4]:
                actionType = SET_USER_MESSSAGES;
                break;
            default:
                break;
        }
    }
    else {
        switch (messageType) {
            case MESSAGE_TYPE[0]:
                actionType = PUSH_SUBSCRIBE_MESSAGE_DATA;
                break;
            default:
                break;
        }
    }
    return actionType;
}

export const setMessageDataData = (data) => {
    return {
        type: getType(data.prop, 'SET'),
        messageData: data.arr
    }
}

export const pushMessageDataData = (data) => {
    return {
        type: getType(data.prop, 'PUSH'),
        messageData: data.obj
    }
}