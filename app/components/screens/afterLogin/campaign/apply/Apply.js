import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    RefreshControl,
    StatusBar,
    Platform,
    Modal,
    ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globals, helpers, sty, ApiCall, API, images } from "../../../../../configs";
import {
    _GradiantView,
    _Lang,
    _ContentType,
    _InlineLoader,
    _EmptyPostList,
} from "../../../../custom";
import mainStyles from "../../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import {
    setHomeDataProp,
    pushHomeDataProp,
    setRefreshIndicator,
} from "../../../../../redux/actions/HomeActions";
import { setPicsUserHomeData } from "../../../../../redux/actions/PicsHomeActions";
import { setTimestampData } from "../../../../../redux/actions/TimestampAction";
import { setOtherProfileNewsfeed } from "../../../../../redux/actions/OtherProfileActions";
import { setParticipantProp } from "../../../../../redux/actions/CompanyParticipantAction";
import { setUserInfo } from "../../../../../redux/actions/UserInfoAction";
import {
    setCampaignProp,
    pushCampaignProp,
} from "../../../../../redux/actions/CampaignsActions";
//ContentBox actions
import {
    setAppData,
    pushAppData,
} from "../../../../../redux/actions/AppDataActions";
import {
    pushProfileDataProp,
    setProfileDataProp,
} from "../../../../../redux/actions/ProfileAction";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { setPagination } from "../../../../../redux/actions/PaginationActions";
import { uniqBy, find, map } from "lodash";
import FastImage from "react-native-fast-image";
import {usePrevious} from '../../../../../configs/utils/usePrevious';
import { red } from "../../../../../configs/utils/colors";
const FILTERS_FOR = globals.FILTERS_FOR;
const FILTERS_TYPES = globals.FILTERS_TYPES;


