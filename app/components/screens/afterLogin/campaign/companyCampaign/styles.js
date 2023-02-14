import { StyleSheet } from 'react-native';
import {colors, sty } from '../../../../../configs';

export const styles = StyleSheet.create({
    tabWrap: {
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.light,
        borderTopWidth: 0.5,
        borderTopColor: colors.light
    },
    tabStyle: {
        borderRightWidth: 1,
        borderRightColor: colors.light,
        ...sty.padV5
    },
    tabLabel: {
        color: colors.darkGray
    },
})