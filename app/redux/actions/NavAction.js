import { SET_NAVIGATION } from './Constants';

export const setNavigation = (data) => {
    return {
        type: SET_NAVIGATION,
        data: data
    }
}