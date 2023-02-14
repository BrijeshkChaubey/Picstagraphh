import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { _Lang } from "../..";
import { getTabWidth } from "../../../../configs/libs/helpers";
import mainStyles from "../../../../assets/styles/MainStyles";
import { colors } from "../../../../configs";

const TabHeader = (props) => {
  const {
    routes,
    changeTab,
    index,
    contest,
    showIcon,
    styles,
    tabWidth,
    itemStyle,
    login,
  } = props;
  const contestFullStyle = contest
    ? { paddingVertical: 0, paddingBottom: 0 }
    : {};
  const SelectedColor = props?.color ? props?.color : colors.black;
  return (
    <View
      style={[
        {
          // backgroundColor: "#fdfdfd",
          height: 30,
          // shadowColor: "#000",
          // marginHorizontal: 10,
          // marginVertical: 5,
          marginBottom:2
          // borderRadius: 20,
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.15,
          // elevation: 5,
        },
        styles,
      ]}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <FlatList
        data={routes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          // const color = index == item.index ? colors.primaryColor : colors.black
          const color =
            index === item.index ? SelectedColor : 'transparent';
          const textColor = index === item.index ? SelectedColor : "grey";

          const styleBold =
            index === item.index
              ? { fontWeight: "bold" }
              : { fontWeight: "bold", color: "grey" };

          return (
            <TouchableOpacity
              key={item.index}
              onPress={() => changeTab(item.index)}>
              <View
                style={[
                  mainStyles.tabWrap,
                  contestFullStyle,
                  index === item.index
                    ? {
                        borderBottomWidth: 2,
                        // backgroundColor: color,
                         borderBottomColor:color,
                        // borderRadius: 30,
                        height: 30,
                      }
                    : {},
                  itemStyle,
                ]}>
                <View
                  style={[
                    mainStyles.tabItem,
                    {
                      width: !tabWidth ? getTabWidth(routes.length) : tabWidth,
                      marginTop: 0,
                    },
                  ]}>
                  {showIcon ? (
                    <View style={{}}>
                      <Image
                        source={item.icon}
                        style={{ height: 20, width: 20 }}
                      />
                    </View>
                  ) : (
                    <_Lang
                      style={[
                        { color: textColor, fontSize: login ? 16 : 14 },
                        styleBold,
                      ]}
                      text={item.text}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TabHeader;
