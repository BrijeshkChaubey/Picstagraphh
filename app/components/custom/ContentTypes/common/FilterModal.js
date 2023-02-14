import React from "react";
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  FILTERS_TO_SHOW,
  FILTER_ROUTES,
} from "../../../../configs/libs/globals";
import { gray, white } from "../../../../configs/utils/colors";
import { useSelector } from "react-redux";
import { _Lang } from "../..";
import { colors, globals } from "../../../../configs";
import { intersectionBy } from "lodash";

const FilterModal = (props) => {
  const { filterWrapperReducer ,home} = useSelector((state) => state);

  const changedFilter = FILTERS_TO_SHOW[props.filterFor].map((fil) => {
    return { key: fil };
  });

  const dataArr = intersectionBy(FILTER_ROUTES, changedFilter, "key");

  const updatedData = dataArr.map((dt) => {
    return Object.assign({}, dt, {
      selected: filterWrapperReducer[props.filterFor][dt.key].length > 0,
    });
  });
  if (props.changeTabs) {
    var element = updatedData[1];
    updatedData.splice(1, 1);
    updatedData.splice(0, 0, element);
  } 
  return (
    <View style={{ alignItems: 'center' }}>
      {home.refreshStatus == true? null :
        <FlatList
          ref={(ref) => {
            //   this.scrollListRef = ref;
          }}
          style={{ paddingVertical: 10 }}
          data={updatedData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  item.selected
                    ? props.unselectDB(item.key)
                    :
                    props.openModal(item.key)
                }>
                <View
                  style={[
                    styles.itemStyle,
                    {
                      width:
                        updatedData?.length > 2
                          ? globals.WINDOW_WIDTH / 3 - 20
                          : globals.WINDOW_WIDTH / 2 - 50,
                    },
                    item.selected
                      ? {
                        backgroundColor: colors.primaryColor,
                        borderColor: colors.primaryColor,
                      }
                      : {},
                  ]}>
                  <_Lang
                    style={[
                      styles.textStyle,
                      { color: item.selected ? white : gray },
                    ]}
                    text={`filters.${item.key}`}
                  />
                </View>
                {/* )} */}
              </TouchableOpacity>
            );
          }}
          //   keyExtractor={_keyExtractor()}
          horizontal={true}
          removeClippedSubviews={Platform.OS === "android" ? true : false}
          showsHorizontalScrollIndicator={false}
        />}
      </View>
  );
};

export default FilterModal;

export const styles = StyleSheet.create({
  itemStyle: {
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    elevation: 2,
    marginVertical: 3,
    paddingHorizontal: 7.5,
    paddingVertical: 2.5,
    marginHorizontal: 5,
  },
  textStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontWeight: "500",
    textAlign:'center'
  },
});
