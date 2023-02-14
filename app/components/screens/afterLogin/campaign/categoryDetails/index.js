// import React, { useEffect, useRef, useState } from "react";
// import {
//     StatusBar,
//     Image,
//     View,
//     Text,
//     Animated,
//     TouchableOpacity,
//     ScrollView,
//     Linking,
//     FlatList,
//     SafeAreaView,
//     Platform,
// } from "react-native";
// import {
//     colors,
//     images,
//     helpers,
//     globals,
//     ApiCall,
//     API,
// } from "../../../../../configs";
// import FastImage from "react-native-fast-image";
// import { setAppData } from "../../../../../redux/actions/AppDataActions";
// import { setCampaignProp } from "../../../../../redux/actions/CampaignsActions";
// import {
//     setPicsUserHomeData,
//     setStoryRefreshIndicator,
// } from "../../../../../redux/actions/PicsHomeActions";

// import {
//     pushParticipantProp,
//     setCompanyRefreshIndicator,
//     setParticipantProp,
// } from "../../../../../redux/actions/CompanyParticipantAction";
// import {
//     setHomeDataProp,
//     pushHomeDataProp,
//     setRefreshIndicator,
// } from "../../../../../redux/actions/HomeActions";
// import { setNavigation } from "../../../../../redux/actions/NavAction";
// import { setOtherProfileContest } from "../../../../../redux/actions/OtherProfileActions";
// import { setParticipantTop10 } from "../../../../../redux/actions/ParticipantTop10";
// import { setPendingParticipantProp } from "../../../../../redux/actions/PendingParticipantAction";
// import {
//     pushProfileDataProp,
//     setProfileDataProp,
// } from "../../../../../redux/actions/ProfileAction";
// import { setTimestampData } from "../../../../../redux/actions/TimestampAction";
// import { setUserInfo } from "../../../../../redux/actions/UserInfoAction";
// import { setParticipantWinners } from "../../../../../redux/actions/WinnersActions";
// import {
//     _Layout,
//     _Loading,
//     _Button,
//     _Lang,
//     _InlineLoader,
// } from "../../../../custom";
// import { HeaderImage } from "../../../../custom/HeaderImage";
// import TabHeader from "../../../../custom/ContentTypes/common/TabHeader";
// import { getTabWidth } from "../../../../../configs/libs/helpers";
// const POST_TYPES = globals.POST_TYPES;
// const FILTERS_FOR = globals.FILTERS_FOR;
// const FILTERS_TYPES = globals.FILTERS_TYPES;
// import News from "../../home/news/News";
// import Explore from "../../home/explore/Explore";
// import Apply from "../apply/Apply";
// import User from "../../home/user/User";
// import { _Header } from "../../../../custom";
// import { _SubcribeButton } from "../../../../custom/ContentTypes/common/_SubscribeButton";
// import { WINDOW_WIDTH } from "../../../../../configs/libs/globals";
// import { setPagination } from "../../../../../redux/actions/PaginationActions";
// import { useDispatch, useSelector } from "react-redux";
// var jwtDecode = require("jwt-decode");

// function CategoryDetails(props) {

//     const [index, setIndex] = useState(0);
//     const [refreshing, setRefreshing] = useState(false);
//     const [redirectionUrl, setRedirectionUrl] = useState(undefined);
//     const [filterKey, setFilterKey] = useState(null);
//     const [showHeader, setShowHeader] = useState(true);
//     const [yAxis, setyAxis] = useState(0);
//     const [renderTab, setRenderTab] = useState(false);
//     const [listLoading, setListLoading] = useState(false);
//     const [contestData, setContestData] = useState([]);
//     const [contestPagination, setContestPagination] = useState(null);
//     const [foryouPagination, setForYouPagination] = useState(null);
//     const [subscribeCount, setSubscriberCount] = useState(0);
//     const [position, setPosition] = useState(new Animated.Value(0));
//     const [routes,setRoutes] = useState([
//         {
//             index: 0,
//             key: "all",
//             icon: ["ios-star-outline", "ios-star"],
//             text: "tabs.campaign",
//             logo: "homeStage",
//         },
//         {
//             index: 1,
//             key: "explore",
//             icon: ["ios-compass-outline", "ios-compass"],
//             text: "home.explore",
//             logo: "homeExplore",
//         },
//         {
//             index: 2,
//             key: "community",
//             icon: ["ios-paper-outline", "ios-paper"],
//             text: "home.community",
//             logo: "homeNews",
//         },

