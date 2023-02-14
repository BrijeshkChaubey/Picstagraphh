import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';

export const styles = StyleSheet.create({
    wrap: {
        backgroundColor: colors.light,
        // height: '100%',
        height: 200,
        width: '100%',
        ...sty.jCenter,
        ...sty.aCenter,
        marginBottom:20
    }
})