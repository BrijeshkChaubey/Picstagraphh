import React, { Component, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, Animated } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  globals,
  helpers,
  colors,
  fonts,
  images,
  sty,
  API,
} from '../../../../configs';
import { _ListWrap, _InlineLoader } from '../../../custom';
import mainStyles from '../../../../assets/styles/MainStyles';
import { styles } from './styles';
import { setFilterProp } from '../../../../redux/actions/FilterWrapperAction';
import FastImage from 'react-native-fast-image';
import { propsFlattener } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';


function _UsersList({cb},ref) {
  console.log('userList ref and props ==>',ref,cb);
  const [searchTxt, setSearchTxt] = useState('');
  const [usersArr, setUsersArr] = useState([]);
  const [showList, setShowList] = useState(false);
  const [listloading, setListloading] = useState(false);
  const [listPosition, setListPosition] = useState(new Animated.Value(300));

  let onEndReachedCalledDuringMomentum = true;
  let strToUpdate = "";
  let listEnded = false;
  let usersRef = useRef({});
  // let listLoading = false;

  const { localize, loginData } = useSelector(state => state);


  // useEffect(() => {
  //   // props.setUserList(this);
  //   searchUser();
  // }, []);

  // const searchUser = (t) => {
  //   setSearchTxt(t);
  //   setListloading(true)
  // };


  useImperativeHandle(ref, () => ({
    show(stToUpdate) {
      console.log('userList show is called');
      usersRef = {};
      strToUpdate = stToUpdate;
      setSearchTxt("");
      setShowList(true);
      Animated.timing(listPosition, {
        toValue: 0,
        duration: 300,
      }).start();
    },
    hide() {
      console.log('userList hide is called');
      setSearchTxt("");
      setShowList(false);
    },
    searchUser(t){
      setSearchTxt(t);
      setListloading(true)
    }
  }))



  // const show = (stToUpdate) => {
  //   usersRef = {};
  //   strToUpdate = stToUpdate;
  //   setSearchTxt("");
  //   setShowList(true);
  //       Animated.timing(this.state.listPosition, {
  //         toValue: 0,
  //         duration: 300,
  //       }).start();
  //       // this.searchInput._root.focus();

  // };

  // const hide = () => {
  //   setSearchTxt("");
  //   setShowList(false);
  // };

  const selectUser = (item) => {
    setSearchTxt('');
    setShowList(false);
    props.cb(item, strToUpdate);
  };

  const _keyExtractor = (item, index) => 'Users_' + index.toString();

  useEffect(() => {
    if (listloading) {
      let activePage = Math.ceil(
        usersArr.length / globals.PAGINATION.mentionedUsers,
      );
      let cb = {
        success: (res) => {
          console.log('usersListSearch success response ==>', res);
          setUsersArr(usersArr.concat(res.data));
          setListloading(false);
          if (
            usersArr.length +
            globals.PAGINATION.mentionedUsers >=
            res.data.total
          ) {
            listEnded = true;
          }
        },
        error: (err) => {
          console.log('usersListSearch error response ==>', err);
          setListloading(false);
        },
        complete: () => {
          console.log('usersListSearch complete response ==>');
          setListloading(false);

        },
      };
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.usersListSearch({}, cb, header, {
        page: activePage,
        limit: globals.PAGINATION.mentionedUsers,
        keyword: searchTxt,
      });
    }
  }, [listloading]);


  const _renderMoreUser = () => {
    if (listloading === false) {
      setListloading(true);
    }
  };

  const _renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectUser(item);
        }}
        ref={(ref) => (usersRef[item._id] = ref)}
        renderToHardwareTextureAndroid={true}>
        <_ListWrap style={styles.listItem}>
          <View
            style={{
              height: 40,
              width: 40,
              // ...sty.appBorder,

              marginRight: 10,

            }}>
            <FastImage
              source={
                item.miniProfileUrl ? { uri: item.miniProfileUrl } : images.user
              }
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
          </View>
          <View style={{ ...sty.jCenter }}>
            <Text style={[{ fontSize: fonts.xSmall, color: colors.gray }]}>
              {item.username}
            </Text>
            {/* <Text style={[{fontSize: fonts.small, color: colors.lightDarker}]}>{item.name}</Text> */}
          </View>
        </_ListWrap>
      </TouchableOpacity>
    );
  };

  return (
    <View style={mainStyles.rootView}>
      <Animated.View style={{ marginTop: listPosition, ...sty.flex1 }}>
        {listloading ? (
          <View style={{ ...sty.jCenter, ...sty.aCenter, ...sty.flex1 }}>
            <_InlineLoader />
          </View>
        ) : (
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={usersArr}
            extraData={[listloading, searchTxt, usersArr, showList]}
            renderItem={_renderList}
            keyExtractor={_keyExtractor}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
            onEndReached={({ distanceFromEnd }) => {
              if (
                !onEndReachedCalledDuringMomentum ||
                distanceFromEnd > 0
              ) {
                _renderMoreUser();
                onEndReachedCalledDuringMomentum = true;
              }
            }}
            // onEndReached={() => this._renderMoreUser()}
            // onScroll={(e) => {
            //     if (!this.listLoading && !this.listEnded) this._renderMoreUser();
            // }}
            ListFooterComponent={() => {
              return <View>{listloading ? <_InlineLoader /> : null}</View>;
            }}
            ListEmptyComponent={
              <View>
                <Text style={{ margin: 20 }}>No user available</Text>
              </View>
            }
          />
        )}
      </Animated.View>
      {/* </ScrollView> */}
    </View>
  )
}

export default forwardRef(_UsersList);