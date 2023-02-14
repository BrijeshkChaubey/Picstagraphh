import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { colors } from "../../../../configs";

const IconComp = ({ name, size, color, style }) => (
  <Icon name={name} size={size || 30} color={color || colors.black} />
);

export default IconComp;