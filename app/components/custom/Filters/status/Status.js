import React, { Component } from 'react';
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
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _ListView, _B, _Header, _ListWrap, _InlineLoader } from '../../../custom';
import { mainLayoutHoc } from '../../../hoc';
import mainStyles from '../../../../assets/styles/MainStyles';
import { styles } from './styles';

import { setFilterPropArr, resetFilterArr } from '../../../../redux/actions/FilterWrapperAction';
import { setFilterDataProp, pushFilterDataProp } from '../../../../redux/actions/FiltersDataAction';
import { FilterHead } from '../common';
import * as data from '../../../../assets/data';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function Status(prosp) {
    const [searchTxt, setSearchTxt] = useState('');
    const [activeStatus, setActiveStatu] = useState({ index: null });
    const [filterFor, setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT);

    const {
        filtersData,
        localize,
        filtersApiData
    } = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFilterDataProp({ prop: FILTERS_TYPES.STATUS, value: data.status }))
    }, [])

    useEffect(() => {
        if (props.filterFor && props.filterFor !== state.filterFor) {
            setFilterFor(props.filterFor || FILTERS_FOR.DEFAULT)
        }}, [props]);

    const _keyExtractor = (item, index) => 'Status_' + index.toString();

    const _selectStatus = (item) => {
        const { cb } = this.props;
        const { filterFor } = this.state;

        dispatch(resetFilterArr('status', filterFor));

        dispatch(setFilterPropArr({ type: 'status', data: item }, filterFor));

        if (cb) cb();
    }

    const _renderList = ({ item }) => {

        let isActive = helpers._isObjectInArr(item, filtersData[filterFor][FILTERS_TYPES.STATUS]) ? true : false;
        let activeStyle = isActive ? { ...sty.fW700 } : {};
        let activeIcon = isActive ? 'md-radio-button-on' : 'md-radio-button-off';
        return (
            <TouchableOpacity onPress={() => { _selectStatus(item) }}>
                <_ListWrap style={styles.listItem}>
                    <_Lang style={[styles.filterTabTxt, activeStyle]} text={`filters.${item.key}`} />
                    {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.value}</Text> */}
                    <_Icon type={'Ionicons'} icon={activeIcon} size={22} color={colors.primaryColor} />
                </_ListWrap>
            </TouchableOpacity>
        )
    }

    if (filtersApiData[FILTERS_TYPES.STATUS] != null) {
        let statusArr = [];
        statusArr = filtersApiData[FILTERS_TYPES.STATUS].filter((item, index) => {
            return searchTxt == ''
                || item.value.toLocaleLowerCase().indexOf(searchTxt.toLocaleLowerCase()) > -1
                ? true : false;
        });
    }
    return (
        <View style={mainStyles.rootView}>
            <FlatList
                data={statusArr}
                extraData={[searchTxt, activeStatus, filterFor]}
                renderItem={_renderList}
                keyExtractor={_keyExtractor}
            />
        </View>
    )
}
export default mainLayoutHoc({})(Status);
