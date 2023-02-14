import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Pressable,
  StyleSheet
} from "react-native";

import { Input, Item, Icon } from "native-base";
import {
  globals,
  helpers,
  colors,
  images,
  sty,
  API,
  ApiCall,
} from "../../../../../configs";
import {
  _GradiantView,
  _Lang,
  _Loading,
  _Button,
  _Layout,
  _B,
  _InlineLoader,
  _EmptyPostList,
  _Filter,
} from "../../../../custom";
import { mainLayoutHoc } from "../../../../hoc";
import Share from "react-native-share";
import { styles } from "./styles";
import {
  setFilterPropArr,
  resetFilterArr,
  resetFilters,
} from "../../../../../redux/actions/FilterWrapperAction";
import { setNavigation } from "../../../../../redux/actions/NavAction";
import {
  setAppData,
  pushAppData,
} from "../../../../../redux/actions/AppDataActions";
import {
  setSubscribedList,
  pushSubscribedList,
} from "../../../../../redux/actions/SubscribeActions";
import {
  setHomeDataProp,
  pushHomeDataProp,
  setRefreshIndicator,
} from "../../../../../redux/actions/HomeActions";
import { setUserInfoProp } from "../../../../../redux/actions/UserInfoAction";
import { setPagination } from "../../../../../redux/actions/PaginationActions";
import { SUBSCRIBE_TYPE, WEB_URL } from "../../../../../configs/libs/globals";
import { reject, uniqBy } from "lodash";
import FastImage from "react-native-fast-image";
import FilterModal from "../../../../custom/ContentTypes/common/FilterModal";
import mainStyles from "../../../../../assets/styles/MainStyles";

import { useDispatch, useSelector } from 'react-redux'


const FILTERS_FOR = globals.FILTERS_FOR;
const FILTERS_TYPES = globals.FILTERS_TYPES;


