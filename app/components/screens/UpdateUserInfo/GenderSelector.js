import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { _Lang } from "../../custom";
import { colors, globals } from "../../../configs";
import mainStyles from "../../../assets/styles/MainStyles";
import { WINDOW_HEIGHT } from "../../../configs/libs/globals";

const GenderSelector = ({ activeGender, changeGender,hideText }) => {
  const { GENDER_ENUM } = globals;

  return (
    <>
      {hideText ?
        <_Lang style={[{ width: '100%', marginBottom: 20, marginTop: 20 }, mainStyles.textBold18]} text={"profile.gender"} />
      : <View style={styles.container}>
        <_Lang style={mainStyles.textBold22} text={"login.ask_gender"} />
        <_Lang style={mainStyles.textLightLH24} text={"login.gender_desc"} />
      </View>}
      <View style={{justifyContent: "space-between", flexDirection: "row"}}>
        {GENDER_ENUM.map((item, index) => {
          const isActive = item === activeGender;
          return (
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: isActive
                    ? colors.primaryColor
                    : colors.white,
                },
              ]}
              onPress={() => {
                changeGender(GENDER_ENUM[index]);
              }}>
              <_Lang
                style={[
                  mainStyles.text16W500,
                  {
                    color: isActive ? colors.white : colors.black,
                  },
                ]}
                text={`login.gender_${item}`}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default GenderSelector;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  headText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 5,
  },
  descText: { fontSize: 14, color: colors.black, marginBottom: 20 },
  btn: {
    width: globals.WINDOW_WIDTH / 4,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.25,
    elevation: 2,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
