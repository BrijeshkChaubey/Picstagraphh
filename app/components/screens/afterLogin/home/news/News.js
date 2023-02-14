import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  FlatList,
  Platform,
  Text,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  BaseItemAnimator,
} from 'recyclerlistview';
import NewUserFollowingCard from '../../../../custom/FollowingNewUserCard/NewUserFollowingCard';

import {
  globals,
  helpers,
  sty,
  ApiCall,
  images,
  fonts,
} from '../../../../../configs';
import {
  _GradiantView,
  _Lang,
  _ContentType,
  _InlineLoader,
} from '../../../../custom';
import mainStyles from '../../../../../assets/styles/MainStyles';
import {styles} from './styles';
import {setActiveVideo} from '../../../../../redux/actions/VideoAction';
import {
  setHomeDataProp,
  pushHomeDataProp,
  setRefreshIndicator,
} from '../../../../../redux/actions/HomeActions';
import {
  setPicsUserHomeData,
  setPicsValue,
} from '../../../../../redux/actions/PicsHomeActions';
import {setTimestampData} from '../../../../../redux/actions/TimestampAction';
import {setOtherProfileNewsfeed} from '../../../../../redux/actions/OtherProfileActions';
import {setParticipantProp} from '../../../../../redux/actions/CompanyParticipantAction';
import {setUserInfo} from '../../../../../redux/actions/UserInfoAction';
import {
  setCampaignProp,
  pushCampaignProp,
} from '../../../../../redux/actions/CampaignsActions';
//ContentBox actions
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  setAppData,
  pushAppData,
} from '../../../../../redux/actions/AppDataActions';
import {
  pushProfileDataProp,
  setProfileDataProp,
} from '../../../../../redux/actions/ProfileAction';
import {setPagination} from '../../../../../redux/actions/PaginationActions';
import {uniqBy} from 'lodash';
import NativeAd from '../../../../custom/ContentTypes/common/NativeAd';
import {ON_LOAD} from '../../../../custom/ContentTypes/common/_AutoHeightImage';
import {useDispatch, useSelector} from 'react-redux';
const ViewTypes = {
  FULL: 0,
};

class ItemAnimator extends BaseItemAnimator {
  constructor(listHasMountedProp) {
    super();
    listHasMountedProp = listHasMountedProp;
  }
  animateDidMount(atX, atY, itemRef, itemIndex) {
    //no need
    listHasMountedProp();
  }
}