const User = (props) => {

  const { loader } = props;
  const { forceRedirect } = props.route.params;
  console.log('User props==>', props);
  const filterForArr = [FILTERS_FOR.HOME_USER];

  const dispatch = useDispatch();
  const subscribeList = useSelector(state => state.subscribeList)
  const home = useSelector(state => state.home);
  console.log('User home==>', home);
  const pagination = useSelector(
    state => state.pagination.homeUsers,
  );
  const filtersData = useSelector(
    state => state.filterWrapperReducer,
  );

  const navProps = useSelector(state => state.navProps);
  const appData = useSelector(state => state.appData);
  const loginData = useSelector(state => state.loginData);
  const localize = useSelector(state => state.localize);
  const userInfo = useSelector(state => state.userInfo);

  const [state, setstate] = useState({
    searchTxt: "",
    loading: false,
    listLoading: false,
    refreshing: false,
    activeTab: 0,
    loadMore: false,
    renderMore: false,
    filterKey: null,
    load: false,
  })

  let listLoading = false;
  let listEnded = false;
  const usersRef = useRef({});
  const filterRef = useRef("filter");

  useEffect(() => {
    globals.setUserData("videosRef", []);
    _setFilter();
  }, [])

  useEffect(() => {
    if (
      state.renderMore &&
      state.renderMore !== prevState.renderMore &&
      home.user &&
      home.user.length === 0
    ) {
      _renderMoreUser();
    }
  }, [state.renderMore, home.user])

  const _setFilter = () => {
    console.log('user setFilter is callled');
    !forceRedirect ? dispatch(resetFilters(globals.FILTERS_FOR.HOME_USER)) : null;
    !forceRedirect
      ? dispatch(setFilterPropArr(
        {
          type: "relevance",
          data: Object.assign(
            {},
            // { key: "favourites", value: "Favourites", api: "likePoints" },
            { key: "favourites", value: "Favourites", api: "verified" },
            { value: "verified" },
          ),
        },
        "HOME_USER",
      ))
      : null;

    _onRefresh();
  }

  const _subscribeApi = (type, item) => {


    //loader.load();
    setstate({ ...state, load: true });
    ApiCall.setSubscribe(type, { user: loginData.id }, item._id)
      .then((res) => {
        var count = 0;
        let subscribedArr = appData.subscribedArr;
        appData.subscribedArr.map((subscribeItem, index) => {
          if (subscribeItem.id === item.id) {
            subscribedArr[index]["isSubscribe"] =
              type === SUBSCRIBE_TYPE.SUBSCRIBED ? false : true;
            count++;
          }
        });
        if (count === 0) {
          dispatch(pushAppData({
            prop: "subscribedArr",
            value: {
              id: item.id,
              isSubscribe: type === SUBSCRIBE_TYPE.SUBSCRIBED ? false : true,
            },
          }));
        } else {
          dispatch(setAppData({ prop: "subscribedArr", value: subscribedArr }));
        }

        //         //*Update own subscribed list
        //         if (SUBSCRIBE_TYPE.SUBSCRIBE === type) {
        //           var list = subscribeList.subscribedList[loginData.id];
        //           if (list) {
        //             var arr = subscribeList.subscribedList[loginData.id].arr;
        //             var pagination =
        //               subscribeList.subscribedList[loginData.id].pagination;
        //             var count = 0;
        //             arr.map((subscribedItem) => {
        //               if (subscribedItem.id === item._id) count++;
        //             });
        //             if (count === 0) {
        //               item.subscribeId = res.data.id;
        //              dispatch(pushSubscribedList({ id: loginData.id, arr: item, pagination }));
        //             }
        //           }
        //         } else {
        //           var list = subscribeList.subscribedList[loginData.id];
        //           if (list) {
        //             var arr = subscribeList.subscribedList[loginData.id].arr;
        //             var pagination =
        //               subscribeList.subscribedList[loginData.id].pagination;
        //             const newArr = reject(
        //               arr,
        //               (subscribedItem) => subscribedItem._id === item._id,
        //             );
        //             dispatch(setSubscribedList({ id: loginData.id, arr: newArr, pagination }));
        //           }
        //         }

        //         //*Change counter on own profile
        //         if (SUBSCRIBE_TYPE.SUBSCRIBE === type) {
        //           if (!helpers._isEmptyObject(userInfo)) {
        //             let subscribedCount = parseInt(userInfo.subscribedCount);
        //            dispatch(setUserInfoProp({
        //               prop: "subscribedCount",
        //               value: ++subscribedCount,
        //             }));
        //           }
        //         } else {
        //           if (!helpers._isEmptyObject(userInfo)) {
        //             let subscribedCount = parseInt(userInfo.subscribedCount);
        //            dispatch(setUserInfoProp({
        //               prop: "subscribedCount",
        //               value: --subscribedCount,
        //             }));
        //           }
        //         }
        //         updateNews();

        loader.hideLoader();
        setstate({ ...state, load: false });
        const storyRef = globals.getUserData("storyRef");
        if (storyRef) {
          storyRef.viewRef._homeApis(storyRef.viewRef.state.index);
        }
      })
      .catch((err) => {
        setstate({ ...state, load: false });
        loader.hideLoader();
      });
  };

  const updateNews = () => {

    ApiCall.getHomeData("news", 1, "", { id: loginData.id }).then((res) => {
      dispatch(setHomeDataProp({ prop: "news", arr: res.data }));
      dispatch(setPagination(res.pagination, "newsfeed"));
      setstate({ ...state, load: false });
      // setRefreshIndicator(false)
    });
  };

  const _keyExtractor = (item, index) => "UsersList_" + index.toString();

  const _renderUsers = ({ item, index }) => {

    let isSubscribe = item.isSubscribedTo;
    appData.subscribedArr.map((subscribeItem) => {
      if (subscribeItem.id === item.id) {
        isSubscribe = subscribeItem.isSubscribe;
      }
    });
    let type = isSubscribe
      ? SUBSCRIBE_TYPE.SUBSCRIBED
      : SUBSCRIBE_TYPE.SUBSCRIBE;
    appData.subscribedArr.map((subscribeItem) => {
      if (subscribeItem.id === item._id) {
        isSubscribe = subscribeItem.isSubscribe;
      }
    });
    let btnTxt = helpers.getLocale(
      localize,
      "subscribe",
      isSubscribe ? "subscribed" : "subscribe",
    );
    let isBtnGradiant = isSubscribe ? false : true;

    let alignSelf =
      index % 2 === 0
        ? {
          paddingRight: 10,
          paddingLeft: 10,
          paddingBottom: 5,
          backgroundColor: colors.white,
        }
        : {
          paddingRight: 10,
          backgroundColor: colors.white,
          paddingBottom: 5,
        };

    const newStyle = isBtnGradiant
      ? {}
      : { borderWidth: 0.5, borderColor: colors.gray };

    const isBasicImage =
      item.profileUrl == globals.userImageUrl || !item.profileUrl
        ? true
        : false;

    return (
      <View style={alignSelf}>
        <View
          ref={(ref) => (usersRef[item._id] = ref)}
          renderToHardwareTextureAndroid={true}
          style={mainStyles.cardProfile}>
          <View style={styles.userImageOuter}>
            <TouchableOpacity
              onPress={() => {
                _navigateOthersProfile(item);
              }}
              style={styles.userImgWrap}>
              <Image
                source={
                  item.profileUrl && !isBasicImage
                    ? { uri: item.profileUrl }
                    : images.user
                }
                // defaultSource={images.user}
                resizeMode={"cover"}
                style={styles.userImg}
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                _navigateOthersProfile(item);
              }}
              style={styles.userImgWrap}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                  paddingTop: 5,
                }}>
                <_B style={styles.username}>
                  {item.username ? item.username + "  " : ""}
                </_B>
                {item.isVerifiedUser ? (
                  <FastImage
                    source={images.verifiedUser}
                    defaultSource={images.verifiedUser}
                    resizeMode={"cover"}
                    style={{ height: 15, width: 15, marginTop: 7 }}
                  />
                ) : null}
              </View>
            </TouchableOpacity>

            {loginData.id != item.id ? (
              isSubscribe ? (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <_Button
                    gradiant={isBtnGradiant}
                    smallBtn={true}
                    isRound={true}
                    text={btnTxt}
                    style={[styles.btn, newStyle]}
                    btnTxtStyle={{ color: colors.black }}
                    callback={() => {
                      _subscribeApi(type, item);
                    }}
                  />
                </View>
              ) : (
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <_Button
                    gradiant={isBtnGradiant}
                    smallBtn={true}
                    isRound={true}
                    text={btnTxt}
                    btnTxtStyle={{ fontWeight: "bold" }}
                    style={styles.btn}
                    callback={() => {
                      _subscribeApi(type, item);
                    }}
                  />
                </View>
              )
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const _onRefresh = () => {
    console.log('user onRefresh is called');
    setstate({ ...state, searchTxt: "" });
  };

  useEffect(() => {
    if (state.searchTxt == "") {
      let filterStr = _getFilters();
      filterStr = helpers.filterRemover(filterStr);
      let customFilter = props?.customFilter;

      // let filterStr = ''
      setstate({ ...state, load: true });
      // setRefreshIndicator(true)
      state.loadMore ? setstate({ ...state, loadMore: false }) : null;
      state.renderMore ? setstate({ ...state, renderMore: false }) : null;
      ApiCall.getHomeData(
        "user",
        1,
        customFilter ? customFilter : filterStr,
        { loadMoreData: "no" },
      )
        .then((res) => {
          console.log("users==>", res);
          dispatch(setHomeDataProp({ prop: "user", arr: res.data }));
          dispatch(setPagination(res.pagination, "homeUsers"));

          if (res.data.length === 0) {
            let verifyFilter = false;
            const filterSeperate = filterStr.split("&");

            for (let i = 0; i < filterSeperate.length; ++i) {
              let filterVal = filterSeperate[i];
              const filterX = filterVal.split("=");

              if (
                filterX.length > 0 &&
                filterX[filterX.length - 1] === "verified"
              ) {
                verifyFilter = true;
                break;
              }
            }
            verifyFilter ? setstate({ ...state, renderMore: true }) : null;
          }

          // setRefreshIndicator(false)
          setstate({ ...state, loading: false });
        })
        .catch((e) => {
          dispatch(setHomeDataProp({ prop: "user", arr: [] }));
          // setRefreshIndicator(false)
          setstate({ ...state, loading: false });
        });
    } else {
      setstate({ ...state, loading: true });
      let cb = {
        success: (res) => {
          dispatch(setHomeDataProp({ prop: "user", arr: res.data }));
          delete res.data["docs"];
          dispatch(setPagination(res.pagination, "homeUsers"));
        },
        error: (e) => {
          dispatch(setHomeDataProp({ prop: "user", arr: [] }));
        },
        complete: () => setstate({ ...state, loading: false }),
      };
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.usersListSearch(
        {},
        cb,
        header,
        {
          page: 1,
          limit: globals.PAGINATION.homeUsers,
          keyword: state.searchTxt,
        },
        true,
      );
    }
  }, [state.searchTxt])

  const _renderMoreUser = () => {
    if (listLoading === false) {
      listLoading = true;
      setstate(
        {
          ...state,
          listLoading: true,
        }
      );
    }
  };

  useEffect(() => {
    let filterStr = _getFilters();
    filterStr = helpers.filterRemover(filterStr);
    let customFilter = props?.customFilter;

    let loadMoreData = "no";
    let verifyFilter = false;
    const filterSeperate = filterStr.split("&");

    for (let i = 0; i < filterSeperate.length; ++i) {
      let filterVal = filterSeperate[i];
      const filterX = filterVal.split("=");

      if (
        filterX.length > 0 &&
        filterX[filterX.length - 1] === "verified" &&
        !verifyFilter
      ) {
        verifyFilter = true;
      }

      if (
        filterX.length > 0 &&
        filterX[filterX.length - 1] === "verified" &&
        pagination.page === pagination.pages &&
        state.searchTxt === "" &&
        !state.loadMore
      ) {
        setstate({ ...state, loadMore: true });

        loadMoreData = "yes";
      }
    }

    if (
      loadMoreData === "yes" && state.searchTxt === ""
        ? false
        : pagination.page + 1 > pagination.pages
    ) {
      listEnded = true;
      setstate({ ...state, listLoading: false });
      listLoading = false;
    } else {
      let activePage = pagination.page;

      if (state.searchTxt === "") {
        ApiCall.getHomeData(
          "user",
          loadMoreData === "yes" ? 1 : ++activePage,
          customFilter ? customFilter : filterStr,
          {
            loadMoreData:
              loadMoreData === "yes"
                ? "yes"
                : state.loadMore && verifyFilter
                  ? "yes"
                  : "no",
          },
        )
          .then((res) => {
            dispatch(pushHomeDataProp({ prop: "user", arr: res.data }));
            dispatch(setPagination(res.pagination, "homeUsers"));
            !verifyFilter && state.loadMore ?
              setstate({ ...state, loadMore: false })
              : null;
            setstate({ ...state, listLoading: false });
            listLoading = false;
          })
          .catch((err) => {
            setstate({ ...state, listLoading: false });
            listLoading = false;
          });
      } else {
        let cb = {
          success: (res) => {
            dispatch(pushHomeDataProp({ prop: "user", arr: res.data }));
            dispatch(setPagination(res.data, "homeUsers"));
          },
          error: (e) => { },
          complete: () => {
            setstate({ ...state, listLoading: false });
            listLoading = false;
          },
        };
        let header = helpers.buildHeader({
          authorization: loginData.token,
        });
        API.usersListSearch(
          {},
          cb,
          header,
          {
            page: ++activePage,
            limit: globals.PAGINATION.homeUsers,
            keyword: state.searchTxt,
            filterStr: customFilter ? customFilter : filterStr,
          },
          true,
        );
      }
    }
  }, [state.listLoading])

  const _navigateOthersProfile = (item) => {
    props.navigation.navigate("OthersProfile", {
      userInfo: {
        username: item.username,
        userId: item.id,
      },
    });
  };

  const _searchUsers = (t) => {

    setstate({ ...state, searchTxt: t }
      //   , () => {
      //   if (t.trim() !== "") {
      //     let cb = {
      //       success: (res) => {
      //         dispatch(setHomeDataProp({ prop: "user", arr: res.data }));
      //         delete res.data["docs"];
      //         dispatch(setPagination(res.pagination, "homeUsers"));
      //       },
      //       error: (e) => {
      //         dispatch(setHomeDataProp({ prop: "user", arr: [] }));
      //       },
      //       complete: () => setstate({ ...state, loading: false }),
      //     };
      //     let header = helpers.buildHeader({ authorization: loginData.token });
      //     API.usersListSearch(
      //       {},
      //       cb,
      //       header,
      //       {
      //         page: 1,
      //         limit: globals.PAGINATION.homeUsers,
      //         keyword: t,
      //       },
      //       true,
      //     );
      //   } else {
      //     let filterStr = _getFilters();
      //     ApiCall.getHomeData("user", 1, filterStr)
      //       .then((res) => {
      //         dispatch(setHomeDataProp({ prop: "user", arr: res.data }));
      //         dispatch(setPagination(res.pagination, "homeUsers"));

      //         setstate({ ...state, loading: false })
      //       })
      //       .catch((e) => {
      //         setstate({ ...state, loading: false })
      //       });
      //   }
      // }
    );
  };

  //   const listUserTrigger = () => {
  //     if (!listLoading && !listEnded) _renderMoreUser();
  //   };

  const cancelSearch = () => {
    setstate({ ...state, searchTxt: "", loading: true })
    _searchUsers("");

  };

  const _getFilters = () => {

    return helpers.buildFilterUrl(
      FILTERS_FOR.HOME_USER,
      filtersData,
      FILTERS_TYPES,
    );
  };

  const filterLogInUser = (users, loginData) =>
    users.filter((user) => user._id !== loginData.id);

  //FIXME: need attention to check this func
  const _showFilter = () => {
    filterRef.current.show()
    // refs.filter.show();
  };

  const _showSocialShare = () => {
    // console.log("Share", true);
    let url = WEB_URL + "news-feed/" + loginData.username + "/" + loginData.id;

    Share.open({
      title: "Picstagraph",
      message: helpers.getLocale(localize, "share", "profile"),
      url,
    });
  };

  //   const header = {
  //     // leftCb: () => {
  //     //   props.navigation.pop();
  //     // },
  //     title: "Users",
  //     disableLang: true,
  //     // leftImg: images.leftBackArrow,
  //     rightTxt: "Cancel",
  //     rightCb: () => _showFilter(),
  //     rightIconArr: [images.menu, "Ionicons"],
  //   };

  return (
    // <View>
    //   <Text>User</Text>
    // </View>
    <_Layout
      screen={"userSearch"}
      // header={props?.NoHeader?null:header}
      // userSearchHeader={
      //   props?.NoHeader ? null :
      // }
      headerWrapStyle={{ margin: 0 }}
      style={{ backgroundColor: "#fff" }}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      {props?.NoHeader ? null : (
        <View
          style={{
            marginTop: Platform.OS == "android" ? 20 : 40,
            marginBottom: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}>
          <View style={styles.inputWrap}>
            <FastImage
              resizeMode="contain"
              style={{ height: 15, width: 15, marginRight: 5, marginLeft: 5 }}
              source={images.iconSearchGrey}
            />
            <Input
              placeholder={"User search"}
              style={{ ...sty.padV5, fontSize: 15 }}
              placeholderTextColor={"grey"}
              onChangeText={(t) => {
                _searchUsers(t);
              }}
              value={state.searchTxt}
              autoCapitalize={"none"}
            />
            <Icon
              active
              type="Entypo"
              name="cross"
              onPress={() => cancelSearch()}
              style={styles.iconCancel}
            />
          </View>
          <Pressable onPress={() => props.navigation.pop()}>
            <_Lang
              style={{ marginRight: 5, fontSize: 15, color: "black" }}
              text={"moreOption.cancel"}
            />
          </Pressable>
        </View>
      )}

      {state.loading || home.user === null ? (
        <></>
        //       <_InlineLoader type={"userBox"} />
      ) : (
        <>
          <FlatList
            data={uniqBy(
              filterLogInUser(home.user, loginData),
              (dt) => dt._id,
            )}
            extraData={state}
            renderItem={_renderUsers}
            keyExtractor={_keyExtractor}
            onEndReachedThreshold={0.5}
            // ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
            onEndReached={() => _renderMoreUser()}
            ListHeaderComponent={() => {
              return props?.NoHeader ? null : (
                <View style={{ backgroundColor: colors.white }}>
                  <FilterModal
                    changeTabs={false}
                    unselectDB={(type) => {
                      // props.resetFilterArr(type, filterForArr[0]);
                      dispatch(resetFilterArr(type, filterForArr[0]));

                      _onRefresh();
                    }}
                    filterFor={filterForArr[0]}
                    openModal={(key) => {
                      if (key == "relevance") {
                        _setFilter();
                      } else {
                        setstate({ filterKey: key });
                        _showFilter();
                      }
                    }}
                  />
                </View>
              );
            }}
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={state.refreshing}
                onRefresh={_onRefresh}
              />
            }
            // onScroll={(e) => {
            //     if(!listLoading && !listEnded) _renderMoreUser();
            //     props.onScroll(e)
            // }}
            ListFooterComponent={() => {
              return <View>{state.listLoading ? <_InlineLoader /> : null}</View>;
            }}
            ListEmptyComponent={<_EmptyPostList />}
            removeClippedSubviews={Platform.OS == "android" ? true : false}
          // windowSize={3}
          />
          <ActivityIndicator

            size={"large"}
            style={{ position: "absolute", top: "50%", alignSelf: "center" }}
            animating={state.load}
          />
        </>
      )}
      {/* <_Loading 
     // ref={"loader"} 
     /> */}

      <_Filter
        ref={filterRef}
        filterFor={filterForArr[0]}
        filterDataApi={() => {
          _onRefresh();
        }}
        filterKey={state.filterKey}
        singleSelect={[
          FILTERS_TYPES.CATEGORY,
          FILTERS_TYPES.OFFERTAG,
          FILTERS_TYPES.INQUIRYTAG,
        ]}
      />
      {props?.NoHeader ? null : (
        <View style={styles.inviteFriendsView}>
          <TouchableOpacity
            onPress={() => {
              _showSocialShare();
            }}
            style={styles.inviteFriendsButton}>
            <_GradiantView style={styles.btnInvite}>
              <_Lang style={styles.uploadBtn} text={"share.invite_friends"} />
            </_GradiantView>
          </TouchableOpacity>
        </View>
      )}
    </_Layout>
  )
}

// export default User
export default mainLayoutHoc({})(User);


