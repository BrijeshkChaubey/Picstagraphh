import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Dimensions,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import {
  globals,
  helpers,
  colors,
  images,
  sty,
  ApiCall,
} from "../../../../../../configs";
import {
  _GradiantView,
  _ListBox,
  _Spacer,
  _Icon,
  _Button,
  _ListView,
  _ContentType,
  _InlineLoader,
  _EmptyPostList,
} from "../../../../../custom";
import { mainLayoutHoc } from "../../../../../hoc";
import mainStyles from "../../../../../../assets/styles/MainStyles";
import FastImage from "react-native-fast-image";

import {
  setParticipantProp,
  pushParticipantProp,
  setCompanyRefreshIndicator,
} from "../../../../../../redux/actions/CompanyParticipantAction";
import {
  setParticipantListProp,
  pushParticipantListProp,
  setCompanyListRefreshIndicator,
} from "../../../../../../redux/actions/CompanyParticipantListAction";
import { setHomeDataProp } from "../../../../../../redux/actions/HomeActions";
import { setTimestampData } from "../../../../../../redux/actions/TimestampAction";
import { setOtherProfileNewsfeed } from "../../../../../../redux/actions/OtherProfileActions";

//ContentBox actions
import { setAppData } from "../../../../../../redux/actions/AppDataActions";
import {
  pushProfileDataProp,
  setProfileDataProp,
} from "../../../../../../redux/actions/ProfileAction";
import { setPagination } from "../../../../../../redux/actions/PaginationActions";
import { setFilterPropArr } from "../../../../../../redux/actions/FilterWrapperAction";
import { map, chain, find, uniqBy } from "lodash";
const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};
function Participant(props){

    const [listLoading,setListLoading] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const [activeTab,setActiveTab] = useState(false);
    const [renderTexture,setRenderTexture] = useState();

    listLoading = false;
    listEnded = false;
    participantPostref = useRef({});
    scrollListRef = useRef(null);

    const dispatch = useDispatch();
    const {companyParticipant,
    otherProfileNewsFeed,
    navProps,
    appData,
    loginData,
    localize,
    profile,
    home,
    Timestamp
     } = useSelector(state => state);
 

//ComponentDidMount
    useEffect(()=>{
        dispatch(setParticipantTop(scrollToTop));
        dispatch(setParticipantRefresh(_onRefresh));
        globals.setUserData("homeParticipantLoad", _filterHashtag);
    },[]);

    //componentDidUpdate
    useEffect(()=>{
      const { campaignInfo } = props;
      if (
        timestamp["approved" + campaignInfo.id] !== undefined &&
        props.timestamp["approved" + campaignInfo.id] === undefined
      ) {
        _onRefresh();
      }
    },[props]);

   const _filterHashtag = (hashtag) => {
    
      setTimeout(() => {
        dispatch(setFilterPropArr(
          { type: globals.FILTERS_TYPES.HASHTAG, data: hashtag },
          globals.FILTERS_FOR.HOME_PARTICIPANT,
        ));
      }, 200);
      setTimeout(() => {
        _onRefresh();
      }, 500);
    };

  const  scrollToTop = () => {
      scrollListRef &&
      new Promise((res)=> setTimeout(res,1000)).
      sliderPromise.then(()=>
      scrollListRef.current.scrollToIndex({ 
        animated: true, 
        index: 0 })
      )
    };

   const _postCb = (postInfo) => {
      props.navigation.navigate("CampaignParticipant", {
        postInfo: postInfo,
      });
    };
  
    const _onPostShow = (item) => {
      const {
        campaignInfo,
      } = props;
      const { page, id, newPost } = item;
      dispatch(setParticipantListProp({
        id: campaignInfo.id,
        arr: [],
        pagination: {},
      }));
      dispatch(setCompanyListRefreshIndicator(true));
      ApiCall.getCampaignParticipants(
        "ParticipantList",
        campaignInfo.slug,
        globals.PARTICIPANT_TYPE.APPROVED,
        page,
        {
          text: "full-response",
          id: id,
          timestamp: newPost
            ? timestamp["approvedNew" + campaignInfo.id]
            : timestamp["approved" + campaignInfo.id],
          mediaId: item.id,
          pagelimit: 1,
        },
      )
        .then((res) => {
          const clickedItem = find(res.data, (ex) => ex._id == id);
          let newData = res.data;
  
         dispatch(setParticipantListProp({
            id: campaignInfo.id,
            arr: newData,
            pagination: res.pagination || {},
          }));
          dispatch(setCompanyListRefreshIndicator(false));
        })
        .catch((err) => {
          dispatch(setParticipantListProp({
            id: campaignInfo.id,
            arr: [],
            pagination: {},
          }));
         dispatch(setCompanyListRefreshIndicator(false));
        });
    };

   const _onPostNavigate = (item, index) => {
      props.navigation.navigate("CampaignParticipantList", {
        campaignInfo: props.campaignInfo,
        page: item.page,
        newPost: item.newPost,
        itemId: item._id,
        footerButton: props.footerButton,
        item: item,
        index: index
      });
    };

    const  _renderCampaigns = ({ item, index }) => {
        const { isCampaignOwner } = props;
        item = Object.assign({ navigateToFullView: _postCb }, item);       if (isCampaignOwner) {
          item = Object.assign({ approveParticipantFlag: true }, item);
        }
        const url = !item.thumbnailMediaUrl
          ? item.gridMediaUrl
            ? item.gridMediaUrl
            : item.resizeMediaUrl
          : item.thumbnailMediaUrl;
    
        // const cornerImage =
        //   item.postType === "participant"
        //     ? images.gridStages
        //     : item.postType === "blog"
        //     ? images.gridBlog
        //     : item.postType === "media" && item.typeContent === "video"
        //     ? images.gridVideo
        //     : null;
        const cornerImage = item.typeContent == "video" ? images.newVideo : null;
        return (
          <View
            style={{
              width: globals.WINDOW_WIDTH / 3 - 1,
              paddingTop: index === 0 || index === 1 || index === 2 ? 3 : 0,
            }}>
            <View
              key={"CampaignParticipantList_" + index.toString()}
              ref={(ref) => (participantPostref[item._id] = ref)}
              renderToHardwareTextureAndroid={renderTexture}
              style={{
                paddingVertical: 1,
                paddingHorizontal: 1,
                backgroundColor: "white",
              }}>
              <TouchableOpacity
                onPress={() => {
                  _onPostNavigate(item);
                  _onPostShow(item);
                }}>
                <FastImage
                  source={{ uri: url }}
                  resizeMode={"cover"}
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    height: globals.WINDOW_WIDTH / 3 - 1,
                    backgroundColor: colors.lighter,
                  }}
                />
                <View
                  style={{ zIndex: 1, position: "absolute", top: 10, right: 10 }}>
                  <FastImage
                    source={cornerImage}
                    style={{ height: 20, width: 20 }}
                    resizeMode={"cover"}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      };

    const _keyExtractor = (item, index) => "CampaignParticipant_" + index.toString();

    const  _onRefresh = (top = true) => {
      const {
        campaignInfo,
      } = props;
  
      // top ? this.scrollToTop() : null
      dispatch(setCompanyRefreshIndicator(true));
      ApiCall.getCampaignParticipants(
        "Participant",
        campaignInfo.slug,
        globals.PARTICIPANT_TYPE.APPROVED,
        1,
        { timestamp: timestamp["approved" + campaignInfo.id] },
      )
        .then((res) => {
          console.log("res", res);
          //  setPagination(res.pagination, 'homeExplore') : null;
          if (res.data.length > 0) {
            const updatedData = map(res.data, (mx) => {
              return Object.assign({}, mx, { page: 1, newPost: true });
            });
            dispatch(pushParticipantProp(
              {
                id: campaignInfo.id,
                arr: updatedData,
                pagination: companyParticipant[campaignInfo.id].pagination,
              },
              true,
            ));
          }
  
          if (
            companyParticipant[campaignInfo.id] &&
            companyParticipant[campaignInfo.id].arr.length === 0 &&
            !timestamp["approved" + campaignInfo.id]
          ) {
            dispatch(setParticipantProp({
              id: campaignInfo.id,
              arr: [],
              pagination: res.pagination,
            }));
          }
  
          dispatch(setTimestampData("approvedNew" + campaignInfo.id, res.timestamp));
          dispatch(setCompanyRefreshIndicator(false));
        })
        .catch((err) => {
          !companyParticipant[campaignInfo.id] &&
           dispatch(setParticipantProp({
              id: campaignInfo.id,
              arr: [],
              pagination: {},
            }));
          dispatch(setCompanyRefreshIndicator(false));
        });
    };

    useEffect(()=>{
       if(listLoading){
        if (pagination.page + 1 > pagination.pages) {
          listEnded = true;
          setListLoading(false);
        } else {
          let activePage = pagination.page;

          ApiCall.getCampaignParticipants(
            "Participant",
            campaignInfo.slug,
            globals.PARTICIPANT_TYPE.APPROVED,
            ++activePage,
            { downTimestamp: timestamp["approved" + campaignInfo.id] },
          )
            .then((res) => {
              const updatedData = map(res.data, (mx) => {
                return Object.assign({}, mx, { page: res.pagination.page });
              });

             dispatch(pushParticipantProp({
                id: campaignInfo.id,
                arr: updatedData,
                pagination: res.pagination,
              }));
              setListLoading(false);
             
              // this.listLoading = false;
            })
            .catch((err) => {
              setListLoading(false);
              // this.listLoading = false;
            });
        }
       }
    },[listLoading]);

   const _renderMore = () => {
      const {
        campaignInfo,
      } = props;
  
      if (!companyParticipant[campaignInfo.id]) return;
  
      let pagination = companyParticipant[campaignInfo.id].pagination;
  
      if (listLoading === false) {
        listLoading = true;
         setListLoading(true);
      }
    };

    let dataArray =companyParticipant[campaignInfo.id]
    ? companyParticipant[campaignInfo.id].arr
    : [];

    return(
        <View
        style={[
          mainStyles.rootView,
          { paddingHorizontal: 1, backgroundColor: "white" },
        ]}>
        {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
        {campaignInfo ? (
          <FlatList
            ref={scrollListRef}
            data={uniqBy(dataArray, (cp) => cp._id)}
            extraData={[listLoading,refreshing,activeTAb]}
            renderItem={_renderCampaigns}
            ListHeaderComponent={props.header}
            keyExtractor={_keyExtractor}
            numColumns={3}
            style={{ ...sty.flex1 }}
            // onViewableItemsChanged={this.changeItems}
            refreshControl={
              <RefreshControl
                refreshing={companyParticipant.refreshStatus}
                onRefresh={_onRefresh}
              />
            }
           
            onEndReachedThreshold={0.5}
            onEndReached={() => this._renderMore()}
            ListFooterComponent={() => {
              return (
                <View>
                  {listLoading ? <_InlineLoader type={"grid"} /> : null}
                </View>
              );
            }}
            ListEmptyComponent={<_EmptyPostList />}
            removeClippedSubviews={Platform.OS == "android" ? true : false}
            // windowSize={3}
          />
        ) : (
          <_InlineLoader type={"post"} />
        )}
      </View>
    )
}
