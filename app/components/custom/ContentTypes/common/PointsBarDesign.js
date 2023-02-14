import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { images, globals, colors, sty, helpers } from "../../../../configs";
import { _GradiantView, _Icon } from "../../../custom";
import { Bar } from "react-native-progress";
import Modal from "react-native-modal";
import LevelUpModel from './LevelUpModel';
import IconComp from "./IconComonent";

export default (POINTS_BAR_DESIGN = (props) => {
  const { userInfo, levelDiff, levelPoints } = props;
  const currentLevel = helpers.getUserLevel(userInfo.likePoints, levelPoints);
  const [modalVisible, setModalVisible] = useState(false);
 


  //   const currentLevel = userInfo.userLevel;

  const prog =
    userInfo.likePoints === 0
      ? 0
      : (userInfo.likePoints - levelPoints[currentLevel]) /
      levelDiff[currentLevel];
  const levelCount = ( userInfo.likePoints < 100) ? 1
    : (userInfo.likePoints >= 100 && userInfo.likePoints < 250) ? 2
      : (userInfo.likePoints >= 250 && userInfo.likePoints < 500) ? 3
        : (userInfo.likePoints >= 500 && userInfo.likePoints < 750) ? 4
          : (userInfo.likePoints >= 750 && userInfo.likePoints < 1000) ? 5
            : (userInfo.likePoints >= 1000 && userInfo.likePoints < 1250) ? 6
              : (userInfo.likePoints >= 1250 && userInfo.likePoints < 1500) ? 7
                : (userInfo.likePoints >= 1500 && userInfo.likePoints < 2000) ? 8
                  : (userInfo.likePoints >= 2000 && userInfo.likePoints < 2500) ? 9
                    : (userInfo.likePoints >= 2500 && userInfo.likePoints < 5000) ? 10
                      : (userInfo.likePoints >= 5000 && userInfo.likePoints < 10000) ? 11
                        : (userInfo.likePoints >= 10000 && userInfo.likePoints < 25000) ? 12
                          : (userInfo.likePoints >= 25000 && userInfo.likePoints < 50000) ? 13
                            : (userInfo.likePoints >= 50000 && userInfo.likePoints < 100000) ? 14
                              : 15
  const progString = prog <= 1 ? prog * 100 + "%" : "100%";

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: colors.white,
        minHeight: 55,
      }}
    >
      
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", borderWidth: 0 }}
        >
          {/* <FastImage
            style={{ height: 18, width: 20, marginRight: 5, marginBottom: 2 }}
            source={images.heartDark}
            resizeMode={"contain"}
          /> */}
          <IconComp name='heart' size={24}/>
          <Text style={{ ...sty.tCenter, fontSize: 16,paddingLeft:12 }}>
            {userInfo.likePoints}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center",paddingBottom:4 }}>
          <Text style={{ ...sty.tCenter, fontSize: 16 }}>
            {"Activity Lvl " + levelCount}
          </Text>

          <TouchableOpacity style={{ marginLeft: 7 }}
            onPress={() => {
              setModalVisible(true);
            }}>
            
            <_Icon
              type={"MaterialIcons"}
              icon={"info"}
              size={30}
              color={"#000000"}
            />
          </TouchableOpacity>
          <LevelUpModel points={userInfo.likePoints} level={levelCount}  isVisible={modalVisible} setModalVisiblity={() => { setModalVisible(preState => preState = !preState) }}>

          </LevelUpModel>

        </View>
      </View>

      <View
        style={{
          marginTop: 5,
          height: 10,
          width: "100%",
          backgroundColor: "#ddd",
          borderRadius: 5,
        }}
      >
        <_GradiantView
          bgColor={'#000000'}
          style={{ width: progString, height: "100%", borderRadius: 5 }}
        />
      </View>
    </View>
  );
});
