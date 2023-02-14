import {Text, View ,Dimensions,FlatList,RefreshControl} from 'react-native'
import React,{ useState,useEffect, useRef} from 'react';

import { globals, helpers, images, ApiCall,colors} from '../../../../../configs';
import { RecyclerListView,DataProvider,LayoutProvider,BaseItemAnimator } from 'recyclerlistview';
import { _ErrorModal,_GradiantView, _Lang,_ListBox,_Loading,_Spacer,_Icon, _Button, _Layout, _ListView,_ContentType,_InlineLoader,_EmptyPostList} from '../../../../custom';
import mainStyles from '../../../../../assets/styles/MainStyles';
import { chain,find,uniqBy } from 'lodash';

import {setActiveVideo} from '../../../../../redux/actions/VideoAction';
import {setUserInfo} from '../../../../../redux/actions/UserInfoAction';
import { setTimestampData } from '../../../../../redux/actions/TimestampAction';
import {setPicsUserHomeData} from '../../../../../redux/actions/PicsHomeActions'
import {State} from 'react-native-gesture-handler';
import { setNavigation } from '../../../../../redux/actions/NavAction';
import {
  setHomeDataProp,
  pushHomeDataProp,
  setRefreshIndicator,
} from "../../../../../redux/actions/HomeActions";
import {
  setCampaignProp,
  pushCampaignProp,
} from "../../../../../redux/actions/CampaignsActions";
import { setOtherProfileNewsfeed } from "../../../../../redux/actions/OtherProfileActions";
import {
  resetFilters,
  setFilterPropArr,
} from "../../../../../redux/actions/FilterWrapperAction";
//ContentBox actions
import {
  setAppData,
  pushAppData,
} from "../../../../../redux/actions/AppDataActions";
import {
  pushProfileDataProp,
  setProfileDataProp,
} from "../../../../../redux/actions/ProfileAction";
import { setFilterDataProp } from "../../../../../redux/actions/FiltersDataAction";
import { setPagination } from "../../../../../redux/actions/PaginationActions";

import { useDispatch, useSelector} from 'react-redux';

const {FILTERS_TYPES,FILTERS_FOR}= globals;

class ItemAnimator extends BaseItemAnimator {
  constructor(listHasMountedProp) {
    super();
    this.listHasMountedProp = listHasMountedProp;
  }
  animateDidMount(atX, atY, itemRef, itemIndex) {
    //no need
    this.listHasMountedProp();
  }
}


