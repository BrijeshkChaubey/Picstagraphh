import React from 'react';
import { Text } from 'react-native';

const _B = (props) => {
    const style = props.style || {};
    return <Text style={[{fontWeight: 'bold'}, style]}>{props.children}</Text>
}

export default _B;