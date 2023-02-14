import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';

export const styles = StyleSheet.create({
    listItem: {
        ...sty.fRow,
        ...sty.jSpace,
        ...sty.aCenter,
        backgroundColor: "#fdfdfd",
        margin: 10,
        shadowColor: "#000",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedList: {
        borderRadius: 30,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})