const BestList = (props) => {
  const dispatch= useDispatch();
  const home=useSelector((state)=>state.home);
  const pagination=useSelector((state)=>state.pagination.HomeBest.bestPagination);
  const filtersData = useSelector((state)=>state.otherProfile.otherProfileNewsfeed)
  const otherProfileNewsfeed = useSelector((state)=>state.otherProfile.otherProfileNewsfeed)
  const navProps = useSelector((state)=>state.navProps)
  const appData = useSelector((state)=>state.appData);
  const loginData = useSelector((state)=>state.loginData);
  const localize = useSelector((state) => state.localize);
  const profile= useSelector((state)=>state.profile);
  const campaigns = useSelector((state) => state.campaigns);
  const userInfo = useSelector((state) => state.userInfo);
  const timestamp = useSelector((state) => state.timestamp);

  let { width, height } = Dimensions.get("window");
  const {mediaP,stageP,newP,itemId,getFilters}=props.navigation.state.params;

  const [loading,setloading]= useState(props.loading)
  const [listLoading,setlistLoading]= useState(false);
  const [lowerListLoading,setlowerListLoading]= useState(false);
  const [refreshing,setrefreshing]= useState(false)
  const [activeTab,setactiveTab]= useState(0)
  // const [itemId,setitemId]= useState()
  const [mediaPage,setmediaPage]= useState(mediaP)
  const [stagePage,setstagePage]= useState(stageP)
  const [newPost,setnewPost]= useState(newP)
  const [refreshAgain,setrefreshAgain]= useState(false)
  const [currentIndex,setcurrentIndex]= useState(0)
  const [key,setkey]= useState(100)
  const [renderTexture,setrenderTexture]= useState()

  console.log('media',mediaPage);

  let viewabilityConfig = {
    minimumViewTime: 500,
    viewAreaCoveragePercentThreshold: 90,
  };

  // let listLoading = false;
  let listEnded = false;
  let scrollListRef = useRef();
  let bestRef = useRef([]);
  let intervalId = null;
  dispatch(setRefreshIndicator(true))


  let postArr =[];
  let _layoutProvider = new LayoutProvider(
    (index) => {
      // const height = Image.getSize(data[index].listMediaUrl, (width, height) => {return height });

      return index;
    },
    (type, dim) => {
      dim.width = width - 10;
      dim.height = height;
    },
  );
  useEffect(() => {
    globals.setUserData("videoRef",[]);
    return ()=> globals.setUserData("viewedPostArr",[]);
  },[])

  const _keyExtractor = (item, index) => "BestTab_" + index.toString();

  const _renderItems = ({ item, index }) => {
    //var item =data

    return index >= props.navigation.state.params.index ? (
      <>
        <View
          key={"BestList_" + index.toString()}
          
          ref={(ref) => (bestRef[item._id] = ref)}
          renderToHardwareTextureAndroid={state.renderTexture}
          style={{ width: globals.WINDOW_WIDTH }}>
          <_ContentType
            itemKey={"Best_List_Item" + index.toString()}
            contentInfo={item}
            index={index}
            {...props}
          />
        </View>
      </>
    ) : null;
  };
 const  _filterHashtag = (hashtag = null) => {

    dispatch(resetFilters(globals.FILTERS_FOR.HOME_BEST));
    if (hashtag !== null) {
      setTimeout(() => {
        dispatch(setFilterPropArr(
          { type: globals.FILTERS_TYPES.HASHTAG, data: hashtag },
          globals.FILTERS_FOR.HOME_BEST,
        ));
      }, 200);
      setTimeout(() => {
        _onRefresh();
      }, 500);
    } else {
      _onRefresh();
    }
  };
 const  scrollToTop = () => {
    scrollListRef &&
      scrollListRef.scrollToOffset({ x: 0, y: 0, animated: true });
    // this.scrollListRef && this.scrollListRef.scrollToIndex({ index: 0, viewPosition: 0, animated: true })
  };
 const _onRefresh = (top = true, mediaPage = 1, stagePage = 1, newPost = false) => {

    //top ? scrollToTop() : null;
    // let filterStr = props.getFilters();
    let filterStr = getFilters();
    setstate({...state,key:key+100})

    dispatch(setRefreshIndicator(true));
    ApiCall.getHomeData("bestList", 1, filterStr, {
      mediaPage,
      stagePage,
      timestamp: newPost ? timestamp["bestNew"] : timestamp["best"],
    })
      .then((res) => {
        const clickedItem = find(res.data, (ex) => ex._id == state.itemId);
        let newData = res.data;

        // if (!this.state.refreshAgain && clickedItem) {
        //   newData = chain([clickedItem])
        //     .concat(res.data)
        //     .uniqBy((dtx) => dtx._id)
        //     .value();
        // }

        // setHomeDataProp({ prop: "bestList", arr: newData });
        // this.setState({
        //   mediaPage: res.pagination.mediaPage,
        //   stagePage: res.pagination.stagePage,
        //   refreshAgain: true,
        // });
        dispatch(setRefreshIndicator(false));
      })
      .catch((err) => {
        dispatch(setRefreshIndicator(false));
        home.bestList === null &&
          dispatch(setHomeDataProp({ prop: "bestList", arr: [] }));
      });
  };

 const _renderMore = (callAbove = false) => {
    // debugger
    console.log("inside ");
    if (listLoading === false) {
      console.log("inside 1", pagination);

    listLoading = true;
    setstate({...state,listLoading:true},
        () => {
          if (pagination.mediaPages || pagination.stagePages) {
            let param = {};
            console.log("inside 2");
            param["mediaPage"] = mediaPage + 1;
            param["stagePage"] = stagePage + 1;

            let filterStr = getFilters();
            console.log("inside 1", filterStr);
            console.log("test", Object.keys(param).length, param.mediaPage);
            if (Object.keys(param).length !== 0 && param.mediaPage) {
              console.log("phase 2", param);

              ApiCall.getHomeData("bestList", 1, filterStr, param)
                .then((res) => {
                  console.log("best data", res);

                  dispatch(pushHomeDataProp({ prop: "bestList", arr: res.data }));
                  setstate({...state,listLoading:false, 
                        mediaPage:res.pagination.mediaPage,
                        stagePage:res.pagination.stagePage})
                 
                listLoading = false;
                })
                .catch((err) => {
                  setstate({...state,listLoading:false})
                  listLoading = false;
                });
            } else {
              setstate({...state,listLoading:false})
              listLoading = false;
            }
            // }
          } else {
            // console.log("_renderMore 2")
            listEnded = true;
            setstate({...state,listLoading:false})
            listLoading = false;
          }
        },
      );
    }
  };

 const listBestTrigger = () => {

    ApiCall.initiatePostView(bestRef, home.bestList, {
      ...props,
    });
    helpers.videoPlayToggle();
  };

 const changeItems = (data) => {
    console.log("All");

    if (!postArr.includes(data?.changed[0]?.item?.id)) {
      ApiCall.initiatePostView(data.viewableItems, home.best, {
        ...props,
      });
      postArr.push(data?.changed[0]?.item?.id);
    }

    //setActiveVideo(data?.changed[0]?.item?.id);
    helpers.videoPlayToggle();
  };

 const  handleScrollEvent = (e) => {

    let yMotion = e.nativeEvent.translationY;
    let direction = yMotion > 0 ? "up" : "down";
    if (e.nativeEvent.state == State.ACTIVE) {
      // if scroll event is active, will run only once
      if (currentIndex == 0 && direction == "up") {
        // to autorefresh list
        // for refresh control case
        _onRefresh(true, true);
      } else if (home.bestList.length <= 1) {
        return;
      } else if (
        currentIndex == home.bestList.length - 1 &&
        direction == "down"
      ) {
        // to load more content in the list
        _renderMore();
      } else {
        // Increase/decrease the currentIndex on the basis of direction of swipe
        new Promise((res)=> setTimeout(res,1000)).
        sliderPromise.then(()=>
        scrollListRef.current.scrollToIndex({
          animated: true,
          index:
            direction == "down"
              ? (currentIndex + 1,
                (currentIndex = currentIndex + 1))
              : (currentIndex - 1,
                (currentIndex = currentIndex - 1)),
          viewOffset: 0,
          viewPosition: 0,
        })
        )
       
      }
    }
  };

  const header = {
    leftCb: () => {
      props.navigation.pop();
    },
    title: "Popular",
    disableLang: true,
    leftImg: images.leftBackArrow,
    rightTxt: "",
  };
  if (home.bestList == null || home?.bestList?.length < 1 || loading)
  return (
    <_Layout
      screen={"BestList"}
      header={header}
      style={{ backgroundColor: colors.white }}
      headerWrapStyle={
        {
          // borderBottomWidth: 1,
          // borderBottomColor: colors.appBg,
        }
      }>
      <_InlineLoader type={"post"} />
    </_Layout>
  );
  return (
    <_Layout
        screen={"BestList"}
        header={header}
        style={{ backgroundColor: colors.white }}
        headerWrapStyle={
          {
            // borderBottomWidth: 1,
            // borderBottomColor: colors.appBg,
          }
        }>
        <View
          key={key}
          onLayout={() => dispatch(setRefreshIndicator(false))}
          style={mainStyles.rootView}>
          {/* <PanGestureHandler
            onHandlerStateChange={(e) => this.handleScrollEvent(e)}
          > */}
          {/* <RecyclerListView
            dataProvider={new DataProvider((r1, r2) => {
              return r1 !== r2;
            }).cloneWithRows(uniqBy(home.bestList, (cp) => cp._id))}
            rowRenderer={this._renderItems}
            layoutProvider={this._layoutProvider}
            itemAnimator={
              new ItemAnimator(() => {
                // props.listHasMounted()
                <_InlineLoader type={"post"} />;
              })
            }
            extendedState={this.state}
            onEndReached={() => {
              this._renderMore();
            }}
            style={{ flex: 1 }}
            onEndReachedThreshold={100}
            scrollViewProps={{
              refreshControl: (
                <RefreshControl
                  refreshing={home.refreshStatus}
                  onRefresh={() => this._onRefresh(true, 1, 1, true)}
                />
              ),
            }}
            forceNonDeterministicRendering={true}
            canChangeSize={true}
            renderFooter={() => {
              return (
                <View>
                  {listLoading ? <_InlineLoader type={"post"} /> : null}
                </View>
              );
            }}
          /> */}
          <FlatList
            scrollEnabled={true} //  should be false to let PanHandlers work properly for scrolling one item at a time
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                scrollListRef.current.scrollToIndex({
                  index: currentIndex,
                  animated: true,
                });
              });
            }}
            contentContainerStyle={{ paddingBottom: 80 }}
            pinchGestureEnabled={false}
            ref={scrollListRef}
            // data={home.bestList}
            data={uniqBy(home.bestList, (cp) => cp._id)}
            extraData={state} // in old project there is a whole state includes as extraData 
            renderItem={_renderItems}
            keyExtractor={_keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={home.refreshStatus}
                onRefresh={() => _onRefresh(true, 1, 1, true)}
              />
            }
            onScroll={(e) => {
              //this.listBestTrigger()
            }}
            onViewableItemsChanged={changeItems}
            viewabilityConfig={viewabilityConfig}
            onEndReachedThreshold={0.5}
            onEndReached={(e) => {
              _renderMore();
            }}
            // inverted={true}
            ListFooterComponent={() => {
              return (
                <View>
                  {listLoading ? <_InlineLoader type={"grid"} /> : null}
                </View>
              );
            }}
            ListEmptyComponent={<_EmptyPostList />}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            scrollEventThrottle={16}
            removeClippedSubviews={Platform.OS == "android" ? true : false}
            // onScrollToIndexFailed={(error) => {}}
          />
          {/* </PanGestureHandler> */}
        </View>
      </_Layout>
  )
}
// BestList.getDerivedStateFromProps=(nextProps, state)=> {
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
// }

export default BestList

