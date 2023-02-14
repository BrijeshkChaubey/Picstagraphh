import { combineReducers } from 'redux';
import * as constants from '../actions/Constants';
import { helpers, globals } from '../../configs';
import { find, reject, chain} from 'lodash'

const { FILTERS_FOR, FILTERS_TYPES } = globals;

function getUniqueObj(inputObj){
    let outputObj = {}
    for (var key in inputObj) {
        outputObj[key] = [];
    }
    return outputObj;
}

const DEFAULT_STATE = {
  [FILTERS_TYPES.USER_GROUPS]: [],
  [FILTERS_TYPES.RELEVANCE]: [],
  [FILTERS_TYPES.CONTENT_FILTER]: [],
  [FILTERS_TYPES.TARGET_GROUP]: [],
  [FILTERS_TYPES.LOCATION]: [],
  [FILTERS_TYPES.LOCATIONCOUNTRY]: [],
  [FILTERS_TYPES.RADIUS]: [],
  [FILTERS_TYPES.CATEGORY]: [],
  [FILTERS_TYPES.GENDER]: [],
  [FILTERS_TYPES.AGE]: [],
  [FILTERS_TYPES.HASHTAG]: [],
  [FILTERS_TYPES.OFFERTAG]: [],
  [FILTERS_TYPES.INQUIRYTAG]: [],
  [FILTERS_TYPES.STATUS]: [],
  [FILTERS_TYPES.PRICE]: [],
  [FILTERS_TYPES.JOBCATEGORY]: [],
  [FILTERS_TYPES.REMOTE_TRUE]: [],
};
const COMPANY_STATE = getUniqueObj(DEFAULT_STATE)
const HOME_EXPLORE_STATE = getUniqueObj(DEFAULT_STATE)
const PARTICIPANT_STATE = getUniqueObj(DEFAULT_STATE)
const HOME_USER_STATE = getUniqueObj(DEFAULT_STATE)
const SUBSCRIBED_STORY_STATE = getUniqueObj(DEFAULT_STATE)
const EXPLORE_STORY_STATE = getUniqueObj(DEFAULT_STATE)
const JOBS_STATE = getUniqueObj(DEFAULT_STATE);

function setFilterPropArr(state, action){

    let arr = state[action.filterData.type]
    
    if(action.single){
        arr = [action.filterData.data]
    }

    else{
        const item = find(arr, dt => dt.key ? dt.key == action.filterData.data.key : dt._id == action.filterData.data._id)
        if(item){
            arr = reject(arr, dt => dt.key ? dt.key == action.filterData.data.key : dt._id == action.filterData.data._id)
        }
        else{
            arr.push(action.filterData.data);
        }
    }
    // let arr = chain(state[action.filterData.type])
    //           .reject(dt => dt.key || dt._id ? false : true)
    //           .value()
    
    return arr;
}

function defaultFilter (state=getUniqueObj(DEFAULT_STATE), action) {
    switch(action.type){
        case constants.SET_FILTER_PROP:
            return { ...state, [action.filterData.type]: action.filterData.data  };
        case constants.SET_FILTER_PROP_ARR:
            let arr = setFilterPropArr(state, action);
            return { ...state, [action.filterData.type]: arr  };
        case constants.RESET_FILTER_ARR:
            return { ...state, [action.propName]: []  };
            break;
        case constants.RESET_FILTER:
            return getUniqueObj(DEFAULT_STATE);
        case constants.RESET_STORE:
            return getUniqueObj(DEFAULT_STATE);
        default:
            return state || getUniqueObj(DEFAULT_STATE);
    }
}

function companyFilter (state=getUniqueObj(COMPANY_STATE), action) {
    switch(action.type){
        case constants.COMPANY_SET_FILTER_PROP:
            return { ...state, [action.filterData.type]: action.filterData.data  };
        case constants.COMPANY_SET_FILTER_PROP_ARR:
            let arr = setFilterPropArr(state, action);
            return { ...state, [action.filterData.type]: arr  };
        case constants.COMPANY_RESET_FILTER_ARR:
            return { ...state, [action.propName]: []  };
            break;
        case constants.COMPANY_RESET_FILTER:
            return getUniqueObj(COMPANY_STATE);
        case constants.RESET_STORE:
            return getUniqueObj(COMPANY_STATE);
        default:
            return state || getUniqueObj(COMPANY_STATE);
    }
}
function homeExploreFilter (state=getUniqueObj(HOME_EXPLORE_STATE), action) {
    switch(action.type){
        case constants.HOME_EXPLORE_SET_FILTER_PROP:
            return { ...state, [action.filterData.type]: action.filterData.data  };
        case constants.HOME_EXPLORE_SET_FILTER_PROP_ARR:
            let arr = setFilterPropArr(state, action);
            return { ...state, [action.filterData.type]: arr  };
        case constants.HOME_EXPLORE_RESET_FILTER_ARR:
            return { ...state, [action.propName]: []  };
        case constants.HOME_EXPLORE_RESET_FILTER:
            return getUniqueObj(HOME_EXPLORE_STATE);
        case constants.RESET_STORE:
            return getUniqueObj(HOME_EXPLORE_STATE);
        default:
            return state || getUniqueObj(HOME_EXPLORE_STATE);
    }
}

