import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { sty } from "../../../configs";
import { styles } from "./styles";
import  {_GradiantView}  from "../GradiantView/_GradiantView";

export default function _Button(props) {
    const [style, setStyle] = useState(props.style ||{});
    const [isround, setIsround] = useState(props.isRound || false);
    const [btnTxtStyle, setBtnTxtStyle] = useState(props.btnTxtStyle || {});
    const [smallBtn, setSmallBtn] = useState(props.smallBtn?styles.smallBtn :{});

    //   static getDerivedStateFromProps(nextProps, state) {
    //         if (
    //             nextProps.style !== state.style ||
    //             nextProps.btnTxtStyle !== state.btnTxtStyle
    //         ) {
    //             return {
    //                 style: nextProps.style,
    //                 btnTxtStyle: nextProps.btnTxtStyle,
    //             };
    //         }
    //         return null;
    //     }

    const roundStyle = isround
        ? { ...sty.appBorder25, overflow: "hidden" }
        : {};
    const fontWeight = props.fontWeight || "100";
    return (
        <View>
            {props.gradiant ? (
                <_GradiantView
                    color={props.color}
                    style={[styles.btnWrap, roundStyle, style]}>
                    <TouchableOpacity
                        style={{ ...sty.w100 }}
                        onPress={() => {
                            props.callback(props.index);
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.btnTxt,
                                smallBtn,
                                { color: "#fff" },
                                btnTxtStyle,
                            ]}>
                            {props.text}
                        </Text>
                    </TouchableOpacity>
                </_GradiantView>
            ) : (
                <View style={[styles.btnWrap, roundStyle, style]}>
                    <TouchableOpacity
                        style={{ ...sty.w100 }}
                        onPress={() => {
                            props.callback(props.index);
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.btnTxt,
                                smallBtn,
                                { fontWeight: fontWeight },
                                btnTxtStyle,
                            ]}>
                            {props.text}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}