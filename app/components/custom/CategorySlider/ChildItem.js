import FastImage from "react-native-fast-image";
import { WINDOW_WIDTH } from "../../../configs/libs/globals";
import { StyleSheet,TouchableOpacity,View ,Text} from "react-native";
import React from "react";
export default ChildItem = ({
item,
style,
onPress,
index,
imageKey,
local,
height,
}) => {
return (
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.container}
    onPress={() => onPress(item)}>
    <FastImage
      style={[styles.image, style]}
      source={{ uri: item.imageUrl }}
    />
    <View
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        height: "100%",
        borderRadius:5
      }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: WINDOW_WIDTH / 18,
          textAlign: "center",
          paddingRight:30,  
          color: "white",
        }}>
        {item.name}
      </Text>
    </View>
  </TouchableOpacity>
);
};

const styles = StyleSheet.create({
container: {},
image: {
  aspectRatio: 16 / 7,
  resizeMode: "stretch",
  borderRadius: 5,
  width: "100%",
},
});