import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';

import React from 'react'

export default function _ListBox( props ) {


    const _renderIcon = () => {
        switch(props.iconType) {
            case 'fontAwesome':
                return <IconAwe name={props.icon} size={40} color={colors.green} />
                break;

            case 'material':
            default:
                return <IconMat name={props.icon} size={40} color={colors.green} />
                break;
        }
    }

    return (
        <View
            style={{
                shadowColor: '#ddd',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 5,
                marginBottom: 10,
                shadowOpacity: 0.3
            }}>
            <TouchableOpacity onPress={props.cb} style={{ width: '100%' }}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 20, alignItems: 'center', justifyContent: "space-between" }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ paddingRight: 15 }}>
                            {_renderIcon()}
                        </View>
                        <View style={{}}>
                            <Text style={{ fontSize: 22, color: colors.darkGray }}>{props.text}</Text>
                        </View>
                    </View>
                    <View>
                        <IconMat name={'keyboard-arrow-right'} size={25} color={colors.gray} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}