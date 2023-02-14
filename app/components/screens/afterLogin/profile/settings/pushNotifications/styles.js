import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../../../configs';

export const styles = StyleSheet.create({
    notificationWrap: {

    },
    notificationItem: {
        ...sty.fRow,
        ...sty.jSpace,
        ...sty.appBorder,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    notificationItem_1: {
        ...sty.jCenter
    },
    notificationItem_1_Txt: {
        color: colors.gray,
        fontSize: fonts.small
    },
    notificationItem_2: {
        ...sty.aEnd
    },
})