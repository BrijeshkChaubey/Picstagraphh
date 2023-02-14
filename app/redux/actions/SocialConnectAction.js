import { SOCIAL_CONNECT_SET } from './Constants';

export const setSocialConnect = (data) => {
    return {
        type: SOCIAL_CONNECT_SET,
        socialConnectArr: data
    }
}

export const resetSocialConnect = () => {
    return {
        type: SOCIAL_CONNECT_SET,
        socialConnectArr: []
    }
}