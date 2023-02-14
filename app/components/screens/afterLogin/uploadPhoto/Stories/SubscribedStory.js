import React,{ useRef, useState} from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";


import { styles } from "./styles";
import mainStyles from "../../../../../assets/styles/MainStyles";
import {
  _Layout,
  _EmptyList,
  _InlineLoader,
  _GradiantView,
  _B,
  _Icon,
  _Lang,
} from "../../../../custom";
import {
  images,
  ApiCall,
  helpers,
} from "../../../../../configs";
import { map, find, filter } from "lodash";
import {
  setPicsUserHomeData,
  addStoryData,
  setStoryRefreshIndicator,
  pushPicsUserHomeData,
  setPicsValue,
} from "../../../../../redux/actions/PicsHomeActions";
import { setPagination } from "../../../../../redux/actions/PaginationActions";
import FastImage from "react-native-fast-image";
import { nameShortner } from "../../../../../configs/libs/helpers";

import { useSelector, useDispatch} from "react-redux";

const SubscribedStory=(props)=> {
  const { navigation} = props;
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const appData = useSelector(state => state.appData)
  const loginData = useSelector(state => state.loginData);
  const users = useSelector(state => state.picsHomeReducer.users);
  const pagination = useSelector(state => state.pagination.SubscribedStory)
  const timestamp = useSelector(state => state.timestamp)
  const storyData = users.subscribedData;


  const [state, setstate]= useState({
    showModal: false,
    userType: "subscribedData",
    listLoading: false,
    refreshing: false,
    listEnded: false,
  })
  let listLoading = false;
  let listEnded = false;
  let storyRef = useRef([]);

 const  _keyExtractor = (item, index) => index.toString();

const  _onRefresh = () => {


 dispatch(setStoryRefreshIndicator(true));

  ApiCall.getHomeData("pics", 1, "", { isSubscribe: true })
    .then((res) => {
      dispatch(setPicsUserHomeData(res.data, "subscribedData", loginData.id));
      // setPagination(res.pagination, 'subscribedStory');
     dispatch(setStoryRefreshIndicator(false));
    })
    .catch((err) => {
      dispatch(setPicsUserHomeData([], "subscribedData", loginData.id));
      dispatch(setStoryRefreshIndicator(false));
    });
};
const listEndTrigger = () => {
  if (!listLoading && !listEnded) _renderMore();
};

const _newStories = () => {
 

  ApiCall.getHomeData("pics", 1, "", {
    isSubscribe: true,
    id: loginData.id,
    timestamp: timestamp["subscribedStory"],
  })
    .then((res) => {
      if (res.data && res.data.length > 0) {
        const newData = helpers.storyAdder(res.data, users.subscribedData);
        dispatch(setPicsUserHomeData(newData, "subscribedData", loginData.id));
      }
    })
    .catch((err) => {
      users.subscribedData === null
        ? dispatch(setPicsUserHomeData([], "subscribedData", loginData.id))
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
        let activePage = pagination.page;

        let filterStr = props.getFilters();

        const filterData = filter(
          users.subscribedData,
          (sud) => !sud.advertisement
        );

        const usersList = map(filterData, (su) => {
          return su.userId;
        });

        ApiCall.getHomeData("pics", ++activePage, "", {
          isSubscribe: true,
          id: loginData.id,
          usersList,
        })
          .then((res) => {
            if (res.data.length === 0) {
              dispatch(setPicsValue("callSubscribed", false));
              setstate(prevState => ({ ...prevState,listLoading: false }));
              listLoading = false;
            } else {
             dispatch(pushPicsUserHomeData(res.data, "subscribedData", loginData.id));
              // pushPicsUserHomeData(res.data, 'subscribedData', loginData.id, true);
              _newStories();

              dispatch(setPagination(res.pagination, "subscribedStory"));
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
};

const _renderUsers = ({ item, index }) => {
  const { userType } = state;
  const userX = !item.advertisement ? item.userPics[0].userDetails : null;
  let bgColor = item.allStoriesViewed ? "lightDark" : "blue";
  let spaceBySide = !item.advertisement
    ? users.subscribedData.length > 0 &&
      users.subscribedData[0].userPics[0].userDetails._id !== loginData.id
    : false;

  return userX ? (
    <View
      style={[
        styles.storyBox1,
        { marginLeft: index === 0 && !spaceBySide ? 10 : 0 },
      ]}
    >
      <_GradiantView color={bgColor} style={styles.gradiantWrap}>
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
            source={{
              uri:
                item.userId === loginData.id
                  ? loginData.profileUrl
                  : item.userPics[0].profileUrl,
            }}
            // defaultSource={images.user}
            style={[styles.userImg4, { backgroundColor: "gray" }]}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
      </_GradiantView>

      {/* <View style={bgColor == 'white' ?  styles.userBoxBottom: null}> */}
      <_GradiantView
        color={"white"}
        style={{
          paddingVertical: 5,
          // borderBottomRightRadius: 5,
          // borderBottomLeftRadius: 5,
          // borderWidth: 1,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        {userX._id == loginData.id ? (
          <_Lang
            style={styles.userBoxUsernameBlack}
            text={"stories.own_story"}
          />
        ) : (
          <Text allowFontScaling={false} style={styles.userBoxUsernameBlack}>
            {nameShortner(userX.username)}
          </Text>
        )}
      </_GradiantView>
      {/* </View> */}
    </View>
  ) : null;

  // return (
  //     <View style={{ paddingTop: 5 }}>
  //         <_GradiantView color={bgColor} style={styles.gradiantWrap}>
  //             <TouchableOpacity style={styles.userImgWrap} onPress={() => {
  //                 addStoryData(item.userPics[item.currentIndex]);
  //                 navigation.navigate('StoryTabs', { userType, navigation, userId: item.userId })
  //             }} >
  //                 <Image
  //                     source={{ uri: item.userId === loginData.id ? loginData.profileUrl : userX.profileUrl }}
  //                     // defaultSource={images.user}
  //                     style={[styles.userImg, { backgroundColor: 'gray' }]}
  //                     resizeMode={'cover'}
  //                 />
  //             </TouchableOpacity>
  //         </_GradiantView>

  //         <View style={{ height: 30, paddingTop: 5 }}>
  //             {
  //                 userX.id == loginData.id ?
  //                     <_Lang style={styles.userBoxUsername} text={'stories.own_story'} />
  //                     :
  //                     <Text allowFontScaling={false} style={styles.userBoxUsername}>{nameShortner(userX.username)}</Text>
  //             }
  //         </View>
  //     </View>
  // )
};

const _emptyComponent = () => {

  return (
    <View
      style={[
        styles.storyBox1,
        {
          marginLeft: 10,
          borderWidth: 0,
          paddingTop: 5,
          paddingBottom: 5,
          overflow: "visible",
          backgroundColor: "#fff",
          // width: (globals.WINDOW_WIDTH - 40) / 3.5 + 10,
        },
      ]}
    >
      {/* <_GradiantView color={"redOrange"} style={styles.gradiantWrap}> */}
      <TouchableOpacity
        style={[styles.userImgWrap]}
        onPress={() => {
          props.navigation.navigate("Upload");
        }}
      >
        <FastImage
          source={{ uri: loginData.profileUrl }}
          style={[styles.userImg4]}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
      {/* </_GradiantView> */}
      <_GradiantView
        color={"white"}
        style={{
          paddingVertical: 5,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          // width: (globals.WINDOW_WIDTH - 40) / 3.5,
        }}
      >
        <_Lang
          style={styles.userBoxUsernameBlack}
          text={"stories.own_story"}
        />
      </_GradiantView>
      <View style={styles.uploadImgWrap}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Upload");
          }}
        >
          <FastImage
            source={images.homePlus}
            style={styles.uploadImg}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

let isOwnStory = undefined;
if (storyData) {
  isOwnStory = find(storyData, (std) => std.userId === loginData.id);
}

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
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // keyExtractor={(data) =>_keyExtractor(data)}
                // ListHeaderComponent={props.header}
                ListHeaderComponent={
                  storyData.length > 0 && isOwnStory === undefined
                    ? _emptyComponent
                    : null
                }
                // refreshControl={
                //     <RefreshControl
                //         refreshing={users.refreshStatus}
                //         onRefresh={_onRefresh}
                //     />
                // }
                onEndReachedThreshold={0.5}
                onEndReached={() => users.callSubscribed && _renderMore()}
                // ItemSeparatorComponent={() => {
                //     return (
                //         <View style={{ width: 10 }}>
                //         </View>
                //     )
                // }}
                removeClippedSubviews={Platform.OS == "android" ? true : false}
                ListEmptyComponent={_emptyComponent}
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
export default SubscribedStory;