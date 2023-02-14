import React, { Component, useEffect, useRef, useState } from "react";
import {
    View,
    Platform,
    StatusBar,
    ScrollView,
    AsyncStorage,
    Alert,
    Text,
    Linking,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globals, helpers, images, API, ApiCall } from "../../../../../configs";
import { _Layout, _Filter, _InlineLoader }from "../../../../custom";
    // import {_Layout} from "../../../../custom";
  

import { mainLayoutHoc } from "../../../../hoc";
import mainStyles from "../../../../../assets/styles/MainStyles";
import { setNavigation } from "../../../../../redux/actions/NavAction";
import {
    setCampaignProp,
    pushCampaignProp,
} from "../../../../../redux/actions/CampaignsActions";
//ContentBox actions
import {
    setAppData,
    pushAppData,
} from "../../../../../redux/actions/AppDataActions";
import { setTimestampData } from "../../../../../redux/actions/TimestampAction";
import {
    pushProfileDataProp,
    setProfileDataProp,
} from "../../../../../redux/actions/ProfileAction";
import { setHomeDataProp } from "../../../../../redux/actions/HomeActions";
import { setPagination } from "../../../../../redux/actions/PaginationActions";
import { setLoginData } from "../../../../../redux/actions/LoginAction";
import { setTranslation } from "../../../../../redux/actions/LocalizeAction";
import { setUserInfo } from "../../../../../redux/actions/UserInfoAction";
import CategorySlider from "../../../../custom/CategorySlider/CategorySlider";
import NavigationService from "../../../../navigations/NavigationService";
import { map, find } from "lodash";
import TabHeader from "../../../../custom/ContentTypes/common/TabHeader";
import * as messageSocket from "../../../../custom/ContentTypes/common/MessageSocket";
import VersionCheck from "react-native-version-check";
import Apply from "../apply/Apply";

import TopHeader from "../../Header/TopHeader";
var jwtDecode = require("jwt-decode");
const FILTERS_FOR = globals.FILTERS_FOR;
const FILTERS_TYPES = globals.FILTERS_TYPES;
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { WINDOW_WIDTH } from "../../../../../configs/libs/globals";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

