import React, { Component, useRef } from "react";
import { Input, Item } from "native-base";
import { setActiveVideo } from "../../../../redux/actions/VideoAction";
import { mainLayoutHoc } from "../../../hoc";
import mainStyles from "../../../../assets/styles/MainStyles";
import { styles } from "./styles";
import { setNavigation } from "../../../../redux/actions/NavAction";
import { setUserInfo } from "../../../../redux/actions/UserInfoAction";
import { filter } from "lodash";
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
} from "react-native";
import {
    globals,
    helpers,
    validators,
    colors,
    fonts,
    images,
    sty,
    localize,
    ApiCall,
} from "../../../../configs";
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
    _Filter,
} from "../../../custom";
import {
    setHomeDataProp,
    pushHomeDataProp,
    setRefreshIndicator,
} from "../../../../redux/actions/HomeActions";
import { setOtherProfileNewsfeed } from "../../../../redux/actions/OtherProfileActions";
import { setCampaignProp } from "../../../../redux/actions/CampaignsActions";
import {
    setFilterPropArr,
    resetFilters,
} from "../../../../redux/actions/FilterWrapperAction";
import {
    setAppData,
    pushAppData,
} from "../../../../redux/actions/AppDataActions";
import {
    pushProfileDataProp,
    setProfileDataProp,
} from "../../../../redux/actions/ProfileAction";
import { setPagination } from "../../../../redux/actions/PaginationActions";
import { setParticipantProp } from "../../../../redux/actions/CompanyParticipantAction";
import { useState, useEffect } from "react";

const FILTERS_FOR = globals.FILTERS_FOR;
const FILTERS_TYPES = globals.FILTERS_TYPES;

