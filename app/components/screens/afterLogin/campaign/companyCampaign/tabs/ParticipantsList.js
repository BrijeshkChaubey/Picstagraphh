import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
  FlatList,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input, Item } from "native-base";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize,
  API,
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
  _Layout,
} from "../../../../../custom";
import { mainLayoutHoc } from "../../../../../hoc";
import mainStyles from "../../../../../../assets/styles/MainStyles";
import { styles } from "../styles";
import { chain, find } from "lodash";

import {
  setParticipantListProp,
  pushParticipantListProp,
  setCompanyListRefreshIndicator,
} from "../../../../../../redux/actions/CompanyParticipantListAction";

import { setParticipantWinners } from "../../../../../../redux/actions/WinnersActions";
import { setParticipantTop10List } from "../../../../../../redux/actions/ParticipantTop10ListAction";
import { setActiveVideo } from "../../../../../../redux/actions/VideoAction";
import { setHomeDataProp } from "../../../../../../redux/actions/HomeActions";
import { setOtherProfileNewsfeed } from "../../../../../../redux/actions/OtherProfileActions";

//ContentBox actions
import {
  setAppData,
  pushAppData,
} from "../../../../../../redux/actions/AppDataActions";
import {
  pushProfileDataProp,
  setProfileDataProp,
} from "../../../../../../redux/actions/ProfileAction";
import { setPagination } from "../../../../../../redux/actions/PaginationActions";
import { setFilterPropArr } from "../../../../../../redux/actions/FilterWrapperAction";
import NavigationService from "../../../../../navigations/NavigationService";

