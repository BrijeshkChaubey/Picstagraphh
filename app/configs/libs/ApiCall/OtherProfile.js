import AsyncStorage from '@react-native-async-storage/async-storage';
import { helpers, API, globals } from '../../../configs';

export const getOtherProfileData = async (filterType, props, state, page = 1, timestamp = '', downTimestamp = '') => {
    const { otherProfileNewsfeed } = props;
    let userInfo = state.userInfo || props.userInfo;
    try {
        let token = await AsyncStorage.getItem('token');
        let header = helpers.buildHeader({ authorization: token });

        return new Promise((resolve, reject) => {
            let cb = {
                success: (res) => resolve(res),
                error: (err) => reject(err)
            }
            switch (filterType) {

                case 'newsFeed':
                case 'newsFeedList':
                    let data = {
                        page,
                        limit: globals.PAGINATION.othersNewsfeed,
                        adCount: 0,
                        username: userInfo.username,
                        timestamp,
                        //id:state?.itemId
                    }
                    filterType == 'newsFeedList' ? API.getOtherNewsFeeds({}, cb, header, {
                        page,
                        limit: 15,
                        adCount: 0,
                        username: userInfo.username,
                        timestamp,
                        //id: state?.itemId
                    }) : API.getOtherNewsFeeds2({}, cb, header, Object.assign({}, data, { downTimestamp }))
                    //}
                    break;
                case 'contest':
                    let limit = "" || globals.PAGINATION.ownContest
                    API.getUserContest({}, cb, header, { page, limit, userName: userInfo.username, isOwner: false });
                    break;
                default:
                    break;
            }
        })
    } catch (error) {
        console.log({ error });
    }

}