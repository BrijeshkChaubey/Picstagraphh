import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';

export const styles = StyleSheet.create({
    listItem: {
        ...sty.fRow,
        ...sty.jSpace,
        ...sty.appBorder,
        marginBottom: 10,
        backgroundColor: '#fff',
        ...sty.aCenter
    }  
})