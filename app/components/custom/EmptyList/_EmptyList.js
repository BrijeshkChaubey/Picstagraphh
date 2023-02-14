import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    StyleSheet
} from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';
import mainStyles from '../../../assets/styles/MainStyles';

export const _BlankList = (props) => (
    <View style={styles.blankList} />
)

export const _EmptyPostList = ({ message }) => (
    // <View style={styles.wrap}>
    //     <View style={styles.searchWrap}>
    //         <Image source={images.search} style={styles.searchIco} resizeMode={'contain'} />
    //     </View>

    //     {
    //         message ?
    //             <View style={styles.msgWrap}>
    //                 <Text style={styles.msgHead}>{message}</Text>
    //             </View>
    //             :
    //             <View style={styles.msgWrap}>
    //                 <Text style={styles.msgHead}>Try something new</Text>
    //                 <Text style={styles.msgSubTxt}>Your search did not give any result</Text>
    //             </View>
    //     }

    // </View>
    <View />
)

export const _EmptyList = (props, { message }) => (
    // <View style={[styles.wrap, props.style]}>
    //      <View style={styles.searchWrap}>
    //         <Image source={images.search} style={styles.searchIco} resizeMode={'contain'} />
    //     </View>

    //     {
    //         message ?
    //             <View style={styles.msgWrap}>
    //                 <Text style={styles.msgHead}>{message}</Text>
    //             </View>
    //             :
    //             <View style={styles.msgWrap}>
    //                 <Text style={styles.msgHead}>Try something new</Text>
    //                 <Text style={styles.msgSubTxt}>Your search did not give any result</Text>
    //             </View>
    //     } 

    // </View>
    <View />
)

const styles = StyleSheet.create({
    blankList: {
        ...sty.pad20
    },
    wrap: {
        ...sty.pad20,
        ...sty.aCenter,
        ...sty.jCenter,
        ...sty.fRow,
        backgroundColor: '#FFF',
        ...sty.appBorder
    },
    searchWrap: {
        width: 70,
        ...sty.aCenter,
        ...sty.jCenter
    },
    searchIco: {
        height: 45,
        width: 45,
    },
    msgWrap: {
        ...sty.flex1,
        ...sty.aCenter,
        ...sty.jCenter
    },
    msgHead: {
        ...sty.tCenter,
        color: colors.darkGray,
        fontSize: fonts.large,
        fontWeight: '500',
        marginBottom: 5,

    },
    msgSubTxt: {
        ...sty.tCenter,
        color: colors.lightDarker,
        fontSize: fonts.medium
    },
})