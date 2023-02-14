import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Text,
  Animated,
  Alert,
  Linking,
  StatusBar,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  globals,
  helpers,
  colors,
  images,
  sty,
  API,
  ApiCall,
} from '../../../../configs';
import {setFilterPropArr} from '../../../../redux/actions/FilterWrapperAction';
import {_Icon, _Layout, _Filter, _Lang} from '../../../custom';
import FastImage from 'react-native-fast-image';

import {mainLayoutHoc} from '../../../hoc';
import mainStyles from '../../../../assets/styles/MainStyles';
import {styles} from './styles';
import {setNavigation} from '../../../../redux/actions/NavAction';
import {
  setHomeDataProp,
  pushHomeDataProp,
  setRefreshIndicator,
} from '../../../../redux/actions/HomeActions';
import {setPagination} from '../../../../redux/actions/PaginationActions';
import {setTimestampData} from '../../../../redux/actions/TimestampAction';
import {setLoginData} from '../../../../redux/actions/LoginAction';
import {setTranslation} from '../../../../redux/actions/LocalizeAction';
import {setAppData} from '../../../../redux/actions/AppDataActions';
import {
  setPicsUserHomeData,
  setStoryRefreshIndicator,
} from '../../../../redux/actions/PicsHomeActions';
import {
  setCampaignProp,
  pushCampaignProp,
} from '../../../../redux/actions/CampaignsActions';
import {TabView, TabBar} from 'react-native-tab-view';
import News from './news/News';
import Explore from './explore/Explore';
import Best from './best/Best';
import User from './user/User';
import Participant from '../participant/Participant';
import {uniqBy, map, find, toLower} from 'lodash';
var jwtDecode = require('jwt-decode');
const POST_TYPES = globals.POST_TYPES;
const FILTERS_FOR = globals.FILTERS_FOR;
const FILTERS_TYPES = globals.FILTERS_TYPES;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
import ViewStory from '../uploadPhoto/Stories/ViewStory';
import {
  resetFilters,
  resetFilterArr,
} from '../../../../redux/actions/FilterWrapperAction';
import NavigationService from '../../../navigations/NavigationService';
import TabHeader from '../../../custom/ContentTypes/common/TabHeader';
import VersionCheck from 'react-native-version-check';
import FilterModal from '../../../custom/ContentTypes/common/FilterModal';
import * as messageSocket from '../../../custom/ContentTypes/common/MessageSocket';
import {getTabWidth} from '../../../../configs/libs/helpers';
import {Input, Item, Icon} from 'native-base';
import TopHeader from '../Header/TopHeader';
import { setUserInfo } from '../../../../redux/actions/UserInfoAction';

