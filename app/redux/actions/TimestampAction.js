import { SET_TIMESTAMP_DATA } from './Constants';

export const setTimestampData = (flag, value) => {
    return {
        type: SET_TIMESTAMP_DATA,
        flag,
        value
    }
}