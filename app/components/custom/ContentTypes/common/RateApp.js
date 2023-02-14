import React, { useState, useEffect } from "react";
import { View, Button, Modal, Platform, StyleSheet, Alert } from "react-native";
import Rate, { AndroidMarket } from "react-native-rate";
import { useSelector } from "react-redux";
import { ActionSheet } from "native-base";
import { globals, colors } from "../../../../configs";
import { REVIEW_ENUM } from "../../../../configs/libs/globals";

const RateApp = (updateInfo) => {
  // const textKey = REVIEW_ENUM;

  // let lang = localize.translations[localize.activeLanguage];

  // const menuOptions = textKey.map((txt) => lang["review"][txt]);

  const rateOptions = {
    AppleAppID: "Y8A7RCRB4T",
    GooglePackageName: "com.picstagraph",
    preferInApp: Platform.OS==='android'?false: true,
    openAppStoreIfInAppFails: true,
    
  };

  // const rateOptions =
  //   Platform.OS === "ios"
  //     ? {
  //         AppleAppID: "Y8A7RCRB4T",
  //         preferInApp: true,
  //         openAppStoreIfInAppFails: false,
  //       }
  //     : {
  //         GooglePackageName: "com.picstagraph",
  //         preferInApp: true,
  //         preferredAndroidMarket: AndroidMarket.Google,
  //       };

  Rate.rate(rateOptions, (success) => {
    if (success && Platform.OS === "ios") {
      updateInfo({ status: REVIEW_ENUM[0] });
    } else if (Platform.OS === "ios") {
      updateInfo({ status: REVIEW_ENUM[1] });
    }
  });

  // const reviewPop = () => {
  //   Rate.rate(rateOptions, (success) => {
  //     if (success) {
  //       updateInfo({ status: REVIEW_ENUM[0] });
  //     } else if (Platform.OS === "ios") {
  //       updateInfo({ status: REVIEW_ENUM[1] });
  //     }
  //   });
  // };

  // if (Platform.OS === "ios") {
  //   reviewPop();
  // } else {
  //   ActionSheet.show(
  //     {
  //       options: menuOptions,
  //       title: lang.review.title,
  //       cancelButtonIndex: menuOptions.length - 2,
  //       containerStyle: {
  //         padding: 20,
  //         justifyContent: "flex-end",
  //         flex: 1,
  //       },
  //       titleStyle: { margin: 10 },
  //       innerStyle: {
  //         backgroundColor: colors.light,
  //         minHeight: globals.WINDOW_HEIGHT / 4,
  //         maxHeight: (globals.WINDOW_HEIGHT / 4) * 3,
  //         padding: 5,
  //         elevation: 1,
  //         borderRadius: 5,
  //       },
  //       itemStyle: {
  //         flex: 1,
  //         justifyContent: "center",
  //         borderRadius: 5,
  //         backgroundColor: "white",
  //         borderWidth: 1,
  //         borderBottomWidth: 1,
  //       },
  //       listStyle: { marginLeft: -18 },
  //       seperatorStyle: { height: 4 },
  //     },
  //     (buttonIndex) => {
  //       // console.log("buttonIndex :", buttonIndex);

  //       if (buttonIndex === 0) {
  //         Rate.rate(rateOptions, (success) => {
  //           if (success) {
  //             updateInfo({ status: REVIEW_ENUM[0] });
  //           }
  //         });
  //       } else {
  //         updateInfo({ status: REVIEW_ENUM[buttonIndex] });
  //       }
  //     }
  //   );
  // }

  // return Platform.OS === "ios" ? null : (
  //   <View style={styles.centeredView}>
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         Alert.alert("Modal has been closed.");
  //       }}
  //     >
  //       <Text>Hey</Text>
  //     </Modal>
  //   </View>
  // );
};

export default RateApp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
