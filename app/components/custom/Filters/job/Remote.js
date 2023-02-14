import React, { Component, useEffect, useState } from "react";
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
import {  useDispatch, useSelector } from "react-redux";
import { Input, Item, Icon } from "native-base";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
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
import { toLower, find, filter } from "lodash";

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function Remote(props){
    const [searchTxt,setSearchTxt] = useState('');
    const [activeRelevance,setActiveRelevance] = useState({index: null});
    const [filterFor,setFilterFor] = useState('REMOTE_TRUE' || FILTERS_FOR.DEFAULT);

    const {
        filtersData,
        localize,
        filtersApiData
    } = useSelector(state => state);

    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(setFilterDataProp({
            prop: FILTERS_TYPES.REMOTE_TRUE,
            value: data.remote,
          }));
    },[]);

    useEffect(()=>{
        if (props.filterFor && props.filterFor !== state.filterFor)
           setFilterFor(props.filterFor || FILTERS_FOR.DEFAULT)
    },[props]);

    const _keyExtractor = (item, index) => "Relevance_" + index.toString();

    const _selectRelevance = (item) => {
    const { single, cb } = props;
    console.log("item select", item);
    console.log("filterFor", filterFor);
	  try {
	   dispatch(resetFilterArr("remote", filterFor));

      dispatch(setFilterPropArr(
       {
         type: "remote",
         data: Object.assign({}, item, { value: toLower(item.value) }),
       },
       filterFor,
     ));
	}catch(e){console.log(e)}
    if (cb) cb();
  };


  _renderList = ({ item }) => {
    let isActive = find(
      filtersData[filterFor][FILTERS_TYPES.REMOTE_TRUE],
      (dt) => dt.key === item.key,
	);
	 console.log(filtersData[filterFor]);
    let activeStyle = isActive ? { ...sty.fW700 } : {};
    let activeIcon = isActive ? "md-radio-button-on" : "md-radio-button-off";

    return (
      <>
      {
        (filtersApiData[FILTERS_TYPES.REMOTE_TRUE] === null)
        ?
        <_InlineLoader type={"list"} />
        :
       <> <View style={{ width: 10 }} />
        <TouchableOpacity
          onPress={() => {
            _selectRelevance(item);
          }}>
          {isActive ? (
            <_GradiantView style={[styles.selectedList, { borderRadius: 5 }]}>
              <_Lang
                style={[
                  styles.filterTabTxt,
                  { ...sty.fW700, color: colors.white },
                  ,
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
        }
      </>
    );
  };

  let relevanceArr = [];
  relevanceArr = filtersApiData[FILTERS_TYPES.REMOTE_TRUE].filter(
    (item, index) => {
      return searchTxt == "" ||
        item.value
          .toLocaleLowerCase()
          .indexOf(searchTxt.toLocaleLowerCase()) > -1
        ? true
        : false;
    },
  );
  console.log("Fi", relevanceArr);

  const realData =
    filterFor === FILTERS_FOR.HOME_EXPLORE
      ? filter(relevanceArr, (dt) => dt.key != "verified")
          : relevanceArr;
   
          
 return (
      <View style={[mainStyles.rootView, { backgroundColor: colors.white }]}>
        <_Lang
          style={[mainStyles.textBold18, { margin: 10 }]}
          text={`filters.remote`}
        />
        <FlatList
          data={realData}
          numColumns={3}
          extraData={[searchTxt,activeRelevance,filterFor]}
          renderItem={_renderList}
          keyExtractor={_keyExtractor}
        />
      </View>
    );
}

export default mainLayoutHoc({})(Remote);