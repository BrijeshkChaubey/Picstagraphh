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
import { Input, Item, Icon } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize, API } from '../../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _ListView, _B, _Header, _ListWrap, _InlineLoader } from '../../../custom';
import { mainLayoutHoc } from '../../../hoc';
import mainStyles from '../../../../assets/styles/MainStyles';
import { styles } from './styles';

import { setFilterPropArr, resetFilterArr } from '../../../../redux/actions/FilterWrapperAction';
import { pushFilterDataProp } from '../../../../redux/actions/FiltersDataAction';
import { FilterHead } from '../common';
import {find, intersectionBy, uniqBy, concat} from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function InquiryTag(props){
    const {filtersData,
        filtersApiData,
        loginData,
        localize
    } = useSelector(state => state);

    const [searchTxt,setSearchTxt] = useState('');
    // const [filterArr,setFilterArr] = useState([]);
    const [filterFor,setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT);

    let scrollListRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.filterFor && props.filterFor !== state.filterFor){
               setFilterFor(nextProps.filterFor || FILTERS_FOR.DEFAULT)
        }
    },[props])

    const _keyExtractor = (item, index) => 'InquiryTag_'+index.toString();

    const _selectInquiryTag = (item) => {
        const { single, cb } = props;
       
        if(single) dispatch(resetFilterArr('inquiryTag', filterFor));

        dispatch(setFilterPropArr({ type: 'inquiryTag', data: item }, filterFor, false));
        
        if(cb) cb();
    }

    const _renderList = ({ item }) => {
       
        const itemx = find(filtersData[filterFor][FILTERS_TYPES.INQUIRYTAG], dt => dt._id == item._id)
        
        let isobjectInArray = itemx ? true : false;

        let activeStyle = isobjectInArray ? {color: '#fff'} : {};
        return (
            <TouchableOpacity onPress={()=>{
                scrollListRef && scrollListRef.scrollToOffset({ animated: true, offset: 0 })
                _selectInquiryTag(item)
                }}>
                {
                    isobjectInArray ?
                    <_GradiantView style={[styles.listItem, {...sty.padV10, ...sty.padH15}]}>
                        <Text style={[mainStyles.appTxt, activeStyle]}>{item.inquiryTagName}</Text>
                        <Text style={[mainStyles.appTxtBold, activeStyle]}>{item.posts}</Text>
                    </_GradiantView> :
                    <_ListWrap style={styles.listItem}>
                        <Text style={[mainStyles.appTxt, activeStyle]}>{item.inquiryTagName}</Text>
                        <Text style={[mainStyles.appTxtBold, activeStyle]}>{item.posts}</Text>
                    </_ListWrap>
                }
            </TouchableOpacity>
        )
    }

    const _saveFilter = () => {
        const {  loader } = props;

        let cb = Object.assign({}, helpers._standardCb(loader), {
            success: (res) => {
                dispatch(pushFilterDataProp({ prop: 'inquiryTag', value: res.data }))
                _selectInquiryTag(res.data)
            }
        })
        //loader.load();
        let header = helpers.buildHeader({ authorization: loginData.token })
        API.inquiryTagFilterSave({ inquiryTagName: searchTxt }, cb, header);
    }
    

    let filterArr = filtersApiData.inquiryTag;
    let matchCount = 0;
    if(filterArr!=null){
        filterArr = filterArr.filter((item, index)=>{
            if(item.inquiryTagName.toLocaleLowerCase()===searchTxt.toLocaleLowerCase()) ++matchCount;
            return searchTxt==''
                || item.inquiryTagName.toLocaleLowerCase().indexOf(searchTxt.toLocaleLowerCase())>-1
                ? true : false;
        });

    }

    const selectedTag = intersectionBy(filterArr,filtersData[filterFor][FILTERS_TYPES.INQUIRYTAG], '_id' )
    const addedData = concat(selectedTag, filterArr)
    const realData = uniqBy(addedData, '_id')

    return(
        <View style={mainStyles.rootView}>
                <View>
                    <Item style={{...sty.padH15, height: 40 , backgroundColor: '#fff', ...sty.mgB10, ...sty.appBorder, overflow: 'hidden'}}>
                        <Icon active name='search' style={{color: colors.lightDarker}} />
                        <Input placeholder={helpers.getLocale(localize, "filters","search")} 
                        onChangeText={(searchTxt)=> setSearchTxt(searchTxt) } style={{...sty.padV5}}/>
                        {
                            matchCount===0 && searchTxt!='' && saveFilter ?
                            <TouchableOpacity onPress={()=> _saveFilter()}>
                                <_Icon type={'Ionicons'} icon={'md-add-circle'} size={30} color={colors.green} />
                            </TouchableOpacity>    
                                : null
                         }
                    </Item>
                </View>
                {
                    filtersApiData.inquiryTag==null ? 
                        <_InlineLoader type={'list'} /> :
                            <FlatList
                            ref={(ref) =>{scrollListRef = ref}}
                                data={realData}
                                extraData={[searchTxt,filterFor,filterArr]}
                                renderItem={_renderList}
                                keyExtractor={_keyExtractor}
                            />
                }
            </View>
    )
}
export default mainLayoutHoc({})(InquiryTag);
