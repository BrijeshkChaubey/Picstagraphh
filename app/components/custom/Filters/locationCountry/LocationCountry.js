import React, { Component, useEffect } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globals, helpers, colors, fonts, sty, API } from "../../../../configs";
import { _GradiantView, _Icon, _ListWrap, _InlineLoader } from "../..";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import {
  setFilterPropArr,
  resetFilterArr,
} from "../../../../redux/actions/FilterWrapperAction";
import { pushFilterDataProp } from "../../../../redux/actions/FiltersDataAction";
import { useState } from "react";

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function LocationCountry(props) {

  const [searchTxt, setSearchTxt] = useState('');
  const [filterFor, setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT);

  const { filtersData,
    filtersApiData,
    loginData,
    localize
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(()=>{
    if (props.filterFor && props.filterFor !== state.filterFor) 
        setFilterFor(nextProps.filterFor || FILTERS_FOR.DEFAULT)
    
  },[props]);

   const _keyExtractor = (item, index) => "LocationCountry_" + index.toString();

   const _selectLocationCountry = (item) => {
    const { cb, single } = this.props;
    const { filterFor } = this.state;

    if (single) {
     dispatch(resetFilterArr("locationCountry", filterFor));
    }
    dispatch(setFilterPropArr({ type: "locationCountry", data: item }, filterFor));

    if (cb) {
      cb();
    }
  };

  const _saveFilter = () => {
    const { loader} = this.props;

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: (res) => {
       dispatch(pushFilterDataProp({ prop: "locationcountry", value: res.data }));
       _selectLocationCountry(res.data);
      },
    });
   // loader.load();
    let header = helpers.buildHeader({ authorization: loginData.token });
    API.locationcountryFilterSave(
      { locationcountryName: searchTxt },
      cb,
      header,
    );
  };

  const _renderList = ({ item }) => {
    let isobjectInArray = helpers._isObjectInArr(
      item,
      filtersData[filterFor][FILTERS_TYPES.LOCATIONCOUNTRY],
    )
      ? true
      : false;
    let activeStyle = isobjectInArray ? { color: "#fff" } : {};

    return (
      <TouchableOpacity onPress={() => _selectLocationCountry(item)}>
        {isobjectInArray ? (
          <_GradiantView
            style={[styles.listItem, { ...sty.padV10, ...sty.padH15 }]}>
            <Text style={[mainStyles.appTxt, activeStyle]}>{item.name}</Text>
            {/* <Text style={[mainStyles.appTxtBold, activeStyle]}>{item.posts}</Text> */}
          </_GradiantView>
        ) : (
          <_ListWrap style={styles.listItem}>
            <Text style={[mainStyles.appTxt]}>{item.name}</Text>
            {/* <Text style={[mainStyles.appTxtBold, activeStyle]}>{item.posts}</Text> */}
          </_ListWrap>
        )}
      </TouchableOpacity>
    );
  };

  let filterArr = filtersApiData.locationCountry;
  let matchCount = 0;
  if (filterArr != null) {
    filterArr = filterArr.filter((item, index) => {
      if (item.name.toLocaleLowerCase() === searchTxt.toLocaleLowerCase()) {
        ++matchCount;
      }
      return searchTxt === "" ||
        item.name.toLocaleLowerCase().indexOf(searchTxt.toLocaleLowerCase()) >
          -1
        ? true
        : false;
    });
  }
  
  return(
<View style={mainStyles.rootView}>
        {filtersApiData.locationCountry == null ? (
          <_InlineLoader type={"list"} />
        ) : (
          <View>
            {matchCount === 0 && searchTxt !== "" && saveFilter ? (
              <TouchableOpacity onPress={() => _saveFilter()}>
                <_ListWrap
                  style={{
                    ...sty.fRow,
                    ...sty.jSpace,
                    ...sty.padH20,
                    ...sty.padV10,
                    backgroundColor: colors.light,
                  }}>
                  <Text
                    style={{
                      color: colors.grayDarker,
                      fontSize: fonts.medium,
                    }}>
                    {searchTxt}
                  </Text>
                  <_Icon
                    type={"Ionicons"}
                    icon={"md-add-circle"}
                    size={30}
                    color={colors.green}
                  />
                </_ListWrap>
              </TouchableOpacity>
            ) : null}
            <FlatList
              data={filterArr}
              extraData={[searchTxt,filterFor]}
              renderItem={_renderList}
              keyExtractor={_keyExtractor}
            />
          </View>
        )}
      </View>
  )


}
export default mainLayoutHoc({})(LocationCountry);

