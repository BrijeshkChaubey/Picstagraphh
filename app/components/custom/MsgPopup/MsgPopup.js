import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { _Lang } from '..';
import { colors, globals, sty } from '../../../configs';


export default MsgPopup = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        visible={props.showModal}
        onRequestClose={() => {
        }}>
        <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <_Lang
                          text={props.msg}
                          pureText
                    style={[{ fontWeight: "bold", fontSize: 16 , padding:20}]}
                  />
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: colors.primaryColor , width:"90%"  , ...sty.padB10 , ...sty.mgB20}}
              onPress={() => {
                 props.popUpAction();
              }}>
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 5,
    // padding: 35,
      alignItems: 'center',
      justifyContent: 'center',
    borderWidth:1,
     width: globals.WINDOW_WIDTH -40
  },
  openButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 60,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
  },
});

