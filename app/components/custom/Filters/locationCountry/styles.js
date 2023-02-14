import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';

export const styles = StyleSheet.create({
    listItem: {
        ...sty.fRow,
        ...sty.jSpace,
        ...sty.appBorder,
        marginBottom: 10,
        backgroundColor: '#fff',
    },  
    searchBar:{
        ...sty.padH15,
        height: 40 ,
        backgroundColor: '#fff',
        marginBottom:10,
        ...sty.appBorder,
    }
})