import React, { Component, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input, Item, Icon, useStyledSystemPropsResolver } from "native-base";
import { globals, helpers, colors, fonts, sty, API } from "../../../../configs";
import {
  _GradiantView,
  _Icon,
  _ListWrap,
  _InlineLoader,
} from "../../../custom";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import {
  setFilterPropArr,
  resetFilterArr,
  setFilterProp,
} from "../../../../redux/actions/FilterWrapperAction";
import { pushFilterDataProp } from "../../../../redux/actions/FiltersDataAction";
import { intersectionBy, concat, uniqBy } from "lodash";

const { FILTERS_TYPES, FILTERS_FOR } = globals;

function Hashtag(props){
    const [searchTxt,setSearchTxt] = useState('');
    const [filterFor,setFilterFor] = useState(props.filterFor || FILTERS_FOR.DEFAULT);
    const [isHasTagItemSelected,setIsHasTagItemSelected] = useState(false);

    let scrollListRef = useRef(null);

    const {
        filtersData,
        filtersApiData,
        loginData,
        localize
    } = useSelector(state => state);

    const dispatch = useDispatch();

    let filterArr = filtersApiData.hashtag;
    let matchCount = 0;
    if (filterArr != null) {
      filterArr = filterArr.filter((item, index) => {
        if (
          item.hashTagName.toLocaleLowerCase() === searchTxt.toLocaleLowerCase()
        )
          ++matchCount;
        return searchTxt === "" ||
          item.hashTagName
            .toLocaleLowerCase()
            .indexOf(searchTxt.toLocaleLowerCase()) > -1
          ? true
          : false;
      });
    }

    const selectedTag = intersectionBy(
      filterArr,
      filtersData[filterFor][FILTERS_TYPES.HASHTAG],
      "_id",
    );
    const addedData = concat(selectedTag, filterArr);
    const realData = uniqBy(addedData, "_id");

    useEffect(()=>{
        if (props.filterFor && props.filterFor !== state.filterFor) 
              setFilterFor(props.filterFor || FILTERS_FOR.DEFAULT)
    },[props])

     const _keyExtractor = (item, index) => "Hashtag_" + index.toString();

     const  _selectHashtag = (item) => {
      const {  onResetPress, cb, single } = props;
      const { filterFor } = this.state;
      if (single) resetFilterArr("hashtag", filterFor);
  
      setFilterPropArr({ type: "hashtag", data: item }, filterFor);
  
      if (cb) cb();
    };
  
    const _renderList = ({ item }) => {
      const { onResetPress } = props;
  
      let isobjectInArray = helpers._isObjectInArr(
        item,
        filtersData[filterFor][FILTERS_TYPES.HASHTAG],
      )
        ? true
        : false;
      let activeStyle = isobjectInArray ? { color: "#fff" } : {};
      return (
        <TouchableOpacity
          onPress={() => {
            
            if (isobjectInArray) {
              
              // let arr =helpers._removeObjectInArr(
              //   item,
              //   filtersData[filterFor][FILTERS_TYPES.HASHTAG],
              // )
              // setFilterProp({ type: "hashtag", data: arr });
              //resetFilterArr("hashtag", filterFor);
              onResetPress();
              console.log(filtersData.hashtag)
              //alert("selected")
            }
            else {
              //alert("not selected")
              _selectHashtag(item);
              scrollListRef &&
              scrollListRef.scrollToOffset({ animated: true, offset: 0 });
              //isHasTagItemSelected="true"
              console.log("abcdef")
              console.log(filtersData.COMPANY.hashtag.includes(item))
            }
           
          }}>
          {isobjectInArray ? (
            <_GradiantView
              style={[styles.listItem, { ...sty.padV10, ...sty.padH15 }]}>
       
              <Text style={[mainStyles.appTxt, activeStyle]}>
                {item.hashTagName}
              </Text>
              <Text style={[mainStyles.appTxtBold, activeStyle]}>
                {item.posts}
              </Text>
            </_GradiantView>
          ) : (
            <_ListWrap style={styles.listItem}>
              <Text style={[mainStyles.appTxt, activeStyle]}>
                {item.hashTagName}
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
        const { loader} = props;
    
        let cb = Object.assign({}, helpers._standardCb(loader), {
          success: (res) => {
            dispatch(pushFilterDataProp({ prop: "hashtag", value: res.data }));
            _selectHashtag(res.data);
          },
        });
       // loader.load();
        let header = helpers.buildHeader({ authorization: loginData.token });
        API.hashtagFilterSave({ hashTagName: searchTxt }, cb, header);
      };
    

    return(
        <View style={[mainStyles.rootView, { backgroundColor: colors.white }]}>
        <View>
          <Item style={styles.searchBar}>
            <Icon active name="search" style={{ color: colors.lightDarker }} />
            <Input
              placeholder={helpers.getLocale(localize, "filters", "search")}
              onChangeText={(searchTxt) => setSearchTxt(searchTxt)}
              style={{ ...sty.padV5 }}
            />
          </Item>
        </View>
        {filtersApiData.hashtag == null ? (
          <_InlineLoader type={"list"} />
        ) : (
          <FlatList
            ref={(ref) => {
              scollListRef = ref;
            }}
            ListHeaderComponent={() => {
              return matchCount === 0 && searchTxt != "" && saveFilter ? (
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
              ) : null;
            }}
            data={realData}
            extraData={[searchTxt,filterFor,isHasTagItemSelected]}
              contentContainerStyle={{
                //...sty, backgroundColor:"pink"
                //backgroundColor: "pink",
                // ...sty.fRow,
                // ...sty.jSpace,
                // backgroundColor: colors.white,
                flexDirection:'row',flexWrap:'wrap',width:'100%'
              }}
            renderItem={_renderList}
            keyExtractor={_keyExtractor}
          />
        )}
      </View>
    )
}