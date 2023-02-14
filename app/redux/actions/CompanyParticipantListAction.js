import { SET_COMPANY_PARTICIPANT_LIST_PROP, PUSH_COMPANY_PARTICIPANT_LIST_PROP, SET_COMPANY_LIST_REFRESH_INDICATOR } from './Constants';

export const setParticipantListProp = (participantObj) => {
    return {
        type: SET_COMPANY_PARTICIPANT_LIST_PROP,
        participantObj
    }
}

export const pushParticipantListProp = (participantObj, unshift = false) => {
    return {
        type: PUSH_COMPANY_PARTICIPANT_LIST_PROP,
        participantObj,
        unshift
    }
}

export const setCompanyListRefreshIndicator = (data) => {
    return {
        type: SET_COMPANY_LIST_REFRESH_INDICATOR,
        status: data
    }
}