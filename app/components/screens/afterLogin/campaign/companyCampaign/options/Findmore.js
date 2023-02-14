import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    FlatList,
    Linking,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize, API, ApiCall } from '../../../../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _B, _Layout, _ListView, _ContentType, _InlineLoader } from '../../../../../custom';
import { mainLayoutHoc } from '../../../../../hoc';
import mainStyles from '../../../../../../assets/styles/MainStyles';

import { setUserInfo } from '../../../../../../redux/actions/UserInfoAction';
import { resetFilters, setFilterPropArr } from '../../../../../../redux/actions/FilterWrapperAction';
import { setHomeDataProp } from '../../../../../../redux/actions/HomeActions';
import moment from 'moment';
import NavigationService from '../../../../../navigations/NavigationService';
import {
    setCampaignProp,
    pushCampaignProp,
} from "../../../../../../redux/actions/CampaignsActions";

const FindMore = (props) => {
    const { campaignInfo } = props;
    const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const loginData = useSelector(state => state.loginData);
    const dispatch = useDispatch();
    let companyPostRef = {}

    useEffect(() => {
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        _getFavCampaign()
    }, [])

    const _getFavCampaign = () => {
        let cb = {
            success: (res) => {
                console.log("res :", res)
                dispatch(setCampaignProp({ prop: "favorite", arr: res.data }))

            },
            error: (err) => {
                console.log("err :", err);
            },
            complete: () => { },
        };

        // let token = await AsyncStorage.getItem('token');
        let header = helpers.buildHeader({ authorization: loginData.token });
        API.campaignFavoriteGetApi({}, cb, header);

    }

    const _getTranslatedTest = (text) => {
        var txtArr = text.split('.');
        let lang = localize.translations[localize.activeLanguage];
        return lang[txtArr[0]][txtArr[1]];
    }



    const _getHeading = () => {
        let subHeader = _getTranslatedTest('campaign.Interesting_for_you');
        return (
            <View style={{ ...sty.padT10 }}>
                {/* <_Lang style={[mainStyles.boldHeadTxt, { ...sty.padB5 }]} text={'termCondition.Participant_guidelines'} /> */}
                <Text allowFontScaling={false}>{subHeader}</Text>
            </View>
        )
    }

    const _campignCb = (campaignInfo) => {
        getCampaignInfo(campaignInfo.slug);
    }

    const getCampaignInfo = (campaignSlug) => {
        // const { setAppData, appData, loginData, navProps, campaigns, setCampaignProp, pushCampaignProp } = props;
        // const { apiType } = this.state
        let cb = {
            success: (res) => {

                // if (find(campaigns[apiType], dt => dt._id == res.data._id)) {
                //     // setCampaignProp({ prop: apiType, arr: [res.data] })
                //     setCampaignProp({
                //         prop: apiType,
                //         arr: map(campaigns[apiType], dt => dt._id == res.data._id ? Object.assign({}, dt, res.data) : dt)
                //     })
                // }
                // else if (campaigns[apiType] === null) {
                //     setCampaignProp({ prop: apiType, arr: [res.data] })
                // }
                // else {
                //     pushCampaignProp({ prop: apiType, arr: [res.data] })
                // }

                props.navigation.navigate('CompanyCampaign', {
                    campaignInfo: res.data,
                    campaignShareHandler: props.campaignShareHandler,
                    apiType
                })



            },
            error: (err) => { },
            complete: () => props.loader.hideLoader()
        }
        let header = helpers.buildHeader({ authorization: loginData.token })
        //props.loader.load()
        API.getCamapignInfo({}, cb, header, campaignSlug);
    }

    const _renderCampaigns = ({ item, index }) => {
        item = Object.assign({ navigateToFullView: _campignCb }, item, { postType: "campaign" })
        return (
            <View key={`Campaigns_post_${item._id}`} ref={ref => companyPostRef[item.id] = ref} style={{ borderWidth: 0, }}>
                <_ContentType
                    key={'companyCampaignItem' + index}
                    contentInfo={item}
                    index={index}
                    favoriteView={true}
                    {...props}
                />
            </View>

        )
    }

    const _renderCampaign = () => {
        if (campaigns["favorite"] == null) return (
            <View>
                {/* {props.header} */}
                < _InlineLoader type={'contest'} />
            </View>
        )
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
    }

    return (
        <View >
            <View style={styles.wrap}>
                <_Lang
                    text={'campaign.findMore'}
                    style={[{ fontWeight: "bold", fontSize: 18, },]}
                />
                {_getHeading()}
            </View >
            <View>
                {_renderCampaign()}
            </View>
        </View>
    );
};
export default React.memo(FindMore);

const styles = StyleSheet.create({
    wrap: {
        ...sty.padT10,
        paddingTop: 10,
        ...sty.padH10,
        ...sty.jCenter,
    },
    itemWrapper: {
        // ...sty.fRow,
        ...sty.padH15,
        ...sty.padV10,
        ...sty.flex1,
        borderWidth: 1,
        borderRadius: 10,
        ...sty.mgT5,
        ...sty.mgB5
    },
    item1: {
        ...sty.flex1,
        ...sty.fRow,
        ...sty.jStart,
    },
    mainWrap: {
        width: globals.WINDOW_WIDTH,
        alignSelf: "center",
        borderColor: "#F0F0F0",
        borderWidth: 3,
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
    },
    main: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
    },
    media: {
        width: globals.WINDOW_WIDTH,
        height: globals.WINDOW_WIDTH / 2 - 2,
        marginTop: 10,
    },
    mediaImage: {
        width: "globals.WINDOW_WIDTH",
        height: globals.WINDOW_WIDTH - 22,
    },
    button: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: colors.primaryColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        elevation: 10,
    },
    buttonTxt: { color: "white", fontSize: 16, fontWeight: "bold" },
    viewWrap: { flexDirection: "row", justifyContent: "center", paddingTop: 5 },
    badge: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: colors.primaryColor,
        padding: 5,
    },
    badgeTxt: { fontSize: 14, color: colors.primaryColor },
});