export default function Participant(props) {

    const [listLoading, setlistLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    listEnded = false;
    participantRef = useRef([])
    scrollListRef = useRef(null);


    useEffect(() => {
        const { setParticipantTop } = props;
        setParticipantTop(scrollToTop);
        globals.setUserData("homeParticipantLoad", _filterHashtag);
    }, []);

    useEffect(()=>{
        if (props.activeTab !== activeTab)
          setActiveTab(props.activeTab)
    },[props])
   

    const _getFilters = () => {
        const { filtersData } = props;
        return helpers.buildFilterUrl(
            FILTERS_FOR.HOME_PARTICIPANT,
            filtersData,
            FILTERS_TYPES,
        );
    };

    const _getParticipants = (forceCall = false) => {
        const {
            home,
            setHomeDataProp,
            setPagination,
            setRefreshIndicator,
        } = props;

        // let filterStr = this._getFilters();
        let filterStr = props.getFilters();
        if (home.participant === null || forceCall) {
            setRefreshIndicator(true);
            ApiCall.getHomeData("participant", 1, filterStr)
                .then((res) => {
                    setHomeDataProp({ prop: "participant", arr: res.data });
                    setPagination(res.pagination, "homeParticipant");
                    setRefreshIndicator(false);
                })
                .catch((err) => {
                    setHomeDataProp({ prop: "participant", arr: [] });
                    setRefreshIndicator(false);
                });
        }
    };

    const _keyExtractor = (item, index) => "ParticipantTab_" + index.toString();

    const _showFilter = () => refs.filter.show(true);

    const _renderItems = ({ item, index }) => {
        // item = this._postNavigate(item);
        item = props.postNavigate(item);
        return (
            <View
                ref={(ref) => (participantRef[item.id] = ref)}
                renderToHardwareTextureAndroid={this.state.renderTexture}>
                <_ContentType
                    key={"ParticipantTab__Item_" + index}
                    contentInfo={item}
                    index={index}
                    {...props}
                />
            </View>
        );
    };

    const _postNavigate = (obj) => {
        let nav = (postInfo) => {
            props.navigation.navigate("CampaignParticipant", {
                postInfo: postInfo,
            });
        };
        obj = Object.assign({ navigateToFullView: nav }, obj);
        return obj;
    };

    const _filterHashtag = (hashtag) => {
        const { setFilterPropArr, resetFilters } = props;

        resetFilters(globals.FILTERS_FOR.HOME_PARTICIPANT);

        if (hashtag !== null) {
            setTimeout(() => {
                setFilterPropArr(
                    { type: globals.FILTERS_TYPES.HASHTAG, data: hashtag },
                    globals.FILTERS_FOR.HOME_PARTICIPANT,
                );
            }, 200);
            setTimeout(() => {
                _onRefresh();
            }, 200);
        } else {
            _onRefresh();
        }
    };

    const scrollToTop = () => {
        scrollListRef &&
            scrollListRef.scrollToOffset({ x: 0, y: 0, animated: true });
    };

    const _onRefresh = (top = true) => {
        const {
            setHomeDataProp,
            setPagination,
            setRefreshIndicator,
            scrollToTop,
        } = props;
        top ? scrollToTop() : null;
        let filterStr = props.getFilters();

        setRefreshIndicator(true);
        ApiCall.getHomeData("participant", 1, filterStr)
            .then((res) => {
                setHomeDataProp({ prop: "participant", arr: res.data });
                setPagination(res.pagination, "homeParticipant");
                setRefreshIndicator(false);
            })
            .catch((err) => {
                setHomeDataProp({ prop: "participant", arr: [] });
                setRefreshIndicator(false);
            });
    };

    const _renderMore = () => {
        const { pushHomeDataProp, setPagination, pagination, home } = props;
    
        if (listLoading === false) {
          listLoading = true;
    
          setState(
            {
              listLoading: true,
            },
            () => {
              if (pagination.page + 1 > pagination.pages) {
                listEnded = true;
                setState({ listLoading: false });
                listLoading = false;
              } else {
                let activePage = pagination.page;
                let filterStr = props.getFilters();
                ApiCall.getHomeData("participant", ++activePage, filterStr)
                  .then((res) => {
                    pushHomeDataProp({ prop: "participant", arr: res.data });
                    setPagination(res.pagination, "homeParticipant");
    
                    setState({ listLoading: false });
                    listLoading = false;
                  })
                  .catch((err) => {
                    setState({ listLoading: false });
                    listLoading = false;
                  });
              }
            },
          );
        }
    
        // let news = home.participant;
        // let lastUser = news && news[news.length-1];
        // if(!lastUser) return;
        // if(this.participantRef[lastUser._id]) {
        //     let ref = this.participantRef[lastUser._id];
        //     ref.measure((x, y, width, height, pageX, pageY) => {
        //         !pageY ? this.setState({renderTexture : true}) : null
        //         this.setState({renderTexture : false})
        //         if(height > pageY || (pageY > globals.WINDOW_HEIGHT-500 && pageY< globals.WINDOW_HEIGHT-100)) {
    
        //             if(this.listLoading === false) {
        //                 this.listLoading = true;
    
        //                 this.setState({
        //                     listLoading: true,
        //                 }, () => {
        //                     if(pagination.page+1 > pagination.pages) this.listEnded = true;
        //                     let activePage = pagination.page;
    
        //                     // let filterStr = this._getFilters();
        //                     let filterStr = props.getFilters();
        //                     ApiCall.getHomeData('participant', ++activePage, filterStr).then((res)=>{
        //                         pushHomeDataProp({ prop: 'participant', arr: res.data });
        //                         setPagination(res.pagination, 'homeParticipant');
    
        //                         this.setState({ listLoading: false });
        //                         this.listLoading = false;
        //                     }).catch(err => {
        //                         this.setState({ listLoading: false });
        //                         this.listLoading = false;
        //                     })
        //                 })
    
        //             }
    
        //         }
        //     });
        // }
      };



    const listParticipantTrigger = () => {
        const { home } = props;
        ApiCall.initiatePostView(participantRef, home.participant, {
            ...props,
        });

        helpers.videoPlayToggle();
    };

    const changeItems = (data) => {
        const { home, setActiveVideo } = props;
        ApiCall.initiatePostView(data.viewableItems, home.participant, {
            ...props,
        });
        setActiveVideo(data?.changed[0]?.item?.id);
        helpers.videoPlayToggle();
    };


    const { home } = props;
    const header = {
        hideLeft: true,
        titleImgUrl: images.logoTransparent,
        rightCb: () => {
            _showFilter();
        },
        rightIconArr: ["ios-menu", "Ionicons"],
    };
    if (home.participant === null)
        return (
            <View style={mainStyles.rootView}>
                <_InlineLoader type={"post"} />
            </View>
        );

    return (
        <View style={mainStyles.rootView}>
            <FlatList
                ref={(ref) => {
                    scrollListRef = ref;
                }}
                data={filter(home.participant, (par) => !par.isDelete)}
                extraData={state}
                renderItem={_renderItems}
                keyExtractor={_keyExtractor}
                ListHeaderComponent={props.header}
                onViewableItemsChanged={changeItems}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={home.refreshStatus}
                        onRefresh={_onRefresh}
                    />
                }
                onEndReachedThreshold={0.5}
                onEndReached={() => _renderMore()}
                ListFooterComponent={() => {
                    return <View>{listLoading ? <_InlineLoader /> : null}</View>;
                }}
                ListEmptyComponent={<_EmptyPostList />}
                removeClippedSubviews={Platform.OS == "android" ? true : false}
            />
        </View>
    )
}
