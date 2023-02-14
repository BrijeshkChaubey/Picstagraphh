import { StyleSheet } from 'react-native';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';

const styles = StyleSheet.create({
    postContainer: {

    },
    userBox: {
        width: (globals.WINDOW_WIDTH / 2) - 4,
        backgroundColor: '#fff',
        ...sty.appBorder,
        // ...sty.mgB10
        marginBottom: 2
    },
    userStory: {
        width: (globals.WINDOW_WIDTH - 40) / 3.5,
        backgroundColor: '#fff',
        marginRight: 10,
        paddingVertical: 7
        // ...sty.appBorder,
        // borderRadius: 100,
        // ...sty.pad10
    },
    postWrap: {
        width: '100%',
        ...sty.padV15,
        backgroundColor: "#fff",
        ...sty.appBorder,
        marginBottom: 2,
        overflow: 'hidden'
    },
    contestWrap: {
        // width: '80%',
        ...sty.padV15,
        backgroundColor: "#fff",
        // ...sty.appBorder,
        marginTop: 20,
        marginBottom: 6,
        overflow: 'hidden',
        ...sty.jEnd,
        borderWidth: 1,
        borderColor: colors.appBg,
        marginHorizontal: 10,
        borderRadius: 10,
        height: (globals.WINDOW_HEIGHT * .53)
    },
    contestWrap1: {
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 6,
        overflow: 'hidden',
        ...sty.jEnd,
        borderWidth: 1,
        borderColor: colors.appBg,
        marginHorizontal: 10,
        borderRadius: 10,
        height: globals.WINDOW_WIDTH * .60 + 45,
        width: globals.WINDOW_WIDTH * .60
    },
    circleBox: {
        height: 45,
        width: 45,
        borderRadius: 100,
        marginRight: 20
    },
    circleBox1: {
        height: 45 * .60,
        width: 45 * .60,
        borderRadius: 100,
        marginRight: 10,
    },
    line: {
        height: 8,
        width: '100%',
        marginVertical: 5
    },
    postHead: {
        flexDirection: 'row',
        ...sty.padH15,
        ...sty.mgV10
    },
    loadingImage: {
        height: 200,
        width: '100%',
        ...sty.mgV10
    },
    postFooter: {
        ...sty.padH15
    },
    commentWrap: {
        paddingHorizontal: 15,
        width: '100%',
        ...sty.padV20,
        height: 100,
        backgroundColor: '#fff',
        // ...sty.mgB10,
        marginBottom: 2,
        ...sty.appBorder,
        overflow: 'hidden'
    },
    listWrap: {
        paddingHorizontal: 15,
        width: '100%',
        ...sty.padV20,
        height: 80,
        backgroundColor: '#fff',
        // ...sty.mgB10,
        marginBottom: 2,
        ...sty.appBorder
    }
})
export default styles;