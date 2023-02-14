import React, {useState, useEffect, forwardRef, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
  Text
} from 'react-native';
import ExploreItem from './ExploreItem';

import {globals, helpers, images, ApiCall} from '../../../../../configs';
import {_InlineLoader, _EmptyPostList} from '../../../../custom';
import mainStyles from '../../../../../assets/styles/MainStyles';
import {setUserInfo} from '../../../../../redux/actions/UserInfoAction';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  setPicsUserHomeData,
  setPicsValue,
} from '../../../../../redux/actions/PicsHomeActions';
import {setParticipantProp} from '../../../../../redux/actions/CompanyParticipantAction';
import FastImage from 'react-native-fast-image';
import {setNavigation} from '../../../../../redux/actions/NavAction';
import {setTimestampData} from '../../../../../redux/actions/TimestampAction';
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
import {setAppData} from '../../../../../redux/actions/AppDataActions';
import {
  pushProfileDataProp,
  setProfileDataProp,
} from '../../../../../redux/actions/ProfileAction';
import {setFilterDataProp} from '../../../../../redux/actions/FiltersDataAction';
import {setPagination} from '../../../../../redux/actions/PaginationActions';
import {uniqBy, map, find, chain} from 'lodash';
import {styles} from './styles';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

//*This is Explore / For You Scene it contains grid view
const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