import {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { resetOtherSocialConnect, setOtherSocialConnect } from '../../../../redux/actions/OtherProfileActions';

const Home = (props) => {
  // props.navigation.setParams({
  //   onTabFocus: onTabFocus,
  // });
  const { navigation ,loader} = props;
  console.log(navigation);
    // const { scrollToTop,refresh } = navigation.state.params;

    const filter = useRef("filter");

  const dispatch = useDispatch();
  const navProps = useSelector(state => state.navProps);
  const home = useSelector(state => state.home);
  const campaigns = useSelector(state => state.campaigns);
  const appData = useSelector(state => state.appData);
  const loginData = useSelector(state => state.loginData);

  console.log("loginData home: ",loginData);
  const localize = useSelector(state => state.localize);
  const users = useSelector(state => state.picsHomeReducer.users);
  const filtersData = useSelector(state => state.filterWrapperReducer);
  const userInfo = useSelector(state => state.UserInfoReducer)
  const timestamp= useSelector(state => state.timestamp)

  const [state, setstate] = useState({
    index: 1,
    refreshing: false,
    redirectionUrl: undefined,
    filterKey: null,
    showHeader: true,
    renderTab: false,
    position: new Animated.Value(0),
    routes: [
      //Header routes
      {
        index: 1,
        key: 'news',
        icon: ['ios-paper-outline', 'ios-paper'],
        text: 'home.news',
        logo: 'homeNews',
      },
      {
        index: 0,
        key: 'exploreList',
        icon: ['ios-compass-outline', 'ios-compass'],
        text: 'home.explore',
        logo: 'homeExplore',
      },
      // {
      //   index: 2,
      //   key: "bestList",
      //   icon: ["ios-compass-outline", "ios-compass"],
      //   text: "home.best",
      //   logo: "homeExplore",
      // },

      // { index: 2, key: 'participant', icon: ['ios-star-outline', 'ios-star'], text: 'home.stage', logo : 'homeStage' },
      // { index: 3, key: 'user', icon: ['ios-contact-outline', 'ios-contact'], text: 'home.user' },
      // { index: 4, key: 'pics', icon: ['ios-contact-outline', 'ios-contact'], text: 'home.stories' },
    ],
    data: {},
    loaders: {
      news: false,
      explore: false,
      participant: false,
      user: false,
      best: false,
    },
    subHeaderHeight: new Animated.Value(68),
    tab1Height: globals.WINDOW_HEIGHT,
    tab2Height: globals.WINDOW_HEIGHT,
    tab3Height: globals.WINDOW_HEIGHT,
    tab4Height: globals.WINDOW_HEIGHT,
  });

  const newsEndTrigger = useRef(null);
  const exploreEndTrigger = useRef(null);
  const userEndTrigger = useRef(null);
  const participantEndTrigger = useRef(null);
  const bestEndTrigger = useRef(null);
  const newsRefresh = useRef(null);
  const exploreRefresh = useRef(null);
  const bsetRefresh = useRef(null);
  const scrollListRef = useRef(null);
  const newsTop = useRef(null);
  const exploreTop = useRef(null);
  const participantTop = useRef(null);
  const bestTop = useRef(null);

  useEffect((prevProps, prevState) => {
    //Handle Deep Links
    // const { scrollToTop } = navigation.state.params;

    try {
      console.log('filter', 'here');
      let item = {key: 'favourites', value: 'favourites', api: 'favourites'};
      let filterFor = 'HOME_EXPLORE';
      dispatch(resetFilterArr('relevance', filterFor));

      dispatch(
        setFilterPropArr(
          {
            type: 'relevance',
            data: Object.assign({}, item, {value: toLower(item.value)}),
          },
          filterFor,
        ),
      );
    } catch (e) {
      console.log('filter', e);
    }

    Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL().then(url => {
      // console.log("initialurl", url);

      navigate(url);
    });

    // this.homeListener = props.navigation.addListener('didFocus', onScreenFocus)

    dispatch(setAppData({prop: 'homeLoaded', value: true}));

    dispatch(setNavigation({
      navigationType: 'homeTab',
      navigationRoute: props.navigation,
    }));
    dispatch(setNavigation({
      navigationType: 'activeNav',
      navigationRoute: props.navigation,
    }));
    // _homeApis(0);
    _checkAuth();
    getNotificationCounter();
    globals.setUserData('homeChangeTab', _changeTab);

    // const linkUrl = AsyncStorage.getItem("linkUrl");

    // if (linkUrl) {
    //   navigate(linkUrl, true);
    // }
    if (scrollToTop) {
      _onTop();
      // scrollListRef && scrollListRef.scrollTo({ x: 0, y: 0, animated: true })
      navigation.setParams({ scrollToTop: false });
      // NavigationService.reset('tabNav')
    }

    if (
      (loginData.token !== loginData.token ||
        appData.levelPoints !== appData.levelPoints) &&
      state.redirectionUrl !== undefined
    ) {
      navigate(state.redirectionUrl);
    }

   return ()=>{Linking.removeEventListener("url", handleOpenURL);}
    
  }, []);

 const  handleOpenURL = (event) => {
    navigate(event.url ? event.url : event);
  };

 const navigate = (url, removeUrl = false) => {

    // console.log("Url", url);

    if (url) {
      // if (globals.getUserData("loginValidated")) {
      //   setState({ navigateUniversalLinker: url });
      //   return;
      // }

      const dataObj = helpers.linkNavigator(url);

      if (dataObj !== null) {
        const { screen, data } = dataObj;

        removeUrl && AsyncStorage.removeItem("linkUrl");

        // console.log("Screen", screen, data);

        if (screen === globals.LINK_SCREENS.Campaign) {
          loginData.token
            ? _naviagteLinkCampagin(data.slug)
            : setstate({ ...state,redirectionUrl: url });
          return;
        }

        switch (screen) {
          case globals.LINK_SCREENS.Profile:
            appData.levelPoints
              ? navigation.navigate(screen, { userInfo: data })
              : setstate({ ...state,redirectionUrl: url });

          case globals.LINK_SCREENS.Media:
            loginData.token
              ? navigation.navigate(screen, {
                item: { id: data.id, type_of_activity: data.type },
              })
              : setstate({ ...state,redirectionUrl: url });

          case globals.LINK_SCREENS.Participant:
            loginData.token
              ? navigation.navigate(screen, {
                item: {
                  id: data.id,
                  type_of_activity: data.type,
                },
              })
              : setstate({ ...state, redirectionUrl: url });

          default:
            return;
        }
      }
    }
  };

const  _naviagteLinkCampagin = (campaignSlug) => {
    

    let cb = {
      success: (res) => {
        if (find(campaigns["extra"], (dt) => dt._id === res.data._id)) {
          dispatch(setCampaignProp({
            prop: "extra",
            arr: map(campaigns["extra"], (dt) =>
              dt._id === res.data._id ? Object.assign({}, dt, res.data) : dt,
            ),
          }));
        } else if (campaigns["extra"] === null) {
         dispatch( setCampaignProp({ prop: "extra", arr: [res.data] }));
        } else {
         dispatch( pushCampaignProp({ prop: "extra", arr: [res.data] }));
        }

        navigation.navigate("CompanyCampaign", {
          campaignInfo: res.data,
          apiType: "extra",
        });
      },
      error: (e) => { },
      complete: () => props.loader.hideLoader(),
    };

    let header = helpers.buildHeader({ authorization: loginData.token });
    //props.loader.load();
    API.getCamapignInfo({}, cb, header, campaignSlug);
  };

 const _getStaticInfo = (token) => {
    let cb = {
      success: (res) => {
        res.data.adId &&
         dispatch( setAppData({
            prop: "adId",
            value: res.data.adId,
          }));

        res.data.levelDiff &&
          dispatch(setAppData({
            prop: "levelDiff",
            value: res.data.levelDiff,
          }));

        res.data.levelPoints &&
         dispatch( setAppData({
            prop: "levelPoints",
            value: res.data.levelPoints,
          }));
      },
      error: (e) => { },
      complete: () => {
        // state.redirectionUrl !== undefined
        //   ? navigate(state.redirectionUrl)
        //   : null;
      },
    };

    let header = helpers.buildHeader({
      authorization: token ? token : loginData.token,
    });
    API.getStaticInfo({}, cb, header);
  };

 const  _getUserInfo = () => {

    if (!userInfo.username) {

      let cb = {
        success: (res) => {
          loader.hideLoader();
          dispatch(setUserInfo(res.data));
          if (res.data.socialNetworks)
            dispatch(setOtherSocialConnect(res.data.socialNetworks));
          else {
            dispatch(resetOtherSocialConnect());
          }
        },
        error: (e) => { },
        complete: () => loader.hideLoader(),
      };
      //loader.load();
      let header = helpers.buildHeader({ authorization: loginData.token });
      API.getUserInfo({}, cb, header, loginData.username);
    }
  };

 function scrollToTop() {
    scrollListRef.current &&
      scrollListRef.scrollTo({ x: 0, y: 0, animated: true });
  }

  function scrollToEnd() {
    scrollListRef.current && scrollListRef.scrollToEnd();
  }

 const onScreenFocus = () => {

    if (refresh) {
      setstate({ ...state,index: 1 });
      exploreRefresh();
      navigation.setParams({ refresh: false });
    }
  };  

 const _checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    var userInfo = jwtDecode(token);
    _joinMessageRoom(userInfo.id);

    if (globals.getUserData("loginValidated")) {
      _homeApis(1);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      _homeApis(1, false, userInfo.id);

      dispatch(setLoginData(userInfo));

      token !== null && _getStaticInfo(token);
      if (token !== null) {
        let cb = {
          success: (result) => {
            // loader.hideLoader();
            if (result.success) {
              var userInfo = jwtDecode(token);

              dispatch(setLoginData(
                Object.assign({}, userInfo, {
                  token: token,
                  language: result.data.language,
                  isPrivate: result.data.isPrivate,
                  profileUrl: result.data.profileUrl,
                }),
              ));
              AsyncStorage.setItem("language", result.data.language);
              dispatch(setTranslation(globals.LANG_ARR[result.data.language]));
            }
          },
          error: () => {
            // loader.hideLoader()
            // NavigationService.navigate('rootNav', 'Login');
          },
          complete: () => {
            loader.hideLoader();
            globals.setUserData("loginValidated", true);
          },
        };
       // loader.load();
        let header = helpers.buildHeader({ authorization: token });
        API.validateToken({}, cb, header);
      }
    } catch (error) {
      // console.log({ error });
    }
  };

 const checkUpdate = (token) => {
    VersionCheck.needUpdate().then(async (res) => {
      // console.log({ res });
      if (res.isNeeded) {
        Alert.alert(
          "Latest Update of app Available",
          "Please update ",
          [
            {
              text: "Update",
              onPress: () => {
                Platform.OS === "ios"
                  ? Linking.openURL(
                    "https://apps.apple.com/us/app/picstagraph/id1478106689?ls=1",
                  )
                  : Linking.openURL(res.storeUrl);

                _logout();
              },
            },
          ],
          { cancelable: false },
        );
      } else {
        _updateUserInfoForceUpdate(token);
      }
    });
  };

  const _updateUserInfoForceUpdate = (token) => {

    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: (res) => { },
      error: (err) => {
        // console.log({ err });
      },
    });
    // loader.load();
    let header = helpers.buildHeader({ authorization: token });
    const data = {};
    data.isForceUpdate = false;

    API.userInfoUpdate(data, cb, header);
  };

 const  _logout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("firebaseToken");
    // NavigationService.navigate('rootNav', 'Login');
    NavigationService.resetToView("rootNav", "LandingPage");
  };
  
  const setNewsEndTrigger = (ref) => (newsEndTrigger = ref);

  const setExploreEndTrigger = (ref) => (exploreEndTrigger = ref);

  const setBestEndTrigger = (ref) => (bestEndTrigger = ref);

  const setUserEndTrigger = (ref) => (userEndTrigger = ref);

  const setParticipantEndTrigger = (ref) => (participantEndTrigger = ref);

  const setNewsRefresh = (ref) => (newsRefresh = ref);

  const setExploreRefresh = (ref) => (exploreRefresh = ref);

  const setBestRefresh = (ref) => (bsetRefresh = ref);

  const setUserRefresh = (ref) => (userRefresh = ref);

  const setParticipantRefresh = (ref) => (participantRefresh = ref);

  const setExploreTop = (ref) => (exploreTop.current = ref);

  const setBestTop = (ref) => (bestTop = ref);

  const setParticipantTop = (ref) => (participantTop = ref);

  const setNewsTop = (ref) => (newsTop.current = ref);

 const checkPostScroll = (e) => {
    const videosRef = globals.getUserData("videosRef");
    const realData = uniqBy(videosRef, (dt) => dt.idRef);

    realData.map((item) => {
      if (item.viewRef) {
        item.viewRef.measure((x, y, width, height, pageX, pageY) => {
          if (
            pageY < globals.WINDOW_HEIGHT / 2 &&
            pageY > 0 &&
            item.videoRef.state.videoProps.paused
          ) {
            item.videoRef.startVideo();
          } else if (
            pageY > globals.WINDOW_HEIGHT / 2 &&
            !item.videoRef.state.videoProps.paused
          ) {
            item.videoRef.pausVideo();
          }
        });
      }
      return null;
    });

    const { index } = state;
    if (index === 1) {
      newsEndTrigger(e);
    } else if (index === 0) {
      exploreEndTrigger();
    } else if (index === 2) {
      bestEndTrigger();
    } else if (index === 3) {
      userEndTrigger();
    }
  };
 const _onTop = () => {

    if (state.index === 1) {
      // setNewsTop();
    } else if (state.index === 0) {
      //exploreTop();
    } else if (state.index === 2) {
      bestTop();
    }
  };

 const _onRefresh = () => {

    if (state.index === 0) {
      newsRefresh();
    } else if (state.index === 1) {
      exploreRefresh();
    } else if (state.index === 2) {
      bsetRefresh();
    } else if (state.index === 3) {
      userRefresh();
    }
  };

 const getNotificationCounter = async () => {

    try {
      let cb = {
        success: (result) => {
          dispatch(setAppData({
            prop: "unreadMessages",
            value: result.data.unreadMessageCount,
          }));
         dispatch( setAppData({
            prop: "unreadNotifications",
            value: result.data.notificationCount,
          }));
        },
        error: () => {
         dispatch( setAppData({ prop: "unreadMessages", value: 0 }));
          dispatch(setAppData({ prop: "unreadNotifications", value: 0 }));
        },
      };
      const token = await AsyncStorage.getItem("token");
      let header = helpers.buildHeader({ authorization: token });
      API.getNotificationCounter({}, cb, header);
    } catch (err) {
      // console.log({ error });
    }
  };

 const _getFilters = () => {

    return helpers.buildFilterUrl(
      state.index === 0
        ? FILTERS_FOR.HOME_EXPLORE :
        FILTERS_FOR.HOME_PARTICIPANT,
      // index === 0
      //   ? FILTERS_FOR.HOME_EXPLORE :
      //     index === 1
      //     ? FILTERS_FOR.HOME_PARTICIPANT :
      //     index === 2
      //       ? FILTERS_FOR.RELEVANCE  : null,
      filtersData,
      FILTERS_TYPES,
      
    );
  };

 const  _renderIcon = ({ route }) => {

    let active = route.index == state.index;
    let icon = active ? route.icon[0] : route.icon[0];
    let color = active ? colors.gray : colors.lightDark;
    return <_Icon type="Ionicons" icon={icon} size={24} color={color} />;
  };

  const _renderTabHeader = () => {
    return (
      <View>
        <TabHeader
          routes={state.routes}
          index={state.index}
          changeTab={(i) =>_changeTab(i)}
        />
      </View>
    );
  };
  
 const _renderTab = () => {

    return (
      <TabHeader
        routes={state.routes}
        index={state.index}
        styles={{ width: '100%' }}
        tabWidth={"100%"}
        changeTab={(i) => _changeTab(i)}
        itemStyle={{ paddingTop: 0 }}
      />
    );
  };

 const  _renderTabBar = () => {

    const filterForArr = [
      FILTERS_FOR.HOME_EXPLORE,
      FILTERS_FOR.HOME_PARTICIPANT,
      FILTERS_FOR.DEFAULT,
      FILTERS_FOR.HOME_USER,
      FILTERS_FOR.HOME_BEST,
    ];
    return (
      <View>
        {state.index === 3 ? (
          <ViewStory
            storyViewHeight={(storyHeight) => setstate({...state, storyHeight: storyHeight})}
            navigation={props.navigation}
            homeIndex={state.index}
          />
        ) : (
            <FilterModal
              changeTabs={true}
            unselectDB={(type) => {
              dispatch(resetFilterArr(type, filterForArr[state.index]));
              setTimeout(() => {
                _homeApis(state.index, true);
              }, 1000);
            }}
            filterFor={filterForArr[state.index]}
            openModal={(key) => {
              setstate({ ...state,filterKey: key,});
              _showFilter();
            }}
          />
        )}
      </View>
    );
  };
  
