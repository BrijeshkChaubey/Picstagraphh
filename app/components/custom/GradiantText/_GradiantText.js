import React from "react";
import { MaskedViewIOS, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as colors from "../../../configs/utils/colors";
import { sty } from "../../../configs/utils/styles";
import MaskedView from "@react-native-masked-view/masked-view";

export const _GradiantText = (props) => {
  const colorArr = {
    blue: [colors.primaryColor, colors.secondaryColor],
    appColor: [colors.primaryColor, colors.secondaryColor],
    green: ["#00d565", "#00c461", "#00a454"],
    gray: ["#f5f5f5", "#f2f2f2", "#ddd"],
    red: ["#f95e5e", "#fb5656", "#FF5050"],
    white: ["#fff", "#fff", "#fff"],
  };

  const gradiant = props.color ? colorArr[props.color] : colorArr["blue"];
  const roundStyle = props.isRound
    ? { ...sty.appBorder, overflow: "hidden" }
    : {};

  // return (
  //     <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={gradiant} style={{}}>
  //         This is a gradiant Text
  //     </LinearGradient>
  // )
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={gradiant}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};