const News = (props) => {
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const pagination = useSelector(
    state => state.pagination.HomeBest.bestPagination,
  );
  const filtersData = useSelector(
    state => state.otherProfile.otherProfileNewsfeed,
  );
  const otherProfileNewsfeed = useSelector(
    state => state.otherProfile.otherProfileNewsfeed,
  );
  const navProps = useSelector(state => state.navProps);
  const appData = useSelector(state => state.appData);
  const loginData = useSelector(state => state.loginData);
  const localize = useSelector(state => state.localize);
  const profile = useSelector(state => state.profile);
  const campaigns = useSelector(state => state.campaigns);
  const userInfo = useSelector(state => state.userInfo);
  const timestamp = useSelector(state => state.timestamp);
  const users = useSelector(state => state.picsHomeReducer.users);

  focusListener = null;
  // const {setNewsTop} = props;

  let {width, height} = Dimensions.get('window');

  const [state, setstate] = useState({
    loading: false,
    listLoading: false,
    refreshing: false,
    refreshStories: false,
    activeTab: 0,
    currentIndex: 0,
    setFirstIndexinPlace: false,
    changedItem: 0,
    visible: true,
  });
  let viewabilityConfig = {
    minimumViewTime: 500,
    viewAreaCoveragePercentThreshold: 10,
  };
  const listLoading = useRef(false);
  const listEnded = useRef(false); 
  const scrollListRef = useRef(null);
  const newsRef = useRef({});
  const offset =useRef(0);

  let _layoutProvider = new LayoutProvider(
    index => {
      // const height = Image.getSize(data[index].listMediaUrl, (width, height) => {return height });

      return index;
    },
    (type, dim) => {
      dim.width = width - 10;
      dim.height = height;
    },
  );
  postArr = [];
  test = [];

  useEffect(() => {
    scrollToTop;

    globals.setUserData('homeNewsfeedLoad', _onRefresh);
    setTimeout(() => {
      setstate({...state,visible: false});
    }, 2000);

    // setNewsEndTrigger(listNewsTrigger);
    // setNewsRefresh(_onRefresh)

    focusListener = props.navigation.addListener('didFocus', () => {
      if (home?.news?.length > 0) {
       dispatch( setActiveVideo(home?.news[0]?.id));
      }
    });

    return () => {
      focusListener?.remove();
      globals.setUserData('viewedPostsArr', []);
      dispatch(setActiveVideo(''));
    };
  }, []);

  function getDerivedStateFromProps (nextProps) {
    if (nextProps.activeTab !== state.activeTab) {
      return {
        activeTab: nextProps.activeTab,
      };
    }
    return null;
  };

  const listNewsTrigger = e => {
    ApiCall.initiatePostView(newsRef, home.news, {...props});
    helpers.videoPlayToggle();
  };

  const _filterHashtag = hashtag => {
    setTimeout(() => {
      dispatch(
        setFilterPropArr(
          {type: globals.FILTERS_TYPES.HASHTAG, data: hashtag},
          globals.FILTERS_FOR.HOME_EXPLORE,
        ),
      );
    }, 200);
    setTimeout(() => {
      _onRefresh();
    }, 500);
  };

  const viewOnScroll = () => {
    ApiCall.initiatePostView(newsRef, home.news, {...props});
  };

  const _keyExtractor = (item, index) => 'NewsTab_' + index.toString();

  const _renderItems = ({item, index}) => {
    //var item = data;

    item = props.postNavigate(item);


    return (
      <>
        <View
          key={'NewsList_'}
          ref={ref => (newsRef[item._id] = ref)}
          renderToHardwareTextureAndroid={state.renderTexture}
          style={{width: globals.WINDOW_WIDTH}}>
          {/* {console.log('item', item)} */}
          <_ContentType
            itemKey={'NewsTab_Item_' + index.toString()}
            contentInfo={item}
            index={index}
            {...props}
            NewsList={true}
          />
        </View>
        {/* {(index + 1) % 7 === 0 && appData.adId ? (
            <NativeAd
              adId={
                Platform.OS === "ios"
                  ? appData.adId.iosPostId
                  : appData.adId.androidPostId
              }
            />
          ) : null} */}
      </>
    );
  };

  const scrollToTop = offsetValue => {
    scrollListRef.current &&
      scrollListRef.scrollToOffset({
        offset: offsetValue || 0,
        animated: true,
      });

    // scrollListRef && scrollListRef.scrollToIndex({ index: 0, viewPosition: 0, animated: true })
  };

  const _onRefresh = (top = true, callStories = false, callNew = false) => {
    setstate({...state, setFirstIndexinPlace: false});
    top ? scrollToTop(0) : null;
    dispatch(setRefreshIndicator(true));
    // helpers.videoPlayToggle(); // ApiCall.getHomeData('news', 1, '', { id: loginData.id, timestamp: callNew ? '' : timestamp['news'] }).then((res) => {
    ApiCall.getHomeData('news', 1, '', {id: loginData.id})
      .then(res => {
        dispatch(setHomeDataProp({prop: 'news', arr: res.data}));
        dispatch(setPagination(res.pagination, 'newsfeed'));
        dispatch(setRefreshIndicator(false));
      })
      .catch(e => {
        home.news === null &&
          dispatch(setHomeDataProp({prop: 'news', arr: []}));
        dispatch(setRefreshIndicator(false));
      });

    if (callStories) {
      ApiCall.getHomeData('pics', 1, '', {
        isSubscribe: true,
        id: loginData.id,
        timestamp: timestamp.subscribedStory,
      })
        .then(res => {
          if (res.data.length > 0) {
            const newData = helpers.storyAdder(res.data, users.subscribedData);

            dispatch(
              setPicsUserHomeData(newData, 'subscribedData', loginData.id),
            );
          }

          !users.callSubscribed
            ? dispatch(setPicsValue('callSubscribed', true))
            : null;
          // setPicsUserHomeData(res.data, 'subscribedData', loginData.id, true);
          dispatch(setPagination(res.pagination, 'subscribedStory'));
          dispatch(setRefreshIndicator(false));
        })
        .catch(e => {
          users.subscribedData === null &&
            dispatch(setPicsUserHomeData([], 'subscribedData', loginData.id));
          dispatch(setRefreshIndicator(false));
        });
    }
  };

  const _renderMore = () => {
    if (listLoading === false) {
      listLoading = true;

      setstate(
        prevState => ({
          ...prevState,
          listLoading: true,
        }),
        () => {
          if (pagination.page + 1 > pagination.pages) {
            listEnded = true;
            setstate(prevState => ({...prevState, listLoading: false}));
            listLoading = false;
          } else {
            let activePage = pagination.page;

            ApiCall.getHomeData('news', ++activePage, '', {id: loginData.id})
              .then(res => {
                dispatch(pushHomeDataProp({prop: 'news', arr: res.data}));
                dispatch(setPagination(res.pagination, 'newsfeed'));
                setstate(prevState => ({...prevState, listLoading: false}));
                listLoading = false;
              })
              .catch(e => {
                setstate(prevState => ({...prevState, listLoading: false}));
                listLoading = false;
              });
          }
        },
      );
    }
  };

  _onPostScroll = e => {};

  // handleMethod = (items) => {
  //     const {viewableItems} = items
  //     if(viewableItems.length){
  //     const videoItems = filter(viewableItems, itemx => itemx.item.typeContent.toLocaleLowerCase() == 'video')
  //     setState({videoItems : videoItems})
  //     }
  //     else{
  //         setState({videoItems : []})
  //     }

  // }

  const changeItems = data => {
    helpers.videoPlayToggle();

    if (postArr.includes(data?.changed[0]?.item?.id)) {
    } else {
      ApiCall.initiatePostView(data.viewableItems, home.news, {
        ...props,
      });

      postArr.push(data?.changed[0]?.item?.id);
    }
    console.log('url123', data?.changed[0]?.item?.id);
    console.log('url123', home.news);
    //setActiveVideo(data?.changed[0]?.item?.id);

    // console.log("changeItems", data);
    // if (state.changedItem >= data.viewableItems[0].index) {
    //   console.log('herere')
    //   scrollListRef.scrollToIndex({
    //     animated: true,
    //     index: data.viewableItems[0].index + 1,
    //     viewOffset: 0,
    //     viewPosition: 0,
    //   });
    //   setState({ changedItem: data.viewableItems[0].index });
    // } else {
    //   setState({ changedItem: data.viewableItems[0].index});
    // }
  };

  const _emptyComponent = () => {
    return (
      <NewUserFollowingCard
        title={helpers.getLocale(localize, 'newsfeed', 'yours_newsfeed')}
        subTitle={
          <>
            <Text style={styles.Textstyle2}>
              {helpers.getLocale(
                localize,
                'newsfeed',
                'subscribe_to_other_users',
              )}
            </Text>
            <Text style={styles.Textstyle2}>
              {helpers.getLocale(
                localize,
                'newsfeed',
                'to_fill_your_newsfeed_with_content',
              )}
            </Text>
          </>
        }
        btnText={'newsfeed.discover_other_users'}
        localize={localize}
        image={images.news_feed}
        onPress={() =>
          props.navigation.navigate('User', {
            forceRedirect: false,
          })
        }
      />
    );
  };

  const handleScrollEvent = e => {
    let yMotion = e.nativeEvent.translationY;
    let direction = yMotion > 0 ? 'up' : 'down';
    if (e.nativeEvent.state === State.ACTIVE) {
      // *if scroll event is active, will run only once
      if (state.currentIndex === 0 && direction === 'up') {
        // to autorefresh list
        // for refresh control case
        console.log('cond1');
        _onRefresh(true, true);
      } else if (uniqBy(home.news, cp => cp._id).length <= 1) {
        console.log('cond2');
        return;
      } else if (
        state.currentIndex === uniqBy(home.news, cp => cp._id).length - 1 &&
        direction === 'down'
      ) {
        console.log('cond3');
        // to load more content in the list
        _renderMore();
      } else if (
        state.currentIndex === 0 &&
        direction === 'down' &&
        !state.setFirstIndexinPlace
      ) {
        console.log('cond4');
        // to scroll off thr story view (only on the initial index)
        scrollToTop(props.storyHeight);
        setstate(prevState => ({...prevState, setFirstIndexinPlace: true})); // flag that determines whether it is the scrolling off the story view from viewability config, setFirstIndexinPlace defaults to false
      } else {
        console.log('cond5');
       
        // Increase/decrease the currentIndex on the basis of direction of swipe
        new Promise((res)=> setTimeout(res,1000)).
    sliderPromise.then(()=>
    scrollListRef.current.scrollToIndex({
      animated: true,
      index:
        direction === 'down'
          ? (state.currentIndex + 1,
            (state.currentIndex = state.currentIndex + 1))
          : (state.currentIndex - 1,
            (state.currentIndex = state.currentIndex - 1)),
      viewOffset: 0,
      viewPosition: 0,
    })
    )
        
      }
    }
  };
  if (home.news === null) {
    return (
      <View style={{flex: 1}}>
        {/* {/ {/ {props.tabHeader()} /} /} */}
        {/* <_InlineLoader type={'post'} /> */}
      </View>
    );
  }
  console.log("home.news",uniqBy(home.news, cp => cp._id))

  return (
    <View style={mainStyles.rootView}>
      <FlatList
        scrollEnabled={true} //  should be false to let PanHandlers work properly for scrolling one item at a time
        // decelerationRate={Platform.OS === "ios" ? -80 : 0} //* This is to slow the scroll speed
        pinchGestureEnabled={false}
        data={uniqBy(home.news, cp => cp._id)}
        extraData={state}
        renderItem={_renderItems}
        keyExtractor={_keyExtractor}
        ListHeaderComponent={props.header}
        viewabilityConfig={viewabilityConfig}
        // viewabilityConfig={{
        //   viewAreaCoveragePercentThreshold: 95,
        // }}
        // onViewableItemsChanged={changeItems} //on error i commented this
        refreshControl={
          <RefreshControl
            refreshing={home.refreshStatus}
            onRefresh={() => _onRefresh(true, true)}
          />
        }
        onEndReachedThreshold={10}
        onEndReached={() => _renderMore()}
        ListFooterComponent={() => {
          return (
            <View>
              {state.listLoading ? <_InlineLoader type={'grid'} /> : null}
            </View>
          );
        }}
        ListEmptyComponent={_emptyComponent}
        maxToRenderPerBatch={5}
        removeClippedSubviews={Platform.OS == 'android' ? true : false}
      />

    </View>
  );
};

export default News;


