import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../../../configs';

export const styles = StyleSheet.create({
    langItem: {
        ...sty.fRow,
        ...sty.jSpace,
        // ...sty.appBorder,
        backgroundColor: '#fff',
        // ...sty.mgB10
        borderEndColor: colors.appBg,
        borderBottomWidth: 2
    },
    langItem_1: {
        ...sty.jCenter
    },
    langItem_1_Txt: {
        color: colors.gray,
        fontSize: fonts.small
    },
    langItem_2: {
        ...sty.aEnd
    },
})