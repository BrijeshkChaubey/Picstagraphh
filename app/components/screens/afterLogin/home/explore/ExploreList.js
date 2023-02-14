import React, {useState, useEffect, useRef} from 'react';
import {View, Dimensions, FlatList, RefreshControl,Text} from 'react-native';

import {
  globals,
  helpers,
  colors,
  images,
  ApiCall,
} from '../../../../../configs';
import {
  _ErrorModal,
  _GradiantView,
  _Lang,
  _ListBox,
  _Loading,
  _Spacer,
  _Icon,
  _Button,
  _Layout,
  _ListView,
  _ContentType,
  _InlineLoader,
  _EmptyPostList,
} from '../../../../custom';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  BaseItemAnimator,
} from 'recyclerlistview';
import mainStyles from '../../../../../assets/styles/MainStyles';
import {setUserInfo} from '../../../../../redux/actions/UserInfoAction';
import {setTimestampData} from '../../../../../redux/actions/TimestampAction';
import {setPicsUserHomeData} from '../../../../../redux/actions/PicsHomeActions';
import {State} from 'react-native-gesture-handler';
import {setNavigation} from '../../../../../redux/actions/NavAction';
import {
  setHomeDataProp,
  pushHomeDataProp,
  setRefreshIndicator,
} from '../../../../../redux/actions/HomeActions';
import {
  setCampaignProp,
  pushCampaignProp,
} from '../../../../../redux/actions/CampaignsActions';
import {setOtherProfileNewsfeed} from '../../../../../redux/actions/OtherProfileActions';
import {
  resetFilters,
  setFilterPropArr,
} from '../../../../../redux/actions/FilterWrapperAction';
//ContentBox actions
import {
  setAppData,
  pushAppData,
} from '../../../../../redux/actions/AppDataActions';
import {
  pushProfileDataProp,
  setProfileDataProp,
} from '../../../../../redux/actions/ProfileAction';
import {setFilterDataProp} from '../../../../../redux/actions/FiltersDataAction';
import {setPagination} from '../../../../../redux/actions/PaginationActions';
import {chain, find, uniqBy} from 'lodash';

// import ExploreListItem from './ExploreListItem';
import {setActiveVideo} from '../../../../../redux/actions/VideoAction';
import {useDispatch, useSelector} from 'react-redux';

const {FILTERS_TYPES, FILTERS_FOR} = globals;

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

