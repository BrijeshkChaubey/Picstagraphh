import React, { Component } from "react";
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
} from "react-native";
import { Input,  Icon } from "native-base";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
  API,
} from "../../../../configs";
import {
  _ErrorModal,
  _GradiantView,
  _Lang,
  _ListBox,
  _Loading,
  _Spacer,
  _Icon,
  _Button,
  _ListView,
  _B,
  _Header,
  _ListWrap,
  _InlineLoader,
} from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";

import {
  setFilterPropArr,
  resetFilterArr,
} from "../../../../redux/actions/FilterWrapperAction";
import {
  setFilterDataProp,
  pushFilterDataProp,
} from "../../../../redux/actions/FiltersDataAction";
import { FilterHead } from "../common";
import * as data from "../../../../assets/data";
const { FILTERS_TYPES, FILTERS_FOR } = globals;
import { reject } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function ContentType(props){

  const {cb } = props;

const [searchTxt,setSearchTxt] = useState('');
const [activeContentType,setActiveContentType] = useState({ index: null });
const [filterFor,setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT)

  const filtersApiData = useSelector(state => state.filtersApiData);
    const localize = useSelector(state => state.localize)
    const loginData = useSelector(state => state.loginData)
    const filtersData= useSelector(state=> state.filterWrapperReducer)


const dispatch = useDispatch();
let filterArr = filtersApiData[FILTERS_TYPES.CONTENT_FILTER];
if (filterArr != null) {
    filterArr = filterArr.filter((item, index) => {
      return searchTxt == "" ||
        item.value
          .toLocaleLowerCase()
          .indexOf(searchTxt.toLocaleLowerCase()) > -1
        ? true
        : false;
    });
  }

useEffect(()=>{
   dispatch(setFilterDataProp({
        prop: FILTERS_TYPES.CONTENT_FILTER,
        value: props.removeBlogFilter
          ? reject(data.contentType, (dt) => dt.key == "blog")
          : data.contentType,
      }));
},[]);

// useEffect(()=>{
// if(props.filterFor && props.filterFor != filterFor)
//    setFilterFor(props.filterFor);
// },[props]);


const _keyExtractor = (item, index) => "ContentType_" + index.toString();

 const _selectContentType = (item) => {
   
   dispatch(resetFilterArr(FILTERS_TYPES.CONTENT_FILTER, filterFor));

   dispatch(setFilterPropArr(
      { type: FILTERS_TYPES.CONTENT_FILTER, data: item },
      filterFor
    ));

    if (cb) cb();
  };

const _renderList = ({ item }) => {

    let isActive = helpers._isObjectInArr(
      item,
      filtersData[filterFor][FILTERS_TYPES.CONTENT_FILTER]
    )
      ? true
      : false;
    let activeStyle = isActive ? { ...sty.fW700 } : {};
    let activeIcon = isActive ? "md-radio-button-on" : "md-radio-button-off";
    return (
      <>
        <View style={{ width: 10 }} />
        <TouchableOpacity
          onPress={() => {
            _selectContentType(item);
          }}>
          {isActive ? (
            <_GradiantView style={[styles.selectedList, { borderRadius: 5 }]}>
              <_Lang
                style={[
                  styles.filterTabTxt,
                  { ...sty.fW700, color: colors.white },
                  { paddingHorizontal: 5 },
                ]}
                text={`filters.${item.key}`}
              />
            </_GradiantView>
          ) : (
            <_ListWrap style={[styles.listItem, { borderRadius: 5 }]}>
              <_Lang
                style={[styles.filterTabTxt, { paddingHorizontal: 5 }]}
                text={`filters.${item.key}`}
              />
            </_ListWrap>
          )}
        </TouchableOpacity>
      </>
    );
  };


return(
    <View style={[mainStyles.rootView, { backgroundColor: colors.white }]}>
    <_Lang
      style={[
        mainStyles.textBold18,
        { margin: 10 }
      ]}
      text={`filters.contentType`}
    />
    {filtersApiData[FILTERS_TYPES.CONTENT_FILTER] == null ? (
      <_InlineLoader type={"list"} />
    ) : (
      <FlatList
          data={filterArr}
          numColumns={4}
        extraData={[searchTxt,activeContentType,filterFor]}
        renderItem={_renderList}
        keyExtractor={_keyExtractor}
      />
    )}
  </View>
)
}
export default mainLayoutHoc({})(ContentType)