//     ]);
//     const [data,setData] = useState({});
//     const [loaded,setLoaded] = useState(false);
//     const [loaders, setloader] = useState({
//         news: false,
//         explore: false,
//         participant: false,
//         user: false,
//         apply: false,
//     });
//     const [subHeaderHeight, setSubHeaderHeight] = useState(new Animated.Value(68));
//     const [tab1Height, setTab1Height] = useState(globals.WINDOW_HEIGHT);
//     const [tab2Height, setTab2Height] = useState(globals.WINDOW_HEIGHT);
//     const [tab3Height, setTab3Height] = useState(globals.WINDOW_HEIGHT);
//     const [tab4Height, setTab4Height] = useState(globals.WINDOW_HEIGHT);

//     const newsEndTrigger = null;
//     const exploreEndTrigger = null;
//     const userEndTrigger = null;
//     const participantEndTrigger = null;
//     const newsRefresh = null;
//     const exploreRefresh = useRef(null);
//     const scrollListRef = useRef(null);
//     const newsTop = null;
//     const exploreTop = useRef(null);
//     const participantTop = null;
//     const ApplyTop = useRef(null);

//     const {userInfo, home, filtersData, users} = useSelector(state => state);
//     const dispatch = useDispatch();
//     dispatch(setHomeDataProp({
//         prop: "explore",
//         arr: [],
//     }));
//     // _getCount();

//     // const _getCount = () => {
//     //     const { loginData } = props;
//     //     let header = helpers.buildHeader({ authorization: loginData.token });
//     //     const { image, title, key, loader } = props.navigation.state.params;
//     //     let callback = Object.assign(
//     //         {},
//     //         {
//     //             success: (res) => {
//     //                 console.log("Count User", res);
//     //                 setSubscriberCount(res?.data?.count);
//     //                 // this._getUserInfo(true)
//     //             },
//     //             error: (err) => {
//     //                 console.log(err);
//     //             },
//     //         },
//     //     );

//     //     API.getSubscriberCount({ category: key }, callback, header);
//     // };

//     // useEffect(() => {
//     //      callHomeCampaignAPI(); 
//     // }, [props]);

//     // const callHomeCampaignAPI = async()=>{
//     //     await _homeApis(1);
//     //     await _campaignApi(0);
//     // }
     
//     // const _homeApis = async (
//     //     index,
//     //     forceCall = false,
//     //     userId = null,
//     //     getStories = false,
//     // ) => {
//     //     console.log("Called");
//     //     const { image, title, key } = props.navigation.state.params;
//     //     console.log('urlkey', key)
//     //     if (home?.explore?.length > 0) {
//     //         dispatch(setHomeDataProp({
//     //             prop: "explore",
//     //             arr: [],
//     //         }));
//     //     }
//     //     await ApiCall.getHomeData("exploreList", 1, "category=" + key, {
//     //         mediaPage: 1,
//     //         stagePage: 1,
//     //         //id: userId != null ? userId : props.loginData.id,
//     //     })
//     //         .then((res) => {
//     //             console.log("url res", res);
//     //             dispatch(setPagination(res.pagination, "homeExplore"));
//     //             const updated = res.data.map((item) => {
//     //                 return Object.assign({}, item, {
//     //                     mediaPage: res.pagination.mediaPage,
//     //                     stagePage: res.pagination.stagePage,
//     //                 });
//     //             });
//     //             console.log("Updated Data", updated);
//     //             dispatch(setHomeDataProp({
//     //                 prop: 'explore',
//     //                 arr: updated
//     //             }));
//     //             // this.setState({
//     //             //   foryouData: updated,
//     //             //   foryouPagination: res.pagination,
//     //             // });
//     //             setLoaded(true);
//     //             dispatch(setRefreshIndicator(false));
//     //         })
//     //         .catch((e) => {
//     //             dispatch(setHomeDataProp({ prop: apiType, arr: [] }));
//     //             dispatch(setRefreshIndicator(false));
//     //         });
//     // };
//     // const _campaignApi = (index, forceCall = false) => {
//     //     const { image, title, key } =props.navigation.state.params;

