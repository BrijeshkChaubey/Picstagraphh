import React, { useState } from 'react';
import { _Layout, _ContentType } from '../../../../custom';
import { mainLayoutHoc } from '../../../../hoc';
import {styles} from './styles';

function CampaignParticipant(props){
    const [postInfo,setPostInfo] = useState(props.navigation.state.params.postInfo);
    const header = {
        leftCb: () => {props.navigation.pop() },
        leftImg: images.leftBackArrow,
        title: "campaign.capaign_participant",
        hideRight: true,
    }
    return(
        <_Layout screen={'capaignParticipant'} header={header}>
        <_ContentType contentInfo={postInfo} fullView={true} {...props} />
    </_Layout>
    )
}
export default mainLayoutHoc({})(CampaignParticipant);