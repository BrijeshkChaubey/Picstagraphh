import React, {useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {images} from '../../../../../configs';
import {_InlineLoader, _EmptyPostList} from '../../../../custom';
import FastImage from 'react-native-fast-image';
//ContentBox actions
import {styles} from './styles';

const ExploreItem = props => {
  const [state, setstate] = useState({
    loading: props.loading,
    listLoading: false,
    refreshing: false,
    refreshStories: false,
    activeTab: 0,
    foryouData: props?.data,
    foryouPagination: props?.foryouPagination,
  });
  let listLoading = false;
  let listEnded = false;
  let scrollListRef = useRef(null);
  let exploreRef = useRef([]);

 const item = props.item;
  const url = !item.thumbnailMediaUrl
    ? item.gridMediaUrl
      ? item.gridMediaUrl
      : item.resizeMediaUrl
    : item.thumbnailMediaUrl;
  // const cornerImage =
  //   item.postType === "participant"
  //     ? item.miniProfileUrl
  //       ? { uri: item.miniProfileUrl }
  //       : images.gridStages
  //     : item.postType === "blog"
  //     ? images.gridBlog
  //     : item.postType === "media" && item.typeContent === "video"
  //     ? images.gridVideo
  //     : null;
  const cornerImage = item.typeContent == 'video' ? images.newVideo : null;
  return (
    <View
      // key={"ExploreList_" }
      ref={ref => (exploreRef[item._id] = ref)}
      renderToHardwareTextureAndroid={state.renderTexture}
      style={[styles.explorListItem]}>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}>
        <FastImage
          source={{uri: url}}
          resizeMode={'cover'}
          style={styles.explorImageItem}
        />
        <View style={styles.explorIndicator}>
          <FastImage
            source={cornerImage}
            style={styles.indicator}
            resizeMode={'cover'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ExploreItem;