function Apply(props) {
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [load, setLoad] = useState(false);
    const [listLoading, setListLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [apiType, setApiType] = useState(props.apiType ? props.apiType : "");
    const [contestPagination, setContestPagination] = useState(props?.contestPagination);
    const [contestData, setContestData] = useState(props.data);

    console.log('Apply props contest data ===>',props.data);
    // let listLoading = false;
    let listEnded = false;
    let scrollListRef = useRef(null);
    let companyPostRef = useRef({});
    let offSet = 0;

    const {home,
        userInfo,
        navProps,
        appData,
        loginData,
        localize,
        profile,
        campaigns,
        companyParticipant,
        timestamp} = useSelector((state) => state);
    const pagination = useSelector(state => state.pagination.companyCampaign);
    const otherProfileNewsfeed = useSelector(state => state.otherProfile.otherProfileNewsfeed);
    const users = useSelector(state => state.picsHomeReducer.users);

    const dispatch = useDispatch();

    const _campignCb = (campaignInfo) => {
        getCampaignInfo(campaignInfo.slug);
    };
    
   
    // useEffect(() => {
    //     debugger
    //     props.setApplyTop(scrollToTop());
    //     globals.setUserData("contest" + apiType + "Load", _onRefresh);
    // }, []);

    useEffect(() => {
       
        // provide the feature of componentDidUpdate
            const preProp = props;
            console.log('timestamp ==>',timestamp);
            console.log('previous Props :==>', preProp, " new Props :", props);
            if (
                timestamp[apiType] !== undefined 
                // &&
                // preProp?.timestamp[apiType] === undefined
            ) {
                _onUpdateRedis(1, apiType, true);
            }
    }, [timestamp])

  useEffect(()=>{
   
    if (props.activeTab !== activeTab)
        setActiveTab(props.activeTab)
  },[props.activeTab]);

    const _onUpdateRedis = (page, apiType, callNew = false) => {
        // const { timestamp } = props;
       
        console.log('_onUpdateRedis timestamp ==>',timestamp);
        let filterStr = props.getFilters();
        ApiCall.getCampaignsUpdateRedis(
            apiType,
            timestamp[apiType],
            page,
            filterStr,
        )
            .then((res) => {
                let count = 0;
                const newArr = map(campaigns[apiType], (dt) => {
                    const z = find(res.data, (rs) => rs._id === dt._id);

                    if (z !== undefined && z !== dt && !dt.userParticipateCount) {
                        count += 1;
                        return Object.assign({}, dt, z);
                    } else {
                        return dt;
                    }
                });

                if (count > 1) {
                    dispatch(setCampaignProp({
                        prop: apiType,
                        arr: newArr,
                    }));
                }

                callNew ? _onRefresh(apiType) : null;
            })
            .catch((err) => {
                console.log(" Error _onUpdateRedis :", err);
            });
    };

//    const scrollToTop = () => {
//     // console.warn('scrollListRef===>',scrollListRef.scrollToOffset);
//         scrollListRef &&
//             scrollListRef?.current?.scrollToOffset({
//                 offset:0, 
//                 // x: 0, y: 0, 
//                 animated: true });
//     };
    const getCampaignInfo = (campaignSlug) => {
        let cb = {
            success: (res) => {
                console.log('getCompaignInfo response ==>',res);
                if (find(campaigns[apiType], (dt) => dt._id === res.data._id)) {
                    // setCampaignProp({ prop: apiType, arr: [res.data] })
                    dispatch(setCampaignProp({
                        prop: apiType,
                        arr: map(campaigns[apiType], (dt) =>
                            dt._id === res.data._id ? Object.assign({}, dt, res.data) : dt,
                        ),
                    }));
                } else if (campaigns[apiType] === null) {
                    dispatch(setCampaignProp({ prop: apiType, arr: [res.data] }));
                } else {
                    dispatch(pushCampaignProp({ prop: apiType, arr: [res.data] }));
                }

                // alert('navigate to CompanyCampaign');
                props.navigation.navigate("CompanyCampaign", {
                    campaignInfo: res.data,
                    // campaignShareHandler: campaignShareHandler,
                    apiType,
                });
            },
            error: (e) => { setLoad(false); },
            complete: () => setLoad(false),
        };
        let header = helpers.buildHeader({ authorization: loginData.token });
        //props.loader.load();

        setLoad(true);
        API.getCamapignInfo({}, cb, header, campaignSlug);
    };


    const _renderCampaigns = ({ item, index }) => {
        console.log('apply renderCampaign ==>',item);
        item = Object.assign({ navigateToFullView: _campignCb }, item);
        return (
            <View
                key={`Campaigns_post_${item._id}`}
                ref={(ref) => (companyPostRef[item.id] = ref)}
                // renderToHardwareTextureAndroid={renderTexture}
                style={{ marginTop: index === 0 ? 7.5 : 0 }}>
                    {/* <Text>Hello renderCampaign</Text> */}
                <_ContentType
                    key={"companyCampaignItem" + index}
                    contentInfo={item}
                    index={index}
                    {...props}
                    disableScroll={true}
                />
            </View>
        );
    };

    const _keyExtractor = (item, index) => "NewsTab_" + index.toString();

    const _onRefresh = (apiType, timest = null, callUpdate = false) => {
        setRefreshing(true);
    };

    useEffect(() => {
        if (refreshing) {

            let filterStr = props.getFilters();
            ApiCall.getCampaignsData(
                "company",
                1,
                apiType,
                filterStr,
                // timest || timestamp[apiType],
                null || timestamp[apiType],
            )
                .then((res) => {
                    if (res.data.length > 0) {
                        
                        dispatch(setTimestampData(apiType, res.timestamp));
                        dispatch(pushCampaignProp({ prop: apiType, arr: res.data }, true));
                    }
                    // callUpdate ? this._onUpdateRedis(1, apiType) : null;
                    setRefreshing(false);

                })
                .catch((e) => {
                    campaigns[apiType] === null
                        ? setCampaignProp({ prop: apiType, arr: [] })
                        : null;
                    setRefreshing(false);
                });
        }
    }, [refreshing]);

    // const _loadMore = (apiType) => {
    //     console.log("contsts", props?.contestPagination);
    //     if (listLoading === false) {
    //         setListLoading(true);
    //     }
    // };

    useEffect(() => {
       
        if (listLoading) {
            if (props?.data) {
                if (contestPagination.page + 1 > contestPagination.pages) {
                    listEnded = true;
                    setListLoading(false);
                } else {
                    let activePage = contestPagination.page;
                    let filterStr = props.getFilters();
                    console.log("Filter", filterStr)
                    ApiCall.getCampaignsData(
                        "company",
                        ++activePage,
                        apiType,
                        filterStr,
                    )
                        .then((res) => {
                            console.log("Pagination result", res)
                            dispatch(pushCampaignProp({ prop: apiType, arr: res.data }));
                            // setPagination(res.pagination, apiType + "Contest");
                            setContestData((preContestData) => [...preContestData, ...res.data]);
                            setContestPagination(res.pagination);
                            setListLoading(false);
                        })
                        .catch((e) => {
                            setListLoading(false);
                        });
                }
            }
            else {

                if (pagination[apiType]?.page + 1 > pagination[apiType]?.pages) {
                    listEnded = true;
                    setListLoading(false);
                } else {
                    let activePage = pagination[apiType].page;

                    let filterStr = props.getFilters();
                    ApiCall.getCampaignsData(
                        "company",
                        ++activePage,
                        apiType,
                        filterStr,
                    )
                        .then((res) => {
                            dispatch(pushCampaignProp({ prop: apiType, arr: res.data }));
                            // setPagination(res.pagination, apiType + "Contest");
                            dispatch(setPagination(
                                { prop: apiType, value: res.pagination },
                                "companyCampaign",
                            ));
                            _onUpdateRedis(res.pagination.page, apiType);
                            setListLoading(false);
                        })
                        .catch((e) => {
                            setListLoading(false);
                        });
                }
            }
        }
    }, [listLoading]);

    // const _renderMore = (apiType) => {
    //     // const { pushCampaignProp, setPagination, pagination } = props;
    //     if (listLoading === false) {
    //         setListLoading(true);
    //         //   this.listLoading = true;
    //     }
    // };


    return (
        <>
        { (campaigns[apiType] == null)
            ?
            <View>
                 {/* <Text style={{color:'red',fontSize:20}}>campaign[apiType] is null</Text> */}
                {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
                {props.header()}
                {/* //cause of error */}
                {/* <_InlineLoader type={"contest"} /> */}
            </View>
            :
            <View style={mainStyles.rootView}>
                {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
                {/* <PanGestureHandler
            onHandlerStateChange={(e) => this.handleScrollEvent(e)}
          > */}
            {/* <Text style={{color:'green',fontSize:20}}>ampaign[apiType] is not null</Text> */}
                <FlatList
                    // scrollEnabled={true} // should be kept as false to allow scrolling one item at a time
                    // onScrollToIndexFailed={(info) => {
                    //     const wait = new Promise((resolve) => setTimeout(resolve, 500));
                    //     wait.then(() => {
                    //         scrollListRef.current.scrollToIndex({
                    //             index: currentIndex,
                    //             animated: true,
                    //         });
                    //     });
                    // }}
                    // decelerationRate={Platform.OS === "ios" ? -10 : 0}
                    ref={scrollListRef}
                    data={
                        contestData
                            ? contestData
                            : uniqBy(campaigns[apiType], (cp) => cp._id)
                    }
                    // extraData={[loading, contestData, refreshing, listLoading]}
                    renderItem={_renderCampaigns}
                    // renderItem={({item})=> { 
                    //     console.log('item ==>',item)
                    //     return(<Text>{item}</Text>)}}
                    keyExtractor={_keyExtractor}
                    style={{ ...sty.flex1 }}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={refreshing}
                    //         onRefresh={() => _onRefresh(apiType)}
                    //     />
                    // }
                    // contentContainerStyle={{ paddingBottom: 100 }}
                    // onEndReachedThreshold={0.5}
                    // windowSize={10}
                    // maxToRenderPerBatch={10}
                    // onEndReached={() =>
                    //     props?.data
                    //         ? _loadMore(apiType)
                    //         : _renderMore(apiType)
                    // }
                    ListHeaderComponent={props.header}
                    // ListFooterComponent={() => {
                    //     return <View>{listLoading ? <_InlineLoader /> : null}</View>;
                    // }}
                    // ListEmptyComponent={<_EmptyPostList />}
                />
                {/* </PanGestureHandler> */}
                {/* <Modal
                    transparent={true}
                    animationType={"none"}
                    visible={load}
                    onRequestClose={() => { }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            backgroundColor: "#rgba(0, 0, 0, 0.2)",
                            zIndex: 1000,
                        }}>
                        <ActivityIndicator
                            size={"large"}
                            animating={load}
                            color="black"
                        />
                    </View>
                </Modal> */}
            </View>
         }
         </>
    );
}

export default Apply;