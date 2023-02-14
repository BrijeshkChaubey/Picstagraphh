import { StyleSheet } from 'react-native';
import { colors, fonts, sty } from '../../../../../../configs';

export const styles = StyleSheet.create({
  saveBtn: {
    width: 100,
    borderWidth: 0.5,
    borderColor: colors.lightDark,
    ...sty.appBorder,
    backgroundColor: colors.appBg,
  },
  saveBtnTxt: {
    ...sty.tCenter,
    ...sty.padV10,
    color: colors.gray,
  },
  limitationsWrap: {},
  limitationsItem: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padV5,
  },
  limitationsItem_1: {
    ...sty.jCenter,
  },
  limitationsItem_1_Txt: {
    color: colors.gray,
    fontSize: fonts.small,
  },
  limitationsItem_2: {
    ...sty.aEnd,
  },
  actionsWrap: {},
  actionsItem: {
    ...sty.fRow,
    ...sty.jSpace,
    ...sty.padV10,
  },
  actionsItem_1: {
    color: colors.gray,
    fontSize: fonts.small,
  },
  actionsItem_1_Txt: {
    color: colors.gray,
    fontSize: fonts.small,
  },
  actionsItem_2: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primaryColor,
  },
  actionsItem_2_Txt: {
    ...sty.aEnd,
    color: colors.primaryColor,
    fontSize: fonts.small,
  },
  newsFeedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
