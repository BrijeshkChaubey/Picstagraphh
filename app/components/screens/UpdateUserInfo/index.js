import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { _Button } from "../../custom";
import { colors, sty, helpers, globals, fonts, API } from "../../../configs";
import { NavigationActions, StackActions } from "react-navigation";
import DateOfBirth from "./DateOfBirth";
import GenderSelector from "./GenderSelector";
import moment from "moment";
import mainStyles from "../../../assets/styles/MainStyles";
import { WINDOW_HEIGHT } from "../../../configs/libs/globals";

const UpdateUserInfo = ({ navigation, userDetail, loader }) => {
  console.log(userDetail);
  const { localize } = useSelector((state) => state);
  const { GENDER_ENUM } = globals;
  const [activeGender, changeGender] = useState(GENDER_ENUM[0]);

  const [dobData, changeDobData] = useState(
    new Date(Date.parse(moment().subtract(18, "years"))),
  );

  const moveToNext = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "TabNav" })],
    });
    navigation.dispatch(resetAction);
  };

  const saveUserData = () => {
    // console.log(userDetail);
    // return;
    let cb = Object.assign({}, helpers._standardCb(loader), {
      success: async (res) => {
        moveToNext();
      },
      error: (err) => {
        moveToNext();
        loader.error(
          "Error",
          !err.success && err.message ? err.message : "Error in profile update",
        );
      },
    });

    let header = helpers.buildHeader({
      authorization: userDetail.token,
    });
    const data = {};

    if (
      moment(dobData).format("DD-MM-YYYY") !==
      moment().subtract(18, "years").format("DD-MM-YYYY")
    ) {
      data.gender = activeGender;
      data.birthDate = dobData;
      data.isProfilePicSkip = true;
      // loader.load();
      API.userInfoUpdate(data, cb, header);
    } else {
      loader.error(
        helpers.getLocale(localize, "loadingModal", "error"),
        helpers.getLocale(localize, "errorModal", "enter_dob"),
      );
    }
  };

  return (
    <View style={mainStyles.flex1}>
      <DateOfBirth dobData={dobData} changeDobData={changeDobData} />
      <View style={{ flex: 1, alignItems: "center", marginTop: WINDOW_HEIGHT / 4 }}>
        <GenderSelector
          activeGender={activeGender}
          changeGender={(val) => changeGender(val)}
        />
      </View>
      <_Button
        text={helpers.getLocale(localize, "login", "skip")}
        callback={() => saveUserData()}
        gradiant={true}
        style={styles.registerBtn}
        btnTxtStyle={[styles.registerBtnTxt, { fontSize: fonts.medium }]}
      />
    </View>
  );
};

export default UpdateUserInfo;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 30,
    alignSelf: "center",
    alignItems: "center",
  },
  registerBtn: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    width: globals.WINDOW_WIDTH - 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  registerBtnTxt: {
    fontWeight: "bold",
    color: colors.white,
    fontSize: fonts.medium,
    ...sty.padV5,
  },
});
