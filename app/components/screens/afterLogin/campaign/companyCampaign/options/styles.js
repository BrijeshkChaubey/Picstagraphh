import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../../../configs';

export const styles = StyleSheet.create({
    profileInfoWrap: {
        ...sty.fRow,
        ...sty.padV5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 10,
        //  marginBottom: 10,
        overflow: 'hidden'
    },
    profileImgWrap: {
        width: 85,
        paddingRight: 5
    },
    profileImgWrapInnter: {
        height: 85,
        width: 85,
        ...sty.appBorder,
        overflow: 'hidden'
    },
    profileImg: {
        height: 85,
        width: 85,
        backgroundColor: colors.light
    },
    profileStatsWrap: {
        width: globals.WINDOW_WIDTH - 90,
        paddingRight: 15,
        paddingLeft: 15,
        ...sty.jEnd
    },
    profileStat: {
        ...sty.flex1,
        marginBottom: 7
    },
    profileStatCount: {
        ...sty.tCenter,
        fontSize: fonts.medium
    },
    profileStatTxt: {
        ...sty.tCenter,
        color: colors.lightDarker
    },
    uploadBtn: {
        color: '#fff',
        ...sty.tCenter,
        ...sty.padV5,
        fontSize: fonts.small
    },
    aboutGeneralInfoWrap: {
    },
    aboutGeneralInfoItem: {
        ...sty.fRow,
        ...sty.padV15
    },
    aboutGeneralInfoItem_1: {
        width: 130
    },
    aboutGeneralInfoItem_2: {
    },
    aboutGeneralInfoItem_1Txt: {
        color: colors.gray
    },
    aboutGeneralInfoItem_2Txt: {
        color: colors.gray
    },
    aboutLabelHead: {
        color: colors.gray,
        ...sty.mgT15
    },
    aboutPersonalIntWrap: {
        ...sty.fRow,
        flexWrap: 'wrap'
    },
    aboutOfferTagWrap: {
    },
    aboutOfferTag: {
        ...sty.mgV10,
        paddingRight: 10
    },
    aboutOfferTagTxt: {
        ...sty.padH25,
        ...sty.tCenter,
        paddingVertical: 8,
        backgroundColor: colors.primaryColor,
        color: '#fff',
        width: 'auto',
        ...sty.appBorder,
        overflow: 'hidden'
    },
    aboutSocialItem: {
        ...sty.fRow,
        ...sty.mgV10
    },
    aboutSocialItem_1: {
        width: 50
    },
    aboutSocialItem_1_Img: {
        height: 25,
        width: 25
    },
    aboutSocialItem_2: {
        ...sty.flex1,
        ...sty.jCenter
    },
    aboutSocialItem_3: {
        ...sty.jCenter
    },
    visitProfileBtn: {
        width: 100,
        borderWidth: 0.5,
        borderColor: colors.primaryColor,
        overflow: 'hidden',
        ...sty.appBorder
    },
    visitProfileBtnTxt: {
        ...sty.tCenter,
        ...sty.padV5,
        color: colors.primaryColor,
    },
    item1: {
        ...sty.flex1,
        ...sty.fRow,
        ...sty.jStart,
    },
    notifeUserImgViewWrap: {
        width: 55,
        // ...sty.jCenter,
    },
    notifeUserImgView: {
        width: 45,

    },
    notifeUserImg: {
        width: 30,
        height: 30
    },
    notifInfoView: {
        height: "100%",
        // minWidth: '75%',
        // flexWrap: 'wrap',
    },
    tabWrap: {
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.light,
        borderTopWidth: 0.5,
        borderTopColor: colors.light
    },
    tabStyle: {
    },
    tabLabel: {
        color: colors.darkGray
    },
    aboutTabWrap: {
        ...sty.padH15,
        ...sty.padB15,
    },
    priceTab: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: colors.darkBg,
        width: '100%'
    },
    headWrapPrice: {
        ...sty.fRow,
        ...sty.padH10,
    },
    descWrapF: {
        ...sty.padH10,
        ...sty.padV5,
        ...sty.padB10,
        flexWrap: 'wrap'
    },
    applyTxt: {
        color: '#fff',
        fontSize: fonts.small,
        ...sty.tCenter
    },
    appliedBtn: {
        ...sty.appBorder,
        overflow: 'hidden',
        borderWidth: 1,
        // borderColor: colors.primaryColor,
        backgroundColor: '#fff',
        ...sty.mgV10,
        ...sty.padV10,
        // ...sty.padH5,
        // ...sty.mgH10,
        ...sty.aCenter,
    },
})