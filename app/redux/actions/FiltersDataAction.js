import { SET_FILTER_DATA_PROP, PUSH_FILTER_DATA_PROP } from './Constants';

export const setFilterDataProp = (data) => {
    return {
        type: SET_FILTER_DATA_PROP,
        filterData: data
    }
}

export const pushFilterDataProp = (data) => {
    return {
        type: PUSH_FILTER_DATA_PROP,
        filterData: data
    }
}