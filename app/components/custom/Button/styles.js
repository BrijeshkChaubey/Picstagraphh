import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';

export const styles = StyleSheet.create({
    btnWrap: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: colors.primaryColor,
        borderBottomColor: colors.primaryColor,
         borderRadius: 10,
        borderWidth: 0.5,
        borderColor: colors.primaryColor
    },
    btnTxt: {
        ...sty.padV10,
        ...sty.tCenter,
        fontSize: fonts.medium,
        color: colors.primaryColor
    },
    smallBtn: {
        ...sty.padV5,
        ...sty.padH10,
        ...sty.tCenter,
        fontSize: fonts.xSmall,
        color: colors.primaryColor
    },
    userImgWrap: {
        width: globals.WINDOW_WIDTH / 2 - 4,
        ...sty.appBorder,
        overflow: 'hidden'
    },
})