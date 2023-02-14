import React, { Component, forwardRef, useEffect, useRef, useState,useImperativeHandle } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList,
  Animated,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { globals, helpers, fonts, sty, API } from "../../../../configs";
import { _ListWrap, _InlineLoader } from "../../../custom";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import { setFilterProp } from "../../../../redux/actions/FilterWrapperAction";
import { useDisclose } from "native-base";

function _HashtagList({cb},ref) {
  const [searchTxt,setSearchTxt] = useState("");
  const [hashTagsArr,setHashTagsArr] = useState([]);
  const [showList,setShowList] = useState(false);
  const [loading,setLoading]= useState(false);
  const [listPosition,setListPosition] = useState(new Animated.Value(300));

  let strToUpdate = "";
  let listLoading  = false;
  let listEnded = false;
  let hashTagsRef = useRef();

  

  
  const {localize,loginData} = useSelector(state => state);

  const dispatch = useDispatch();

  // useEffect(()=>{
  //     setSearchTxt(t);
  //   setLoading(true);
  // },[])

  // const searchHashTag = (t) => {
  //   setSearchTxt(t);
  //   setLoading(true);
  // };

  useEffect(()=>{
    if(loading){
      let cb = {
        success: (res) => {
          setHashTagsArr(res.data);
          
        },
        error: (e) => {},
        complete: () => setLoading(false),
      };
      let header = helpers.buildHeader({ authorization: loginData.token });
      // API.hashtagFilterSave({}, cb, header, { page: 1, limit: 5, keyword: t || 'a' })
      API.hashtagFilterGet({}, cb, header);
    }
  },[loading]);

  const _keyExtractor = (item, index) => "HashTags_" + index.toString();

  useImperativeHandle(ref, () => ({
    show(stToUpdate) {
      hashTagsRef = {};
      strToUpdate = stToUpdate;
      setSearchTxt("");
      setShowList(true);
          Animated.timing(listPosition, {
            toValue: 0,
            duration: 300,
          }).start();
          // this.searchInput._root.focus();  
    },
    hide() {
      setSearchTxt("");
      setShowList(false);
    },
    searchHashTag(t){
      setSearchTxt(t);
      setLoading(true);
    }
  }))


   //* Method to handle and show hashtag list */
  //  const show = (stToUpdate) => {
  //   hashTagsRef = {};
  //   strToUpdate = stToUpdate;
  //   setSearchTxt("");
  //   setShowList(true);
  //       Animated.timing(listPosition, {
  //         toValue: 0,
  //         duration: 300,
  //       }).start();
  //       // this.searchInput._root.focus();
     
  // };
  // //* Method to hide hashtag list */
  // const hide = () => {
  //   setSearchTxt("");
  //   setShowList(false);
  // };

  const selectHashTag = (item) => {
    setSearchTxt("");
    setShowList(false);
    props.cb(item, strToUpdate);
   
  };
  const _renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectHashTag(item);
        }}
        ref={(ref) => (hashTagsRef[item._id] = ref)}
        renderToHardwareTextureAndroid={true}>
        <_ListWrap style={[styles.listItem, { alignItems: "center" }]}>
          <View
            style={{
              borderRadius: 15,
              borderWidth: 1,
              height: 30,
              width: 30,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}>
            <Text style={{ fontSize: 20 }}>{"#"}</Text>
          </View>
          <Text style={[{ fontSize: fonts.xSmall }]}>{item.hashTagName}</Text>
        </_ListWrap>
      </TouchableOpacity>
    );
  };

  let arr = hashTagsArr;
  if (!loading && searchTxt !== "") {
    arr = hashTagsArr.filter((item, index) => {
      return item.value
        .toLocaleLowerCase()
        .indexOf(searchTxt?.toLocaleLowerCase()) > -1
        ? true
        : false;
    });
  }
  arr.sort(function (a, b) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });

    return (
      <View style={mainStyles.rootView}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{ ...sty.flex1 }}
        keyboardShouldPersistTaps={"handled"}>
        {/* <View style={[styles.listItem, { marginTop: 0 }]}>
                      <Item style={{ ...sty.padH15, height: 40, ...sty.flex1 }}>
                          <Icon active name='search' style={{ color: colors.lightDarker }} />
                          <Input
                              ref={ref => this.searchInput = ref}
                              placeholder={helpers.getLocale(localize, "comments", "searchHashTag")}
                              onChangeText={(t) => { this.searchHashTag(t) }}
                              style={{ ...sty.padV5 }}
                              value={searchTxt}
                              autoCapitalize={'none'}
                          />
                          {arr.length === 0 ?
                              <TouchableOpacity onPress={() => this._saveFilter()} style={[{ backgroundColor: '#fff' }, { borderRadius: 100, overflow: 'hidden', height: 30, width: 30, ...sty.aCenter, ...sty.jCenter }]}>
                                  <_Icon type={'Ionicons'} icon={'md-add-circle'} size={30} color={colors.primaryColor} />
                              </TouchableOpacity>
                              : null
                          }
                      </Item>
                  </View> */}
        <Animated.View style={{ marginTop: listPosition, ...sty.flex1 }}>
          {loading ? (
            <View style={{ ...sty.jCenter, ...sty.aCenter, ...sty.flex1 }}>
              <_InlineLoader />
            </View>
          ) : (
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={arr}
              extraData={[loading]}
              renderItem={_renderList}
              keyExtractor={_keyExtractor}
              onScroll={(e) => {
                //if(!this.listLoading && !this.listEnded) this._renderMoreHashTag();
              }}
              ListFooterComponent={() => {
                return <View>{listLoading ? <_InlineLoader /> : null}</View>;
              }}
              ListEmptyComponent={<View />}
            />
          )}
        </Animated.View>
      </ScrollView>
    </View>
  )
}
export default forwardRef(_HashtagList);