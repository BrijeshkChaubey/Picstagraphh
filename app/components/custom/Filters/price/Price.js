import React, { Component, useEffect, useState } from 'react';
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
    Modal,
    SectionList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Item, Icon } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize, API } from '../../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _ListView, _B, _Header, _ListWrap, _InlineLoader } from '../../../custom';
import { mainLayoutHoc } from '../../../hoc';
import mainStyles from '../../../../assets/styles/MainStyles';
import { styles } from './styles';

import { setFilterPropArr, resetFilterArr } from '../../../../redux/actions/FilterWrapperAction';
import { setFilterDataProp, pushFilterDataProp } from '../../../../redux/actions/FiltersDataAction';
import * as data from '../../../../assets/data';
import { FilterHead } from '../common';

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function Price(props){
   const [searchTxt,setSearchTxt] = useState('');
   const [filterArr,setFilterArr] = useState([]);
   const [filterFor,setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT)

   const {filtersData,
    filtersApiData,
    loginData,
    localize
} = useSelector(state => state);

const dispatch = useDispatch();


useEffect(()=>{
   dispatch(setFilterDataProp({ prop: FILTERS_TYPES.PRICE, value: data.prices }));
},[])
useEffect(()=>{
    if (props.filterFor && props.filterFor !== state.filterFor) 
            setFilterFor(props.filterFor || FILTERS_FOR.DEFAULT)
},[props])

const _selectPrice = (item) => {
    const { cb, single } = this.props;
    if (single) dispatch(resetFilterArr(FILTERS_TYPES.PRICE, filterFor));

   dispatch(setFilterPropArr({ type: FILTERS_TYPES.PRICE, data: item }, filterFor));

    if (cb) cb();
}

const _keyExtractor = (item, index) => 'Price_' + index.toString();

const _renderList = ({ item }) => {
    let isobjectInArray = helpers._isObjectInArr(item, filtersData[filterFor][FILTERS_TYPES.PRICE]) ? true : false;
    let activeStyle = isobjectInArray ? { color: '#fff' } : {};
    return (
        <TouchableOpacity onPress={() => {_selectPrice(item) }}>
            {
                isobjectInArray ?
                    <_GradiantView style={[styles.selectedList]}>
                        {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.value}</Text> */}
                        <_Lang style={[styles.filterTabTxt, activeStyle]} text={`filters.${item.key}`} />
                    </_GradiantView> :
                    <_ListWrap style={styles.listItem}>
                        {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.value}</Text> */}
                        <_Lang style={[styles.filterTabTxt, activeStyle]} text={`filters.${item.key}`} />
                    </_ListWrap>
            }
        </TouchableOpacity>
    )
}
return(
    <View style={mainStyles.rootView}>
    <_Lang
        style={[
            mainStyles.textBold18,
            { margin: 10 }
        ]}
        text={`filters.prize`}
    />
        <FlatList
        data={filterArr}
        numColumns={3}
            extraData={[searchTxt,filterArr,filterFor]}
            renderItem={_renderList}
            keyExtractor={_keyExtractor}
        />
</View>
)
}
export default mainLayoutHoc({})(Price);
