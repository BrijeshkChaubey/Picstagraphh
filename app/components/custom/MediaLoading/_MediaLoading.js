import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../configs';
import _InlineLoader from '../InlineLoader/_InlineLoader';
import { mainLayoutHoc } from '../../hoc';
import mainStyles from '../../../assets/styles/MainStyles';
import { styles } from './styles';

export default MediaLoading = (props) => {
    return (
        <View style={[styles.wrap, props.singleImage ? props.fullViewNav ? { height: globals.WINDOW_HEIGHT } : { height: globals.WINDOW_HEIGHT / 3 } : {}]}>
            <_InlineLoader {...props} type={'singleImage'} />
        </View>
    )
}