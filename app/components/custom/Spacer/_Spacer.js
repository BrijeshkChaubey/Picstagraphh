import { View, Text } from 'react-native'
import React from 'react'
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';
import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Icon, _Button, _Layout, _ListView } from '../../custom';

export default function _Spacer(props) {
    const size = props.size || 5;
    let marginTop = marginBottom = size / 2;
    let borderWidth = props.type ? props.borderWidth ? props.borderWidth
        : 1
        : 0;
    let space = props.type ?
        props.type == 'border' ? 0 :
            props.type == 'border5' ? 5 :
                props.type == 'border10' ? 10 :
                    props.type == 'border15' ? 15 :
                        props.type == 'border20' ? 20 : 20
        : 0;
    let borderColor = props.borderColor ? props.borderColor : colors.light;
    let position = props.position || 'center';

    if (position == 'top') {
        marginTop = 0;
        marginBottom = size;
    }
    if (position == 'bottom') {
        marginTop = size;
        marginBottom = 0;
    }
    return (
        <View style={{
            alignSelf: 'center',
            marginTop: marginTop,
            marginBottom: marginBottom,
            borderWidth: borderWidth,
            borderColor: borderColor,
            width: globals.WINDOW_WIDTH - (space * 2)
        }} />
    )
}