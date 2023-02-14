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
    Alert,
    StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input, Item } from "native-base";
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
import { setActiveVideo } from "../../../../../../redux/actions/VideoAction";
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
    _Lang,
} from "../../../../../custom";
import { mainLayoutHoc } from "../../../../../hoc";
import mainStyles from "../../../../../../assets/styles/MainStyles";
import { styles } from "../styles";
import moment from "moment";

import {
    setParticipantWinners,
    pushParticipantWinners,
} from "../../../../../../redux/actions/WinnersActions";

import { setParticipantListProp } from "../../../../../../redux/actions/CompanyParticipantListAction";
import { setParticipantTop10List } from "../../../../../../redux/actions/ParticipantTop10ListAction";

import { setHomeDataProp } from "../../../../../../redux/actions/HomeActions";
import { setTimestampData } from "../../../../../../redux/actions/TimestampAction";
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
import { setCompanyRefreshIndicator } from "../../../../../../redux/actions/CompanyParticipantAction";
import FastImage from "react-native-fast-image";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import DetailCard from "../../../../../custom/DetailCard";
import { WINDOW_WIDTH } from "../../../../../../configs/libs/globals";

function Winners(props) {
    const [listLoading, setListloading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [timeDiff, setTimeDiff] = useState(0);
    const [timerRendered, setTimerRendered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const listEnded = false;
    const winnerPostref = {};
    const scrollListRef = useRef(null);

    const dispatch = useDispatch();

    const {participantTop10,
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

    const otherProfileNewsfedd = useSelector(state => state.otherProfile.otherProfileNewsfeed);


    useEffect(() => {
        dispatch(setWinnerTop(scrollToTop));
        dispatch(setWinnerRefresh(_onRefresh));
        dispatch(setRemoveTimer(_setClearInterval));
    }, []);

    useEffect(() => {
        if (props.activeTab !== state.activeTab) {
            setActiveTab(props.activeTab);
        }
    }, [props]);


    const _setClearInterval = () => clearInterval(intervalId);

    const scrollToTop = () => {
        const { campaignInfo } = props;
        if (
            winnerParticipant[campaignInfo.id] &&
            winnerParticipant[campaignInfo.id].arr.length > 0
        ) {
            scrollListRef &&
                scrollListRef.current.scrollToIndex({ animated: true, index: 0 });
        } else {
            scrollListRef && scrollListRef.current.scrollToEnd({ animated: true });
        }
    };

    const _onRefresh = (top = true) => {
        const {
            campaignInfo,
        } = props;
        // top ? this.scrollToTop() : null
        dispatch(setCompanyRefreshIndicator(true));
        // ApiCall.getCampaignParticipants(campaignInfo.slug, globals.PARTICIPANT_TYPE.WINNER, 1, { text: 'full-response', timestamp: timestamp['winner' + campaignInfo.id] }).then((res) => {
        ApiCall.getCampaignParticipants(
            campaignInfo.slug,
            globals.PARTICIPANT_TYPE.WINNER,
            1,
            { text: "full-response" }
        )
            .then((res) => {
                dispatch(setParticipantWinners({
                    id: campaignInfo.id,
                    arr: res.data,
                    pagination: res.pagination,
                }));

                dispatch(setCompanyRefreshIndicator(false));
            })
            .catch((err) => {
                !winnerParticipant[campaignInfo.id] &&
                    dispatch(setParticipantWinners({
                        id: campaignInfo.id,
                        arr: [],
                        pagination: {},
                    }));
                dispatch(setCompanyRefreshIndicator(false));
            });
    };

    const _renderCard = (value) => {
        const { campaignInfo } = props;
        const { campaignIcons } = campaignInfo;
        console.log("icons", campaignIcons)

        return (
            <DetailCard
                isJury
                icon={campaignIcons?.calender}
                themeColor={campaignInfo?.themeColor ? campaignInfo?.themeColor : colors.primaryColor}
                title={helpers.getLocale(localize, "campaign", "and_the_winner")}
                description={helpers.getLocale(localize, "campaign", "winner_description")}
                timer={renderTimer()}
            />
        );
    }

    const renderTimer = () => {
        const { campaignInfo } = props;

        const contestFinalistEndDat = moment(campaignInfo.endDate).add(4, "weeks");
        if (!timerRendered) {
            const timeDifference = contestFinalistEndDat.diff(moment());

            setTimeDiff(timeDifference);
            setTimerRendered(true);

            intervalId = setInterval(() => {
                if (this.state.timeDiff > 0) {
                    setTimeDiff(timeDiff - 1000);
                } else {
                    clearInterval(tintervalId);
                    _onRefresh();
                }
            }, 1000);
        }
        return _renderLeftCounter();
    };

  const  _renderLeftCounter= ()=> {
        const { campaignInfo } = props;

        const contestFinalistEndDate = moment(campaignInfo.endDate).add(4, "weeks");
        let timeDifference = timeDiff;
        let durationDiffernce = moment.duration(timeDifference);
        let years =
            durationDiffernce.years().toString() > 0
                ? durationDiffernce.years().toString() + "Y."
                : "";
        let months =
            durationDiffernce.months().toString() > 0
                ? durationDiffernce.months().toString() + "M."
                : "";
        let days =
            durationDiffernce.days().toString() > 0
                ? durationDiffernce.days().toString() + "D."
                : "00D";
        let hour =
            durationDiffernce.hours().toString() > 0
                ? durationDiffernce.hours().toString() + "H."
                : "00H.";
        let min =
            durationDiffernce.minutes().toString() > 0
                ? durationDiffernce.minutes().toString() + "m."
                : "00m.";
        let sec =
            durationDiffernce.seconds().toString() > 0
                ? durationDiffernce.seconds().toString() + "s."
                : "00s.";
        const headingText = "Winners announcment";
        return (
            <View style={{ height: 65, width: globals.WINDOW_WIDTH, marginBottom: 35, marginLeft: -20 }}>
                {renderCounterOnPhoto()}
            </View>

        );
    };

    const renderCounterOnPhoto = () => {
        const { campaignInfo} = props;

        const contestFinalistEndDate = moment(campaignInfo.endDate).add(4, "weeks");
        let timeDifference = timeDiff;
        const durationDiffernce = moment.duration(timeDifference);

        const days = contestFinalistEndDate.diff(moment(), "days");
        const hour = durationDiffernce.hours().toString();
        const min = durationDiffernce.minutes().toString();
        const sec = durationDiffernce.seconds().toString();

        return (
            <View
                style={{
                    ...sty.padv10,
                    ...sty.flex1,
                    ...sty.mgT10,
                    ...sty.mgB10,
                    ...sty.mgH10,
                }}>
                <View
                    style={{
                        ...sty.fRow,
                        ...sty.jSpace,
                        flex: 1,
                        paddingHorizontal: WINDOW_WIDTH / 20,
                        paddingVertical: WINDOW_WIDTH / 30,
                    }}>
                    <View
                        style={{
                            ...sty.jCenter,
                            ...sty.aCenter,
                            ...styles.shadow,
                            borderRadius: 1000,
                            backgroundColor: "white",
                            height: WINDOW_WIDTH / 6,
                            width: WINDOW_WIDTH / 6

                        }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 20,
                                fontWeight: "bold",
                                color: colors.black,
                            }}>
                            {days < 0 ? "0" : days}
                        </Text>
                        <_Lang
                            text={"campaign.days"}
                            style={{
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 30,
                                // fontWeight: "bold",
                                color: colors.black,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            ...sty.jCenter,
                            ...sty.aCenter,
                            ...styles.shadow,
                            height: WINDOW_WIDTH / 6,
                            width: WINDOW_WIDTH / 6,
                            borderRadius: 1000,
                            backgroundColor: "white",

                        }}>
                        <Text
                            style={{
                                ...sty.padH10,
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 20,
                                fontWeight: "bold",
                                color: colors.black,
                            }}>
                            {hour < 0 ? "0" : hour}
                        </Text>
                        <_Lang
                            text={"campaign.hours"}
                            style={{
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 30,
                                // fontWeight: "bold",
                                color: colors.black,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            ...sty.jCenter,
                            ...sty.aCenter,
                            ...styles.shadow,
                            height: WINDOW_WIDTH / 6,
                            width: WINDOW_WIDTH / 6,
                            borderRadius: 1000,
                            backgroundColor: "white",

                        }}>
                        <Text
                            style={{
                                ...sty.padH10,
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 20,
                                fontWeight: "bold",
                                color: colors.black,
                            }}>
                            {min < 0 ? "0" : min}
                        </Text>
                        <_Lang
                            text={"campaign.minutes"}
                            style={{
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 30,
                                // fontWeight: "bold",
                                color: colors.black,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            ...sty.jCenter,
                            ...sty.aCenter,
                            ...styles.shadow,
                            height: WINDOW_WIDTH / 6,
                            width: WINDOW_WIDTH / 6,
                            borderRadius: 1000,
                            backgroundColor: "white",

                        }}>
                        <Text
                            style={{
                                ...sty.padH10,
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 20,
                                fontWeight: "bold",
                                color: colors.black,
                            }}>
                            {sec < 0 ? "0" : sec}
                        </Text>
                        <_Lang
                            text={"campaign.seconds"}
                            style={{
                                textAlign: "center",
                                fontSize: WINDOW_WIDTH / 30,
                                // fontWeight: "bold",
                                color: colors.black,
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };

    const _renderCampaigns = ({ item, index }) => {
        item = Object.assign({ navigateToFullView: _postCb }, item);
        return (
          <View
            key={"CampaignWinnerList_" + index.toString()}
            ref={(ref) => (winnerPostref[item._id] = ref)}
            renderToHardwareTextureAndroid={renderTexture}
          >
            <_ContentType
              itemKey={"Campaign_Winners" + index.toString()}
              contentInfo={item}
              index={index}
              {...props}
            />
          </View>
        );
      };

     const _postCb = (postInfo) => {
        props.navigation.navigate("CampaignParticipant", {
          postInfo: postInfo,
        });
      };

    const  _keyExtractor = (item, index) => "CampaignParticipant_" + index.toString();

    const changeItems = (data) => {
        const { campaignInfo} = props;
    
        ApiCall.initiatePostView(
          data.viewableItems,
          winnerParticipant[campaignInfo.id].arr,
          { ...props }
        );
       //setActiveVideo(data?.changed[0]?.item?.id);
        helpers.videoPlayToggle();
    };

    const _renderMore = () => {
        const {
          campaignInfo,
        } = props;

        if (!winnerParticipant[campaignInfo.id]) return;
    
        let pagination = winnerParticipant[campaignInfo.id].pagination;
    
        if (listLoading === false) {
           setListloading(true);
        }
      };

      useEffect(()=>{
        if(listLoading){
            if (pagination.page + 1 > pagination.pages) {
                listEnded = true;
                setListloading(false);
              } else {
                let activePage = pagination.page;
    
                ApiCall.getCampaignParticipants(
                  campaignInfo.slug,
                  globals.PARTICIPANT_TYPE.WINNER,
                  ++activePage,
                  {}
                )
                  .then((res) => {
                    dispatch(pushParticipantWinners({
                      id: campaignInfo.id,
                      arr: res.data,
                      pagination: res.pagination,
                    }));
                    setListloading(false);
                  })
                  .catch((err) => {
                    setListloading(false);
                  });
              }
        }
      },[listLoading]);


    const dataArr = winnerParticipant[campaignInfo.id]
      ? winnerParticipant[campaignInfo.id].arr
      : [];
    return (
        <View style={mainStyles.rootView}>

            {campaignInfo ? (
                dataArr.length == 0 ? (
                    winnerParticipant[campaignInfo.id] ? (
                        _renderCard()
                    ) : null
                ) : (
                    <FlatList
                        scrollEnabled={true}
                        onScrollToIndexFailed={(info) => {
                            const wait = new Promise((resolve) => setTimeout(resolve, 500));
                            wait.then(() => {
                                scrollListRef.current.scrollToIndex({
                                    index: currentIndex,
                                    animated: true,
                                });
                            });
                        }}
                        ref={scrollListRef}
                        data={dataArr}
                        extraData={[listLoading,refreshing,activeTab,timeDiff,timerRendered,currentIndex]}
                        renderItem={_renderCampaigns}
                        keyExtractor={_keyExtractor}
                        style={{ ...sty.flex1 }}
                        ListHeaderComponent={props.header}
                        onViewableItemsChanged={changeItems}
                        viewabilityConfig={{
                            itemVisiblePercentThreshold: 70,
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={companyParticipant.refreshStatus}
                                onRefresh={_onRefresh}
                            />
                        }

                        onEndReachedThreshold={100}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        onEndReached={() => _renderMore()}
                        ListFooterComponent={() => {
                            return (
                                <View>
                                    {listLoading ? <_InlineLoader type={"grid"} /> : null}
                                </View>
                            );
                        }}

                        removeClippedSubviews={Platform.OS == "android" ? true : false}

                    />
                )
            ) : (
                <_InlineLoader type={"post"} />
            )}
        </View>
    )

}