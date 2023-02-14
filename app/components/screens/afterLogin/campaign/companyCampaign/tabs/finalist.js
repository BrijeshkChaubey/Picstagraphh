import React, { Component, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { colors, fonts, sty } from "../../../../../../configs";
import {
  _GradiantView,
  _ListBox,
  _Spacer,
  _Icon,
  _Button,
  _ListView,
  _ContentType,
  _InlineLoader,
  _EmptyPostList,
} from "../../../../../custom";
import { mainLayoutHoc } from "../../../../../hoc";
import mainStyles from "../../../../../../assets/styles/MainStyles";
import moment from "moment";

import {
  setParticipantTop10,
  pushParticipantTop10,
} from "../../../../../../redux/actions/ParticipantTop10";

//ContentBox actions
import { setAppData } from "../../../../../../redux/actions/AppDataActions";
import {
  pushProfileDataProp,
  setProfileDataProp,
} from "../../../../../../redux/actions/ProfileAction";
import { setPagination } from "../../../../../../redux/actions/PaginationActions";
import { setCompanyRefreshIndicator } from "../../../../../../redux/actions/CompanyParticipantAction";

function Finalist(props){
const [listLoading,setListLoading] = useState(false);
const [refreshing,setRefreshing] = useState(false);
const [activeTab,setActiveTab] = useState(0);

const listEnded = false;
const participantPostref = {};

useEffect(()=>{
    if (nextProps.activeTab !== state.activeTab) 
          setActiveTab(nextProps.activeTab)
},[props]);

return(
    <View><Text>Finalist</Text></View>
)
}
export default Finalist;