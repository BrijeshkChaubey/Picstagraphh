import React, { useState } from "react";
import { FlatList, Modal } from 'react-native';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  Animated,
  ScrollView
} from "react-native";
import mainStyles from "../../../../assets/styles/MainStyles";
import { _GradiantView, _Icon, _Lang } from "../../../custom";
import { globals, helpers, validators, colors, fonts, images, sty, localize, API } from '../../../../configs';
import { black, borderColor } from "../../../../configs/utils/colors";






const LevelUpModel = (props) => {
  
  const levelCount = [{
    level: 1,
    points: "0-100",
  },
  {
    level: 2,
    points: "100-250",
  },
  {
    level: 3,
    points: "250-500",
  }, {
    level: 4,
    points: "500-750",
  }, {
    level: 5,
    points: "750-1000",
  },
  {
    level: 6,
    points: "1000-1250",
  },
  {
    level: 7,
    points: "1250-1500",
  },
  {
    level: 8,
    points: "1500-2000",
  }, {
    level: 9,
    points: "2000-2500",
  }, {
    level: 10,
    points: "2500-5000",
  }, {
    level: 11,
    points: "5000-10000",
  },
  {
    level: 12,
    points: "10000-25000",
  },
  {
    level: 13,
    points: "25000-50000",
  },
  {
    level: 14,
    points: "50000-100K",
  },
  {
    level: 15,
    points: '> 100K'
  }
  ]

  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={{ padding: 20, ...mainStyles.rootView }}>
        <View style={{ justifyContent: "flex-end", height: 30, width: "100%", display: "flex", flexDirection: "row", marginTop: 20, }}>
          <TouchableOpacity onPress={() => {
            props.setModalVisiblity(false)
          }}>
            <_Icon
              type={"MaterialIcons"}
              icon={"cancel"}
              size={30}
              color={"#000000"}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <View style={{ display: "flex", width: 120, height: 120, borderColor: "#FBBC04", borderRadius: 1000, borderWidth: 5, justifyContent: "center", alignItems: "center" }}>
              <Image source={images.likeBtn} style={{ height: 55, width: 55 }} />
              <Text style={mainStyles.text16W500}>Level {props?.level}</Text>
            </View>
            <Text style={{ paddingTop: 20, ...mainStyles.text16W500 }}>{props?.points} Points</Text>
            <_Lang
              style={{ paddingTop: 20, textAlign: "center", color: colors.text, fontFamily: "Poppins-Regular" }}
              text={"levelUp.aboutOfLevelUp"}
            />
            <Text style={{ paddingTop: 20, ...mainStyles.text16W500 }}>Your next levels</Text>
          </View>
          <FlatList
            data={levelCount}
            contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 20 }}
            renderItem={({ item }) =>
              <View style={{
                height: 60, backgroundColor: item?.level!=props?.level? "#dcdcdc" : "#fff", borderRadius: 5, shadowOffset: { width: 0, height: 2, },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, marginTop: 20
              }}>
                <View style={{ flexDirection: "row", padding: 20, }}>
                  
                  <Text style={{
                    color: colors.heading1,
                    fontFamily: "Poppins-Regular",
                    fontWeight: item?.level != props?.level ? "100":"500",
                    fontSize: 16,
                    textAlign: "center",}}>Level {item.level}</Text>
                  <View style={{ flexDirection: "row", width: "84%", display: "flex", justifyContent: "flex-end" }}>
                    <Text style={{
                      color: colors.heading1,
                      fontFamily: "Poppins-Regular",
                      fontWeight: item?.level != props?.level ? "100" : "500",
                      fontSize: 16,
                      textAlign: "center",
                    paddingRight:15}}>{item.points}</Text>
                    <Image source={images.likeBtn} style={{ height: 20, width: 20 }} />
                  </View>
                </View>

              </View>
            }
          />
        </ScrollView>


      </View>

    </Modal>
  )
}
export default LevelUpModel;