const Explore = props => {
  console.log('Explore called');
  let {width} = Dimensions.get('window');
  console.log('props : Exlore : => ', props)
  const {data} = props;
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  console.log("explore.js  home : ",home);
  const pagination = useSelector(
    state => state.pagination.homeExplore,
  );
  const filtersData = useSelector(
    state => state.filterWrapperReducer,
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

  let _layoutProvider = new LayoutProvider(
    index => {
      return ViewTypes.FULL;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 2 - 0.0001;
          dim.height = 160;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2;
          dim.height = 160;
          break;
        case ViewTypes.FULL:
          dim.width = Math.round(width / 3) - 1;
          dim.height = Math.round(width / 3) + 1;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );
  let ScrollViewWithHeader = forwardRef(({children, ...props}, ref) => {
    return (
      <ScrollView ref={ref} {...props}>
        {props.header}
        {children}
      </ScrollView>
    );
  });
  RecyclerListView.propTypes.externalScrollView = PropTypes.object;

  const [state, setstate] = useState({
    loading: props.loading,
    listLoading: false,
    refreshing: false,
    refreshStories: false,
    activeTab: 0,
    foryouData: props?.data,
    foryouPagination: props?.foryouPagination,
  });

  let listLoading = false;
  let listEnded = false;
  let scrollListRef = useRef(null);
  let exploreRef = useRef([]);

  useEffect(() => {
    console.log('explore', home.exploreList);
    setstate({...state, foryouData: props.data});

    // setExploreEndTrigger(listExploreTrigger);
    // setExploreRefresh(_onRefresh)
    //setExploreTop(scrollToTop);
    globals.setUserData('videosRef', []);
    globals.setUserData('homeExploreLoad', _filterHashtag);
    // globals.setUserData('exploreRef', { viewRef: this});
    // focusListener = props.navigation.addListener("didFocus", () => {
    //     _onRefresh(false)
    // });
    if(!data){
      _onRefresh();
    }
  },[]);

  useEffect(()=>{
    if (
      timestamp.explore !== undefined &&
      props.timestamp?.explore === undefined
    ) {
      _onRefresh();
    }
  },[props.timestamp])
  const _keyExtractor = (item, index) => 'ExploreTab_' + index.toString();
  
  const _navigateExploreList = (item, index) => {
    console.log('open ExploreList',item);
    props.navigation.navigate('ExploreList', {
      ...props,
      mediaPage: props?.pagination?.mediaPage,
      stagePage: props?.pagination?.stagePage,
      newPost: item?.newPost,
      itemId: item?._id,
      index: index,
      // data: state.foryouData,
      data:home.exploreList
    });
  };

  // *This function calls on image tap / Click and will navigate to Explore List
  const _onPostCall = (
    mediaPage,
    stagePage,
    newPost = false,
    itemId,
    item,
    index,
  ) => {
    dispatch(setHomeDataProp({prop: 'exploreList', arr: null}));

    let filterStr = props.getFilters();
    // props.loader.load();
    _navigateExploreList(item, index);
    ApiCall.getHomeData('exploreList', 1, filterStr, {
      mediaPage,
      stagePage,
      timestamp: newPost ? timestamp.exploreNew : timestamp.explore,
      id:
        item.postType == 'media'
          ? '&mediaId=' + itemId
          : '&participantId=' + itemId,
      pageLimit: 1,
    })
      .then(res => {
        console.log('getHomeData exploreList ==>',res);
        console.log('Clcked', item.postType);

        const clickedItem = find(res.data, ex => ex._id === itemId);
        let newData = res.data;
        // if (clickedItem) {
        //   newData = chain([clickedItem])
        //     .concat(res.data)
        //     .uniqBy((dtx) => dtx._id)
        //     .value();
        // }
        dispatch(setHomeDataProp({prop: 'exploreList', arr: newData}));
        props.loader.hideLoader();
      })
      .catch(e => {
        dispatch(setHomeDataProp({prop: 'exploreList', arr: []}));
        dispatch(setRefreshIndicator(false));
      });
  };

  // *This is render item.
  const _renderItems = ({item, index}) => {
    // var item = data;
    const url = !item.thumbnailMediaUrl
      ? item.gridMediaUrl
        ? item.gridMediaUrl
        : item.resizeMediaUrl
      : item.thumbnailMediaUrl;
    const cornerImage =
      item.postType === 'participant'
        ? item.miniProfileUrl
          ? {uri: item.miniProfileUrl}
          : images.gridStages
        : item.postType === 'blog'
        ? images.gridBlog
        : item.postType === 'media' && item.typeContent === 'video'
        ? images.gridVideo
        : null;

    return (
      <ExploreItem
        item={item}
        onPress={()=>{_navigateExploreList(item, index)}}
      />
    );
  };

  const _renderExplore = ({item, index}) => {
    const url = !item.thumbnailMediaUrl
      ? item.gridMediaUrl
        ? item.gridMediaUrl
        : item.resizeMediaUrl
      : item.thumbnailMediaUrl;
    const cornerImage =
      item.postType === 'participant'
        ? item.miniProfileUrl
          ? {uri: item.miniProfileUrl}
          : images.gridStages
        : item.postType === 'blog'
        ? images.gridBlog
        : item.postType === 'media' && item.typeContent === 'video'
        ? images.gridVideo
        : null;

    return (
      <ExploreItem
        item={item}
        onPress={() => _navigateExploreList(item, index)}
      />
    );
  };

  const _filterHashtag = (hashtag = null) => {
    dispatch(resetFilters(globals.FILTERS_FOR.HOME_EXPLORE));
    if (hashtag !== null) {
      setTimeout(() => {
        dispatch(
          setFilterPropArr(
            {type: globals.FILTERS_TYPES.HASHTAG, data: hashtag},
            globals.FILTERS_FOR.HOME_EXPLORE,
          ),
        );
      }, 200);
      setTimeout(() => {
        _onRefresh(true, true);
      }, 500);
    } else {
      _onRefresh(true, true);
    }
  };

  const scrollToTop = () => {
    // scrollListRef && scrollListRef.scrollToOffset({x: 0, y: 0, animated: true});
    // scrollListRef && scrollListRef.scrollToIndex({ index: 0, viewPosition: 0, animated: true })
  };

  const _onRefresh = (
    top = true,
    filter = false,
    callStories = false,
    shuffle = false,
  ) => {
    top ? scrollToTop() : null;
    let filterStr = props.getFilters();

    dispatch(setRefreshIndicator(true));
    ApiCall.getHomeData('exploreList', 1, filterStr, {
      mediaPage: 1,
      stagePage: 1,
      timestamp: filter ? '' : timestamp.exploreNew || timestamp.explore,
    })
      .then(res => {
        console.log('getHomeData onRefresh ==>',res);
        !timestamp.explore && home.explore && home?.explore?.length === 0
          ? dispatch(setPagination(res.pagination, 'homeExplore'))
          : null;

        if (filter) {
          const updatedData = map(res.data, mx => {
            return Object.assign({}, mx, {
              mediaPage: res.pagination.mediaPage,
              stagePage: res.pagination.stagePage,
              newPost: true,
            });
          });
          dispatch(setHomeDataProp({prop: 'exploreList', arr: updatedData}));
        } else if (res?.data?.length > 0) {
          const updatedData = map(res.data, mx => {
            return Object.assign({}, mx, {
              mediaPage: 1,
              stagePage: 1,
              newPost: true,
            });
          });
          dispatch(
            pushHomeDataProp({prop: 'exploreList', arr: updatedData}, true),
          );
        } else if (shuffle) {
          const shuffledData = helpers.contentShuffler(home.explore);

          dispatch(setHomeDataProp({prop: 'exploreList', arr: shuffledData}));
        }

        dispatch(setTimestampData('exploreNew', res.timestamp));
        dispatch(setRefreshIndicator(false));
      })
      .catch(e => {
        dispatch(setRefreshIndicator(false));
        home.explore === null &&
          dispatch(setHomeDataProp({prop: 'explore', arr: []}));
      });
  };

  const _renderMore = () => {
    console.log('called');

    if (listLoading === false) {
      listLoading = true;

      setstate(
        {
          ...state,
          listLoading: true,
        },
        () => {
          // if (pagination.page + 1 > pagination.pages) {
          // console.log("_renderMore mediaPages :",pagination.mediaPages)
          // console.log("_renderMore stagePages :",pagination.stagePages)

          if (pagination.mediaPages || pagination.stagePages) {
            // if ((pagination.mediaPage + 1 > pagination.mediaPages) && (pagination.stagePage + 1 > pagination.stagePages)) {
            //     console.log("_renderMore 3")
            //     listEnded = true;
            //     setState({ listLoading: false });
            //     listLoading = false;
            // }
            // else {
            // console.log("_renderMore 1")
            let activePage = pagination.page;

            let param = {};
            if (pagination.mediaPage && pagination.mediaPages) {
              if (!(pagination.mediaPage + 1 > pagination.mediaPages)) {
                param.mediaPage = pagination.mediaPage + 1;
              }
            }
            param.downTimestamp = timestamp.explore;

            if (pagination.stagePage && pagination.stagePages) {
              if (!(pagination.stagePage + 1 > pagination.stagePages)) {
                param.stagePage = pagination.stagePage + 1;
              }
            }
            param.downTimestamp = timestamp.explore;

            let filterStr = props.getFilters();
            // console.log("param :",param)
            // ApiCall.getHomeData('explore', ++activePage, filterStr).then((res) => {
            if (Object.keys(param)?.length !== 0) {
              ApiCall.getHomeData('exploreList', 1, filterStr, param)
                .then(res => {
                  console.log('griddata', res);

                  const updatedData = map(res.data, mx => {
                    return Object.assign({}, mx, {
                      mediaPage: mx.mediaPage || res.pagination.mediaPage,
                      stagePage: mx.stagePage || res.pagination.stagePage,
                    });
                  });
                  props?.data
                    ? setstate({
                        ...state,
                        foryouData: [...foryouData, updatedData],
                      })
                    : dispatch(
                        pushHomeDataProp({
                          prop: 'exploreList',
                          arr: updatedData,
                        }),
                      );
                  dispatch(setPagination(res.pagination, 'homeExplore'));
                  setstate({...state, listLoading: false});
                  listLoading = false;
                })
                .catch(e => {
                  setstate({...state, listLoading: false});
                  listLoading = false;
                });
            } else {
              setstate({...state, listLoading: false});
              listLoading = false;
            }
            // }
          } else {
            // console.log("_renderMore 2")
            listEnded = true;
            setstate({...state, listLoading: false});
            listLoading = false;
          }
        },
      );
    }
  };
  const _loadMore = () => {
    console.log('called');

    if (listLoading === false) {
      listLoading = true;

      setstate(
        {
          ...state,
          listLoading: true,
        },
        () => {
          // if (pagination.page + 1 > pagination.pages) {
          // console.log("_renderMore mediaPages :",pagination.mediaPages)
          // console.log("_renderMore stagePages :",pagination.stagePages)

          if (pagination.mediaPages || pagination.stagePages) {
            // if ((pagination.mediaPage + 1 > pagination.mediaPages) && (pagination.stagePage + 1 > pagination.stagePages)) {
            //     console.log("_renderMore 3")
            //     listEnded = true;
            //     setState({ listLoading: false });
            //     listLoading = false;
            // }
            // else {
            // console.log("_renderMore 1")
            let activePage = pagination.page;

            let param = {};
            if (pagination.mediaPage && pagination.mediaPages) {
              if (!(pagination.mediaPage + 1 > pagination.mediaPages)) {
                param.mediaPage = pagination.mediaPage + 1;
              }
            }

            if (pagination.stagePage && pagination.stagePages) {
              if (!(pagination.stagePage + 1 > pagination.stagePages)) {
                param.stagePage = pagination.stagePage + 1;
              }
            }

            let filterStr = props.getFilters();
            // console.log("param :",param)
            // ApiCall.getHomeData('explore', ++activePage, filterStr).then((res) => {
            if (Object.keys(param)?.length !== 0) {
              ApiCall.getHomeData('exploreList', 1, filterStr, param)
                .then(res => {
                  console.log('griddata', res);

                  const updatedData = map(res.data, mx => {
                    return Object.assign({}, mx, {
                      mediaPage: mx.mediaPage || res.pagination.mediaPage,
                      stagePage: mx.stagePage || res.pagination.stagePage,
                    });
                  });
                  // setState({
                  //   foryouData: [...state.foryouData, ...updatedData],
                  //   foryouPagination: res.pagination,
                  // });
                  dispatch(
                    pushHomeDataProp({
                      prop: 'explore',
                      arr: updatedData,
                    }),
                  );
                  dispatch(setPagination(res.pagination, 'homeExplore'));
                  setstate({...state, listLoading: false});
                  listLoading = false;
                })
                .catch(e => {
                  setstate({...state, listLoading: false});
                  listLoading = false;
                });
            } else {
              setstate({...state, listLoading: false});
              listLoading = false;
            }
            // }
          } else {
            // console.log("_renderMore 2")
            listEnded = true;
            setstate({...state, listLoading: false});
            listLoading = false;
          }
        },
      );
    }
  };

  const listExploreTrigger = () => {
    ApiCall.initiatePostView(exploreRef, home.explore, {...props});
    helpers.videoPlayToggle();
  };

  // console.log('uniqBy(home.exploreList, cp => cp._id)', uniqBy(home.exploreList, cp => cp?._id))

  const changeItems = data => {
    console.log('ok');

    // ApiCall.initiatePostView(data.viewableItems, home.explore, { ...props });
    // helpers.videoPlayToggle()
  };
  if (data) {
    return (
      <View
        style={
          ([mainStyles.rootView], {width: globals.WINDOW_WIDTH, height: '100%'})
        }>
        
        {/* <RecyclerListView
        dataProvider={new DataProvider((r1, r2) => {
          return r1 !== r2;
        }).cloneWithRows(uniqBy(state.foryouData, (cp) => cp._id))}
        rowRenderer={_renderItems}
        layoutProvider={_layoutProvider}
        extendedState={state}
        onEndReached={() => {
          _loadMore();
        }}
        onEndReachedThreshold={0.2}
        externalScrollView={ScrollViewWithHeader}
        scrollViewProps={{
          refreshControl: (
            <RefreshControl
              refreshing={home.refreshStatus}
              onRefresh={() => _onRefresh(true, false, true, true)}
            />
          ),
        }}
        renderFooter={() => {
          return <View>{listLoading ? <_InlineLoader /> : null}</View>;
        }}
      /> */}

        <FlatList
          data={uniqBy(home.explore, cp => cp?._id)}
          extraData={state}
          ListHeaderComponent={props.header}
          renderItem={_renderExplore}
          keyExtractor={_keyExtractor}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={home.refreshStatus}
              onRefresh={() => _onRefresh(true, false, true, true)}
            />
          }
          // onViewableItemsChanged={changeItems}
          onEndReachedThreshold={0.5}
          onEndReached={() => _loadMore()}
          // ListFooterComponent={() => {
          //   return <View>{state.listLoading ? <_InlineLoader /> : null}</View>;
          // }}
          ListEmptyComponent={<_EmptyPostList />}
          removeClippedSubviews={Platform.OS === 'android' ? true : false}
        />
      </View>
    );
  } else if (home.exploreList === null || state.loading) {
    return (
      <View style={mainStyles.rootView}>
        <_InlineLoader type={'homeScreenExplore'} />
       
      </View>
    );
  }

  return (
    <View
      style={[
        mainStyles.rootView,
        {paddingHorizontal: 1, backgroundColor: 'white'},
      ]}>
      <View style={{flexDirection: 'row'}}>
      
        {/* <RecyclerListView
        dataProvider={new DataProvider((r1, r2) => {
          return r1 !== r2;
        }).cloneWithRows(uniqBy(home.explore, (cp) => cp._id))}
        rowRenderer={_renderItems}
        layoutProvider={_layoutProvider}
        extendedState={state}
        onEndReached={() => {
          console.log("here end");
          _renderMore();
        }}
        onEndReachedThreshold={0.5}
        scrollViewProps={{
          refreshControl: (
            <RefreshControl
              refreshing={home.refreshStatus}
              onRefresh={() => _onRefresh(true, false, true, true)}
            />
          ),
        }}
        renderFooter={() => {
          return (
            <View>
              {listLoading ? <_InlineLoader type={"grid"} /> : null}
            </View>
          );
        }}
      /> */}
      </View>
      <FlatList
        data={uniqBy(home.exploreList, cp => cp?._id)}
        extraData={state}
        ListHeaderComponent={props.header}
        renderItem={_renderItems}
        keyExtractor={_keyExtractor}
        numColumns={3}
        refreshControl={
          <RefreshControl
            refreshing={home.refreshStatus}
            onRefresh={() => _onRefresh(true, false, true, true)}
          />
        }
        // onViewableItemsChanged={changeItems}
        onEndReachedThreshold={0.5}
        onEndReached={() => _renderMore()}
        ListFooterComponent={() => {
          return (
            <View>{listLoading ? <_InlineLoader type={'grid'} /> : null}</View>
          );
        }}
        ListEmptyComponent={<_EmptyPostList />}
        removeClippedSubviews={Platform.OS === 'android' ? true : false}
      />
    </View>
  );
};



// Explore.getDerivedStateFromProps = (nextProps, state) => {
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

export default Explore;

