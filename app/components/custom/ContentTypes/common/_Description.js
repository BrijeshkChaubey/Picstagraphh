import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import { helpers } from '../../../../configs';
import mainStyles from '../../../../assets/styles/MainStyles';
import { Item } from 'native-base';

export const _DescriptionLink = ({ text, onUserNamePress, onHashPress }) => {

  const arr = text.split(" ").map((item, index) => {
    const last = index == text.length - 1;
    const txt = " ";
    const space = "  "
    if (item.charAt(0) === "#") {
      return (
        <>
          {/* <View style={{
            color: "#000",
            backgroundColor: "#D3D3D3",
            paddingHorizontal: 10,
            borderRadius: 5,
          }}> */}
            <Text
              allowFontScaling={false}
              style={{
                color: "#337ab7",
               // backgroundColor: "#D3D3D3",
                lineHeight: 18,
                fontSize: 12,
                borderRadius: 5,
              }}
              key={index}
              accessibilityRole={"button"}
            // onPress={() => {
            //     // helpers.hashtagExploreNavigate(item)
            //     onHashPress(item)
            // }}
            >
              { item + txt}
            </Text>
          {/* </View> */}
          {/* <Text style={{ backgroundColor: "transparent" }}>{space}</Text> */}
        </>
      );
    } else if (item.charAt(0) === "@") {
      return (
       
          <Text
            allowFontScaling={false}
            style={{ color: "#337ab7", lineHeight: 18, fontSize: 12 }}
            key={index}
            onPress={() => {
              onUserNamePress(item);
            }}
            accessibilityRole={"button"}>
            {item}
            
          </Text>
        
      );
    } else {
      return (
        <Text
          allowFontScaling={false}
          key={index}
          style={[mainStyles.appTxt, { lineHeight: 18, fontSize: 12 }]}>
          {item + txt}
        </Text>
      );
    }

  })
    return arr
}