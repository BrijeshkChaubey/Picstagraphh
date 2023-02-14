import { View } from "react-native";
import {  useDispatch } from "react-redux";
import { globals, sty } from "../../../configs";
import { _SocialShare } from "../../custom";
import mainStyles from "../../../assets/styles/MainStyles";
import { setAppData } from "../../../redux/actions/AppDataActions";
import _Header from "../Header/_Header";
import React, { useEffect, useRef, useState } from 'react'

export default function _Layout(props) {
    const [isSocialShare, setIsSocialShare] = useState(false);
    let shareRef = useRef(null);
    const dispatch = useDispatch();

   const setShareRef = (ref) => (shareRef = ref);

   const  _socialShareHandler = (flag, item) => shareRef.toggleModal(flag, item);
   // const { isSocialShare } = this.state;
    const { innerLayout,customHeader } = props;

    let style = props.style || {};
    let activeStyle = !isSocialShare
      ? { left: 0 - globals.WINDOW_WIDTH }
      : { zIndex: 1000 };
    let innerLayoutStyle = innerLayout
      ? mainStyles.innerLayout
      : { ...sty.flex1 };


    useEffect(() => {
        const { renderSocialShare } = props;
        if (renderSocialShare) {
           dispatch(setAppData({
                prop: "socialShareHandler",
                value: _socialShareHandler,
            }));
        }
    }, []);
    return (
        <View style={[mainStyles.appLayout, style]}>
        {props.header ? (
          <_Header
            screen={props.screen}
            header={props.header}
            userSearchHeader={props.userSearchHeader || null}
            bottomHeader={props.bottomHeader}
            wrapStyle={props.headerWrapStyle}
            headerLeftSide={props.headerLeftSide}
          />
        ) : null}
        {props.customHeader ?
          <View
            style={[
              { zIndex: 1000, paddingTop: Platform.OS === "ios" ? 40 : 5,paddingBottom:10 }
            ]}>
            {/* {customHeader()} */}
           </View> 
           : null}
        {/* {props.tabs ? props.tabs() : null} */}

        <View style={innerLayoutStyle}>{props.children}</View>
        <_SocialShare setShareRef={setShareRef} />
      </View>
    )
}