function ParticipantList(props) {

  const [listLoading, setListLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [campaignInfo, setCampaignInfo] = useState();
  const [page, setPage] = useState(props.navigation.state.params.page);
  // const [newPost, setNewPost] = useState();
  // const [itemId, setItemId] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const listEnded = false;
  const participantPostref = useRef({});
  const scrollListRef = useRef(null);
  const data = [];
  const postArr = [];

  const {campaignInfo, newPost, itemId} = props.navigation.state.params;

  const {
    companyParticipant,

    navProps,
    appData,
    loginData,
    localize,
    profile,
    home,
    timestamp,
    companyParticipantList,
    winnerParticipant,
    participantTop10List
   } = useSelector(state => state);

  const otherProfileNewsFeed = useSelector(state => state.otherProfile.otherProfileNewsfeed);

  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setHidden(false);
    return ()=> globals.setUserData("viewedPostsArr", [])

  }, []);

  const _postCb = (postInfo) => {
    props.navigation.navigate("CampaignParticipant", {
      postInfo: postInfo,
    });
  };

  const _keyExtractor = (item, index) => "CampaignParticipant_" + index.toString();

  const changeItems = (data) => {
    if (!postArr.includes(data?.changed[0]?.item?.id)) {
      ApiCall.initiatePostView(
        data.viewableItems,
        companyParticipantList[campaignInfo.id].arr,
        { ...props },
      );
      postArr.push(data?.changed[0]?.item?.id);
    }
    helpers.videoPlayToggle();
  };

  useEffect(() => {
    if (listLoading) {

      if (page + 1 > pagination?.pages) {
        listEnded = true;
        setListLoading(false);
      } else {
        let activePage = page;

        ApiCall.getCampaignParticipants(
          "ParticipantList",
          campaignInfo.slug,
          globals.PARTICIPANT_TYPE.APPROVED,
          ++activePage,
          { text: "full-response" },
        )
          .then((res) => {
            dispatch(pushParticipantListProp({
              id: campaignInfo.id,
              arr: res.data,
              pagination: res.pagination,
            }));
            setListLoading(false);
            setPage(res.pagination.page);
          })
          .catch((err) => {
            setListLoading(false);
          });
      }
    }
  }, [listLoading])

  const _renderMore = () => {
    const { campaignInfo } = props.navigation.state.params;
    if (!companyParticipantList[campaignInfo.id]) return;

    let pagination = companyParticipant[campaignInfo.id].pagination;
    if (listLoading === false) {
      // listLoading = true;
      setListLoading(true);
    }
  };

  const _onRefresh = (top = true, page = 1, newPost = false) => {
    const { campaignInfo } = this.state;

    dispatch(setCompanyListRefreshIndicator(true));
    ApiCall.getCampaignParticipants(
      "ParticipantList",
      campaignInfo.slug,
      globals.PARTICIPANT_TYPE.APPROVED,
      page,
      {
        text: "full-response",
        timestamp: newPost
          ? timestamp["approvedNew" + campaignInfo.id]
          : timestamp["approved" + campaignInfo.id],
      },
    )
      .then((res) => {
        const clickedItem = find(res.data, (ex) => ex._id == itemId);
        let newData = res.data;

        if (clickedItem) {
          newData = chain([clickedItem])
            .concat(res.data)
            .uniqBy((dtx) => dtx._id)
            .value();
        }

        dispatch(setParticipantListProp({
          id: campaignInfo.id,
          arr: newData,
          pagination: res.pagination || {},
        }));
        dispatch(setCompanyListRefreshIndicator(false));
      })
      .catch((err) => {
        !companyParticipantList[campaignInfo.id] &&
          dispatch(setParticipantListProp({
            id: campaignInfo.id,
            arr: [],
            pagination: {},
          }));
        dispatch(setCompanyListRefreshIndicator(false));
      });
  };

  const _renderCampaigns = ({ item, index }) => {
    const { isCampaignOwner } = props;
    item = Object.assign({ navigateToFullView: _postCb }, item);
    if (isCampaignOwner) {
      item = Object.assign({ approveParticipantFlag: true }, item);
    }

    return (
      <View
        key={"CampaignParticipantList_" + index.toString()}
        ref={(ref) => (participantPostref[item._id] = ref)}
        renderToHardwareTextureAndroid={renderTexture}
        style={{ paddingTop: index === 0 ? 7.5 : 0 }}>
        <_ContentType
          itemKey={"Campaign_Participant_List" + index.toString()}
          contentInfo={item}
          index={index}
          {...props}
          change={true}
        />
      </View>
    );
  };

  const header = {
    leftCb: () => {
      props.navigation.pop();
    },
    title: "Participants",
    disableLang: true,
    leftImg: images.leftBackArrow,
    rightTxt: "",
  };

  data = companyParticipantList[campaignInfo.id]
    ? companyParticipantList[campaignInfo.id].arr
    : [];


  return (
<>
    {
        (!campaignInfo || (companyParticipantList[campaignInfo.id] === null))
      ?
      <>
        <_Layout screen={"ParticipantsList"} header={header}>
          <_InlineLoader type={"post"} />
        </_Layout>
      </>
      :
      <_Layout
        screen={"ParticipantsList"}
        header={header}
        style={{ backgroundColor: colors.gridListBG }}>
        <View style={[mainStyles.rootView]}>
          {/* <PanGestureHandler
            onHandlerStateChange={(e) => this.handleScrollEvent(e)}
          > */}

          <FlatList
            bounces={false}
            scrollEnabled={true} // should be kept as false to allow scrolling one item at a time
            onScrollToIndexFailed={(info) => {
              // const wait = new Promise((resolve) => setTimeout(resolve, 500));
              // wait.then(() => {
              //   this.scrollListRef.scrollToIndex({
              //     index: this.state.currentIndex,
              //     animated: true,
              //   });
              // });
            }}
            pinchGestureEnabled={false}
            ref={(ref) => {
              scrollListRef = ref;
            }}
            data={data}
            extraData={[listLoading, refreshing, campaignInfo, page, newPost, itemId, currentIndex]}
            renderItem= {_renderCampaigns}
            // decelerationRate={Platform.OS === "ios" ? -80.0 : 0}
            ListHeaderComponent={header}
            keyExtractor={_keyExtractor}
            style={{ ...sty.flex1 }}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 70,
            }}
            onViewableItemsChanged={changeItems}
            refreshControl={
              <RefreshControl
                refreshing={companyParticipantList.refreshStatus}
                onRefresh={_onRefresh}
              />
            }
            // onScroll={(e) => {
            //     this.listEndTrigger()
            // }}
            onEndReachedThreshold={0.5}
            onEndReached={() => _renderMore()}
            ListFooterComponent={() => {
              return (
                <View>
                  {listLoading ? <_InlineLoader type={"grid"} /> : <View style={{ paddingBottom: 50 }} />}
                </View>
              );
            }}
            maxToRenderPerBatch={10}
            windowSize={10}
            ListEmptyComponent={<_EmptyPostList />}
            removeClippedSubviews={Platform.OS == "android" ? true : false}
          />
        </View>
        {/* </PanGestureHandler> */}
        {props.navigation.state.params.footerButton()}

      </_Layout>
            }
            </>
    )




}