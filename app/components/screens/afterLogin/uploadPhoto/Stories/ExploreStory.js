import React ,{useRef, useState} from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Platform,
  Modal,
  RefreshControl,
  ImageBackground,
} from "react-native";

import { styles } from "./styles";
import mainStyles from "../../../../../assets/styles/MainStyles";
import {
  _Layout,
  _EmptyList,
  _InlineLoader,
  _GradiantView,
  _B,
  _Lang,
} from "../../../../custom";
import {
  images,
  colors,
  globals,
  ApiCall,
  helpers,
  API,
} from "../../../../../configs";
import { size, map, filter } from "lodash";
import {
  setPicsUserHomeData,
  addStoryData,
  setStoryRefreshIndicator,
  pushPicsUserHomeData,
  setPicsValue,
} from "../../../../../redux/actions/PicsHomeActions";
import { setPagination } from "../../../../../redux/actions/PaginationActions";
import {
  resetFilters,
  setFilterPropArr,
} from "../../../../../redux/actions/FilterWrapperAction";
import FastImage from "react-native-fast-image";
import { nameShortner } from "../../../../../configs/libs/helpers";
import { useDispatch, useSelector} from "react-redux";

export default function ExploreStory(props) {
  const { navigation } = props;


  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const appData = useSelector(state => state.appData)
  const loginData = useSelector(state => state.loginData);
  const users = useSelector(state => state.picsHomeReducer.users);
  const pagination = useSelector(state => state.pagination.exploreStory)
  const timestamp = useSelector(state => state.timestamp)
  const storyData = users.subscribedData;


  const [state, setstate]= useState({
    showModal: false,
    userType: "exploreData",
    listLoading: false,
    listEnded: false,
    callMore: true,
  })
  let listLoading = false;
  let listEnded = false;
  let storyRef = useRef([]);

 const  _keyExtractor = (item, index) => index.toString();

 const _onRefresh = () => {

  dispatch(setStoryRefreshIndicator(true));

  ApiCall.getHomeData("pics", 1, "", { isSubscribe: false })
    .then((res) => {
      dispatch(setPicsUserHomeData(res.data, "exploreData", loginData.id));
      // setPagination(res.pagination, 'exploreStory');
      dispatch(setStoryRefreshIndicator(false));
    })
    .catch((err) => {
      dispatch(setPicsUserHomeData([], "exploreData", loginData.id));
      dispatch(setStoryRefreshIndicator(false));
    });
};
const listEndTrigger = () => {
  if (!listLoading && !listEnded) _renderMore();
};

const _newStories = () => {


  ApiCall.getHomeData("pics", 1, "", {
    isSubscribe: false,
    id: loginData.id,
    timestamp: timestamp["exploreStory"],
  })
    .then((res) => {
      if (res.data && res.data.length > 0) {
        const newData = helpers.storyAdder(res.data, users.exploreData);
        dispatch(setPicsUserHomeData(newData, "exploreData", loginData.id));
      }
    })
    .catch((err) => {
      users.exploreData === null
        ?dispatch( setPicsUserHomeData([], "exploreData", loginData.id))
        : null;
      dispatch(setStoryRefreshIndicator(false));
    });
};
const _renderMore = () => {


  if (listLoading === false) {
    listLoading = true;

    setstate(prevState=>(
      {
        ...prevState,
        listLoading: true,
      }),
      () => {
        // if (pagination.page + 1 > pagination.pages) {
        //     listEnded = true;
        //     setState({ listLoading: false });
        //     listLoading = false;
        // }

        let activePage = pagination.page;

        let filterStr = props.getFilters();

        const filterData = filter(
          users.exploreData,
          (sud) => !sud.advertisement
        );

        const usersList = map(filterData, (su) => {
          return su.userId;
        });

        ApiCall.getHomeData("pics", ++activePage, filterStr, {
          isSubscribe: false,
          id: loginData.id,
          usersList,
        })
          .then((res) => {
            if (res.data.length === 0) {
              dispatch(setPicsValue("callExplore", false));
              setstate(prevState => ({ ...prevState,listLoading: false }));
              listLoading = false;
            } else {
              dispatch(pushPicsUserHomeData(res.data, "exploreData", loginData.id));
              // pushPicsUserHomeData(res.data, 'exploreData', loginData.id, true);
              dispatch(setPagination(res.pagination, "exploreStory"));

              _newStories();

              setstate(prevState => ({ ...prevState,listLoading: false }));
              listLoading = false;
            }
          })
          .catch((err) => {
            setstate(prevState => ({ ...prevState,listLoading: false }));
            listLoading = false;
          });
      }
    );
  }

  // const {userType} = state
  // let realData = users[userType];
  // let lastUser = realData && realData[realData.length-1];

  // if(!lastUser) return;
  // if(storyRef[lastUser.userId]) {
  //     let ref = storyRef[lastUser.userId];

  //         ref.measure((x, y, width, height, pageX, pageY) => {
  //             if(pageY > globals.WINDOW_HEIGHT-400 && pageY< globals.WINDOW_HEIGHT-100 ) {

  //                 if(listLoading === false) {
  //                     listLoading = true;

  //                     setState({
  //                         listLoading: true
  //                     }, () => {
  //                         if(pagination.page+1 > pagination.pages) listEnded = true;
  //                         let activePage = pagination.page;

  //                         let filterStr = props.getFilters();
  //                         ApiCall.getHomeData('pics', ++activePage, filterStr, false).then((res)=>{
  //                             pushPicsUserHomeData(res.data, 'exploreData', loginData.id);
  //                             setPagination(res.pagination, 'exploreStory');

  //                             setState({ listLoading: false });
  //                             listLoading = false;
  //                         }).catch(err => {
  //                             setState({ listLoading: false });
  //                             listLoading = false;
  //                         })
  //                     })

  //                 }

  //             }
  //         })

  // }
};

const _renderUsers = ({ item, index }) => {
  const { userType } = state;
  const userX = !item.advertisement ? item.userPics[0].userDetails : null;

  let bgColor = item.allStoriesViewed ? "lightDark" : "blue";

  return userX ? (
    <View
      style={{
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 10,
        borderRadius: 10,
        overflow: "hidden",
        marginLeft: index === 0 ? 10 : 0,
        width: (globals.WINDOW_WIDTH - 40) / 3.5,
      }}
    >
      {/* <_GradiantView color={bgColor} style={styles.gradiantWrap}> */}
      <TouchableOpacity
        style={styles.userImgWrap}
        onPress={() => {
          addStoryData(item.userPics[item.currentIndex]);
          navigation.navigate("StoryTabs", {
            userType,
            navigation,
            userId: item.userId,
          });
        }}
      >
        <FastImage
          source={{ uri: item.userPics[0].profileUrl }}
          style={[styles.userImg, { backgroundColor: "gray" }]}
          defaultSource={images.user}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
      {/* </_GradiantView> */}
      {/* <View style={{ height: 30, paddingTop: 5 }}> */}
      <_GradiantView
        color={bgColor}
        style={{
          paddingVertical: 5,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        {userX._id == loginData.id ? (
          <_Lang style={styles.userBoxUsername} text={"stories.own_story"} />
        ) : (
          <Text allowFontScaling={false} style={styles.userBoxUsername}>
            {nameShortner(userX.username)}
          </Text>
        )}
      </_GradiantView>
      {/* </View> */}
    </View>
  ) : null;
};

const _emptyComponent = () => {
  return (
    <View
      style={{
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight:
          storyData !== null &&
          storyData.length > 0 &&
          storyData[0].userPics[0].userDetails._id !== loginData.id
            ? globals.WINDOW_WIDTH / 20
            : 0,
      }}
    >
      <TouchableOpacity
        style={[styles.userImgWrap, { borderRadius: 100 }]}
        onPress={() => {
          navigation.navigate("Upload");
        }}
      >
        <ImageBackground
          source={
            loginData.profileUrl ? { uri: loginData.profileUrl } : images.user
          }
          style={[styles.userImg]}
          resizeMode={"cover"}
        >
          <View style={styles.uploadImgWrap}>
            <FastImage
              source={images.homePlus}
              style={styles.uploadImg}
              resizeMode={"cover"}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View style={{ height: 30, paddingTop: 5 }}>
        <_Lang style={styles.userBoxUsername} text={"stories.own_story"} />
      </View>
    </View>
  );
};
  return (
    <View style={mainStyles.rootView}>
        {!storyData ? (
          <_InlineLoader type={"userStories"} />
        ) : (
          <View style={{ paddingTop: 2 }}>
            <View style={{ backgroundColor: "#fff" }}>
              <FlatList
                data={storyData}
                renderItem={(data) => _renderUsers(data)}
                showsHorizontalScrollIndicator={false}
                // keyExtractor={(data) =>_keyExtractor(data)}
                // ListHeaderComponent={props.header}
                horizontal={true}
                // ListHeaderComponent={storyData.length > 0 && storyData[0].userPics[0].createdBy.id !== loginData.id ? _emptyComponent : null}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={users.refreshStatus}
                //         onRefresh={_onRefresh}
                //     />
                // }
                // onScroll={(e) => {
                //     listNewsTrigger()
                // }}
                onEndReachedThreshold={0.5}
                // ItemSeparatorComponent={() => {
                //     return (
                //         <View style={{ width: globals.WINDOW_WIDTH / 20 }}>
                //         </View>
                //     )
                // }}
                onEndReached={() => users.callExplore && _renderMore()}
                removeClippedSubviews={Platform.OS == "android" ? true : false}
                // ListEmptyComponent={_emptyComponent}
                ListFooterComponent={() => {
                  return <View>{state.listLoading ? <_InlineLoader /> : null}</View>;
                }}
              />
            </View>
          </View>
        )}
      </View>
  )
}