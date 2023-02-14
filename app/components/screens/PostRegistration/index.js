import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  FlatList,
  View,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { globals, colors } from "../../../configs";
import UpdateName from "../updateName/UpdateName";
// import UpdateImage from "../updateImage/UpdateImage";
import UpdateUserInfo from "../UpdateUserInfo";
import { mainLayoutHoc } from "../../hoc";
import mainStyles from "../../../assets/styles/MainStyles";
import { getTabWidth } from "../../../configs/libs/helpers";
import { _Button } from "../../custom";
import { useNavigation } from "@react-navigation/native";

const PostRegistration = (props) => {
  console.log(props);
  const navigation = useNavigation();

  const localize = useSelector((state) => state.localize);
  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState(props.route.paramsFBUser || props.route.params.AppleUser || props.route.params.GoogleUser
    ? [
      { index: 0, key: "UpdateName" },
      { index: 1, key: "UpdateImage" },
      { index: 2, key: "UpdateUserInfo" },
    ]
    : [
      { index: 0, key: "UpdateImage" },
      { index: 1, key: "UpdateUserInfo" },
    ]);


  const [isFBUser, setIsFBUser] = useState(props.route.params.FBUser);
  const [isAppleUser, setIsAppleUser] = useState(props.route.params.AppleUser);
  const [isGoogleUser, setIsGoogleUser] = useState(props.route.params.GoogleUser);
  const [userDetail, setUserDetail] = useState(props.route.params.userDetail);
  const [userInfo, setUserInfo] = useState(props.route.params.userInfo);
  const [fbresult, setFbresult] = useState(props.route.params.fbresult);
  const [appleresult, setAppleresult] = useState(props.route.params.appleresult);
  const [googleresult, setGoogleresult] = useState(props.route.params.googleresult);


  const changeTab = (ind) => {
    setIndex(ind);
  }

  const headerTab = () => {

    const activeIndex = index;
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "android" ? 20 : 0,
          alignItems: "center",
        }}
      >
        <FlatList
          data={routes}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ width: globals.WINDOW_WIDTH / 20 }} />
          )}
          renderItem={({ item, index }) => {
            const isActiveTab = index == activeIndex ? true : false;

            return (
              <_Button
                callback={(ind) => {
                  if (index !== 0 && routes.length !== 3) {
                    changeTab(ind);
                  }
                }}
                isRound={true}
                index={index}
                gradiant={isActiveTab ? true : false}
                style={[
                  {
                    padding: 1,
                    width:
                      globals.WINDOW_WIDTH / (routes.length === 3 ? 4 : 2.4),
                    height: 10,
                    borderRadius: 5,
                  },
                  !isActiveTab
                    ? {
                      borderColor: colors.lightDark,
                      borderWidth: 1,
                      backgroundColor: colors.lightDarker,
                    }
                    : {},
                ]}
              />
            );
          }}
        />
      </View>
    );
  };

  const _renderTabs = ({ route }) => {
    const { loader } = props;
    switch (route.key) {
      case "UpdateName":
        return
        <UpdateName
          navigation={navigation.navigate("UpdateName")}
          // {...this.state}
          changeTab={(ind) => changeTab(ind)}
        />


      // case "UpdateImage":
      //   return (
      //     <UpdateImage
      //       navigation={navigation.navigate("UpdateImage")}
      //       index={index}
      //       isAppleUser={isAppleUser}
      //       isGoogleUser={isGoogleUser}
      //       isFBUser={isFBUser}
      //       userDetail={userDetail}
      //       changeTab={(ind) => changeTab(ind)}
      //     />
      //   );

      case "UpdateUserInfo":
        return (
          <UpdateUserInfo
            navigation={navigation.navigate("UpdateUserInfo")}
            userDetail={userDetail}
            loader={loader}
            index={index}
            changeTab={(ind) => changeTab(ind)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar style={{ backgroundColor: colors.blue }} />
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={(index) => setIndex(index)}
        initialLayout={{
          width: globals.WINDOW_WIDTH,
          height: 150,
        }}
        renderTabBar={(props) => headerTab()}
        renderScene={_renderTabs}
        swipeEnabled={routes.length === 3 && index === 0 ? false : true}
        animationEnabled={true}
      />
    </SafeAreaView>
  )
}
export default mainLayoutHoc({})(PostRegistration);