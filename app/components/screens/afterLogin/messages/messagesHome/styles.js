import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../../configs';

export const styles = StyleSheet.create({
    tabWrap: {
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.light,
        borderTopWidth: 1,
        borderTopColor: colors.light
    },
    tabStyle: {
        borderRightWidth: 1,
        borderRightColor: colors.light,
        padding: 0
    },
    tabLabel: {
        color: colors.darkGray,
        fontSize: fonts.xxSmall
    },
})