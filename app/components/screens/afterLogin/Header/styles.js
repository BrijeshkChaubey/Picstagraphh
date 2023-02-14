import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../configs';
import { WINDOW_WIDTH } from "../../../../configs/libs/globals";

export const styles = StyleSheet.create({
    msgNotify: {
        borderRadius: 5,
        borderWidth: 1,
        // ...sty.pad5,
        padding: 3,
        backgroundColor: 'transparent',
        borderColor: '#fff',
    },
    searchBar: {
        paddingHorizontal: 0,
        height: 40,
        borderWidth: 0,
        borderColor: '#F5F5F5',
        backgroundColor: "#F5F5F5",
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.15,
        // elevation: 2,
        borderRadius: 5,
        flexGrow:1,
        alignSelf: "center",
        marginBottom: 5,
        marginTop: 5
    },
})