import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import moment from "moment";
import { _Lang } from "../../custom";
import DatePicker from 'react-native-date-picker'
import { colors, globals } from "../../../configs";
import mainStyles from "../../../assets/styles/MainStyles";
import IconComp from "../../custom/ContentTypes/common/IconComponent.js";
//import IconComp from "../../custom/ContentTypes/common/IconComonent";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function DateOfBirth({ dobData, changeDobData,hideText=false }) {
  const { DOB_ENUM } = globals;
  console.log("Date Of Birth",dobData)
  const [show, toggleShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   changeDobData(date);
  //   hideDatePicker();
  // };
  const handleConfirmDate = (date) => {
    setOpen(false)
    console.warn("A date has been picked: ", date);
    changeDobData(date);

  };
  return (
    <View style={mainStyles.flexCenter}>
    {hideText ?
      <_Lang style={[{ width: '100%', marginBottom: 20, marginTop: 20 }, mainStyles.textBold18]} text={"profile.date_of_birth"} />
  :<View style={styles.container}>
        <_Lang style={mainStyles.textBold22} text={"login.dob"} />
      <_Lang style={mainStyles.textLightLH24} text={"login.dob_desc"} />
    </View>}
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      {DOB_ENUM.map((item, index) => {
        const val =
          moment(dobData).format("DD-MM-YYYY") !==
          moment().format("DD-MM-YYYY")
            ? moment(dobData).format(item).toString()
            : null;

        return (
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View style={styles.viewWrap}>
              <Text style={mainStyles.textBold18}>{val}</Text>
              <View style={styles.iconWrap}>
                <IconComp name="caretup" size={10} />
                <IconComp name="caretdown" size={10} />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
    {/* <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
     date={new Date(dobData)}
     maximumDate={new Date(Date.parse(moment().subtract(18, "years")))}
    /> */}
    <DatePicker
      modal
      mode={"date"}
      open={open}
      date={new Date(dobData)}
      maximumDate={new Date(Date.parse(moment().subtract(18, "years")))}
      onConfirm={handleConfirmDate}
      onCancel={() => {
        setOpen(false)
      }}
    />
    {/* {show ? (
      <RNDateTimePicker
        testID="datePicker"
        value={dobData}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        onChange={(date, event) => {
          // console.log("Date", event);
          Platform.OS === "android" ? toggleShow(false) : null;
          event !== undefined ? changeDobData(event) : null;
        }}
        maximumDate={new Date(Date.parse(moment().subtract(18, "years")))}
      />
    ) : null} */}
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    marginVertical: 20,
  },
  headText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 5,
  },
  descText: { fontSize: 14, color: colors.black, marginBottom: 20 },
  viewWrap: {
    width: globals.WINDOW_WIDTH / 4,
    backgroundColor: colors.white,
    height: 36,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.25,
    elevation: 2,
    marginHorizontal: 10,
  },
  iconWrap: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});