//     //     let filterStr = _getFilters();

//     //     let apiType = routes[index].key;
//     //     if (forceCall) {
//     //        dispatch(setCampaignProp({ prop: apiType, arr: null }));
//     //     }
//     //     let callApi =
//     //         campaigns[apiType] === null ||
//     //             (campaigns[apiType] && campaigns[apiType].length === 0)
//     //             ? true
//     //             : false;
//     //     if (true || forceCall) {
//     //         ApiCall.getCampaignsData("company", 1, apiType, "category=" + key)
//     //             .then((res) => {
//     //                 console.log("res", res);
//     //                  setContestData(res.data);
//     //                  setContestPagination(res.pagination);
                   
//     //                dispatch(setTimestampData(apiType, res.timestamp));
//     //             })
            
//     //             .catch((e) => {
//     //             });
//     //     }
//     // };

    const setExploreTop = (ref) => (exploreTop = ref);
//     // const setApplyTop = (ref) => (ApplyTop = ref);

//     const _handleScroll = (event) => {
//         //	 const positionX = event.nativeEvent.contentOffset.x;
//         const positionY = event.nativeEvent.contentOffset.y;
//         console.log(positionY);
//         setyAxis(positionY);
//     };

//     // const _getFilters = () => {
//     //     const { key } = props.navigation.state.params;
//     //     return "category=" + key;
//     // };

//     const _topHeader = () => {
//         console.log('category Detail==>',props);
//         const {
//             image,
//             title,
//             icon,
//             loader,
//             key,
//         } = props.route.params;
//         console.log("iconn", icon);
//         return (
//             <>
//                 <HeaderImage
//                     image={image}
//                     navigation={props.navigation}
//                     title={""}
//                 />
//                 <View
//                     style={{
//                         width: "100%",
//                         flexDirection: "row",
//                         height: WINDOW_WIDTH / 5.5,
//                         backgroundColor: "#f9f9f9",
//                         borderBottomColor: "black",
//                         borderBottomWidth: 0.5,
//                     }}>
//                     <View
//                         style={{
//                             flex: 0.2,
//                             justifyContent: "center",
//                             alignItems: "center",
//                         }}>
//                         <FastImage
//                             source={{ uri: icon }}
//                             resizeMode={"contain"}
//                             style={{ height: 35, width: 35, marginLeft: 9 }}
//                         />
//                     </View>
//                     <View
//                         style={{
//                             flex: 0.5,
//                             justifyContent: "center",
//                             alignItems: "flex-start",
//                         }}>
//                         <Text
//                             style={{
//                                 fontSize: WINDOW_WIDTH / 22,
//                                 color: "black",
//                                 fontFamily: "Poppins-ExtraBold",
//                             }}>
//                             {title}
//                         </Text>
//                         <View style={{ flexDirection: "row" }}>
//                             {/* <Text style={{ fontSize: WINDOW_WIDTH/25, color: 'black', fontFamily: 'Poppins-ExtraBold', marginTop: 2 }}>{this.state.subscriberCount}</Text> */}
//                             {/* <_Lang
//                                     style={{ fontSize: WINDOW_WIDTH / 25, color: 'black', fontFamily: 'Poppins-ExtraBold', marginTop: 2,marginLeft:3 }}
//                                 text={`profile.subscribers`}
//                                 /> */}
//                         </View>
//                     </View>
//                     <View style={{ flex: 0.3, justifyContent: "center" }}>
//                         {/* <_SubcribeButton
//                             onSubscribe={(e) => setSubscriberCount(e)}
//                             isSubscribe={userInfo?.category == key ? true : false}
//                             category={key}
//                             {...props}
//                             loader={loader}
//                         /> */}
//                     </View>
//                 </View>
//             </>
//         );
//     };

