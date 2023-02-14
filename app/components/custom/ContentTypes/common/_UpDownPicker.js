import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {sty} from '../../../../configs';
import {_Lang} from '../..';
import IconComp from './IconComponent';

const UpDownPicker = props => {
  const [state, setstate] = useState({
    array: props.array,
    label: props.label,
    index: 0,
  });
  props.selectedIndex(0);

  return (
    <View style={{marginTop: 10, flex: 1}}>
      <_Lang style={{...sty.inputLabel}} text={label} />
      <View
        style={{
          ...sty.mgB10,
          ...sty.inputWrapNew,
          ...sty.fRow,
          justifyContent: 'space-between',
          height: 50,
          alignItems: 'center',
          padding: 8,
          paddingLeft: 20,
        }}>
        <Text style={{...sty.inputSm, fontFamily: 'Poppins-Regular'}}>
          {array[index]}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => {
              if (state.index + 1 < state.array.length) {
                setstate({...state, index: index + 1});
                props.selectedIndex(state.index + 1);
              }
            }}>
            <IconComp name="caretup" size={12} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.index > 0) {
                setstate({...state, index: index - 1});
                props.selectedIndex(state.index - 1);
              }
            }}>
            <IconComp name="caretdown" size={12} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpDownPicker;