function participantFilter (state=getUniqueObj(PARTICIPANT_STATE), action) {
    switch(action.type){
        case constants.HOME_PARTICIPANT_SET_FILTER_PROP:
            return { ...state, [action.filterData.type]: action.filterData.data  };
        case constants.HOME_PARTICIPANT_SET_FILTER_PROP_ARR:
            let arr = setFilterPropArr(state, action);
            return { ...state, [action.filterData.type]: arr  };
        case constants.HOME_PARTICIPANT_RESET_FILTER_ARR:
            return { ...state, [action.propName]: []  };
        case constants.HOME_PARTICIPANT_RESET_FILTER:
            return getUniqueObj(PARTICIPANT_STATE);
        case constants.RESET_STORE:
            return getUniqueObj(PARTICIPANT_STATE);
        default:
            return state || getUniqueObj(PARTICIPANT_STATE);
    }
}

function homeUserFilter (state=getUniqueObj(HOME_USER_STATE), action) {
    switch(action.type){
        case constants.HOME_USER_SET_FILTER_PROP:
            return { ...state, [action.filterData.type]: action.filterData.data  };
        case constants.HOME_USER_SET_FILTER_PROP_ARR:
            let arr = setFilterPropArr(state, action);
            return { ...state, [action.filterData.type]: arr  };
        case constants.HOME_USER_RESET_FILTER_ARR:
            return { ...state, [action.propName]: []  };
        case constants.HOME_USER_RESET_FILTER:
            return getUniqueObj(HOME_USER_STATE);
        case constants.RESET_STORE:
            return getUniqueObj(HOME_USER_STATE);
        default:
            return state || getUniqueObj(HOME_USER_STATE);
    }
}
function jobUserFilter(state = getUniqueObj(JOBS_STATE), action) {
  switch (action.type) {
    case constants.JOBS_SET_FILTER_PROP:
      return { ...state, [action.filterData.type]: action.filterData.data };
    case constants.JOBS_SET_FILTER_PROP_ARR:
      let arr = setFilterPropArr(state, action);
      return { ...state, [action.filterData.type]: arr };
    case constants.JOBS_RESET_FILTER_ARR:
      return { ...state, [action.propName]: [] };
    case constants.JOBS_RESET_FILTER:
      return getUniqueObj(JOBS_STATE);
    case constants.RESET_STORE:
      return getUniqueObj(JOBS_STATE);
    default:
      return state || getUniqueObj(JOBS_STATE);
  }
}
function subscribedStoryFilter (state=getUniqueObj(SUBSCRIBED_STORY_STATE), action) {
    switch(action.type){
        case constants.SUBSCRIBED_STORY_SET_FILTER_PROP:
            return { ...state, [action.filterData.type]: action.filterData.data  };
        case constants.SUBSCRIBED_STORY_SET_FILTER_PROP_ARR:
            let arr = setFilterPropArr(state, action);
            return { ...state, [action.filterData.type]: arr  };
        case constants.SUBSCRIBED_STORY_RESET_FILTER_ARR:
            return { ...state, [action.propName]: []  };
        case constants.SUBSCRIBED_STORY_RESET_FILTER:
            return getUniqueObj(SUBSCRIBED_STORY_STATE);
        case constants.RESET_STORE:
            return getUniqueObj(SUBSCRIBED_STORY_STATE);
        default:
            return state || getUniqueObj(SUBSCRIBED_STORY_STATE);
    }
}

function exploreStoryFilter (state=getUniqueObj(EXPLORE_STORY_STATE), action) {
    switch(action.type){
        case constants.EXPLORE_STORY_SET_FILTER_PROP:
            return { ...state, [action.filterData.type]: action.filterData.data  };
        case constants.EXPLORE_STORY_SET_FILTER_PROP_ARR:
            let arr = setFilterPropArr(state, action);
            return { ...state, [action.filterData.type]: arr  };
        case constants.EXPLORE_STORY_RESET_FILTER_ARR:
            return { ...state, [action.propName]: []  };
        case constants.EXPLORE_STORY_RESET_FILTER:
            return getUniqueObj(EXPLORE_STORY_STATE);
        case constants.RESET_STORE:
            return getUniqueObj(EXPLORE_STORY_STATE);
        default:
            return state || getUniqueObj(EXPLORE_STORY_STATE);
    }
}

export default combineReducers({
    [FILTERS_FOR.DEFAULT]: defaultFilter,
    [FILTERS_FOR.COMPANY]: companyFilter,
    [FILTERS_FOR.HOME_EXPLORE]: homeExploreFilter,
    [FILTERS_FOR.HOME_PARTICIPANT]: participantFilter,
    [FILTERS_FOR.HOME_USER]: homeUserFilter,
    [FILTERS_FOR.SUBSCRIBED_STORY] : subscribedStoryFilter,
    [FILTERS_FOR.EXPLORE_STORY]: exploreStoryFilter,
    [FILTERS_FOR.JOBS]:jobUserFilter
})