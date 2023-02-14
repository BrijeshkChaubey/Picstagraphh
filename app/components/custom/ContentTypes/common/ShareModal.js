import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Modal } from "react-native-modal";
import { globals, colors, images } from "../../../../configs";
import styles from "./styles";
import { _Icon, _Lang } from "../..";
import FastImage from "react-native-fast-image";

const ShareModal = ({ list, shareCb, closeSheet }) => {
  return (
    <View style={styles.modalWrap}>
      {/* <View style={{ flex: 1 }}> */}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={list}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => shareCb(index)}>
              <FastImage
                source={images[item.image]}
                style={{
                  height: globals.WINDOW_HEIGHT / 15,
                  width: globals.WINDOW_HEIGHT / 15,
                }}
              />
              <Text style={compStyle.labelStyle}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={() => <View style={{ width: 20 }} />}
        ListFooterComponent={() => <View style={{ width: 20 }} />}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />
      {/* </View> */}

      <TouchableOpacity style={compStyle.viewWrap} onPress={() => closeSheet()}>
        <_Lang
          text={`moreOption.cancel`}
          style={[compStyle.textStyle, globals.iPhoneX ? { bottom: 40 } : {}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ShareModal;

const compStyle = StyleSheet.create({
  viewWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  textStyle: {
    color: colors.white,
    textAlign: "center",
    position: "absolute",
    bottom: 30,
  },
  labelStyle: {
    color: colors.white,
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
});