function setHeight(idx, height) {
    switch (idx) {
      case 0:
        setstate({ ...state,tab1Height: height });
        break;
      case 1:
        setstate({ ...state,tab2Height: height });
        break;
      case 2:
        setstate({...state, tab3Height: height });
        break;
      case 3:
        setstate({...state, tab4Height: height });
        break;
      default:
        break;
    }
  }

  const layoutChange = (layout, index) => {
    if (index == state.index) {
      const height = layout.height;

      if (height < globals.WINDOW_HEIGHT) {
        setstate({...state, tabHeight: globals.WINDOW_HEIGHT });
      } else {
        setstate({...state, tabHeight: height });
      }
    }
  };

   // !This function not used in code
  // const _renderTabs = ({ route }) => {


  //   switch (route.key) {
  //     case "news":
  //       return (
  //         <View style={{ paddingBottom: 2 }}>
  //           <TabHeader
  //             routes={routes}
  //             index={state.index}
  //             changeTab={(i) => _changeTab(i)}
  //           />
  //           <ViewStory navigation={props.navigation} homeIndex={state.index} />
  //         </View>
  //       );
  //     case "explore":
  //       return (
  //         <View
  //           onLayout={(dim) => layoutChange(dim.nativeEvent.layout, 1)}>
  //           <Explore
  //             postNavigate={_postNavigate}
  //             loading={state.loaders.explore}
  //             onScroll={null}
  //             getFilters={_getFilters}
  //             activeTab={state.index}
  //             setExploreEndTrigger={setExploreEndTrigger}
  //             setExploreRefresh={setExploreRefresh}
  //             scrollToTop={() => scrollToTop()}
  //             scrollToEnd={() => scrollToEnd()}
  //             {...props}
  //           />
  //         </View>
  //       );
  //     case "user":
  //       return (
  //         <View
  //           onLayout={(dim) => layoutChange(dim.nativeEvent.layout, 3)}>
  //           <User
  //             setUserRef={setUserRef}
  //             postNavigate={_postNavigate}
  //             loading={state.loaders.user}
  //             onScroll={null}
  //             getFilters={_getFilters}
  //             activeTab={state.index}
  //             setUserEndTrigger={setUserEndTrigger}
  //             setUserRefresh={setUserRefresh}
  //             scrollToTop={() => scrollToTop()}
  //             scrollToEnd={() => scrollToEnd()}
  //             {...props}
  //           />
  //         </View>
  //       );
  //     case "participant":
  //       return (
  //         <View
  //           onLayout={(dim) => layoutChange(dim.nativeEvent.layout, 2)}>
  //           <Participant
  //             postNavigate={_postNavigate}
  //             loading={state.loaders.participant}
  //             getFilters={_getFilters}
  //             activeTab={state.index}
  //             setParticipantEndTrigger={setParticipantEndTrigger}
  //             setParticipantRefresh={setParticipantRefresh}
  //             scrollToTop={() => scrollToTop()}
  //             scrollToEnd={() => scrollToEnd()}
  //             {...props}
  //           />
  //         </View>
  //       );
  //     case "best":
  //       return (
  //         <View
  //           onLayout={(dim) => layoutChange(dim.nativeEvent.layout, 1)}>
  //           <Best
  //             postNavigate={_postNavigate}
  //             loading={state.loaders.explore}
  //             onScroll={null}
  //             getFilters={_getFilters}
  //             activeTab={state.index}
  //             setBestEndTrigger={setBestEndTrigger}
  //             setBestRefresh={setBestRefresh}
  //             scrollToTop={() => scrollToTop()}
  //             scrollToEnd={() => scrollToEnd()}
  //             {...props}
  //           />
  //         </View>
  //       );
  //     default:
  //       return null;
  //   }
  // };
 const _naviagteCampagin = (postInfo) => {
    const campaignSlug = postInfo.slug;

    let cb = {
      success: (res) => {
        if (find(home.news, (dt) => dt._id === res.data._id)) {
         dispatch(setHomeDataProp({
            prop: "news",
            arr: map(home.news, (dt) =>
              dt._id === res.data._id ? Object.assign({}, dt, res.data) : dt,
            ),
          }));
        }
        props.navigation.navigate("CompanyCampaign", {
          campaignInfo: res.data,
          news: true,
        });
      },
      error: (e) => { },
      complete: () => props.loader.hideLoader(),
    };
    let header = helpers.buildHeader({ authorization: loginData.token });
    //props.loader.load();
    API.getCamapignInfo({}, cb, header, campaignSlug);
  };

 const _postNavigate = (obj) => {
    let postType = helpers.buildPostType(obj.postType, obj.userType || "");
    let nav;

    if (postType === POST_TYPES.CompanyParticipantCampaign) {
      nav = (postInfo) => {
        props.navigation.navigate("CampaignParticipant", {
          postInfo: postInfo,
        });
      };
    }
    if (postType === POST_TYPES.Campaign) {
      nav = (postInfo) => {
        // _naviagteCampagin(postInfo);
        props.navigation.navigate("CompanyCampaign", {
          campaignInfo: postInfo
        });
      };
    }
    if (
      postType === POST_TYPES.CreatorCampaign ||
      postType === POST_TYPES.Blog
    ) {
      nav = (postInfo) => {
        props.navigation.navigate("CreatorCampaign", {
          campaignInfo: postInfo,
        });
      };
    }
    if (postType === POST_TYPES.MediaPost || postType === POST_TYPES.Userpost) {
      nav = (postInfo) => {
        props.navigation.navigate("MediaPost", {
          postInfo: postInfo,
        });
      };
    }
    if (postType === POST_TYPES.Advertise) {
      nav = (postInfo) => {
        props.navigation.navigate("Advertise", {
          postInfo: postInfo,
        });
      };
    }
    obj = Object.assign({ navigateToFullView: nav }, obj);
    return obj;
  };

  const _showFilter = () => filter.current.show();

  const _hideFilter = () => filter.current.hide();

 const _changeTab = (index, force = true, getStories = false) => {
    console.log(index)
    // if (index === 1) { 
    // helpers.pauseVideo();
    // }
    helpers.pauseVideo();

    if (force) {
      console.log("hee")
      if (state.index === index && [1, 2, 3].includes(index)) {
        if (index === 0) dispatch(resetFilters("HOME_EXPLORE"));
        else if (index === 1) dispatch(resetFilters("HOME_PARTICIPANT"));
        else if (index == 2) {
          // props.resetFilters("HOME_BEST");
          setstate({...state, index: index}, () => _homeApis(index, true));
        }
        setstate({...state, index:index }, () => _homeApis(index, true));
      }
      // else if (index === 2) {
      //   setState({ index }, () => _homeApisBest(index));
      // }
      else {

        setstate({ ...state, index:index }, () => _homeApis(index));
      }
    } else if (getStories) {
      setstate({...state, index:index }, () => _homeApis(index, false, null, true));
    } else {
      setstate({...state, index:index });
    }
  };

 const _homeApis = (index, forceCall = false, userId = null, getStories = false) => {
   

    let apiType = "";
    if (index == 0) apiType = state.routes[1].key
    else if (index == 1) apiType = state.routes[0].key
    else apiType = state.routes[index].key
    let filterStr = _getFilters();
    console.log("apiType", apiType,filterStr);
    let callApi =
      home[apiType] === null || home[apiType].length == 0 ? true : false;

    if ((callApi || forceCall) && !getStories) {
     dispatch( setRefreshIndicator(true));
      ApiCall.getHomeData(apiType, 1, filterStr, {
        mediaPage: 1,
        stagePage: 1,
        id: userId != null ? userId : loginData.id,
      })
        .then((res) => {
          console.log("homeApiRes", res);
          
          if (apiType === "news") {
            // setTimestampData('news', res.timestamp)
            dispatch(setHomeDataProp({ prop: apiType, arr: res.data }));
            dispatch(setPagination(res.pagination, "newsfeed"));
            dispatch(setRefreshIndicator(false));
          } else if (apiType === "exploreList") {
            dispatch(setPagination(res.pagination, "homeExplore"));
            dispatch(setTimestampData("explore", res.timestamp));
            console.log("griddata", res)
            dispatch(setHomeDataProp({ prop: apiType, arr: [] }));
            const updatedData = map(res.data, (mx) => {
              return Object.assign({}, mx, {
                mediaPage: res.pagination.mediaPage,
                stagePage: res.pagination.stagePage,
              });
            });
            dispatch(setHomeDataProp({ prop: apiType, arr: updatedData }));
            dispatch(setRefreshIndicator(false));
          } else if (apiType === "participant") {
            dispatch(setHomeDataProp({ prop: apiType, arr: res.data }));
            dispatch(setPagination(res.pagination, "homeParticipant"));
            dispatch(setRefreshIndicator(false));
          } else if (apiType === "bestList") {
            console.log("newCode")
            dispatch(setPagination(res.pagination, "homeBest"));
            dispatch(setTimestampData("best", res.timestamp));
            const updatedData = map(res.data, (mx) => {
              return Object.assign({}, mx, {
                mediaPage: res.pagination.mediaPage,
                stagePage: res.pagination.stagePage,
              });
            });
            dispatch(setHomeDataProp({ prop: apiType, arr: updatedData }));
            dispatch(setRefreshIndicator(false));
          }
        })
        .catch((e) => {
          dispatch(setHomeDataProp({ prop: apiType, arr: [] }));
          dispatch(setRefreshIndicator(false));

        });
    }

    if (apiType == "news" && users.subscribedData === null) {
      ApiCall.getHomeData("pics", 1, "", {
        isSubscribe: true,
        id: userId != null ? userId : loginData.id,
      })
        .then((res) => {
          dispatch(setPicsUserHomeData(
            res.data,
            "subscribedData",
            loginData.id,
          ));
          _newStories("subscribed", res.timestamp);
          // setPicsUserHomeData(res.data, 'subscribedData', props.loginData.id, true);

          dispatch(setPagination(res.pagination, "subscribedStory"));
          dispatch(setStoryRefreshIndicator(false));
          dispatch(setTimestampData("subscribedStory", res.timestamp));
        })
        .catch((e) => {
          dispatch(setPicsUserHomeData([], "subscribedData", loginData.id));
          dispatch(setStoryRefreshIndicator(false));
        });
    }
  };

 const _newStories = (apiType, timest = null) => {
   

    if (apiType == "subscribed") {
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
        .catch((err) => {
          users.exploreData === null
            ? dispatch(setPicsUserHomeData([], "exploreData", loginData.id))
            : null;
          dispatch(setStoryRefreshIndicator(false));
        });
    }
  };

  const _joinMessageRoom = (userId) => {
    messageSocket.join(null, null, userId);

    messageSocket.connect("Noti Home", (data) => {

      if (loginData.id !== data.senderId) {
        dispatch(setAppData({
          prop: "unreadMessages",
          value: appData?.unreadMessages + 1,
        }));
      }
    });
  };

  // !This function not used in code
 const renderMessageNotification = () => {

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("MessagesHome")}
        style={styles.msgNotify}>
        <Text style={{ color: "#fff" }}>{appData?.unreadMessages}</Text>
      </TouchableOpacity>
    );
  };

 const renderTab = () => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "tranparant" }}
        //renderIcon={_renderIcon}
        renderLabel={({ route, focused, color }) => (
          <View style={mainStyles.tabItem}>
            <_Lang style={{ color, ...sty.padV10 }} text={route.text} />
          </View>
        )}
        style={mainStyles.tabWrap}
      />
    );
  };

 const  _storyIconOnPress = () => { };
  const _userNaviagte = () => {
    navigation.navigate("User", {});
    // NativeModules.DevMenu.show();
  };
 const _customTabs = () => {

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <TabHeader
            routes={state.routes}
            index={state.index}
            styles={{ width: getTabWidth(1) }}
            tabWidth={getTabWidth(2)}
            changeTab={(i) => _changeTab(i)}
            itemStyle={{ paddingTop: 0 }}
          />
        </View>
        {/* <View style={{ flex:0.1}}>
        <TouchableOpacity
          onPress={() => {
              index == 0 ? _showFilter() : props.navigation.navigate("User", { forceRedirect: false }) ;
          }}>
          <FastImage
              source={index == 1 ? images.OrgContest : images.filter}
            style={{ height: 25, width: 25 }}
            resizeMode="contain"
          />
          </TouchableOpacity>
          </View> */}
      </View>
    )
  }

 const searchUser = () => {
    navigation.navigate("User", { forceRedirect: false })
  }
 const navProfile = () => {
    navigation.navigate("Profile", { scrollToTop: true })
  }
 const checkIphoneXR = () => {
    return (
      Platform.OS === "ios" && (WINDOW_HEIGHT >= 812 || WINDOW_WIDTH >= 812)
    );
  };

  let iconArr = [, , images.menu, images.menu];
    // let iconArr = [, , images.menu, images.menu];
    let rightHideArr = [false, false, false, false];
    let rightNavArr = [
      () => {
        navigation.navigate("MessagesHome");
      },
      () => {
        _showFilter();
      },
      () => {
        _showFilter();
      },
      () => {
        _showFilter();
      },
    ];


    const header = {
      hideLeft: true,
      leftCb: () => {
        navigation.navigate("User", { forceRedirect: false });
      },
      leftImg: images.OrgContest,
      // leftIconArr: ["ios-add-circle-outline", "Ionicons"],
      titleImgUrl: images.PicstaLogoBlack, //images.logo,  
      // titleImgUrl: images.logoTransparent,          //images.logoTransparent,
      hideRight: rightHideArr[state.index],
      rightCb: rightNavArr[state.index],
      
      rightNewIconArr: state.index == 1 ? [images.OrgContest] : [images.filter],
    
      isRightComponent: false,
     
    };

    const filterForArr = [
      FILTERS_FOR.HOME_EXPLORE,
      FILTERS_FOR.HOME_PARTICIPANT,
      FILTERS_FOR.DEFAULT,
      FILTERS_FOR.HOME_USER,
      FILTERS_FOR.HOME_BEST,
    ];

    console.log('state.index : Home : ', state.index)

  return (
    <_Layout
        screen={"home"}
        // header={header}
        // customHeader={()=>_customTabs()}
        renderSocialShare={true}
        headerWrapStyle={{ margin: 0 }}
        headerLeftSide={true}
        style={{ backgroundColor: "#fff" }}>
        {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
        <TopHeader navigation={navigation} />

        {/* <View style={{ marginTop: Platform.OS == "android" ? 20 : 40, marginBottom: 5 ,flexDirection:"row"}} >
          <TouchableOpacity onPress={() => navProfile()}>
          <View 
            style={{
              borderwidth: 1,
            }}>
            <Image
              source={images.user}
              defaultSource={images.user}
              style={{
                height:40,
                width: 40,
                margin:5,
                resizeMode: 'contain',
                borderRadius: 1000,
              }}
            />
            </View>
          </TouchableOpacity>
          <Item style={styles.searchBar} onPress={() => searchUser()}>
            <FastImage resizeMode="contain" style={{ height: 15, width: 15 }} source={images.iconSearchGrey} />
            <Text
              style={{ ...sty.padV5, marginLeft: 10,color:'grey',fontSize:15 }}
            > User search</Text>
          </Item>
        </View> */}
        {_customTabs()}

        {state.index === 1 ? (
          <News
            postNavigate={_postNavigate}
            loading={state.loaders.news}
            onScroll={null}
            activeTab={state.index}
            // setNewsTop={setNewsTop}
            // header={_renderTabBar()} //Stories View hidden
            tabHeader={_renderTabHeader}
            // setNewsEndTrigger={setNewsEndTrigger}
            // setNewsRefresh={setNewsRefresh}
            // scrollToTop={() => scrollToTop()}
            // scrollToEnd={() => scrollToEnd()}
            {...props}
            storyHeight={state.storyHeight}
          />
        ) : null}
        {state.index === 0 ? (
          <Explore
            postNavigate={_postNavigate}
            loading={state.loaders.explore}
            onScroll={null}
            getFilters={_getFilters}
            activeTab={state.index}
            setExploreTop={setExploreTop}
            header={_renderTabBar}
            // tabHeader={_renderTabHeader}
            // setExploreEndTrigger={setExploreEndTrigger}
            // setExploreRefresh={setExploreRefresh}
            // scrollToTop={() => scrollToTop()}
            // scrollToEnd={() => scrollToEnd()}
            {...props}
          />
        ) : null}
        {/* {index === 2 ? (
          <Best
            postNavigate={_postNavigate}
            loading={loaders.best}
            onScroll={}
            getFilters={_getFilters}
            activeTab={index}
            setBestTop={setBestTop}
             header={_renderTabBar()}
            // tabHeader={_renderTabHeader}
            // setExploreEndTrigger={setExploreEndTrigger}
            // setExploreRefresh={setExploreRefresh}
            // scrollToTop={() => scrollToTop()}
            // scrollToEnd={() => scrollToEnd()}
            {...props}
          />
        ) : // <Participant
        //   postNavigate={_postNavigate}
        //   loading={loaders.participant}
        //   getFilters={_getFilters}
        //   activeTab={index}
        //   setParticipantTop={setParticipantTop}
        //   // setParticipantEndTrigger={setParticipantEndTrigger}
        //   // setParticipantRefresh={setParticipantRefresh}
        //   // scrollToTop={() => scrollToTop()}
        //   // scrollToEnd={() => scrollToEnd()}
        //   {...props}
        // />
        null} */}
        <_Filter
          ref={filter}
          filterFor={filterForArr[state.index]}
          filterKey={state.filterKey}
          filterDataApi={() => _homeApis(state.index, true)}
          singleSelect={[
            FILTERS_TYPES.CATEGORY,
            FILTERS_TYPES.OFFERTAG,
            FILTERS_TYPES.INQUIRYTAG,
          ]}
        />
      </_Layout>
  );
};

// export default Home;
export default mainLayoutHoc({ home: true })(Home);
