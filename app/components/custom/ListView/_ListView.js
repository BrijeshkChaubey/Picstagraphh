import React ,{useState}from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { _Lang } from "../../custom";
import { sty } from "../../../configs";
import { styles } from "./styles";
import mainStyles from "../../../assets/styles/MainStyles";
import IconComp from "../ContentTypes/common/IconComponent";



const _ListView = (props) => {
    const [state, setstate]=useState({
        data: props.data,
        settings:props.settings
      })

    const  _keyExtractor = (item, index) => "list_" + index.toString();

     const  _renderList = ({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.cb(item);
            }}>
            <View style={state.settings?styles.settingsListItem:styles.listItem}>
              {item.image ? (
                <View style={styles.imgWrap}>
                  <Image
                    source={item.image}
                    style={styles.imgDimen}
                    resizeMode={"contain"}
                  />
                </View>
              ) : null}
              <View style={{ ...sty.flex1}}>
                {props.localize ? (
                  <_Lang
                    style={[mainStyles.headTxt, styles.itemTxt]}
                    text={item.text}
                  />
                ) : (
                  <Text style={[mainStyles.headTxt, styles.itemTxt]}>
                    {item.text}
                  </Text>
                  )}
              </View>
             {state.settings?<IconComp name='right' size={24}/>:null} 
            </View>
            {item.section?<View style={styles.sectionLine}/>:null}
          </TouchableOpacity>
        );
      };
  return (
    <FlatList
          data={state.data}
          extraData={state}
          renderItem={_renderList}
          keyExtractor={_keyExtractor}
          style={styles.flatListStyle}
        />
  )
}

export default _ListView