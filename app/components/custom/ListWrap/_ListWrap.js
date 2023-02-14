import React, { Component,useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text
} from 'react-native';
import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';
import { mainLayoutHoc } from '../../hoc';
import mainStyles from '../../../assets/styles/MainStyles';
import { styles } from './styles';


const _ListWrap =(props)=>{
    const [state,setstate]= useState({
        initialStyle: props.type ? styles[props.type] : styles.defaultWrap,
        style: props.style,
    })


    return (
        <View style={[state.initialStyle, state.style]}>
            {props.children}
        </View>
    )

}


export default _ListWrap;