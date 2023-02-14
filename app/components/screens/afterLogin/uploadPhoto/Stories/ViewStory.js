import React,{ useState,useEffect}from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
  Animated,
} from "react-native";


import { styles } from "./styles";
import {
  images,
  colors,
  globals,
  ApiCall,
  helpers,
} from "../../../../../configs";
import { _Lang } from "../../../../custom";
import {
  setPicsUserHomeData,
  setStoryRefreshIndicator,
} from "../../../../../redux/actions/PicsHomeActions";
import mainStyles from "../../../../../assets/styles/MainStyles";
import { getTabWidth } from "../../../../../configs/libs/helpers";
import SubscribedStory from "./SubscribedStory";
import ExploreStory from "./ExploreStory";
import { setPagination } from "../../../../../redux/actions/PaginationActions";
import { setTimestampData } from "../../../../../redux/actions/TimestampAction";
import {useDispatch, useSelector} from 'react-redux'

const FILTERS_FOR = globals.FILTERS_FOR;
const FILTERS_TYPES = globals.FILTERS_TYPES;

export default function ViewStory(props) {
  const dispatch = useDispatch();
  const home= useSelector(state => state.home);
  const loginData = useSelector(state => state.loginData);
  const users = useSelector(state => state.picsHomeReducer.users);
  const filtersData = useSelector(state => state.filterWrapperReducer)
  const timestamp = useSelector(state => state.timestamp)

  const [state, setstate]= useState({
    index: props.homeIndex,
    position: new Animated.Value(0),
    routes: [
      { index: 0, key: "subscribed", text: "stories.subscribed" },
      { index: 1, key: "explore", text: "stories.explore" },
    ],
  })

  const { routes,index } = state;


 let subscribedEndTrigger = useRef(null);
    let exploreEndTrigger = useRef(null);
    let subscribedRefresh = useRef(null);
    let exploreRefresh = useRef(null);
  
    useEffect(()=>{
    globals.setUserData("storyRef", { viewRef: this });

    return ()=>globals.setUserData("storyRef", null);
    
    },[])

   const setSubscribedEndTrigger = (ref) => (subscribedEndTrigger = ref);

   const setExploreEndTrigger = (ref) => (exploreEndTrigger = ref);
  
   const setSubscribedRefresh = (ref) => (subscribedRefresh = ref);
  
   const setExploreRefresh = (ref) => (exploreRefresh = ref);

  const  _changeTab = (index) => {
    setstate({ ...state,index:index }, () => {
      _homeApis(index);
      globals.setUserData("storyRef", {
        viewRef: Object.assign({}, this, {
          state: Object.assign({}, state, { index }),
        }),
      });
    });
  };
  const _getFilters = () => {

    return helpers.buildFilterUrl(
      state.index === 0 ? FILTERS_FOR.SUBSCRIBED_STORY : FILTERS_FOR.EXPLORE_STORY,
      filtersData,
      FILTERS_TYPES,
    );
  };
  //FIXME: filter show check 
  const _showFilter = () => refs.filter.show();

  const _hideFilter = () => refs.filter.hide();

 const  _newStories = (apiType, timest = null) => {
 

    if (apiType === "subscribed") {
      ApiCall.getHomeData("pics", 1, "", {
        isSubscribe: true,
        id: loginData.id,
        timestamp: timest === null ? timestamp["subscribedStory"] : timest,
      })
        .then((res) => {
          if (res.data.length > 0) {
            const newData = helpers.storyAdder(res.data, users.subscribedData);
            dispatch(setPicsUserHomeData(newData, "subscribedData", loginData.id));
          }
        })
        .catch((e) => {
          users.subscribedData === null
            ? dispatch(setPicsUserHomeData([], "subscribedData", loginData.id))
            : null;
          dispatch(setStoryRefreshIndicator(false));
        });
    } else if (apiType == "explore") {
      ApiCall.getHomeData("pics", 1, "", {
        isSubscribe: false,
        id: loginData.id,
        timestamp: timest === null ? timestamp["exploreStory"] : timest,
      })
        .then((res) => {
          if (res.data.length > 0) {
            const newData = helpers.storyAdder(res.data, users.exploreData);
            dispatch(setPicsUserHomeData(newData, "exploreData", loginData.id));
          }
        })
        .catch((e) => {
          users.exploreData === null
            ? dispatch(setPicsUserHomeData([], "exploreData", loginData.id))
            : null;
          dispatch(setStoryRefreshIndicator(false));
        });
    }
  };

 const _homeApis = (index, forceCall = false) => {
    
    let apiType = routes[index].key;

    dispatch(setStoryRefreshIndicator(true));

    let filterStr = _getFilters();

    if (apiType == "subscribed") {
      ApiCall.getHomeData("pics", 1, "", {
        isSubscribe: true,
        id: loginData.id,
      })
        .then((res) => {
          dispatch(setPicsUserHomeData(res.data, "subscribedData", loginData.id));

          // _newStories(apiType, res.timestamp)

          dispatch(setPagination(res.pagination, "subscribedStory"));
          dispatch(setStoryRefreshIndicator(false));
          dispatch(setTimestampData("subscribedStory", res.timestamp));
        })
        .catch((e) => {
          dispatch(setPicsUserHomeData([], "subscribedData", loginData.id));
          dispatch(setStoryRefreshIndicator(false));
        });
    } else if (apiType == "explore") {
      ApiCall.getHomeData("pics", 1, "", {
        isSubscribe: false,
        id: loginData.id,
      })
        .then((res) => {
          dispatch(setPicsUserHomeData(res.data, "exploreData", loginData.id));

          // _newStories(apiType, res.timestamp)

          dispatch(setPagination(res.pagination, "exploreStory"));
          dispatch(setStoryRefreshIndicator(false));
          dispatch(setTimestampData("exploreStory", res.timestamp));
        })
        .catch((e) => {
          dispatch(setPicsUserHomeData([], "exploreData", loginData.id));
          dispatch(setStoryRefreshIndicator(false));
        });
    }
  };

 const  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("FullViewStory", { index });
        }}>
        <View style={styles.storyBox}>
          <View style={styles.userBox}>
            <Image source={images.upload} style={styles.imageDim} />
          </View>
          <Text>{item.userInfo.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
 const _renderTabBar = (props) => {

    return (
      <View style={{ paddingVertical: 0 }}>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <FlatList
            data={routes}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const color =
                index == item.index ? colors.darkGray : colors.lightDark;

              return (
                <TouchableOpacity
                  key={item.index}
                  onPress={() => _changeTab(item.index)}>
                  <View style={mainStyles.tabWrap}>
                    <View
                      style={[
                        mainStyles.tabItem,
                        { width: getTabWidth(routes.length) },
                      ]}>
                      <_Lang style={{ color }} text={item.text} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  };
  const checkPostScroll = (e) => {

    if (index === 0) {
      subscribedEndTrigger();
    } else if (index === 1) {
      exploreEndTrigger();
    }
  };
  const _onRefresh = () => {
    if (index === 0) {
      subscribedRefresh();
    } else if (index === 1) {
      exploreRefresh();
    }
  };

  const header = {
    leftCb: () => {
      props.navigation.pop();
    },
    title: "Stories",
    disableLang: true,
    leftImg: images.leftBackArrow,
    rightTxt: "",
    rightNewIconArr: [images.upload],
    rightNewCb: [
      () => {
        props.navigation.navigate("Upload");
      },
    ],
  };

  const filterForArr = [
    FILTERS_FOR.SUBSCRIBED_STORY,
    FILTERS_FOR.EXPLORE_STORY,
  ];

  return (
    <View
        onLayout={(e) => {
          props.storyViewHeight(e.nativeEvent.layout.height);
        }}
        style={{ marginBottom: 2 }}>
        {index === 0 ? (
          <SubscribedStory
            {...props}
            header={_renderTabBar()}
            // setSubscribedEndTrigger={setSubscribedEndTrigger}
            // setSubscribedRefresh={setSubscribedRefresh}
            getFilters={_getFilters}
          />
        ) : null}
        {index === 1 ? (
          <ExploreStory
            {...props}
            header={_renderTabBar()}
            // setExploreEndTrigger={setExploreEndTrigger}
            // setExploreRefresh={setExploreRefresh}
            getFilters={_getFilters}
          />
        ) : null}
      </View>
  )
}

ViewStory.getDerivedStateFromProps=(nextProps, state) =>{
  if (nextProps.homeIndex !== state.index) {
    return {
      index: nextProps.homeIndex,
    };
  }
  return null;
}