import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { globals, colors, images } from "../../configs";
import { _Lang } from "../custom";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

export default function TabShape({ navigation }) {
    // const [navigation] = props
    console.log('props :', navigation);
    // console.log('props :', options);
    const checkIphoneXR = () => {
        return Platform.OS === "ios" && (WINDOW_HEIGHT >= 812 || WINDOW_WIDTH >= 812);
    };

    const routes = [
        {
            id: 0,
            title: "tabs.home",
            navigate: 'HomeNavigator',
            focusedIcon: images.campaign3,
            unfocusedIcon: images.campaignB1
            // icon: { tabs.ome },
        },
        {
            id: 1,
            title: "tabs.campaign",
            navigate: 'CampaignNavigator',
            focusedIcon: images.trofy1,
            unfocusedIcon: images.trofyB1
            // icon: { tabs.Home },
        },
        {
            id: 2,
            title: null,
            // icon: null,
        },
        {
            id: 3,
            title: 'tabs.Participant',
            navigate: 'HomeNavigator',
            focusedIcon: images.campaign3,
            unfocusedIcon: images.campaignB1
            // icon: { tabs.Home },
        },
        {
            id: 4,
            title: 'tabs.notification',
            navigate: 'HomeNavigator',
            focusedIcon: images.notification1,
            unfocusedIcon: images.notificationB1
            // icon: { tabs.Home },
        }
    ]

    const _TabIcon = (props) => {
        console.log(props);
        const { focused, image1, image2, badgeCount } = props;
        return (
            <View style={[{ marginBottom: 0 }, Platform.OS === 'android' ? { alignItems: 'center', width: 60 } : null]}>
                <Image
                    // source ={images.campaign3}
                    source={focused ? image2 : image1}
                    style={{
                        height: checkIphoneXR() ? 20 : 22.5,
                        width: checkIphoneXR() ? 40 : 45,
                        // marginBottom:5
                    }}
                    resizeMode="contain"
                />
                <View style={{ height: 5 }}>

                </View>
                {/* <Label style={{}}>{label}</Label> */}
                {badgeCount > 0 && (
                    <View
                        style={{
                            position: "absolute",
                            right: -12,
                            top: -6,
                            backgroundColor: "red",
                            borderRadius: 5, //10,
                            width: 50,
                            height: 20,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        {badgeCount < 9 ? (
                            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                                {badgeCount}
                            </Text>
                        ) : null}
                        {badgeCount <= 99 ? (
                            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
                                {badgeCount}
                            </Text>
                        ) : null}
                        {badgeCount > 99 ? (
                            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                                {"99+"}
                            </Text>
                        ) : null}
                    </View>
                )}
            </View>
        );
    };

    const _UploadIcon = (props) => {
        const { focused, image1, image2, badgeCount, label } = props;

        return (
            <View style={{ marginBottom: 0 }}>
                <Image
                    source={image1}
                    style={{
                        height: checkIphoneXR() ? 40 : 42,
                        width: checkIphoneXR() ? 50 : 45,
                        // marginBottom:
                        paddingBottom: 0
                    }}
                // resizeMode="contain"
                />
                {/* <View style={{height:100}}></View> */}

            </View>
        );
    };
    return (
        <View style={{
            height: 50,
            width: '100%',
            backgroundColor: 'gray',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        }}>
            {routes.map((item, index) =>
                (index != 2) ?
                    <TouchableOpacity
                        onPress={() => navigation.navigate(item?.navigate)}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <_TabIcon
                            image1={item.focusedIcon}
                            image2={item.unfocusedIcon}
                            focused={navigation.isFocused}
                            label={<_Lang style={{ width: 50, fontSize: 9.5, color: navigation.isFocused ? "black" : "black", justifyContent: "center", textAlign: "center" }} text={"Home"} />}
                        />
                        <_Lang style={{ fontSize: 10, color: navigation.isFocused ? "red" : "gray" }}
                            text={item.title} />
                    </TouchableOpacity>
                    :
                    <_UploadIcon
                        image1={images.newUploadBold}
                    />
            )}
        </View>
    );
}