function CampaignHome(props) {
    const [index, setIndex] = useState(0);
    const [listLoading, setListLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    const [routes, setRoutes] = useState([
        {
            index: 1,
            key: "all",
            icon: ["ios-paper-outline", "ios-paper"],
            text: "contest.apply",
            logo: "homeNews",
        },
        {
            index: 0,
            key: "upcoming",
            icon: ["ios-star-outline", "ios-star"],
            text: "contest.upcoming",
            logo: "homeStage",
        },
      
    ]);
    const [loaders, setLoaders] = useState({
        apply: false,
        finals: false,
        closed: false,
    });
    // const listLoading = false;
    let listEnabled = false;
    let companyPostRef = useRef({});
    let ApplyTop = useRef(null);
    let FinalsTop = useRef(null);
    let ClosedTop = useRef(null);
    let scrollListRef = useRef(null);
    let filterRef = useRef("filter")
     const filtersData = useSelector(state=> state.filterWrapperReducer);
     const pagination = useSelector(state=> state.pagination.companyCampaign);
    const {
        campaigns,
        companyParticipant,
        navProps,
        appData,
        loginData,
        localize,
        profile,
        home,
        timestamp,
        userInfo} = useSelector(state => state);

        const state2 = useSelector(state => state);
        console.log('state ===> ',state2);

    const dispatch = useDispatch();

    const setApplyTop = (ref) => (ApplyTop = ref);

    const setFinalsTop = (ref) => (FinalsTop = ref);

    const setClosedTop = (ref) => (ClosedTop = ref);

    const header = {
        hideLeft: true,
        titleImgUrl: images.PicstaLogoBlack, //images.logoTransparent,
        rightCb: () => {
            _showFilter();
        },
    }

    useEffect(() => {
        const { navigation } = props;
         
        if (navigation?.state?.params) {
            const { scrollToTop } = navigation.state.params;
            if (scrollToTop) {
                _onTop();
                navigation.setParams({ scrollToTop: false });
            }
        }
    }, [props]);

   const _onTop = () => {
        ApplyTop();
    };

    useEffect(() => {
        let userId = loginData && loginData.id;
        console.log('userID===>',userId);
        // if (userId) _joinMessageRoom(userId);

        // messageSocket.join(null, null, userId);
        dispatch(setNavigation({
            navigationType: "campaignTab",
            navigationRoute: props.navigation,
        }));
        dispatch(setNavigation({
            navigationType: "activeNav",
            navigationRoute: props.navigation,
        }));
        _checkAuth();
        _getUserInfo();

        _getCategories();
        // getNotificationCounter();
        _campaignApi(0);

        globals.setUserData("contestChangeTab", _changeTab);

        Linking.addEventListener("url", handleOpenURL);
        Linking.getInitialURL().then((url) => {
            !appData.homeLoaded ? navigate(url) : null;
        });
    }, []);

    const _changeTab = (index, force = true) => {
        helpers.pauseVideo();
        if (force) {
            setIndex(index);
        } else {
            setIndex(index);
        }
    };

    useEffect(() => {
     
        _campaignApi(index)
    }, [index]);

  const  handleOpenURL = (event) => {
        !appData.homeLoaded
            ? navigate(event.url ? event.url : event)
            : null;
    };

    const _campaignApi = (index, forceCall = false) => {
        let filterStr = _getFilters();
        console.log('campaignAPI routes ==>',routes);
        let apiType = routes[index].key;
        if (forceCall) {
            dispatch(setCampaignProp({ prop: apiType, arr: null }));
        }
        let callApi =
            campaigns[apiType] === null ||
                (campaigns[apiType] && campaigns[apiType].length === 0)
                ? true
                : false;
        if (callApi || forceCall) {
            ApiCall.getCampaignsData("company", 1, apiType, filterStr)
                .then((res) => {
                    console.log('getCampaignData response ==>',res);
                   
                    dispatch(setCampaignProp({ prop: apiType, arr: res.data }));
                    dispatch(setPagination(
                        { prop: apiType, value: res.pagination },
                        "companyCampaign",
                    ));
                    // setPagination(res.pagination, apiType + "Contest")                       //'company');
                    dispatch(setTimestampData(apiType, res.timestamp));
                    // this._onRefresh(apiType, res.timestamp)
                })
                .catch((e) => {
                    dispatch(setCampaignProp({ prop: apiType, arr: [] }));
                });
        }
    };
    const getNotificationCounter = async () => {
        try {
            let cb = {
                success: (result) => {
                    dispatch(setAppData({
                        prop: "unreadMessages",
                        value: result.data.messageCount,
                    }));
                    dispatch(setAppData({
                        prop: "unreadNotifications",
                        value: result.data.notificationCount,
                    }));
                },
                error: () => {
                    dispatch(setAppData({ prop: "unreadMessages", value: 0 }));
                    dispatch(setAppData({ prop: "unreadNotifications", value: 0 }));
                },
            };
            const token = await AsyncStorage.getItem("token");
            let header = helpers.buildHeader({ "authorization": token });
            API.getNotificationCounter({}, cb, header);
        } catch (err) {
            // console.log({ error });
        }
    };


    const _getCategories = () => {
        console.log('_getCategoried function is called');
        ApiCall.getCategories()
            .then((res) => {
            
                console.log('getcategory response ==>',res);
                setCategoriesData(res?.data.filter((item) => 
                    item.isOngingCategory == true
                ))
            })
            .catch((e) => { });
    };

    const _getUserInfo = (callOther = true, showLoader = true) => {
        if (true) {
            let cb = {
                success: (res) => {
                    console.log('getUserInfo response ==>',res);
                    dispatch(setUserInfo(res.data));
                },
                error: (e) => { },
                complete: () => { },
            };
            let header = helpers.buildHeader({ "authorization": loginData.token });
            API.getUserInfo({}, cb, header, loginData.username);
        }
    };
    const _joinMessageRoom = (userId) => {
        messageSocket.join(null, null, userId);
        messageSocket.connect("CampaignHome", (data) => {

            if (loginData.id != data.senderId) {
                dispatch(setAppData({
                    prop: "unreadMessages",
                    value: appData?.unreadMessages + 1,
                }));
            }
        });
    };

    const _checkAuth = async () => {
        if (globals.getUserData("loginValidated")) {
            _getStaticInfo();
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");
            var userInfo = jwtDecode(token);
            dispatch(setLoginData(userInfo));

            token !== null && _getStaticInfo(token);
            if (token !== null) {
                let cb = {
                    success: async(result) => {
                         console.log('validateToken response ==> ',result);
                        // loader.hideLoader();
                        if (result.success) {
                            var userInfo = jwtDecode(token);

                            dispatch(setLoginData(
                                Object.assign({}, userInfo, {
                                    token: token,
                                    language: result.data.language,
                                    isPrivate: result.data.isPrivate,
                                    profileUrl: result.data.profileUrl,
                                }),
                            ));
                             await  AsyncStorage.setItem("language", result.data.language);
                            props.setTranslation(globals.LANG_ARR[result.data.language]);
                        }
                    },
                    error: () => {
                        // loader.hideLoader()
                        // NavigationService.navigate('rootNav', 'Login');
                    },
                    complete: () => {
                        loader.hideLoader();
                        globals.setUserData("loginValidated", true);
                    },
                };
                // loader.load();
                let header = helpers.buildHeader({ "authorization": token });
                API.validateToken({}, cb, header);
            }
        } catch (error) {
            // console.log({ error });
        }
    };


    const _getStaticInfo = (token = null) => {
        let cb = {
            success: async (res) => {
                console.log('getStaticData reponse==> ',res);
                res.data.adId &&
                    dispatch(setAppData({
                        prop: "adId",
                        value: res.data.adId,
                    }));

                res.data.levelDiff &&
                    dispatch(setAppData({
                        prop: "levelDiff",
                        value: res.data.levelDiff,
                    }));

                res.data.levelPoints &&
                    dispatch(setAppData({
                        prop: "levelPoints",
                        value: res.data.levelPoints,
                    }));

                //Url Navigator
                const linkUrl = await AsyncStorage.getItem("linkUrl");

                if (linkUrl) {
                    navigate(linkUrl, true);
                }
            },
            error: (e) => { },
        };

        let header = helpers.buildHeader({
            "authorization": token ? token : loginData.token,
        });
        console.log('getStaticInfo header ==>',header);
        API.getStaticInfo({}, cb, header);
    };

    const navigate = async(url, removeUrl = false) => {
        const { navigation } = props;

        if (url) {
            const dataObj = helpers.linkNavigator(url);

            if (dataObj !== null) {
                const { screen, data } = dataObj;

                removeUrl ? await AsyncStorage.removeItem("linkUrl") : null;

                if (screen === globals.LINK_SCREENS.Campaign) {
                    _naviagteLinkCampagin(data.slug);
                    return;
                }

                switch (screen) {
                    case globals.LINK_SCREENS.Profile:
                        navigation.navigate(screen, { userInfo: data });
                        break;

                    case globals.LINK_SCREENS.Media:
                        navigation.navigate(screen, {
                            item: { id: data.id, type_of_activity: data.type },
                        });
                        break;

                    case globals.LINK_SCREENS.Participant:
                        navigation.navigate(screen, {
                            item: { id: data.id, type_of_activity: data.type },
                        });
                        break;

                    default:
                        return;
                }
            }
        }
    };

  const  _naviagteLinkCampagin = (campaignSlug) => {
        let cb = {
            success: (res) => {
                if (find(campaigns["extra"], (dt) => dt._id === res.data._id)) {
                    dispatch(setCampaignProp({
                        prop: "extra",
                        arr: map(campaigns["extra"], (dt) =>
                            dt._id === res.data._id ? Object.assign({}, dt, res.data) : dt,
                        ),
                    }));
                } else if (campaigns["extra"] === null) {
                    dispatch(setCampaignProp({ prop: "extra", arr: [res.data] }));
                } else {
                    dispatch(pushCampaignProp({ prop: "extra", arr: [res.data] }));
                }
                props.navigation.navigate("CompanyCampaign", {
                    campaignInfo: res.data,
                    apiType: "extra",
                });
            },
            error: (e) => { },
            complete: () => loader.hideLoader(),
        };

        let header = helpers.buildHeader({ "authorization": loginData.token });
        //props.loader.load();
        API.getCamapignInfo({}, cb, header, campaignSlug);
    };
    const _showFilter = () => {
        if (refs.filter) refs.filter.show();
    };
    const _getFilters = () => {
        console.log('filterData ====> ',filtersData);
        return helpers.buildFilterUrl(
            FILTERS_FOR.COMPANY,
            filtersData,
            FILTERS_TYPES,
        );
    };
    const CategoryDetailNavigate=(item)=>{
        props.navigation.navigate("CategoryDetails", {
            title: item.name,
            image: item.imageUrl,
            key: item.key,
            loader: props.loader,
            icon: item.iconUrl,
        });
    }

    return (
        <>
        { campaigns == null ? 
            <_Layout
                screen={"campaign"}
                // header={header}
                renderSocialShare={true}
                headerWrapStyle={{ margin: 0 }}>
                    <Text style={{
                        fontSize:20,
                        color:'red'
                    }}>Hello all</Text>
                {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
                <_InlineLoader type={"post"} />
                {/* <TopHeader
                    loginData={loginData}
                    navigation={props.navigation}/> */}
            </_Layout>
         :
            (<_Layout
                screen={"campaign"}
                renderSocialShare={true}
                style={{ backgroundColor: "#fff" }}
                headerWrapStyle={{ marginBottom: 0 }}>
                <TopHeader
                    loginData={loginData}
                    navigation={props.navigation}/>
                <StatusBar barStyle="dark-content" backgroundColor="white" />

                <_Filter
                    ref={filterRef}
                    filterFor={FILTERS_FOR.COMPANY}
                    filterDataApi={() => _campaignApi(index, true)}
                />
                {index === 0 ? (
                    <Apply
                        // postNavigate={_postNavigate}
                        loading={loaders.apply}
                        // onScroll={_onScroll}
                        activeTab={index}
                        setApplyTop={setApplyTop}
                        header={() => (
                            <View
                                style={{
                                    marginHorizontal: 12,
                                    marginTop: 10,
                                    shadowColor: "black",
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 5,
                                }}>
                                <CategorySlider
                                    data={categoriesData}
                                    timer={5000}
                                    onPress={CategoryDetailNavigate}
                                    indicatorContainerStyle={{ position: "absolute", bottom: 20 }}
                                    indicatorActiveColor={"#ffffff"}
                                    indicatorInActiveColor={"#ffffff"}
                                    indicatorActiveWidth={12}
                                    animation
                                />
                            </View>
                )}
                        getFilters={_getFilters}
                        {...props}
                        apiType={routes[index].key}
                    />
                ) : null}
                {index === 1 ? (
                    <Apply
                        // postNavigate={_postNavigate}
                        loading={loaders.apply}
                        // onScroll={_onScroll}
                        activeTab={index}
                        setApplyTop={setApplyTop}

                        getFilters={_getFilters}

                        {...props}
                        apiType={routes[index].key}
                    />
                ) : null}

            </_Layout>)
        }
        </>
    )
}
export default mainLayoutHoc({})(CampaignHome);