import { _B } from "../../custom";
import { useSelector } from "react-redux";
import React, { Component, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { _GradiantText } from "../GradiantText/_GradiantText";

const _TouchItem = (props) => {
    if (!props.onPress) return props.children;
    return (
        <TouchableOpacity
            onPress={() => props.onPress()}
            style={props.wrapStyle || {}}>
            {props.children}
        </TouchableOpacity>
    );
};

const _Localize = (props) => {
    const [style, setStyle] = useState(props.style || {});
    _renderItem = () => {
        const { text, isBold, pureText, isGradiant } = props;
        const localize = useSelector((state) => state.localize);

        let lang = localize.translations[localize.activeLanguage];

        let foundTxt = true;
        if (!pureText) {
            var txtArr = text.split(".");
            if (txtArr.length === 1) foundTxt = false;
            else if (!lang[txtArr[0]][txtArr[1]]) foundTxt = false;
        }

        if (!foundTxt) {
            return (
                <Text allowFontScaling={false} style={style} {...props}>
                    {"Not found"}
                </Text>
            );
        } else {
            let diplayTxt = pureText ? text : lang[txtArr[0]][txtArr[1]];
            if (isGradiant) {
                return (
                    <_GradiantText style={style} {...props}>
                        {diplayTxt}
                    </_GradiantText>
                );
            }
            if (isBold) {
                return (
                    <_B style={style} {...props}>
                        {diplayTxt}
                    </_B>
                );
            } else {
                return (
                    <Text allowFontScaling={false} style={style} >
                        {diplayTxt}
                    </Text>
                );
            }
        }
    };

    return (
        <_TouchItem {...props}>{_renderItem()}</_TouchItem>
    )
}

export default _Localize

// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
// export default connect(mapDispatchToProps)(_Localize);