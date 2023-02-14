import {
    View,
    Text,
    Modal,
    Animated,
    FlatList,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import styles from "./styles";
import {_Icon,_Lang} from '../../custom/index'

export default function _ErrorModal() {

    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);
    const [errorLogs, setErrorLogs] = useState([]);
    const [scale, setScale] = useState(new Animated.Value(0.8));


    const show = (errors = []) => {
        setErrorLogs(errors);
        setVisible(true);
        Animated.timing(scale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }

    const hide = () => {
        Animated.timing(scale, {
            toValue: 0.8,
            duration: 0,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
        });
    }

    const _keyExtractor = (item, index) => index.toString();

    const _renderError = ({ item }) => {
        return (
            <View style={styles.errListItem}>
                <_Icon
                    type={"Ionicons"}
                    icon={"ios-arrow-dropright"}
                    color={colors.gray}
                    size={21}
                />
                <Text style={styles.errListTxt}>{item}</Text>
            </View>
        )
    }

    const scaleAnimation = {
        transform: [{ scale: scale }],
      };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            animationType={"none"}
            onRequestClose={() => { }}
        >
            <View style={styles.modalWrapper}>
                <Animated.View style={[styles.modalWrapperInner, scaleAnimation]}>
                    <View style={styles.errorHeadWrap}>
                        {/* <_Icon type={'Ionicons'} icon={'ios-alert-outline'} size={22} color="#d31313" /> */}
                        <_Lang
                            style={styles.errorHeadTxt}
                            text={"errorModal.validation_errors"}
                        />
                    </View>
                    <View style={styles.errListWrap}>
                        <FlatList
                            data={errorLogs}
                            renderItem={_renderError}
                            keyExtractor={_keyExtractor}
                        />
                    </View>
                    <View style={styles.okBtnWrap}>
                        <View style={styles.okBtn}>
                            <TouchableOpacity
                                onPress={() => {
                                    hide();
                                }}
                                style={styles.okBtnTouch}
                            >
                                <_Lang style={styles.okBtnTxt} text={"errorModal.ok"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}