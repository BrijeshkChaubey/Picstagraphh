import React, { useState } from 'react';
import { _Layout, _ContentType } from '../../../../custom';
import { mainLayoutHoc } from '../../../../hoc';

function CreatorCampaign(props) {
    const [campaignInfo, setCampaignInfo] = useState(props.navigation.state.params.campaignInfo);
    const header = {
        leftCb: () => { props.navigation.pop() },
        title: 'campaign.campaign_creator',
        hideRight: true,
    }
    return (
        <_Layout screen={'campaign'} header={header}>
            <_ContentType contentInfo={campaignInfo} fullView={true} />
        </_Layout>
    )
}    
export default mainLayoutHoc({})(CreatorCampaign);