import React, { useRef } from 'react';
import {View,StyleSheet} from 'react-native';
import {globals} from '../../../../../configs';
import {
  _ErrorModal,
  _GradiantView,
  _Lang,
  _ListBox,
  _Loading,
  _Spacer,
  _Icon,
  _Button,
  _Layout,
  _ListView,
  _ContentType,
  _InlineLoader,
  _EmptyPostList,
} from '../../../../custom/index';
//ContentBox actions

const ExploreListItem = props => {
  console.log('ExploreListItem props==>',props);
  let exploreRef = useRef([]);
  const item = props.item;
  const index = props.index;
  console.log(' explore list item', item)
  return (
    <View
      key={'ExploreList_' + index.toString()}
      ref={ref => (exploreRef[item._id] = ref)}
      style={{width: globals.WINDOW_WIDTH}}>
      <_ContentType
        itemKey={'Explore_List_Item' + index.toString()}
        contentInfo={item}
        index={index}
        {...props}
      />
    </View>
  );
};

export default ExploreListItem;

const styles = StyleSheet.create({});
