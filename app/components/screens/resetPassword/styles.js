import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';

export const styles = StyleSheet.create({
    container: {
        ...sty.flex1,
        backgroundColor: '#fff',
    },
    headingWrap: {
        paddingTop: 40,
        paddingBottom: 35
    },
    headingTxt: {
        fontSize: fonts.large,
        ...sty.padH15,
        ...sty.padV10,
        ...sty.mgB10,
        color: colors.text,
        fontFamily: 'Helvetica',
    },
    headingSubTxt: {
        fontSize: fonts.small,
        ...sty.padH15,
        color: colors.text,
        fontFamily: 'Helvetica',
    },
    wrap2: {
        flex:1,
        ...sty.jEnd
    },
    termsTxt: {
        ...sty.tCenter,
        fontSize: fonts.xSmall,
        fontFamily: 'Helvetica-light',
        fontWeight: '300',
        color: colors.heading3,
    },
    spacer: {
        alignSelf: 'center',
        height: 1,
        backgroundColor: colors.lightDarker,
        ...sty.mgB15,
        width: '60%'
    },
    forgotPassHead: {
        paddingTop: 40,
        ...sty.flex1
    },
})