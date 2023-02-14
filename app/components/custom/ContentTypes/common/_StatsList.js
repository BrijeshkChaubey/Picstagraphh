import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

const _StatsList = (props) => {
  const [stats, setstats] = useState(props.stats);

  const _keyExtractor = (item, index) => 'StatList_' + index.toString();

  const _renderStatsList = ({item, index}) => {
    return (
      <View style={styles.statsView}>
        <Text style={styles.statsTitle}>{item.title}</Text>
        <Text style={styles.statsCount}>{item.count}</Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={stats}
        renderItem={_renderStatsList}
        keyExtractor={_keyExtractor}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default _StatsList;
