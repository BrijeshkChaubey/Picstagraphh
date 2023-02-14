import React from "react";
import { Text } from "react-native";

export default (TextComponent = (props) => {
  return (
    <Text allowFontScaling={false} style={props.style || {}}>
      {props.children}
    </Text>
  );
});
