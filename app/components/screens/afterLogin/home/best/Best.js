import {  Text,TouchableOpacity,Platform,FlatList,RefreshControl,Dimensions, View } from 'react-native'
import React, { useState,useEffect,useRef }from 'react';
import { RecyclerListView,DataProvider,LayoutProvider } from 'recyclerlistview';
import { globals,helpers,images, ApiCall} from '../../../../../configs';
import { _InlineLoader ,_EmptyPostList} from '../../../../custom';
import FastImage from 'react-native-fast-image';
import { uniqBy,map,find,chain } from 'lodash';

import ExploreItem from '../explore/ExploreItem';

import {setParticipantProp} from '../../../../../redux/actions/CompanyParticipantAction';
import {setNavigation} from '../../../../../redux/actions/NavAction';
import {setTimestampData} from '../../../../../redux/actions/TimestampAction'
import {setHomeDataProp,pushHomeDataProp, setRefreshIndicator} from '../../../../../redux/actions/HomeActions';
import {setCampaignProp,pushCampaignProp} from '../../../../../redux/actions/CampaignsActions';
import {setOtherProfileNewsfeed} from '../../../../../redux/actions/OtherProfileActions';
import {resetFilters,setFilterPropArr} from '../../../../../redux/actions/FilterWrapperAction';
import { setAppData } from '../../../../../redux/actions/AppDataActions'; //contentbox actions
import {pushProfileDataProp,setProfileDataProp} from '../../../../../redux/actions/ProfileAction';
import {setFilterDataProp} from '../../../../../redux/actions/FiltersDataAction';
import {setPagination}  from '../../../../../redux/actions/PaginationActions';

import { useDispatch, useSelector} from 'react-redux';
/**
 * 
 * @description { this is the Best/ for you Scene it contains grid view}
 */

const ViewTypes = {
    FULL:0,
}