function ExploreList(props){
  console.log('ExploreList called',props);
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
  let {width, height} = Dimensions.get('window');
  const {mediaPage, stagePage, newPost, itemId} = props.route.params;
  const [state, setstate] = useState({
    loading: props.loading,
    listLoading: false,
    lowerListLoading: false,
    refreshing: false,
    activeTab: 0,
    itemId,
    mediaPage,
    stagePage,
    newPost,
    key: 100,
    refreshAgain: false,
    currentIndex: 0,
  });

  let viewabilityConfig = {
    minimumViewTime: 500,
    viewAreaCoveragePercentThreshold: 90,
  };
  console.log('urlpag', state.mediaPage);
  let listLoading = false;
  let listEnded = false;
  let scrollListRef = useRef(null);
  let exploreRef = useRef([]);
  let intervalId = null;
  // dispatch(setRefreshIndicator(true));

  // const {home} = props;
  const header = {
    leftCb: () => {
      props.navigation.pop();
    },
    title: 'Explore',
    disableLang: true,
    leftImg: images.leftBackArrow,
    rightTxt: '',
  };

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
  let postArr = [];
  const data = props.route.params.data;
  
console.log('ExploreList data ==>',data);
  useEffect(() => {
    globals.setUserData('videosRef', []);

    return ()=> globals.setUserData('viewedPostsArr', []);
  }, []);

  const _keyExtractor = (item, index) => 'ExploreTab_' + index.toString();

  const _renderItems = ({item, index}) => {
    console.log('explore List render Item is called',item,index);
    return index >= props.route.params.index ?item!=null? (
      
      <ExploreListItem {...props} item={item} index={index} />
    ): null: null;
  };

  // const _filterHashtag = (hashtag = null) => {
  //   // const { setFilterPropArr, resetFilters, setFilterDataProp } = props;

  //   dispatch(resetFilters(globals.FILTERS_FOR.HOME_EXPLORE));
  //   if (hashtag !== null) {
  //     setTimeout(() => {
  //       dispatch(
  //         setFilterPropArr(
  //           {type: globals.FILTERS_TYPES.HASHTAG, data: hashtag},
  //           globals.FILTERS_FOR.HOME_EXPLORE,
  //         ),
  //       );
  //     }, 200);
  //     setTimeout(() => {
  //       _onRefresh();
  //     }, 500);
  //   } else {
  //     _onRefresh();
  //   }
  // };

  const scrollToTop = () => {
    scrollListRef && scrollListRef.current.scrollToOffset({x: 0, y: 0, animated: true});
    scrollListRef && scrollListRef.current.scrollToIndex({ index: 0, viewPosition: 0, animated: true })
  };

  const _onRefresh = (
    top = true,
    mediaPage = 1,
    stagePage = 1,
    newPost = false,
  ) => {
    const {getFilters} = props.route.params;

    top ? scrollToTop() : null;
    // let filterStr = props.getFilters();
    let filterStr = getFilters();
    setstate(prevState => ({...prevState, key: state.key + 100}));
    dispatch(setRefreshIndicator(true));
    ApiCall.getHomeData('exploreList', 1, filterStr, {
      mediaPage,
      stagePage,
      timestamp: newPost ? timestamp['exploreNew'] : timestamp['explore'],
    })
      .then(res => {
        const clickedItem = find(res.data, ex => ex._id == state.itemId);
        let newData = res.data;
        dispatch(setRefreshIndicator(false));
      })
      .catch(err => {
        dispatch(setRefreshIndicator(false));
        home.exploreList === null &&
          dispatch(setHomeDataProp({prop: 'exploreList', arr: []}));
      });
  };

  const _renderMore = (callAbove = false) => {
    // const { mediaPage, stagePage } = state;
    const {getFilters} = props.route.params;

    console.log('inside ');

    if (listLoading === false) {
      console.log('inside 1', pagination);

      listLoading = true;
      setstate(
        {...state, listLoading: true},
        () => {
          if (pagination.mediaPages || pagination.stagePages) {
            let param = {};
            console.log('inside 2');

            // if (mediaPage && pagination.mediaPages)
            //   if (!(mediaPage + 1 > pagination.mediaPages))
            param['mediaPage'] = pagination?.mediaPage + 1;

            // if (stagePage && pagination.stagePages)
            //   if (!(stagePage + 1 > pagination.stagePages))
            param['stagePage'] = pagination?.stagePage + 1;

            let filterStr = getFilters();
            console.log('inside 1', filterStr);

            if (Object.keys(param).length !== 0 && param.mediaPage) {
              console.log('phase 2', param);

              ApiCall.getHomeData('exploreList', 1, filterStr, param)
                .then(res => {
                  console.log('res data', data);
                  if (data) {
                    res.data.map(item => {
                      data.push(item);
                    });

                    console.log('res dada', data.length);
                  } else {
                    console.log('res data list', res);
                    dispatch(
                      pushHomeDataProp({prop: 'exploreList', arr: res.data}),
                    );
                  }
                  listLoading = false;
                  dispatch(setPagination(res.pagination, 'homeExplore'));
                  setstate(prevState => ({
                    ...prevState,
                    listLoading: false,
                    mediaPage: res.pagination.mediaPage,
                    stagePage: res.pagination.stagePage,
                  }));
                  listLoading = false;
                  //console.log('url',home.exploreList.length)
                })
                .catch(err => {
                  console.log('res data', err);
                  setstate(prevState => ({...prevState, listLoading: false}));
                  listLoading = false;
                });
            } else {
              setstate(prevState => ({...prevState, listLoading: false}));
              listLoading = false;
            }
            // }
          } else {
            // console.log("_renderMore 2")
            listEnded = true;
            setstate(prevState => ({...prevState, listLoading: false}));
            listLoading = false;
          }
        },
      );
    }
  };

  // const listExploreTrigger = () => {
  //   ApiCall.initiatePostView(exploreRef, home.exploreList, {
  //     ...props,
  //   });
  //   helpers.videoPlayToggle();
  // };

  // const changeItems = data => {
  //   console.log('All');
  //   // map(data.viewableItems, dt => {
  //   //     if (dt.index === 0) {
  //   //         _renderMore(true)
  //   //     }
  //   // })

  //   if (!postArr.includes(data?.changed[0]?.item?.id)) {
  //     ApiCall.initiatePostView(data.viewableItems, home.explore, {
  //       ...props,
  //     });
  //     postArr.push(data?.changed[0]?.item?.id);
  //   }

  //   //setActiveVideo(data?.changed[0]?.item?.id);
  //   helpers.videoPlayToggle();
  // };

  // const handleScrollEvent = e => {
  //   let yMotion = e.nativeEvent.translationY;
  //   let direction = yMotion > 0 ? 'up' : 'down';
  //   if (e.nativeEvent.state == State.ACTIVE) {
  //     // if scroll event is active, will run only once
  //     if (state.currentIndex == 0 && direction == 'up') {
  //       // to autorefresh list
  //       // for refresh control case
  //       _onRefresh(true, true);
  //     } else if (home.exploreList.length <= 1) {
  //       return;
  //     } else if (
  //       state.currentIndex == home.exploreList.length - 1 &&
  //       direction == 'down'
  //     ) {
  //       // to load more content in the list
  //       _renderMore();
  //     } else {
        
  //       // Increase/decrease the currentIndex on the basis of direction of swipe
  //       new Promise((res)=> setTimeout(res,1000)).
  //   sliderPromise.then(()=>
  //   scrollListRef.current.scrollToIndex({
  //     animated: true,
  //     index:
  //       direction == 'down'
  //         ? (state.currentIndex + 1,
  //           (state.currentIndex = state.currentIndex + 1))
  //         : (state.currentIndex - 1,
  //           (state.currentIndex = state.currentIndex - 1)),
  //     viewOffset: 0,
  //     viewPosition: 0
  //   })
  //   )
       
  //     }
  //   }
  // };

  return (
    // <View>
    // <Text>Explore list</Text>
    //    </View>
    <_Layout
      screen={'ExploreList'}
      header={header}
      style={{backgroundColor: colors.white}}
      headerWrapStyle={
        {
          // borderBottomWidth: 1,
          // borderBottomColor: colors.appBg,
        }
      }>
   
       
       <View
        key={state.key}
        onLayout={() => dispatch(setRefreshIndicator(false))}
        style={mainStyles.rootView}>
        <FlatList
          scrollEnabled={true} //  should be false to let PanHandlers work properly for scrolling one item at a time
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              scrollListRef.current.scrollToIndex({
                index: state.currentIndex,
                animated: true,
              });
            });
          }}
          contentContainerStyle={{paddingBottom: 80}}
          pinchGestureEnabled={false}
          ref={
            scrollListRef
          }
          // data={home.exploreList}
          data={
            data
              // ? uniqBy(home.explore, cp => cp._id)
              // : uniqBy(home.exploreList, cp => cp._id)
          }
          extraData={state}
          renderItem={_renderItems}
          keyExtractor={_keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={home.refreshStatus}
              onRefresh={() => _onRefresh(true, 1, 1, true)}
            />
          }
          onScroll={e => {
            //listExploreTrigger()
          }}
          // onViewableItemsChanged={changeItems}
          viewabilityConfig={viewabilityConfig}
          onEndReachedThreshold={100}
          onEndReached={e => {
            _renderMore();
            // if (e.distanceFromEnd == 0 || e.distanceFromEnd <= globals.WINDOW_HEIGHT / 5) {
            //     _renderMore(true)
            // }
            // else if (e.distanceFromEnd >= (globals.WINDOW_HEIGHT / 5) * 4) {
            //     _renderMore(false)
            // }
          }}
          // inverted={true}
          // ListFooterComponent={() => {
          //   return (
          //     <View>
          //       {listLoading ? <_InlineLoader type={'grid'} /> : null}
          //     </View>
          //   );
          // }}
          ListEmptyComponent={<_EmptyPostList />}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          scrollEventThrottle={16}
          removeClippedSubviews={Platform.OS == 'android' ? true : false}
          // onScrollToIndexFailed={error => {
            // scrollListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
            // setTimeout(() => {
            //     if (home.explore.length !== 0 && scrollListRef !== null) {
            //         scrollListRef.scrollToIndex({ index: error.index, animated: true });
            //     }
            // }, 100);
            // if (home.exploreList != null && home.exploreList.length !== 0 && scrollListRef !== null) {
            //     scrollListRef.scrollToIndex({ index: error.index, animated: true });
            // }
            // intervalId = setInterval(() => {
            //     if (home.exploreList != null && home.exploreList.length !== 0 && scrollListRef !== null) {
            //         scrollListRef.scrollToIndex({ index: error.index, animated: true });
            //     }
            //     if (error.averageItemLength > 0) {
            //         clearInterval(intervalId)
            //     }
            // }, 100)
            // setTimeout(() => {
            //     scrollListRef && scrollListRef.scrollToIndex({ index: info.index, animated: true })
            // }, 100);
            // info.averageItemLength > 0 ? scrollListRef && scrollListRef.scrollToIndex({ index: info.index, animated: true }) : null;
            // const wait = new Promise(resolve => setTimeout(resolve, 10));
            // wait.then(() => {
            //     scrollListRef && scrollListRef.scrollToIndex({ index: info.index, animated: true });
            // });
          // }}
        />
         {/* </PanGestureHandler> */}
       </View>
    </_Layout>
  );
};

// ExploreList.getDerivedStateFromProps = (nextProps, state) => {
//   if (nextProps.loading !== state.loading) {
//     return {
//       loading: nextProps.loading || false,
//     };
//   } else if (nextProps.activeTab !== state.activeTab) {
//     return {
//       activeTab: nextProps.activeTab,
//     };
//   } else {
//     return null;
//   }
// };
export default ExploreList;
