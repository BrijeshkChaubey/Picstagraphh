import React,{ useState} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    FlatList,
    StyleSheet,
    Modal
} from 'react-native';

import { Input, Item, Icon } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _ListView, _B, _Header, _ListWrap } from '../../../custom';
import { mainLayoutHoc } from '../../../hoc';
import mainStyles from '../../../../assets/styles/MainStyles';
import { styles } from './styles';

import { setFilterPropArr, resetFilterArr } from '../../../../redux/actions/FilterWrapperAction';
import {useDispatch, useSelector} from 'react-redux'

const { FILTERS_TYPES, FILTERS_FOR } = globals;

const Age = (props) => {
    const dispatch= useDispatch();
    const filtersData= useSelector(state=>state.filterWrapperReducer)
    const { single,cb}=props;
    const [state, setstate]= useState({
        ageArr: [
            { index: 0, age: '5-10' },
            { index: 1, age: '10-15' },
            { index: 2, age: '15-20' },
            { index: 3, age: '20-25' },
            { index: 4, age: '25-30' },
            { index: 5, age: '30-35' },
            { index: 6, age: '35-45' },
            { index: 7, age: '45 and above' },
        ],
        filterFor: props.filterFor || FILTERS_FOR.DEFAULT
    })
    const { filterFor}= state

   const  _keyExtractor = (item, index) => 'Age_' + index.toString();

   const _selectAge = (item) => {
       

        if (single) dispatch(resetFilterArr('age', filterFor));

        dispatch(setFilterPropArr({ type: 'age', data: item }, filterFor));

        if (cb) cb();
        setstate({});
    }

   const  _renderList = ({ item }) => {
        let active = helpers._isObjectInArr(item, props.filtersData[state.filterFor].age) ? true : false;
        let activeStyle = active ? { ...sty.fW700 } : {};
        let activeIcon = active ? 'md-radio-button-on' : 'md-radio-button-off';
        return (
            <TouchableOpacity onPress={() => { _selectAge(item) }}>
                <_ListWrap style={styles.listItem}>
                    <_Lang style={[styles.filterTabTxt, activeStyle]} text={`filters.${item.value}`} />
                    {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.age}</Text> */}
                    <_Icon type={'Ionicons'} icon={activeIcon} size={22} color={colors.primaryColor} />
                </_ListWrap>
            </TouchableOpacity>
        )
    }
    let ageArr=state.ageArr;

  return (
    <View style={mainStyles.rootView}>
                <FlatList
                    data={ageArr}
                    extraData={state}
                    renderItem={_renderList}
                    keyExtractor={_keyExtractor}
                />
            </View>
  )
}


export default Age

Age.getDerivedStateFromProps=(nextProps, state)=> {
    if (nextProps.filterFor && nextProps.filterFor !== state.filterFor) {
        return {
            filterFor: nextProps.filterFor || FILTERS_FOR.DEFAULT,
        };
    }
    return null;
}