//     // const _changeTab = (index, force = true, getStories = false) => {
//     //     helpers.pauseVideo();
//     //     setIndex(index);
//     // };
//     // const _customTabs = () => {
//     //     return (
//     //         <View style={{ marginTop: 10 }}>
//     //             <TabHeader
//     //                 routes={routes}
//     //                 index={index}
//     //                 // styles={{ width: getTabWidth(1) }}
//     //                 tabWidth={getTabWidth(3)}
//     //                 changeTab={(i) => _changeTab(i)}
//     //                 itemStyle={{ paddingTop: 0 }}
//     //             />
//     //         </View>
//     //     );
//     // };

//     const _contentView = () => {
//         const { loader, title, key } = props.navigation.state.params;
//         return (
//             <>
//                 {_customTabs()}
//                 {index === 1 ? (
//                     home?.explore?.length > 0 && loaded ? (
//                         <Explore
//                             postNavigate={_postNavigate}
//                             loading={loaders.explore}
//                             onScroll={_onScroll}
//                             getFilters={_getFilters}
//                             activeTab={index}
//                             setExploreTop={setExploreTop}
//                             data={home.explore}
//                             loader={loader}
//                             foryouPagination={foryouPagination}
//                             // tabHeader={this._renderTabHeader}
//                             // setExploreEndTrigger={this.setExploreEndTrigger}
//                             // setExploreRefresh={this.setExploreRefresh}
//                             // scrollToTop={() => this.scrollToTop()}
//                             // scrollToEnd={() => this.scrollToEnd()}
//                             {...props}
//                         />
//                     ) : (
//                         <View>
//                             {/* {/ {/ {props.tabHeader()} /} /} */}
//                             <_InlineLoader type={"homeScreenExplore"} />
//                         </View>
//                     )
//                 ) : null}
//                 {index === 0 ? (
//                     contestData.length > 0 ? (
//                         <Apply
//                             postNavigate={_postNavigate}
//                             loading={loaders.apply}
//                             onScroll={_onScroll}
//                             activeTab={index}
//                             setApplyTop={setApplyTop}
//                             // header={this._renderTabBar()}
//                             getFilters={_getFilters}
//                             data={contestData}
//                             contestPagination={contestPagination}
//                             // setNewsEndTrigger={this.setNewsEndTrigger}
//                             // scrollToTop={() => this.scrollToTop()}
//                             // scrollToEnd={() => this.scrollToEnd()}
//                             {...props}
//                             loader={loader}
//                             apiType={routes[index].key}
//                         />
//                     ) : (
//                         <View>
//                             {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
//                             {props.header}
//                             <_InlineLoader type={"contest"} />
//                         </View>
//                     )
//                 ) : null}
//                 {index == 2 ? (
//                     <User
//                         setUserRef={setUserRef}
//                         postNavigate={_postNavigate}
//                         loading={loaders.user}
//                         onScroll={_onScroll}
//                         getFilters={_getFilters}
//                         activeTab={index}
//                         NoHeader
//                         customFilter={"category=" + key}
//                         setUserEndTrigger={setUserEndTrigger}
//                         setUserRefresh={setUserRefresh}
//                         scrollToTop={() => scrollToTop()}
//                         scrollToEnd={() => scrollToEnd()}
//                         {...props}
//                     />
//                 ) : null}
//             </>
//         );
//     };

//     _ScrollHeader = () => {
//         const {
//             image,
//             title,
//             icon,
//             loader,
//             key,
//         } = props.route.params;
//         console.log("iconn", icon);
//         const { userInfo } = props;
//         const header = {
//             leftCb: () => {
//                 props.navigation.pop();
//             },
//             title: title,
//             disableLang: true,
//             leftImg: images.leftBackArrow,
//             rightTxt: "",
//         };
//         return (
//             <>
//                 <View style={{ position: "absolute", backgroundColor: "#f9f9f9" }}>
//                     <_Header header={header} />
//                 </View>
//             </>
//         );
//     };
//     return (
//         <View style={{ flex: 1 }}>
//             {/* <ScrollView onScroll={_handleScroll} style={{ flex: 1 }}>
//                 <StatusBar barStyle="dark-content" />
//                 {_topHeader}
//                 {/* {_contentView()} */}
//                 {/* <_Loading ref={"loader"} /> */}
//             {/* </ScrollView> */} 
//             {/* {yAxis > 150 ? _ScrollHeader() : null} */}
//         </View>
//     )

// }
// export default CategoryDetails

