import React ,{useState,useEffect} from "react";
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
  SectionList,
} from "react-native";
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
import * as data from "../../../../assets/data";
import { FilterHead } from "../common";
import { sortBy } from "lodash";

import { useDispatch, useSelector} from "react-redux";
const { FILTERS_TYPES, FILTERS_FOR } = globals;



 const Categories=(props)=> {
   const dispatch = useDispatch();
   const filtersData= useSelector(state=>state.filterWrapperReducer)
   const filtersApiData = useSelector(state=>state.filtersApiData)
   const loginData = useSelector(state=>state.loginData)
   const localize = useSelector(state=>state.localize)

   const [state, setstate]= useState({
    searchTxt: "",
    filterArr: [],
    filterFor: props.filterFor || FILTERS_FOR.DEFAULT,
  })
  const {  cb, single,filterFor } = props;

console.log('categories ==>',filtersData, 'filterFor ==>',filterFor);
  useEffect(()=>{
    dispatch(setFilterDataProp({
      prop: FILTERS_TYPES.CATEGORY,
      value: data.categories,
    }))
  },[])

 const  _selectCategory = (item) => {
    

    if (single) dispatch(resetFilterArr(FILTERS_TYPES.CATEGORY, state.filterFor));

    dispatch(setFilterPropArr(
      {
        type: FILTERS_TYPES.CATEGORY,
        data: item,
        single: single ? single : false,
      },
      state.filterFor
    ));

    if (cb) cb();
  };

  const _keyExtractor = (item, index) => "Categories_" + index.toString();

 const  _renderList = ({ item }) => {
    // const {filterFor } = props;

    let isobjectInArray = helpers._isObjectInArr(
      item,
      filtersData[filterFor][FILTERS_TYPES.CATEGORY]
    )
      ? true
      : false;
    let activeStyle = isobjectInArray ? { color: "#fff" } : {};
    return (
      <>
        <TouchableOpacity
          style={{marginLeft:5,marginRight:5}}
        onPress={() => {
          _selectCategory(item);
        }}
      >
        {isobjectInArray ? (
          <_GradiantView
            style={[styles.selectedList,{borderRadius:5}]}
          >
            {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.value}</Text> */}
            <_Lang
              style={[styles.filterTabTxt, activeStyle]}
              text={`filters.${item.key}`}
            />
          </_GradiantView>
        ) : (
          <_ListWrap style={[styles.listItem,{borderRadius:5}]}>
            {/* <Text style={[mainStyles.appTxt, activeStyle]}>{item.value}</Text> */}
            <_Lang
              style={[styles.filterTabTxt, activeStyle,]}
              text={`filters.${item.key}`}
            />
          </_ListWrap>
        )}
        </TouchableOpacity>
        </>
    );
  };

  const _getListData = (data) => {

    let sections = [];

    //Selected data
    const selectedItems = filtersData[filterFor].category;
    sections.push({
      title: `${!selectedItems.length ? "No " : ""} Selected category`,
      type: "selected",
      data: selectedItems,
    });

    //Filters data
    const listItems = data.filter((item) => {
      return helpers._isObjectInArr(
        item,
        props.filtersData[filterFor].category
      )
        ? false
        : true;
    });
    sections.push({
      title: `${!listItems.length ? "No category in" : ""} Filter list`,
      type: "list",
      data: listItems,
    });

    return sections;
  };

  if (filtersApiData.category === null || state.forceLoad)
      return <_InlineLoader type={"list"} />;

    let filterArr = filtersApiData.category;
    let matchCount = 0;
    if (filterArr != null) {
      filterArr = filterArr.filter((item, index) => {
        if (item.value.toLocaleLowerCase() === state.searchTxt.toLocaleLowerCase())
          ++matchCount;
        return state.searchTxt == "" ||
          item.value
            .toLocaleLowerCase()
            .indexOf(state.searchTxt.toLocaleLowerCase()) > -1
          ? true
          : false;
      });

      filterArr = sortBy(filterArr, "value", "asc");
    }


  return (
    <View style={[mainStyles.rootView, { backgroundColor: colors.white}]}>
    <_Lang
      style={[
        mainStyles.textBold18,
        { margin: 10 }
      ]}
      text={`filters.category`}
    />
   
      <FlatList
        data={filterArr}
        extraData={state}
      renderItem={_renderList}
      keyExtractor={_keyExtractor}
      contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',width:'100%'}}
    
        
      />
  </View>
  )
}

// Categories.getDerivedStateFromProps=(nextProps, state)=> {
//   if (nextProps.filterFor && nextProps.filterFor !== state.filterFor) {
//     return {
//       filterFor: nextProps.filterFor || FILTERS_FOR.DEFAULT,
//     };
//   }
//   return null;
// }
export default mainLayoutHoc({})(Categories);
