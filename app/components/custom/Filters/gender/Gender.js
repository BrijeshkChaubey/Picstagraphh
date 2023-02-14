import React, { Component, useState } from 'react';
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
import {  useDispatch, useSelector } from 'react-redux';

import { Input, Item, Icon } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _ListView, _B, _Header, _ListWrap } from '../../../custom';
import { mainLayoutHoc } from '../../../hoc';
import mainStyles from '../../../../assets/styles/MainStyles';
import { styles } from './styles';

import { setFilterPropArr, resetFilterArr } from '../../../../redux/actions/FilterWrapperAction';

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function Gender(props){
    const [activeGender,setActiveGender] = useState({index:null});
    const [genderArr,setGenderArr] = useState([
        { index: 0, gender: 'Male' },
        { index: 1, gender: 'Female' },
    ]);
    const [filterFor,setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT);

    const {filtersData} = useSelector(state=>state.filterWrapperReduce);
    const dispatch = useDispatch();

    const _keyExtractor = (item, index) => 'Gender_' + index.toString();

    const _selectGender = (item) => {
        const { singler, cb } = props;
        dispatch(resetFilterArr('gender', filterFor));

        dispatch(setFilterPropArr({ type: 'gender', data: item }, filterFor));

        if (cb) cb();
    }

    const _renderList = ({ item }) => {
        let isActive = helpers._isObjectInArr(item, filtersData[filterFor].gender) ? true : false;
        let activeStyle = isActive ? { ...sty.fW700 } : {};
        let activeIcon = isActive ? 'md-radio-button-on' : 'md-radio-button-off';
        return (
            <TouchableOpacity onPress={() => { _selectGender(item) }}>
                <_ListWrap style={styles.listItem}>
                    {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.gender}</Text> */}
                    <_Lang style={[styles.filterTabTxt, activeStyle]} text={`filters.${item.gender}`} />
                    <_Icon type={'Ionicons'} icon={activeIcon} size={22} color={colors.primaryColor} />
                </_ListWrap>
            </TouchableOpacity>
        )
    }

    return(
        <View style={mainStyles.rootView}>
        <FlatList
            data={genderArr}
            extraData={[activeGender,genderArr,filterFor]}
            renderItem={_renderList}
            keyExtractor={_keyExtractor}
        />
    </View>
    )


}
export default mainLayoutHoc({})(Gender);