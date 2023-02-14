import React, { useState } from 'react';
import { _Layout,_ContentType } from '../../../custom';
import { mainLayoutHoc } from '../../../hoc';
function Advertise(props) {
    const [postInfo, setPostInfo] = useState(props.navigation.state.params.postInfo);
    const header = {
        leftCb: () => { props.navigation.pop() },
        title: 'contentType.advertise',
        hideRight: true
    }
    return (
        <_Layout screen={'advertize'} header={header}>
            <_ContentType key={'advertise'} contentInfo={postInfo} fullView={true} />
        </_Layout>
    )
}
export default mainLayoutHoc({})(Advertise);