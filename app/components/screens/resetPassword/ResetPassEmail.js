import React from "react";
import {View, TouchableOpacity} from 'react-native'
import { helpers,colors,fonts,sty, } from "../../../configs";
import { _Lang,_Icon,_Button } from "../../custom";
import { mainLayoutHoc } from "../../hoc";
import mainStyles from "../../../assets/styles/MainStyles";
import {styles} from './styles';
import { setNavigation } from "../../../redux/actions/NavAction";

import { useDispatch,useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const ResetPassEmail = props =>{
  const localize = useSelector(state => state.localize);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log('props from resetPassEmail', props)

  const _send = () => {
    let validator = helpers._validateData(data);
    if (validator.status == false) {
        props.errorModal.show(validator.data)
    }
}
//TODO: navprops and setNavigation to need attention again
useEffect(() => {
    // _send();
},[])

  return (
    <View style={mainStyles.rootView}>
        <View style={styles.forgotPassHead}>
            <_Lang style={styles.headingTxt} text={'forgotPass.check_your_email_account'} />
            <_Lang style={styles.headingSubTxt} text={"forgotPass.we_will_send_you_an_email_to_resetting_your_password"} />
            <_Lang style={[styles.headingTxt, { ...sty.mgT30 }]} text={"forgotPass.didnt_receive_an_email"} />
            <View style={{ ...sty.fRow, ...sty.padH5 }}>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <_Lang style={{ fontSize: fonts.small, color: colors.text, ...sty.padH10 }} text={"forgotPass.click_here_to_request_another_mail"} />
                </TouchableOpacity>
                <_Icon icon={'check'} color={colors.primaryColor} size={fonts.large} />
            </View>
        </View>
        <View>
            <_Button
                text={helpers.getLocale(localize, 'forgotPass', 'go_back')}
                callback={() => { navigation.pop() }}
                style={{ ...sty.mgV30 }}
                fontWeight={'500'}
            />
        </View>
    </View>
)


}

export default mainLayoutHoc({})(ResetPassEmail)
// export default ResetPassEmail