import React, { useState,useEffect } from "react";
import { View,Text,ScrollView,StatusBar } from "react-native";
import { HeaderImage } from "../../../../custom/HeaderImage";
import { WINDOW_WIDTH } from "../../../../../configs/libs/globals";
import FastImage from "react-native-fast-image";
import { _SubcribeButton } from "../../../../custom/ContentTypes/common/_SubscribeButton";
import TabHeader from "../../../../custom/ContentTypes/common/TabHeader";
 import { getTabWidth } from "../../../../../configs/libs/helpers";
 import { setAppData } from "../../../../../redux/actions/AppDataActions";
import { setCampaignProp } from "../../../../../redux/actions/CampaignsActions";
import {
    setPicsUserHomeData,
    setStoryRefreshIndicator,
} from "../../../../../redux/actions/PicsHomeActions";

import {
    pushParticipantProp,
    setCompanyRefreshIndicator,
    setParticipantProp,
} from "../../../../../redux/actions/CompanyParticipantAction";
import {
    setHomeDataProp,
    pushHomeDataProp,
    setRefreshIndicator,
} from "../../../../../redux/actions/HomeActions";
import { setNavigation } from "../../../../../redux/actions/NavAction";
import { setOtherProfileContest } from "../../../../../redux/actions/OtherProfileActions";
import { setParticipantTop10 } from "../../../../../redux/actions/ParticipantTop10";
import { setPendingParticipantProp } from "../../../../../redux/actions/PendingParticipantAction";
import {
    pushProfileDataProp,
    setProfileDataProp,
} from "../../../../../redux/actions/ProfileAction";
import { setTimestampData } from "../../../../../redux/actions/TimestampAction";
import { setUserInfo } from "../../../../../redux/actions/UserInfoAction";
import { setParticipantWinners } from "../../../../../redux/actions/WinnersActions";
 import {
    colors,
    images,
    helpers,
    globals,
    ApiCall,
    API,
} from "../../../../../configs";
import {
    _Layout,
    _Loading,
    _Button,
    _Lang,
    _InlineLoader,
} from "../../../../custom";
import User from "../../home/user/User";
 import Explore from "../../home/explore/Explore";
 import Apply from "../apply/Apply";
import { useDispatch, useSelector } from "react-redux";
var jwtDecode = require("jwt-decode");

