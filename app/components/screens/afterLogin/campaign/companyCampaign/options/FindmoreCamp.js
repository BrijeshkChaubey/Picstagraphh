import React, { Component, useEffect, useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globals, helpers, colors, sty, API } from "../../../../../../configs";
import { _Lang, _InlineLoader, _ContentType } from "../../../../../custom";
import { mainLayoutHoc } from "../../../../../hoc";
import mainStyles from "../../../../../../assets/styles/MainStyles";
import { setUserInfo } from "../../../../../../redux/actions/UserInfoAction";
import {
    resetFilters,
    setFilterPropArr,
} from "../../../../../../redux/actions/FilterWrapperAction";
import { find } from "lodash";
import {
    setHomeDataProp,
    pushHomeDataProp,
    setRefreshIndicator,
} from "../../../../../../redux/actions/HomeActions";
import { setPicsUserHomeData } from "../../../../../../redux/actions/PicsHomeActions";
import { setTimestampData } from "../../../../../../redux/actions/TimestampAction";
import { setOtherProfileNewsfeed } from "../../../../../../redux/actions/OtherProfileActions";
import { setParticipantProp } from "../../../../../../redux/actions/CompanyParticipantAction";
import {
    setCampaignProp,
    pushCampaignProp,
} from "../../../../../../redux/actions/CampaignsActions";
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
import DiscoverIcon from "../../../../../../assets/images/Icons/svgs/earth.svg";

export default function FindmoreCamp(props) {
    let companyPostRef = useRef({});
    const [renderTexture,setRenderTexture] = useState();
    const {loginData,
        socialConnectData,
        userInfo,
        localize,
        campaigns} = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
            _getFavCampaign();
    }, []);

    const _getFavCampaign = () => {
        try {
            let cb = {
                success: (res) => {
                    dispatch(setCampaignProp({ prop: "favorite", arr: res.data }));
                },
                error: (err) => {
                    console.log("err :", err);
                },
                complete: () => { },
            };

            let header = helpers.buildHeader({ authorization: loginData.token });
            API.campaignFavoriteGetApi({}, cb, header);
        } catch (error) {
            console.log({ error });
        }
    };

    const _getTranslatedTest = (text) => {
        var txtArr = text.split(".");
        let lang = localize.translations[localize.activeLanguage];
        return lang[txtArr[0]][txtArr[1]];
    };

    const _getHeading = () => {
        let subHeader = _getTranslatedTest("campaign.Interesting_for_you");
        return (
            <View style={{ ...sty.padT10, marginBottom: 5 }}>
                {/* <_Lang style={[mainStyles.boldHeadTxt, { ...sty.padB5 }]} text={'termCondition.Participant_guidelines'} /> */}
                <Text allowFontScaling={false}>{subHeader}</Text>
            </View>
        );
    };

    const _renderCampaign = () => {
        if (campaigns["favorite"] == null)
            return (
                <View>
        
                    {/* <_InlineLoader type={"favContest"} /> */}
                </View>
            );
        return (
            <View style={[mainStyles.rootView, { borderWidth: 0 }]}>
                <View style={{ paddingTop: 0 }}>
                    <View style={{ backgroundColor: "#fff" }}>
                        <FlatList
                            data={campaigns["favorite"]}
                            renderItem={(data) => _renderCampaigns(data)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
        );
    };

    const _renderCampaigns = ({ item, index }) => {
        item = Object.assign({ navigateToFullView: _campignCb }, item, {
            postType: "campaign",
        });
        return (
            <View
                key={`Campaigns_post_${item._id}`}
                ref={(ref) => (companyPostRef[item.id] = ref)}
                renderToHardwareTextureAndroid={renderTexture}
                style={{}}>
                <_ContentType
                    key={"companyCampaignItem" + index}
                    contentInfo={item}
                    index={index}
                    {...props}
                    favoriteView={true}
                />
            </View>
        );
    };

    const _campignCb = (campaignInfo) => {
        getCampaignInfo(campaignInfo.slug);
    };

    const getCampaignInfo = (campaignSlug) => {
        let cb = {
            success: (res) => {
                console.log("vai", campaigns["favorite"])
                if (find(campaigns["favorite"], (dt) => dt._id == res.data._id)) {
                    // setCampaignProp({ prop: apiType, arr: [res.data] })
                    dispatch(setCampaignProp({
                        prop: "favorite",
                        arr: campaigns["favorite"].map((dt) => dt._id == res.data._id ? Object.assign({}, dt, res.data) : dt)
                        // arr: map(campaigns["favorite"], (dt) =>
                        //   dt._id == res.data._id ? Object.assign({}, dt, res.data) : dt
                        // ),
                    }));
                } else if (campaigns["favorite"] === null) {
                    dispatch(setCampaignProp({ prop: "favorite", arr: [res.data] }));
                } else {
                    dispatch(pushCampaignProp({ prop: "favorite", arr: [res.data] }));
                }
                props.stoptimer();
                props.navigation.push("CompanyCampaign", {
                    campaignInfo: res.data,
                    campaignShareHandler: props.campaignShareHandler,
                    apiType: "favorite",
                });
            },
            error: (err) => { },
            complete: () => props.loader.hideLoader(),
        };
        let header = helpers.buildHeader({ authorization: loginData.token });
        //props.loader.load();
        API.getCamapignInfo({}, cb, header, campaignSlug);
    };


    return (
        <View style={{ paddingBottom: 80 }}>
            <View style={styles.wrap}>
                <View style={mainStyles.flexRow}>
                    {/* <DiscoverIcon height={35} width={35} /> */}
                    <_Lang
                        text={"campaign.findMore"}
                        // isGradiant={true}
                        style={[{ fontWeight: "bold", fontSize: 18 }]}
                    />
                </View>
                {_getHeading()}
            </View>
            <View>{_renderCampaign()}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
      ...sty.padH10,
      ...sty.jCenter,
    },
});

