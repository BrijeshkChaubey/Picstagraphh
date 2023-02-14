import React, { Component, useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    Text,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Item } from 'native-base';
import { globals, helpers, validators, colors, fonts, images, sty, localize } from '../../../../../../configs';
import { _GradiantView, _ListBox, _Spacer, _Icon, _Button, _ListView, _ContentType, _Lang } from '../../../../../custom';
import { mainLayoutHoc } from '../../../../../hoc';
import mainStyles from '../../../../../../assets/styles/MainStyles';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { styles } from '../styles';

import { setNavigation } from '../../../../../../redux/actions/NavAction';
//ContentBox actions
import { setAppData } from '../../../../../../redux/actions/AppDataActions';
import { pushProfileDataProp, setProfileDataProp } from '../../../../../../redux/actions/ProfileAction';
import { setPagination } from '../../../../../../redux/actions/PaginationActions';

function Prize(props) {
    const [campaignInfo, setcampaignInfo] = useState(props.campaignInfo);
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([]);

    const {navProps,
        appData,
        loginData,
        localize,
        profile} = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        let arrIndex = 0;
        campaignInfo.prizeImagesUrls && campaignInfo.prizeImagesUrls.forEach((value, indx) => {
            if (value !== "") {
                setRoutes(prevState => [...prevState.routes, { index: arrIndex, key: 'tab' + (indx + 1) }])
                ++arrIndex;
            }
        })
    }, []);

   const _renderTabs = ({ route }) => {
        switch (route.key) {
            case 'tab1':
                return (
                    <View style={{ ...sty.pad5 }}>
                        <View style={styles.priceTab} ref={ref => videoWrapRef = ref}>
                            <Image
                                source={{ uri: props.campaignInfo.prizeImagesUrls[0] ? props.campaignInfo.prizeImagesUrls[0] : '' }}
                                style={{ width: '100%', height: 220 }}
                            />
                        </View>
                    </View>
                );
            case 'tab2':
                return (
                    <View style={{ ...sty.pad5 }}>
                        <View style={styles.priceTab} ref={ref => videoWrapRef = ref}>
                            <Image
                                source={{ uri: props.campaignInfo.prizeImagesUrls[1] ? props.campaignInfo.prizeImagesUrls[1] : '' }}
                                style={{ width: '100%', height: 220 }}
                            />
                        </View>
                    </View>
                );
            case 'tab3':
                return (
                    <View style={{ ...sty.pad5 }}>
                        <View style={styles.priceTab} ref={ref => videoWrapRef = ref}>
                            <Image
                                source={{ uri: props.campaignInfo.prizeImagesUrls[2] ? props.campaignInfo.prizeImagesUrls[2] : '' }}
                                style={{ width: '100%', height: 220 }}
                            />
                        </View>
                    </View>
                );

            default:
                return null;
        }
    }

   const renderLeftButton = () => {
        return (
            <View style={styles.leftButtons}>
                <TouchableOpacity
                    onPress={() => { if (index > 0) 
                        setIndex(preIndex => ps.index - 1);
                        }
                    }
                >
                    {index > 0 ? <_Icon type={'Ionicons'} icon={'ios-arrow-back'} color='white' size={40} /> : null}
                </TouchableOpacity>
            </View>
        )
    }

    renderRightButton = () => {
        return (
            <View style={styles.rightButtons}>
                <TouchableOpacity
                    onPress={() => { if (index < routes.length - 1) 
                        setIndex(preIndex => ps.index + 1)
                    }}
                >
                    {index < routes.length - 1 ? <_Icon type={'Ionicons'} icon={'ios-arrow-forward'} color='white' size={40} /> : null}
                </TouchableOpacity>
            </View>
        )
    }
   const _renderTabView = () => {
        // const { contentInfo, localize, navProps } = props;
        return (
            <View style={{ flex: 1, ...sty.mgB10 }}>
                {/* <View style={{height: 220}}> */}
                <TabView
                    navigationState={[campaignInfo,index,routes]}
                    onIndexChange={index => setIndex(index)}
                    initialLayout={{ width: globals.WINDOW_WIDTH, height: 200 }}
                    renderTabBar={() => null}
                    renderScene={_renderTabs}
                    swipeEnabled={true}
                    animationEnabled={true}
                />
                {/* </View> */}
                {renderLeftButton()}
                {renderRightButton()}
            </View>
        )
    }

    return (
        <View style={[mainStyles.rootView]}>
            <View style={mainStyles.roundBox}>
                <ScrollView >
                    {campaignInfo.prizeImagesUrls.length === 3 ? this._renderTabView() : null}
                    <View style={styles.headWrapPrice}>
                        <View style={{ ...sty.flex1, ...sty.padV5 }}>
                            <_Lang text={'The Prize'} style={mainStyles.boldHeadTxt} pureText />
                        </View>
                    </View>
                    <View style={[styles.descWrapF, { ...sty.fRow }]}>
                        <Text style={[mainStyles.appTxt, { lineHeight: 25 }]}>{campaignInfo.priceDescription}</Text>
                        {/* <_DescriptionLink onUserNamePress={this._getUserInfo} onHashPress={this._hashPress} text={campaignInfo.priceDescription} /> */}
                    </View>
                    <View style={{ ...sty.padV10, ...sty.padH10 }}>
                        <_Button
                            text={helpers.getLocale(props.localize, 'campaign', 'to_our_newsletter')}
                            callback={() => { }}
                            gradiant
                            isRound
                        />
                    </View>

                </ScrollView>
            </View>
        </View>
    )


}