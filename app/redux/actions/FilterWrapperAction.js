import * as constants from './Constants';
import { FILTERS_FOR } from '../../configs/libs/globals';

function getDispatchType(type, action){
    return type === FILTERS_FOR.DEFAULT ? constants[action] : constants[type+'_'+action];
}

export const setFilterProp = (data, type=FILTERS_FOR.DEFAULT) => {
    return {
        type: getDispatchType(type, 'SET_FILTER_PROP'),
        filterData: data
    }
}

export const setFilterPropArr = (data, type = FILTERS_FOR.DEFAULT, single = true) => {
   console.log(data)
    return {
        type: getDispatchType(type, 'SET_FILTER_PROP_ARR'),
        filterData: data,
        single : single
    }
}

export const resetFilterArr = (prop, type=FILTERS_FOR.DEFAULT) => {
    
  
    return {
        type: getDispatchType(type, 'RESET_FILTER_ARR'),
        propName: prop
    }
}

export const resetFilters = (type=FILTERS_FOR.DEFAULT) => {
    return {
        type: getDispatchType(type, 'RESET_FILTER'),
        filterData: {}
    }
}