export default function CategoryDetails(props){
    const [subscribeCount,setSubscriberCount] = useState(0);
    const [index, setIndex] = useState(0);
//     const [yAxis, setyAxis] = useState(0);
//     const [renderTab, setRenderTab] = useState(false);
//     const [listLoading, setListLoading] = useState(false);
    const [contestData, setContestData] = useState([]);
    const [contestPagination, setContestPagination] = useState(null);
    const [foryouPagination, setForYouPagination] = useState(null);
//     const [subscribeCount, setSubscriberCount] = useState(0);
//     const [position, setPosition] = useState(new Animated.Value(0));
    const [routes,setRoutes] = useState([
        {
            index: 0,
            key: "all",
            icon: ["ios-star-outline", "ios-star"],
            text: "tabs.campaign",
            logo: "homeStage",
        },
        {
            index: 1,
            key: "explore",
            icon: ["ios-compass-outline", "ios-compass"],
            text: "home.explore",
            logo: "homeExplore",
        },
        {
            index: 2,
            key: "community",
            icon: ["ios-paper-outline", "ios-paper"],
            text: "home.community",
            logo: "homeNews",
        },

    ]);
//     const [data,setData] = useState({});
    const [loaded,setLoaded] = useState(false);
    const [loaders, setloader] = useState({
        news: false,
        explore: false,
        participant: false,
        user: false,
        apply: false,
    });
//     const [subHeaderHeight, setSubHeaderHeight] = useState(new Animated.Value(68));
//     const [tab1Height, setTab1Height] = useState(globals.WINDOW_HEIGHT);
//     const [tab2Height, setTab2Height] = useState(globals.WINDOW_HEIGHT);
//     const [tab3Height, setTab3Height] = useState(globals.WINDOW_HEIGHT);
//     const [tab4Height, setTab4Height] = useState(globals.WINDOW_HEIGHT);

//     const newsEndTrigger = null;
//     const exploreEndTrigger = null;
//     const userEndTrigger = null;
//     const participantEndTrigger = null;
//     const newsRefresh = null;
//     const exploreRefresh = useRef(null);
//     const scrollListRef = useRef(null);
//     const newsTop = null;
//     const exploreTop = useRef(null);
//     const participantTop = null;
//     const ApplyTop = useRef(null);
        const {userInfo, home, filtersData, users,campaigns} = useSelector(state => state);
       
    const dispatch = useDispatch();
    // dispatch(setHomeDataProp({
    //     prop: "explore",
    //     arr: [],
    // }));

        useEffect(() => {
         callHomeCampaignAPI(); 
    }, [props]);

    const callHomeCampaignAPI = async()=>{
        await _homeApis(1);
        await _campaignApi(0);
    }
     
    const _homeApis = async (
        index,
        forceCall = false,
        userId = null,
        getStories = false,
    ) => {
      
        console.log(" _HomeApis Called");
        const { image, title, key } = props.route.params;
        console.log('urlkey', key)
        if (home?.explore?.length > 0) {
            dispatch(setHomeDataProp({
                prop: "explore",
                arr: [],
            }));
        }
        await ApiCall.getHomeData("exploreList", 1, "category=" + key, {
            mediaPage: 1,
            stagePage: 1,
            //id: userId != null ? userId : props.loginData.id,
        })
            .then((res) => {
              
                console.log("getHomeData res", res);
                // dispatch(setPagination(res.pagination, "homeExplore"));
                console.log('update data==>',res.data);
                  
                const updated = res.data.map((item) => {
                    console.log('update map==>',item);
                    return Object.assign({}, item, {
                        mediaPage: res.pagination.mediaPage,
                        stagePage: res.pagination.stagePage,
                    });
                });
              
                console.log("Updated Data", updated);
                dispatch(setHomeDataProp({
                    prop: 'explore',
                    arr: updated
                }));
                // this.setState({
                //   foryouData: updated,
                //   foryouPagination: res.pagination,
                // });
                setLoaded(true);
                dispatch(setRefreshIndicator(false));
            })
            .catch((e) => {
                dispatch(setHomeDataProp({ prop: apiType, arr: [] }));
                dispatch(setRefreshIndicator(false));
            });
    };
    const _campaignApi = (index, forceCall = false) => {
       
        const { image, title, key } =props.route.params;

        let filterStr = _getFilters();

        let apiType = routes[index].key;
        if (forceCall) {
           dispatch(setCampaignProp({ prop: apiType, arr: null }));
        }
       
        let callApi =
            campaigns[apiType] === null ||
                (campaigns[apiType] && campaigns[apiType].length === 0)
                ? true
                : false;
        if (true || forceCall) {
            ApiCall.getCampaignsData("company", 1, apiType, "category=" + key)
                .then((res) => {
                  
                    console.log(" getCampaign response", res);
                     setContestData(res.data);
                     setContestPagination(res.pagination);
                   
                   dispatch(setTimestampData(apiType, res.timestamp));
                })
            
                .catch((e) => {
                });
        }
    };
        const _getFilters = () => {
        const { key } = props.route.params;
        return "category=" + key;
    };
        const _topHeader = () => {
        console.log('category Detail==>',props);
        const {
            image,
            title,
            icon,
            loader,
            key,
        } = props.route.params;
        console.log("iconn", icon);
        return (
            <>
                <HeaderImage
                    image={image}
                    navigation={props.navigation}
                    title={""}
                />
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        height: WINDOW_WIDTH / 5.5,
                        backgroundColor: "#f9f9f9",
                        borderBottomColor: "black",
                        borderBottomWidth: 0.5,
                    }}>
                    <View
                        style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <FastImage
                            source={{ uri: icon }}
                            resizeMode={"contain"}
                            style={{ height: 35, width: 35, marginLeft: 9 }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 0.5,
                            justifyContent: "center",
                            alignItems: "flex-start",
                        }}>
                        <Text
                            style={{
                                fontSize: WINDOW_WIDTH / 22,
                                color: "black",
                                fontFamily: "Poppins-ExtraBold",
                            }}>
                            {title}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            {/* <Text style={{ fontSize: WINDOW_WIDTH/25, color: 'black', fontFamily: 'Poppins-ExtraBold', marginTop: 2 }}>{this.state.subscriberCount}</Text> */}
                            {/* <_Lang
                                    style={{ fontSize: WINDOW_WIDTH / 25, color: 'black', fontFamily: 'Poppins-ExtraBold', marginTop: 2,marginLeft:3 }}
                                text={`profile.subscribers`}
                                /> */}
                        </View>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: "center" }}>
                        <_SubcribeButton
                            onSubscribe={(e) => setSubscriberCount(e)}
                            isSubscribe={userInfo?.category == key ? true : false}
                            category={key}
                            {...props}
                            loader={loader}
                        />
                    </View>
                </View>
            </>
        );
    };

    const _changeTab = (index, force = true, getStories = false) => {
        helpers.pauseVideo();
        setIndex(index);
    };
    const _customTabs = () => {
        return (
            <View style={{ marginTop: 10 }}>
                <TabHeader
                    routes={routes}
                    index={index}
                    // styles={{ width: getTabWidth(1) }}
                    tabWidth={getTabWidth(3)}
                    changeTab={(i) => _changeTab(i)}
                    itemStyle={{ paddingTop: 0 }}
                />
            </View>
        );
    };

        const _contentView = () => {
        const { loader, title, key } = props.route.params;
        return (
            <>
                {_customTabs()}
                {index === 1 ? (
                   
                    home?.explore?.length > 0 && loaded ? (
                        <Explore
                            // postNavigate={_postNavigate}
                            loading={loaders.explore}
                            // onScroll={_onScroll}
                            getFilters={_getFilters}
                            activeTab={index}
                            setExploreTop={setExploreTop}
                            data={home.explore}
                            loader={loader}
                            foryouPagination={foryouPagination}
                            // tabHeader={this._renderTabHeader}
                            // setExploreEndTrigger={this.setExploreEndTrigger}
                            // setExploreRefresh={this.setExploreRefresh}
                            // scrollToTop={() => this.scrollToTop()}
                            // scrollToEnd={() => this.scrollToEnd()}
                            {...props}
                        />
                        // </>
                    ) : (
                        <View>
                            {/* {/ {/ {props.tabHeader()} /} /} */}
                            {/* <_InlineLoader type={"homeScreenExplore"} /> */}
                        </View>
                    )
                ) : null}

                {index === 0 ? (
                    contestData.length > 0 ? (
                        <Apply
                            // postNavigate={_postNavigate}
                            loading={loaders.apply}
                            // onScroll={_onScroll}
                            activeTab={index}
                            // setApplyTop={setApplyTop}
                            // header={this._renderTabBar()}
                            getFilters={_getFilters}
                            data={contestData}
                            contestPagination={contestPagination}
                            // setNewsEndTrigger={this.setNewsEndTrigger}
                            // scrollToTop={() => this.scrollToTop()}
                            // scrollToEnd={() => this.scrollToEnd()}
                            {...props}
                            loader={loader}
                            apiType={routes[index].key}
                        />
                    ) : (
                        <View>
                            {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
                             {props.header}
                            {/* <_InlineLoader type={"contest"} /> */}
                        </View>
                    )
                ) : null}
                 
                {index == 2 ? (
                    <User
                        // setUserRef={setUserRef}
                        // postNavigate={_postNavigate}
                        loading={loaders.user}
                        // onScroll={_onScroll}
                        getFilters={_getFilters}
                        activeTab={index}
                        NoHeader
                        customFilter={"category=" + key}
                        // setUserEndTrigger={setUserEndTrigger}
                        // setUserRefresh={setUserRefresh}
                        // scrollToTop={() => scrollToTop()}
                        // scrollToEnd={() => scrollToEnd()}
                        {...props}
                    />
                ) : null}
            </>
        );
    };
    return(
        <View style={{ flex: 1 }}>
             <ScrollView 
            //  onScroll={_handleScroll} 
             style={{ flex: 1 }}>
                 <StatusBar barStyle="dark-content" />
                 {_topHeader()}
                 {_contentView()}
                {/* <_Loading ref={"loader"} /> */}
            </ScrollView> 
       
    </View>
    )
}