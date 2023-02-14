import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from "react-native-linear-gradient";
import { sty } from "../../../configs/utils/styles";
import * as colors from "../../../configs/utils/colors";

export const _GradiantView=(props)=> {
    const colorArr = {
        blue: [colors.primaryColor, colors.secondaryColor, colors.primaryColor],
        appColor: [colors.primaryColor, colors.secondaryColor],
        green: ["#00d565", "#00c461", "#00a454"],
        gray: ["#f5f5f5", "#f2f2f2", "#ddd"],
        red: ["#f95e5e", "#fb5656", "#FF5050"],
        white: ["#fff", "#fff", "#fff"],
        fullGray: ["gray", "gray"],
        lightDark: ["#9b9b9b", "#9b9b9b"],
        redOrange: ["#FD0A50", "#FFDC0A"],
    };

    const gradiant = props.color ? colorArr[props.color] : colorArr["blue"];
    const roundStyle = props.isRound
        ? { ...sty.appBorder, overflow: "hidden" }
        : {};
    const gradiantAxis = props.gradiantVertical ? { x: 0, y: 1 } : { x: 1, y: 0 };
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={gradiantAxis}
            colors={props?.bgColor ? [props?.bgColor, props?.bgColor] : gradiant}
            style={[{ width: "100%" }, roundStyle, props.style]}
        >
            {props.children}
        </LinearGradient>
    )
}