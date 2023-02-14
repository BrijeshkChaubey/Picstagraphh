import { SET_FILTER_DATA_PROP, PUSH_FILTER_DATA_PROP, RESET_STORE } from '../actions/Constants';
import _ from 'lodash';

const INITIAL_STATE = {
  userGroups: null,
  relevance: null,
  contentFilter: null,
  targetGroup: null,
  location: null,
  locationcountry: null,
  radius: null,
  category: null,
  gender: null,
  age: null,
  hashtag: null,
  offerTag: null,
  inquiryTag: null,
  status: null,
  price: null,
  remote: null,
  job_category:null
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case SET_FILTER_DATA_PROP:
            return { ...state, [action.filterData.prop]: action.filterData.value  };
        
        case PUSH_FILTER_DATA_PROP:
            const { filterData } = action;
            let filterArr = state[filterData.prop];
            if(filterArr==null) filterArr = [filterData.value];
            else filterArr.push(filterData.value)

            return { ...state, [filterData.prop]: filterArr  };
            
        case RESET_STORE:
            return INITIAL_STATE;

        default:
            return state || INITIAL_STATE;
    }
}
