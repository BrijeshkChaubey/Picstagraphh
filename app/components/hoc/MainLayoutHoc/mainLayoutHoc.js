
import mainStyles from '../../../assets/styles/MainStyles';
import { styles } from './styles'
import React,
{
  Component,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
  Alert,
  StatusBar
} from 'react-native';
import {
  globals,
  helpers,
  validators,
  colors,
  fonts,
  images,
  sty,
  localize
} from '../../../configs';
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
  _ListView
} from '../../custom';

export const mainLayoutHoc = (data) => WrappedComponent => {
  const MainLayoutHoc = (props) => {
    const [renderCmp, setRenderCmp] = useState(false);
    const [rootViewStyle, setRootViewStyle] = useState(data.rootView || mainStyles.rootView);
    const loaderRef = useRef('loader');
    const errorRef = useRef('errorModal');

    useEffect(() => {
      setRenderCmp(true);
      _getNotifications();
    }, []);

    const _getNotifications = () => { }
    const _loader = () => {
      return loaderRef.current;
    }
    const _errorModal = () => {
      return errorRef.current; 
    }
    const statBar = <StatusBar backgroundColor={'rgba(74,74,74,100)'} barStyle="dark-content" />;


    return (
      <View style={rootViewStyle}>
        <_Loading Ref={loaderRef} />
        <_ErrorModal Ref={errorRef} />
        {
          renderCmp ?
            <WrappedComponent {...props} loader={_loader()}  errorModal={_errorModal()} />
            :
            <View />
        }
      </View>
    )
  }
  return MainLayoutHoc
}