import React, { Component, useEffect, useState } from "react";
import { View, StatusBar,Text } from "react-native";

import { sty } from "../../../../../../configs";
import {
  _GradiantView,
  _ListBox,
  _Spacer,
  _Icon,
  _Button,
  _ListView,
  _ContentType,
  _Lang,
} from "../../../../../custom";
import { mainLayoutHoc } from "../../../../../hoc";
import mainStyles from "../../../../../../assets/styles/MainStyles";

import { setNavigation } from "../../../../../../redux/actions/NavAction";
//ContentBox actions
import {
  setAppData,
  pushAppData,
} from "../../../../../../redux/actions/AppDataActions";
import {
  pushProfileDataProp,
  setProfileDataProp,
} from "../../../../../../redux/actions/ProfileAction";
import { setPagination } from "../../../../../../redux/actions/PaginationActions";

function Information(props){
    const [campaignInfo,setCampaignInfo] = useState(props.campaignInfo);
   console.log('Information CampaignInfo',campaignInfo);
   const uploadPost = () => {
        props.navigation.navigate("Albums", { campaignInfo, hideTabs: true });
      };

    // let { campaignInfo } = this.state;
    // useEffect(()=>{
    const  campaignInf = Object.assign(campaignInfo, {
        uploadPost: () => {
          uploadPost();
        },
      });
    //   setCampaignInfo(campaignInf);
    // },[props.campaignInfo])
   
    return(
        <View style={[mainStyles.rootView]}>
        {props.header ? props.header : null}
       
        <_ContentType
          contentInfo={campaignInf}
          fullView={true}
          {...props}
        />
      </View>
    )
}
export default mainLayoutHoc({})(Information);
