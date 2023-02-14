import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    FlatList,
    RefreshControl
} from 'react-native';

import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize, API, ApiCall } from '../../../../../../configs';
import { _GradiantView, _ListBox, _Spacer, _Icon, _Button, _ListView, _ContentType, _InlineLoader, _EmptyPostList } from '../../../../../custom';
import { mainLayoutHoc } from '../../../../../hoc';
import mainStyles from '../../../../../../assets/styles/MainStyles';
import { styles } from '../styles';

import { setPendingParticipantProp, pushPendingParticipantProp } from '../../../../../../redux/actions/PendingParticipantAction';

//ContentBox actions
import { setAppData, pushAppData } from '../../../../../../redux/actions/AppDataActions';
import { pushProfileDataProp, setProfileDataProp } from '../../../../../../redux/actions/ProfileAction';
import { setPagination } from '../../../../../../redux/actions/PaginationActions';


