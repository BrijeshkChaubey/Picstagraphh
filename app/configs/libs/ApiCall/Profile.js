import AsyncStorage from "@react-native-async-storage/async-storage";
import { helpers, API } from '../../../configs';
import * as globals from '../../../configs/libs/globals';

export const getProfileData = async (filterType, loginData, page = 1,itemId,limit = '', timestamp = '', downTimestamp = '') => {
    console.log("getProfileData",itemId)
    try {
        let token = await AsyncStorage.getItem('token');
        let header = helpers.buildHeader({ authorization: token });

        return new Promise((resolve, reject) => {
            let cb = {
                success: (res) => resolve(res.data),
                error: (err) => reject(err)
            }
            switch (filterType) {
                case 'newsFeed':
                case 'newsFeedList':
                    let newsfeedCb = {
                        success: (res) => resolve(res),
                        error: (err) => reject(err)
                    }
                    limit = limit || globals.PAGINATION.ownNewsfeed;
                    filterType == 'newsFeedList' ? API.getOwnNewsFeeds({}, newsfeedCb, header, { page, limit: 15, timestamp, }) : API.getOwnNewsFeeds2({}, newsfeedCb, header, { page, limit, timestamp, id: loginData.username, downTimestamp })
                    break;
                case 'saved':
                    let savedCb = {
                        success: (res) => resolve(res),
                        error: (err) => reject(err)
                    }
                    limit = limit || globals.PAGINATION.ownSaved;
                    API.getOwnSaved({}, savedCb, header, { page, limit, id: loginData.id, });
                    break;
                case 'contest':
                    let contestCb = {
                        success: (res) => resolve(res),
                        error: (err) => reject(err)
                    }
                    limit = limit || globals.PAGINATION.ownContest
                    API.getUserContest({}, contestCb, header, { page, limit, id: loginData.id, userName: loginData.username, isOwner: true });
                    break;
                default:
                    break;
            }
        })
    } catch (error) {
        console.log({ error });
    }

}