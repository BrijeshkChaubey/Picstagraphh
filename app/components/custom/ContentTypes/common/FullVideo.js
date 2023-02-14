import React, {useEffect} from 'react';
import {_PostVideo} from '.';
import Orientation from 'react-native-orientation';

const FullVideo = props => {
  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);
  return <_PostVideo {...props.navigation.state.params} fullMode={true} />;
};

export default FullVideo;
