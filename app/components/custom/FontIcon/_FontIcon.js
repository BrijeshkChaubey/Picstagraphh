import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';
import { useState } from 'react';

export default function _FontIcon(props) {

    const [wrapStyle, setWrapStyle] = useState(props.wrapStyle || {});
    const [style, setStyle] = useState(props.style || {});
    const [color, setColor] = useState(props.color || colors.primaryColor);
    const [size, setSize] = useState(props.size || 20);


    function getDerivedStateFromProps(nextProps, state) {
        return {
            wrapStyle: nextProps.wrapStyle || {},
            style: nextProps.style || {},
            size: nextProps.size || 20,
            color: nextProps.color || state.color
        };
    }

   const  _renderIcons = () => {
        switch (props.type) {
            case 'Entypo':
                return <Entypo name={props.icon} style={style} size={size} color={color} />
                break;
            case 'EvilIcons':
                return <EvilIcons name={props.icon} style={style} size={size} color={color} />
                break;
            case 'Feather':
                return <Feather name={props.icon} style={style} size={size} color={color} />
                break;
            case 'Foundation':
                return <Foundation name={props.icon} style={style} size={size} color={color} />
                break;
            case 'Ionicons':
                return <Ionicons name={props.icon} style={style} size={size} color={color} />
                break;
            case 'MaterialIcons':
                return <MaterialIcons name={props.icon} style={style} size={size} color={color} />
                break;
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={props.icon} style={style} size={size} color={color} />
                break;
            case 'Octicons':
                return <Octicons name={props.icon} style={style} size={size} color={color} />
                break;
            case 'Zocial':
                return <Zocial name={props.icon} style={style} size={size} color={color} />
                break;
            case 'SimpleLineIcons':
                return <SimpleLineIcons name={props.icon} style={style} size={size} color={color} />
                break;
            case 'FontAwesome':
            default:
                return <FontAwesome name={props.icon} style={style} size={size} color={color} />
                break;
        }
    }

    return (
        <View style={wrapStyle}>
            {_renderIcons()}
        </View>
    )
}