const Best = (props) => {
    let {width}=Dimensions.get('window');
    const {loader}=props
    const { setBestTop, setBestRefresh } = props;

    const dispatch = useDispatch();
    // from store 
    const home=useSelector((state)=>state.home)
    const pagination=useSelector((state)=>state.pagination.HomeBest.bestPagination)
    const filterData=useSelector((state)=>state.filterWrapperReducer)
    const otherProfileNewsfeed = useSelector((state)=>state.otherProfile.otherProfileNewsfeed)
    const navProps = useSelector((state)=>state.navProps)
    const appData = useSelector((state)=>state.appData)
    const loginData = useSelector((state)=>state.loginData)
    const localize = useSelector((state)=>state.localize)
    const profile= useSelector((state)=>state.profile)
    const campaigns = useSelector((state)=>state.campaigns)
    const userInfo = useSelector((state)=>state.userInfo)
    const timestamp = useSelector((state)=>state.timestamp)
    const user = useSelector((state)=>state.users)


    const [forudata,setforudata]= useState([])
    const [state, setstate]= useState({
      loading: props.loading,
      listLoading: false,
      refreshing: false,
      refreshStories: false,
      activeTab: 0,
      forudata: []
    })

    const listLoading = useRef(false);
    const listEnded = useRef(false);
    const scrollListRef = useRef(null);
    const bestRef = useRef({});


    // //revisit to look at below variable
    //  let _layoutProvider = new LayoutProvider( // this layoutProvider is not being used currently
    //     (index) => {
    //       return ViewTypes.FULL;
    //     },
    //     (type, dim) => {
    //       switch (type) {
    //         case ViewTypes.HALF_LEFT:
    //           dim.width = width / 2 - 0.0001;
    //           dim.height = 160;
    //           break;
    //         case ViewTypes.HALF_RIGHT:
    //           dim.width = width / 2;
    //           dim.height = 160;
    //           break;
    //         case ViewTypes.FULL:
    //           dim.width = Math.round(width / 2) - 1.5;
    //           dim.height = Math.round(width / 2) + 2;
    //           break;
    //         default:
    //           dim.width = 0;
    //           dim.height = 0;
    //       }
    //     },
    //   );

      useEffect(() => {
          const { setBestTop, setBestRefresh } = props;
          //componentDidMount()
        setBestTop(scrollToTop);
        dispatch(setRefreshIndicator(false));
        globals.setUserData("videoRef",[]);
        globals.setUserData("homeBestLoad");
        //componentDidUpdate
        if(timestamp["best"]!==undefined && props.timestamp["best"]===undefined){
            _onRefresh()
        }
        

      },[_onRefresh()])

const _keyExtractor = (item, index) => "BestTab_" + index.toString();
     
const _navigateBestList = (item, index) => {
    props.navigation.navigate("BestList", {
      ...props,
      mediaPage: item.mediaPage,
      stagePage: item.stagePage,
      newPost: item.newPost,
      itemId: item._id,
      index:index
    });
  };

  // *This function calls on image tap / Click and will navigate to Best List
 const _onPostCall = (
    mediaPage,
    stagePage,
    newPost = false,
    itemId,
    item,
    index,
  ) => {
    // const { setHomeDataProp, setRefreshIndicator } = props;

    let filterStr = props.getFilters();
    //props.loader.load();
    dispatch(setHomeDataProp({ prop: "bestList", arr: [] }));
    
    ApiCall.getHomeData("bestList", 1, filterStr, {
      mediaPage,
      stagePage,
      timestamp: newPost ? timestamp["bestNew"] : timestamp["best"],
      id:
        item.postType == "media"
          ? "&mediaId=" + itemId
          : "&participantId=" + itemId,
      pageLimit: 1,
    })
      .then((res) => {
        const clickedItem = find(res.data, (ex) => ex._id === itemId);
        let newData = res.data;
        // if (clickedItem) {
        //   newData = chain([clickedItem])
        //     .concat(res.data)
        //     .uniqBy((dtx) => dtx._id)
        //     .value();
        // }
       dispatch(setHomeDataProp({ prop: "bestList", arr: newData }));
        loader.hideLoader();
      })
      .catch((e) => {
        dispatch(setHomeDataProp({ prop: "bestList", arr: [] }));
        dispatch(setRefreshIndicator(false));
      });
  };

  // *This is render item.
  const _renderItems = ({ item, index }) => {
    // var item = data;
    const url = !item.thumbnailMediaUrl
      ? item.gridMediaUrl
        ? item.gridMediaUrl
        : item.resizeMediaUrl
      : item.thumbnailMediaUrl;
    const cornerImage =
      item.postType === "participant"
        ? item.miniProfileUrl
          ? { uri: item.miniProfileUrl }
          : images.gridStages
        : item.postType === "blog"
        ? images.gridBlog
        : item.postType === "media" && item.typeContent === "video"
        ? images.gridVideo
        : null;

    return (
      <ExploreItem
        item={item}
        onPress={() =>
          _navigateBestList(item, index)
        }
      />
    );
  };
 const scrollToTop = () => {
    // scrollListRef &&
    //   scrollListRef.scrollToOffset({ x: 0, y: 0, animated: true });
    // this.scrollListRef && this.scrollListRef.scrollToIndex({ index: 0, viewPosition: 0, animated: true })
  };

 const _onRefresh = (
    top = true,
    filter = false,
    callStories = false,
    shuffle = false,
  ) => {

    // top ? this.scrollToTop() : null;
    let filterStr = props.getFilters();

    dispatch(setRefreshIndicator(false));
    ApiCall.getHomeData("bestList", 1, filterStr, {
      mediaPage: 1,
      stagePage: 1,
      timestamp: filter ? "" : timestamp["bestNew"] || timestamp["best"],
    })
      .then((res) => {
        !timestamp["best"] && home.best && home.best.length === 0
          ? dispatch(setPagination(res.pagination, "homeBest"))
          : null;

        if (filter) {
          const updatedData = map(res.data, (mx) => {
            return Object.assign({}, mx, {
              mediaPage: res.pagination.mediaPage,
              stagePage: res.pagination.stagePage,
              newPost: true,
            });
          });
          dispatch(setHomeDataProp({ prop: "bestList", arr: updatedData }));
        } else if (res.data.length > 0) {
          const updatedData = map(res.data, (mx) => {
            return Object.assign({}, mx, {
              mediaPage: 1,
              stagePage: 1,
              newPost: true,
            });
          });
          dispatch(pushHomeDataProp({ prop: "bestList", arr: updatedData }, true));
        } else if (shuffle) {
          const shuffledData = helpers.contentShuffler(home.best);

          dispatch(setHomeDataProp({ prop: "bestList", arr: shuffledData }));
        }

        dispatch(setTimestampData("besteNew", res.timestamp));
       dispatch(setRefreshIndicator(false));
      })
      .catch((e) => {
        dispatch(setRefreshIndicator(false));
        home.bestList === null && dispatch(setHomeDataProp({ prop: "bestList", arr: [] }));
      });
  };

const _renderMore = () => {
     console.log("called");

    if (listLoading === false) {
      listLoading = true;

      setstate({...state,listLoading:true},
        () => {
          if (pagination?.mediaPages || pagination?.stagePages) {
            let activePage = pagination.page;

            let param = {};
            if (pagination.mediaPage && pagination.mediaPages)
              if (!(pagination.mediaPage + 1 > pagination.mediaPages))
                param["mediaPage"] = pagination.mediaPage + 1;
            param["downTimestamp"] = timestamp["best"];

            if (pagination.stagePage && pagination.stagePages)
              if (!(pagination.stagePage + 1 > pagination.stagePages))
                param["stagePage"] = pagination.stagePage + 1;
            param["downTimestamp"] = timestamp["best"];

            let filterStr = props.getFilters();
            // console.log("param :",param)
            // ApiCall.getHomeData('best', ++activePage, filterStr).then((res) => {
            if (Object.keys(param).length !== 0) {
              ApiCall.getHomeData("bestList", 1, filterStr, param)
                .then((res) => {
                  const updatedData = map(res.data, (mx) => {
                    return Object.assign({}, mx, {
                      mediaPage: mx.mediaPage || res.pagination.mediaPage,
                      stagePage: mx.stagePage || res.pagination.stagePage,
                    });
                  });
                  props?.data
                    ? setstate({...state,forudata:[...state.forudata,updatedData]}) 
                    // this.setState({/////////========
                    //     foryouData: [...foryouData, updatedData],
                    //   })
                    : dispatch(pushHomeDataProp({ prop: "bestList", arr: updatedData }));
                  dispatch(setPagination(res.pagination, "homeBest"));
                  setstate({...state,listLoading:false});
                  listLoading = false;
                })
                .catch((e) => {
                  setstate({...state,listLoading:false});
                  listLoading = false;
                });
            } else {
              setstate({...state,listLoading:false});
              listLoading = false;
            }
            // }
          } else {
            // console.log("_renderMore 2")
            listEnded = true;
            setstate({...state,listLoading:false});
            listLoading = false;
          }
        },
      );
    }
  };

 const listBestTrigger = () => {
    ApiCall.initiatePostView(bestRef, home.best, { ...props });
    helpers.videoPlayToggle();
  }; 

  const changeItems = (data) => {
    // ApiCall.initiatePostView(data.viewableItems, home.best, { ...props });
    // helpers.videoPlayToggle()
  }; 



  return (
    <View
        style={[
          mainStyles.rootView,
          { paddingHorizontal: 1, backgroundColor: "white" },
        ]}>
        <FlatList
          data={uniqBy(home.bestList, (cp) => cp._id)}
          extraData={state}
          ListHeaderComponent={props.header}
          renderItem={_renderItems}
          keyExtractor={_keyExtractor}
          style={{paddingBottom:80}}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={home.refreshStatus}
              onRefresh={() => _onRefresh(true, false, true, true)}
            />
          }
          onViewableItemsChanged={changeItems}
          onEndReachedThreshold={0.5}
          onEndReached={() => _renderMore()}
          ListFooterComponent={() => {
            return (
              <View>
                {listLoading ? <_InlineLoader type={"grid"} /> : null}
              </View>
            );
          }}
          ListEmptyComponent={<_EmptyPostList />}
          removeClippedSubviews={Platform.OS === "android" ? true : false}
        />
        {/* <RecyclerListView
          dataProvider={new DataProvider((r1, r2) => {
            return r1 !== r2;
          }).cloneWithRows(uniqBy(home.best, (cp) => cp._id))}
          rowRenderer={this._renderItems}
          layoutProvider={this._layoutProvider}
          extendedState={this.state}
          onEndReached={() => {
            this._renderMore();
          }}
          onEndReachedThreshold={0.5}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={home.refreshStatus}
                onRefresh={() => this._onRefresh(true, false, true, true)}
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
  )
}

//static method
Best.getDerivedStateFromProps=(nextProps, state) =>{
    if (nextProps.loading !== state.loading) {
      return {
        loading: nextProps.loading || false,
      };
    } else if (nextProps.activeTab !== state.activeTab) {
      return {
        activeTab: nextProps.activeTab,
      };
    } else {
      return null;
    }
  }

export default Best

