import React, { Component, useEffect, useRef, useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
    ActivityIndicator,
    Text,
    FlatList,
    RefreshControl,
} from "react-native";
import {useDispatch, useSelector } from "react-redux";
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
import FastImage from "react-native-fast-image";
import mainStyles from "../../../../../../assets/styles/MainStyles";
import { styles } from "../styles";
import { map, chain, find } from "lodash";

import {
    setParticipantTop10,
    pushParticipantTop10,
} from "../../../../../../redux/actions/ParticipantTop10";
import {
    setParticipantTop10List,
    pushParticipantTop10List,
    setParticipantTop10ListRefreshIndicator,
} from "../../../../../../redux/actions/ParticipantTop10ListAction";
import { setHomeDataProp } from "../../../../../../redux/actions/HomeActions";

//ContentBox actions
import { setAppData } from "../../../../../../redux/actions/AppDataActions";
import {
    pushProfileDataProp,
    setProfileDataProp,
} from "../../../../../../redux/actions/ProfileAction";
import { setPagination } from "../../../../../../redux/actions/PaginationActions";
import { setCompanyRefreshIndicator } from "../../../../../../redux/actions/CompanyParticipantAction";
import { setTimestampData } from "../../../../../../redux/actions/TimestampAction";
import moment from "moment";
import DetailCard from "../../../../../custom/DetailCard";
import { WINDOW_WIDTH } from "../../../../../../configs/libs/globals";
import ParticipantsList from "./Top10List";

function Top10(props) {
    const [listLoading, setlistLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [timeDiff, setTimeDiff] = useState(0);
    const [timerRendered, setTimerRendered] = useState(false);
    const [page, setPage] = useState(1);

    const topPostref = useRef({});
    const scrollListRef = useRef(null);
    const topRef = useRef(null);

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
        participantTop10List
     } = useSelector(state => state);

    const otherProfileNewsFeed = useSelector(state => state.otherProfile);

    const mountRef = useRef();
    const preProps = useRef();

    useEffect(() => {
        if (!mountRef.current) {
            _loadPost();
            setRemoveTimer(_setClearInterval);
            mountRef.current = true;
        } else {
            if (
                timestamp["finalist" + campaignInfo.id] !== undefined &&
                preProps.current.timestamp["finalist" + campaignInfo.id] === undefined
            ) {
                _onRefresh();
            }
        }
        preProps.current = props;
    }, []);

    const _setClearInterval = () => clearInterval(intervalId);

    const _onRefresh = (top = true) => {
        const {
            campaignInfo,
        } = props;

        // top ? this.scrollToTop() : null
        dispatch(setCompanyRefreshIndicator(true));
        ApiCall.getCampaignParticipants(
            "Participant",
            campaignInfo.slug,
            globals.PARTICIPANT_TYPE.FINALIST,
            1,
            {
                timestamp:
                    timestamp["finalistNew" + campaignInfo.id] ||
                    timestamp["finalist" + campaignInfo.id],
            },
        )
            .then((res) => {
                if (res.data.length > 0) {
                    const updatedData = map(res.data, (mx) => {
                        return Object.assign({}, mx, { page: 1, newPost: true });
                    });
                    dispatch(pushParticipantTop10(
                        {
                            id: campaignInfo.id,
                            arr: updatedData,
                            pagination: participantTop10[campaignInfo.id].pagination,
                        },
                        true,
                    ));
                }

                dispatch(setTimestampData("finalistNew" + campaignInfo.id, res.timestamp));
                dispatch(setCompanyRefreshIndicator(false));
            })
            .catch((err) => {
                !participantTop10[campaignInfo.id] &&
                    dispatch(setParticipantTop10({
                        id: campaignInfo.id,
                        arr: [],
                        pagination: {},
                    }));
                dispatch(setCompanyRefreshIndicator(false));
            });
    };

    const _loadPost = () => {
        const {
            campaignInfo,
        } = props;

        dispatch(setParticipantTop10ListRefreshIndicator(true));
        dispatch(setCompanyRefreshIndicator(true));

        ApiCall.getCampaignParticipants(
            "Participant",
            campaignInfo.slug,
            globals.PARTICIPANT_TYPE.FINALIST,
            1,

            {
                text: "full-response",
                timestamp: false
                    ? timestamp["finalistNew" + campaignInfo.id]
                    : timestamp["finalist" + campaignInfo.id],
            },
        )
            .then((res) => {
                let newData = res.data;

                dispatch(setParticipantTop10List({
                    id: campaignInfo.id,
                    arr: newData,
                    pagination: res.pagination || {},
                }));
                dispatch(setCompanyRefreshIndicator(false));

                dispatch(setParticipantTop10ListRefreshIndicator(false));
            })
            .catch((err) => {
                dispatch(setParticipantTop10List({
                    id: campaignInfo.id,
                    arr: [],
                    pagination: {},
                }));
                dispatch(setCompanyRefreshIndicator(false));
                dispatch(setCompanyListRefreshIndicator(false));
            });
    };

    const dataArr = participantTop10[campaignInfo.id]
    ? participantTop10[campaignInfo.id].arr
    : [];
  const data = participantTop10List[campaignInfo.id]
    ? participantTop10List[campaignInfo.id].arr
    : [];


    return(
        <View style={mainStyles.rootView}>
        {dataArr.length == 0 ? (
          null
        ) : (
            <ParticipantsList
              navigation={navigation}
              hideHeader={true}
            />
          
        )}
      </View>
    )
}
export default mainLayoutHoc({})(Top10);