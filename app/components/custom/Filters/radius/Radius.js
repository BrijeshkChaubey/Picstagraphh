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
    Modal
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
import { FilterHead } from '../common';
import * as data from '../../../../assets/data';
const { FILTERS_TYPES, FILTERS_FOR } = globals;

function Radius(props) {

    const [searchTxt, setSearchTxt] = useState('');
    const [activeRadius, setActiveRadius] = useState({ index: null });
    const [filterFor, setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT);
    let filterArr;
    const {
        filtersData,
        filtersApiData,
        loginData,
        localize
    } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFilterDataProp({ prop: FILTERS_TYPES.RADIUS, value: data.radius }));
    }, []);

    useEffect(() => {
        if (props.filterFor && props.filterFor !== filterFor)
            setFilterFor(props.filterFor || FILTERS_FOR.DEFAULT)
}, [props]);

  
useEffect(()=>{
    filterArr = filtersApiData.radius;
    if (filterArr != null) {
        filterArr = filterArr.filter((item, index) => {
            return searchTxt == ''
                || item.value.toLocaleLowerCase().indexOf(searchTxt.toLocaleLowerCase()) > -1
                ? true : false;
        });
    }
},[]);
   

    const _keyExtractor = (item, index) => 'Radius_' + index.toString();

    const _selectRadius = (item) => {
        const {  cb } = props;
        dispatch(resetFilterArr('radius', filterFor));
        // dispatch(setFilterPropArr({ type: 'radius', data: item }, filterFor);
        if (cb) cb();
    }

    const _renderList = ({ item }) => {
        let isActive = helpers._isObjectInArr(item, filtersData[filterFor][FILTERS_TYPES.RADIUS]) ? true : false;
        let activeStyle = isActive ? { ...sty.fW700 } : {};
        let activeIcon = isActive ? 'md-radio-button-on' : 'md-radio-button-off';
        return (
            <TouchableOpacity onPress={() => { _selectRadius(item) }}>
                <_ListWrap style={styles.listItem}>
                    {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.value}</Text> */}
                    <_Lang style={[styles.filterTabTxt, activeStyle]} text={`filters.${item.value}`} />
                    <_Icon type={'Ionicons'} icon={activeIcon} size={22} color={colors.primaryColor} />
                </_ListWrap>
            </TouchableOpacity>
        )
    }
    return (
        <View style={mainStyles.rootView}>
            <View>
                <Item style={{ ...sty.padH15, height: 40 }}>
                    <Icon active name='search' style={{ color: colors.lightDarker }} />
                    <Input placeholder={helpers.getLocale(localize, "filters", "search")} onChangeText={(searchTxt) => this.setState({ searchTxt })} style={{ ...sty.padV5 }} />
                </Item>
            </View>
            {
                filtersApiData.radius == null ?
                    <_InlineLoader type={'list'} /> :
                    <FlatList
                        data={filterArr}
                        extraData={[searchTxt, activeRadius, filterFor]}
                        renderItem={_renderList}
                        keyExtractor={_keyExtractor}
                    />
            }
        </View>

    )


}
export default mainLayoutHoc({})(Radius);
