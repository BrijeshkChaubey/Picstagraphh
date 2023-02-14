import React, { Component, useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Input, Item, Icon, Box } from "native-base";
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
import { pushFilterDataProp } from "../../../../redux/actions/FiltersDataAction";
import { find, intersectionBy, uniqBy, concat, filter } from "lodash";
import { FilterHead } from "../common";

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function OfferTag(props){
   const [searchTxt,setSearchTxt] = useState('');
   const filterData = useSelector(state=> state.filterWrapperReducer);
  
   const {filtersApiData,loginData,localize} = useSelector(state => state)
// //    const [filterArr,setFilterArr] = useState([]);
   const [filterFor,setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT)

   const scrollListRef = useRef(null);

   const dispatch = useDispatch();

    const { saveFilter } = props;

    

   

   useEffect(()=>{
    if (props.filterFor && props.filterFor !== filterFor) {
        setFilterFor(props.filterFor || FILTERS_FOR.DEFAULT)
    }
   },[props]);

   const _keyExtractor = (item, index) => "OfferTag_" + index.toString();

   const _selectOfferTag = (item) => {
    const { single, cb } = props;
    if (single) dispatch(resetFilterArr("offerTag", filterFor));

    dispatch(setFilterPropArr({ type: "offerTag", data: item }, filterFor, false));

    if (cb) cb();
  };

 const _renderList = ({ item }) => {
  console.log('offerTag renderList==>',item);
    const itemx = find(
      filterData[filterFor][FILTERS_TYPES.OFFERTAG],
      (dt) => dt._id == item._id
    );

    let isobjectInArray = itemx ? true : false;
    let activeStyle = isobjectInArray ? { color: "#fff" } : {};
    return (
      <TouchableOpacity
        onPress={() => {
          _selectOfferTag(item);
          scrollListRef &&
          scrollListRef.scrollToOffset({ animated: true, offset: 0 });
        }}
      >
        {isobjectInArray ? (
          <_GradiantView
            style={[styles.listItem, { ...sty.padV10, ...sty.padH15 }]}
          >
            <Text style={[mainStyles.appTxtBold, activeStyle]}>
              {item.offerTagName}
            </Text>
            <Text style={[mainStyles.appTxtBold, activeStyle]}>
              {item.posts}
            </Text>
          </_GradiantView>
        ) : (
          <_ListWrap style={styles.listItem}>
            <Text style={[mainStyles.appTxt, activeStyle]}>
              {item.offerTagName}
            </Text>
            <Text style={[mainStyles.appTxtBold, activeStyle]}>
              {item.posts}
            </Text>
          </_ListWrap>
        )}
      </TouchableOpacity>
    );
  };

  const _saveFilter = () => {
    const {loader } = props;

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: (res) => {
        console.log('offerTAg response==>',res);
       dispatch(pushFilterDataProp({ prop: "offerTag", value: res.data }));
        _selectOfferTag(res.data);
      },
    });
   // loader.load();
    let header = helpers.buildHeader({ authorization: loginData.token });
    API.offerTagFilterSave({ offerTagName: searchTxt }, cb, header);
  };

  let filterArr = filtersApiData.offerTag;
   console.log('offerTag filterArr==>',filtersApiData);
  let matchCount = 0;
  if (filterArr != null) {
    filterArr = filterArr.filter((item, index) => {
      if (
        item.offerTagName.toLocaleLowerCase() ===
        searchTxt.toLocaleLowerCase()
      )
        ++matchCount;
      return searchTxt == "" ||
        item.offerTagName
          .toLocaleLowerCase()
          .indexOf(searchTxt.toLocaleLowerCase()) > -1
        ? true
        : false;
    });
  }

  const selectedTag = intersectionBy(
    filterArr,
    filterData[filterFor][FILTERS_TYPES.OFFERTAG],
    "_id"
  );
  const addedData = concat(selectedTag, filterArr);
  const realData = uniqBy(addedData, "_id");

  return(
<View style={[mainStyles.rootView, { backgroundColor: colors.white }]}>
        <View>
          <Box style={styles.searchBar}>
            <Icon active name="search" style={{ color: colors.lightDarker }} />
            <Input
              placeholder={helpers.getLocale(localize, "filters", "search")}
              onChangeText={(searchTxt) => setSearchTxt({ searchTxt })}
              style={{ ...sty.padV5 }}
            />
            {matchCount === 0 && searchTxt != "" && saveFilter ? (
              <TouchableOpacity onPress={() => _saveFilter()}>
                <_Icon
                  type={"Ionicons"}
                  icon={"md-add-circle"}
                  size={30}
                  color={colors.green}
                />
              </TouchableOpacity>
            ) : null}
          </Box>
        </View>
        {filtersApiData.offerTag == null ? (
          <_InlineLoader type={"list"} />
        ) : (
          <FlatList
            ref={scrollListRef}
              contentContainerStyle={{
                flexDirection: 'row', flexWrap: 'wrap', width: '100%'
              }}
            data={realData}
            extraData={[searchTxt,filterArr,filterFor]}
            renderItem={_renderList}
            keyExtractor={_keyExtractor}
          />
        )}
      </View>
  )
}
export default mainLayoutHoc({})(OfferTag);

