import { SET_COMPANY_PARTICIPANT_TOP10_LIST, PUSH_COMPANY_PARTICIPANT_TOP10_LIST, SET_PARTICIPANT_TOP10_LIST_REFRESH_INDICATOR } from './Constants';

export const setParticipantTop10List = (participantObj) => {
    return {
        type: SET_COMPANY_PARTICIPANT_TOP10_LIST,
        participantObj
    }
}

export const pushParticipantTop10List = (participantObj, unshift = false) => {
    return {
        type: PUSH_COMPANY_PARTICIPANT_TOP10_LIST,
        participantObj,
        unshift
    }
}

export const setParticipantTop10ListRefreshIndicator = (data) => {
    return {
        type: SET_PARTICIPANT_TOP10_LIST_REFRESH_INDICATOR,
        status: data
    }
}