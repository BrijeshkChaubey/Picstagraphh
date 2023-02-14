import React, { Component, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    FlatList,
    Linking
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize, API, ApiCall } from '../../../../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _B, _Layout, _ListView } from '../../../../../custom';
import { mainLayoutHoc } from '../../../../../hoc';
import mainStyles from '../../../../../../assets/styles/MainStyles';
import { styles } from './styles';

import { setUserInfo } from '../../../../../../redux/actions/UserInfoAction';
import { resetFilters, setFilterPropArr } from '../../../../../../redux/actions/FilterWrapperAction';
import { setHomeDataProp } from '../../../../../../redux/actions/HomeActions';
import moment from 'moment';
import NavigationService from '../../../../../navigations/NavigationService';

export default function TermConditions(props) {
    const [campaignInfo, setCampaignInfo] = useState(props.navigation.state.params.campaignInfo);
    const {loginData,
        socialConnectData,
        userInfo,
        localize
     } = useSelector(state => state);

    const dispatch = useDispatch();

    var txtCountries = "";
    let Countries = campaignInfo.venueList;
    Countries.forEach((item) => {
        if (item.value)
            txtCountries = item.value + " ," + txtCountries;
    });

    let runtime = {
        icon: images.termsPin,
        title: _getTranslatedTest('termCondition.running_time'),
        content: txtCountries,
    }

    let minimum_age = {
        icon: images.termsCake,
        title: _getTranslatedTest('termCondition.minimum_age'),
        // content: `${campaignInfo.participantMinimumAge} Years`,
        content: "17+ Years",

    }

    let applictaion_countries = {
        icon: images.termsPin,
        title: _getTranslatedTest('termCondition.countries_of_application'),
        content: txtCountries,
    }
    let application_type = {
        icon: images.termsCamera,
        title: _getTranslatedTest('termCondition.type_of_application'),
        content: campaignInfo.typeContent,
    }
    let application_count = {
        icon: images.termsNumber,
        title: _getTranslatedTest('termCondition.number_of_applications'),
        content: `${(campaignInfo.participantCount && campaignInfo.participantCount > 0) ? campaignInfo.participantCount : 0} / ${campaignInfo.maxApplicantCount}`,

    }
    let winnerAnounced = {
        icon: images.termsMail,
        title: _getTranslatedTest('termCondition.announcement_of_the_winner'),
        content: _getTranslatedTest('termCondition.announcement_of_the_winner_desc'),
    }
    let copyright = {
        icon: images.termsCopyright,
        title: _getTranslatedTest('termCondition.copyright'),
        content: _getTranslatedTest('termCondition.copyright_desc'),
    }
    let forbidden = {
        icon: images.termsClose,
        title: _getTranslatedTest('termCondition.forbidden_content'),
        content: _getTranslatedTest('termCondition.forbidden_content_desc'),
    }
    let withdrawal = {
        icon: images.termsDelete,
        title: _getTranslatedTest('termCondition.withdrawal_of_contest'),
        content: _getTranslatedTest('termCondition.withdrawal_of_contest_desc'),
    }
    let forceMajeure = {
        icon: images.termsNo,
        title: _getTranslatedTest('termCondition.force_majeure'),
        content: _getTranslatedTest('termCondition.force_majeure_desc'),
    }


    const header = {
        leftCb: () => { props.navigation.pop() },
        leftImg: images.leftBackArrow,
        title: "campaign.terms_and_condition",
    }

    const _getTranslatedTest = (text) => {
        var txtArr = text.split('.');
        let lang = localize.translations[localize.activeLanguage];
        return lang[txtArr[0]][txtArr[1]];
    }

    openBrowser = (url) => {
        url = globals.WEB_URL + url
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }

    const _getHeading = () => {

        let subHeader = _getTranslatedTest('termCondition.subheader');
        let arr = [<Text allowFontScaling={false} style={[mainStyles.appTxt]}>{subHeader}</Text>,
        <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}
            onPress={() => {
                openBrowser('branded-content-guildelines')
            }}>{_getTranslatedTest('termCondition.here')}</Text>
        ]
        return (
            <View style={{ ...sty.padT20 }}>
                <_Lang style={[mainStyles.boldHeadTxt, { ...sty.padB5 }]} text={'termCondition.Participant_guidelines'} />
                <Text allowFontScaling={false}>{arr}</Text>
            </View>
        )
    }

    const _sepratorLine = () => {
        return (
            <View style={[{ ...sty.padV10, ...sty.jCenter, }]} >
                <View style={{ width: '100%', height: 1, backgroundColor: 'black' }} />
            </View>
        )
    }

    const _infoItem = (item) => {
        return (
            <View >
                <View style={[{ ...sty.fRow, ...sty.padH15, ...sty.flex1 }]}>
                    <View style={styles.item1}>
                        <View style={styles.notifeUserImgViewWrap}>
                            <View style={styles.notifeUserImgView}>
                                <Image source={item.icon} resizeMode={'contain'} style={styles.notifeUserImg} />
                            </View>
                        </View>
                        <View style={{ width: globals.WINDOW_WIDTH - 100 }}>
                            <_B style={[styles.notifInfo_1, { ...sty.padB5 }]}>{item.title}</_B>
                            <Text allowFontScaling={false} style={[mainStyles.appTxt]}>{item.content}</Text>
                        </View>
                    </View>
                </View>
            </View >
        )
    }

    const _organizer = () => {
        // const { campaignInfo } = this.state;
        let addressLine1 = campaignInfo.organizerDetails.street + " " + campaignInfo.organizerDetails.streetNo
        let addressLine2 = campaignInfo.organizerDetails.city + " " + campaignInfo.organizerDetails.postalCode
        return campaignInfo.organizerDetails ? (
            <View >
                <View style={[{ ...sty.fRow, ...sty.padH15, ...sty.flex1 }]}>
                    <View style={styles.item1}>
                        <View style={styles.notifeUserImgViewWrap}>
                            <View style={styles.notifeUserImgView}>
                                <Image source={images.terms_user} resizeMode={'contain'} style={styles.notifeUserImg} />
                            </View>
                        </View>
                        <View style={{ width: globals.WINDOW_WIDTH - 100 }}>
                            <_B style={[styles.notifInfo_1, { ...sty.padB5 }]}>{_getTranslatedTest('termCondition.organizer_of_the_contest')}</_B>
                            {campaignInfo.organizerDetails.name ? <Text allowFontScaling={false} style={[mainStyles.appTxt]}>{campaignInfo.organizerDetails.name}</Text> : null}
                            {addressLine1 !== " " ? <Text allowFontScaling={false} style={[mainStyles.appTxt]}>{addressLine1}</Text> : null}
                            {addressLine2 !== " " ? <Text allowFontScaling={false} style={[mainStyles.appTxt]}>{addressLine2}</Text> : null}
                            {campaignInfo.organizerDetails.country ? <Text allowFontScaling={false} style={[mainStyles.appTxt]}>{campaignInfo.organizerDetails.country}</Text> : null}
                            {campaignInfo.organizerDetails.email ? <Text allowFontScaling={false} style={[mainStyles.appTxt]}>{campaignInfo.organizerDetails.email}</Text> : null}

                        </View>
                    </View>
                </View>
            </View >
        )
            : null
    }
    const _getTranslatedTest = (text) => {
        var txtArr = text.split('.');
        const { localize } = props;
        let lang = localize.translations[localize.activeLanguage];
        return lang[txtArr[0]][txtArr[1]];
    }

   const _WinnerDetermine = () => {
       
        let txtfirst = _getTranslatedTest('termCondition.winner_determined_txtfirst')
        let txtSecond = _getTranslatedTest('termCondition.winner_determined_txtsecond')

        return (
            <View >
                <View style={[{ ...sty.fRow, ...sty.padH15, ...sty.flex1 }]}>
                    <View style={styles.item1}>
                        <View style={styles.notifeUserImgViewWrap}>
                            <View style={styles.notifeUserImgView}>
                                <Image source={images.termsTrophie} resizeMode={'contain'} style={styles.notifeUserImg} />
                            </View>
                        </View>
                        <View style={{ width: globals.WINDOW_WIDTH - 100 }}>
                            <_B style={[styles.notifInfo_1, { ...sty.padB5 }]}>{_getTranslatedTest('termCondition.How_winner_determined')}</_B>
                            <Text allowFontScaling={false} style={[mainStyles.appTxt, { ...sty.padB10 }]}>{txtfirst}</Text>
                            <Text allowFontScaling={false} style={[mainStyles.appTxt, { paddingLeft: 10 }]}>{_getTranslatedTest('termCondition.winner_determined_linefirst')}</Text>
                            <Text allowFontScaling={false} style={[mainStyles.appTxt, { paddingLeft: 10 }]}>{_getTranslatedTest('termCondition.winner_determined_linesecond')}</Text>
                            <Text allowFontScaling={false} style={[mainStyles.appTxt, { paddingLeft: 10 }]}>{_getTranslatedTest('termCondition.winner_determined_linethird')}</Text>
                            <Text allowFontScaling={false} style={[mainStyles.appTxt, { paddingLeft: 10 }]}>{_getTranslatedTest('termCondition.winner_determined_linefour')}</Text>
                            <Text allowFontScaling={false} style={[mainStyles.appTxt, { ...sty.padT10 }]}>{txtSecond}</Text>
                        </View>
                    </View>
                </View>
            </View >
        )
    }

   const _runningTime = () => {
       
        const conteststartDate = moment(campaignInfo.createdAt).format('DD.MMM.YYYY');
        const contestEndDate = moment(campaignInfo.endDate).format('DD.MMM.YYYY');
        const contestFinalistEndDate = moment(campaignInfo.endDate).add(2, "weeks").format('DD.MMM.YYYY');
        const contestWinnerEndDate = moment(campaignInfo.endDate).add(4, "weeks").format('DD.MMM.YYYY');
        return (
            <View >
                <View style={[{ ...sty.fRow, ...sty.padH15, ...sty.flex1 }]}>
                    <View style={styles.item1}>
                        <View style={styles.notifeUserImgViewWrap}>
                            <View style={styles.notifeUserImgView}>
                                <Image source={images.termsClock} resizeMode={'contain'} style={styles.notifeUserImg} />
                            </View>
                        </View>
                        <View style={{ width: globals.WINDOW_WIDTH - 100 }}>
                            <_B style={[styles.notifInfo_1, { ...sty.padB5 }]}>{_getTranslatedTest('termCondition.running_time')}</_B>
                            {<Text allowFontScaling={false} style={[mainStyles.appTxt]}>{`${_getTranslatedTest('termCondition.application_Period')} ${conteststartDate} - ${contestEndDate}`}</Text>}
                            {<Text allowFontScaling={false} style={[mainStyles.appTxt]}>{`${_getTranslatedTest('termCondition.finalist_Period')}  ${contestEndDate} - ${contestFinalistEndDate}`}</Text>}
                            {<Text allowFontScaling={false} style={[mainStyles.appTxt]}>{`${_getTranslatedTest('termCondition.winner_Selection')}  ${contestFinalistEndDate} - ${contestWinnerEndDate}`}</Text>}
                        </View>
                    </View>
                </View>
            </View >
        )
    }
    return (
        <_Layout screen={'TermConditions'} header={header} headerWrapStyle={{ margin: 0 }}>
            <View style={mainStyles.rootView}>
                <View style={[mainStyles.roundBox, { ...sty.mgT5 }]}>
                    <ScrollView style={styles.aboutTabWrap}>
                        <View style={{ flex: 1 }}>
                            {_getHeading()}
                            {_sepratorLine()}
                            {_organizer()}
                            {_sepratorLine()}
                            {_runningTime()}
                            {_sepratorLine()}
                            {_infoItem(minimum_age)}
                            {_sepratorLine()}
                            {_infoItem(applictaion_countries)}
                            {_sepratorLine()}
                            {_infoItem(application_type)}
                            {_sepratorLine()}
                            {_infoItem(application_count)}
                            {_sepratorLine()}
                            {_WinnerDetermine()}
                            {_sepratorLine()}
                            {_infoItem(winnerAnounced)}
                            {_sepratorLine()}
                            {_infoItem(forbidden)}
                            {_sepratorLine()}
                            {_infoItem(copyright)}
                            {_sepratorLine()}
                            {_infoItem(withdrawal)}
                            {_sepratorLine()}
                            {_infoItem(forceMajeure)}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </_Layout>
    )
}
