import { SET_TRANSLATION, RESET_STORE } from '../actions/Constants';

const translations = {
    en: require('../../configs/locales/en.json'),
    he: require('../../configs/locales/he.json'),
}

const INITIAL_STATE = {
    translations,
    activeLanguage: 'he'
}
// const INITIAL_STATE = {
//     localeItems:{
//         translations,
//         activeLanguage: 'he'
//     }
   
// }

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_TRANSLATION:
            return { ...state, activeLanguage: action.language };
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state;
    }
}