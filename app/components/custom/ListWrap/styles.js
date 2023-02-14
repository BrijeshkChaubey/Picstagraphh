import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';

export const styles = StyleSheet.create({
    defaultWrap: {
        ...sty.padV10,
        ...sty.padH15,
        // borderBottomWidth: 0.5,
        borderBottomColor: colors.light,
    },
    large: {
        ...sty.padV15,
        ...sty.padH20,
        // borderBottomWidth: 0.5,
        borderBottomColor: colors.lightDark
    },
    small: {
        ...sty.padV5,
        ...sty.padH15,
        // borderBottomWidth: 0.5,
        borderBottomColor: colors.lightDark
    }
})