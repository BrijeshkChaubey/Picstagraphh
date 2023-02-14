import React, {useEffect, useState, useRef} from 'react';
import {View,Text} from 'react-native';
import {globals, helpers, API,sty} from '../../../configs';
import mainStyles from '../../../assets/styles/MainStyles';
import CompanyCampaign from './companyCampaign/CompanyCampaign';
import CreatorCampaign from './creatorCampaign/CreatorCampaign';
import CampaignParticipant from './campaignParticipant/CampaignParticipant';
import MediaPost from './mediaPost/MediaPost';
import Advertise from './advertise/Advertise';
import {setAppData} from '../../../redux/actions/AppDataActions';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const POST_TYPES = globals.POST_TYPES;

export default function _ContentType(props) {
  const dispatch = useDispatch();
  const {contentInfo, fullView} = props;
  console.log('_contentType ContentInfo==>',contentInfo);
  const appData = useSelector(state => state.appData);
  const loginData = useSelector(state => state.loginData);
  const [data, setData] = useState({});
  const position = useRef({
    start: null,
    end: null,
  });

  useEffect(() => {
    const undereffect=async()=> {
      let visitedPostsArr = globals.getUserData('visitedPostsArr');
      let isPostClicked = appData.visitedPostsArr.includes(contentInfo.id);
      let postType = helpers.buildPostType(
        contentInfo.postType,
        contentInfo.userType || '',
      );

      if (
        fullView &&
        !contentInfo.isOwnClickpost &&
        !isPostClicked &&
        postType !== POST_TYPES.Campaign
      ) {
        let cb = {
          success: res => {},
          error: err => {},
          complete: () => {
            //     let arr = appData.visitedPostsArr;
            //     arr.push(contentInfo.id);
            //    dispatch(setAppData({ prop: 'visitedPostsArr', value: arr }))
            visitedPostsArr.push(contentInfo.id);
            globals.setUserData('visitedPostsArr', visitedPostsArr);
          },
        };
        let postType = helpers.getBackendPostType(
          contentInfo,
          contentInfo.postType,
          globals.POST_TYPES,
        );
        let apiData = {
          typeContent: postType,
          typeId: contentInfo.id,
        };
        // API.postClick({}, cb, header, apiData);
        await API.postViews({}, cb, header, apiData);
      }
    }

    undereffect();

  }, []);

  const _renderContentType = () => {
    console.log('contentInfo', contentInfo);

    let postType = helpers.buildPostType(
      contentInfo.postType,
      contentInfo.userType || '',
    );
    console.log('Post type', postType);

    if (contentInfo.isDelete) {
      return;
    }
    let deletedPosts = globals.getUserData('deletedPosts');
    if (deletedPosts.includes(contentInfo._id)) {
      return;
    }

    switch (postType) {
      // case POST_TYPES.CompanyCampaign:
      case POST_TYPES.Campaign:
        return (
          <>
          <CompanyCampaign
            contentInfo={contentInfo}
            fullView={props.fullView}
            index={props.index}
            {...props}
            NewsList={props.NewsList ? true : false}
            disableScroll={props.disableScroll}
          />
          </>
        );

      case POST_TYPES.Blog:
      case POST_TYPES.CreatorCampaign:
        return (
          <CreatorCampaign
            contentInfo={contentInfo}
            fullView={props.fullView}
            index={props.index}
            {...props}
          />
        );

      case POST_TYPES.CompanyParticipantCampaign:
        return (
          <CampaignParticipant
            contentInfo={contentInfo}
            fullView={props.fullView}
            index={props.index}
            {...props}
          />
        );

      case POST_TYPES.Advertise:
      case POST_TYPES.Ad:
        return (
          <Advertise
            contentInfo={contentInfo}
            fullView={props.fullView}
            index={props.index}
            {...props}
          />
        );

      case POST_TYPES.Userpost:
      case POST_TYPES.MediaPost:
        return (
          <MediaPost
            contentInfo={contentInfo}
            fullView={props.fullView}
            index={props.index}
            {...props}
          />
        );

      default:
        return null;
    }
  };
  const style = props.fullView ? {...sty.flex1} : styles.contentBox;

  let postType = helpers.buildPostType(
    contentInfo.postType,
    contentInfo.userType || '',
  );
  return (
    <View style={[style, postType !== POST_TYPES.Campaign ? {} : {}]}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
    
      {_renderContentType()}
    </View>
  );
}
