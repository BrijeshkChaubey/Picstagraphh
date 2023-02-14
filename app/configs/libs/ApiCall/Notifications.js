import AsyncStorage from "@react-native-async-storage/async-storage";
import { helpers, API, globals } from '../../../configs';

// export const getNotificationsData = async (filterType, loginData, timestamp, page = 1) => {

//     try {
//         let token = await AsyncStorage.getItem('token');
//         let header = helpers.buildHeader({ authorization: token });

//         return new Promise((resolve, reject) => {
//             let cb = {
//                 success: (res) => resolve(res),
//                 error: (err) => reject(err)
//             }
//             switch (filterType) {
//                 case 'notifications':
//                     API.getNotifications({}, cb, header, { page, limit: globals.PAGINATION.notification, userid: loginData.id, timestamp: timestamp });
//                     break;
//                 case 'likeYou':
//                     API.getLikeYouNotifications({}, cb, header);
//                     break;
//                 case 'requests':
//                     API.getNotifications({}, cb, header);
//                     break;
//                 default:
//                     break;
//             }
//         })
//     } catch (error) {
//         console.log({ error });
//     }

// }

export const getNotificationsData = async (filterType, page = 1) => {

    try {
        let token = await AsyncStorage.getItem('token');
        let header = helpers.buildHeader({ authorization: token });

        return new Promise((resolve, reject) => {
            let cb = {
                success: (res) => resolve(res),
                error: (err) => reject(err)
            }
            switch (filterType) {
                case 'notifications':
                    API.getNotifications({}, cb, header, { page, limit: globals.PAGINATION.notification });
                    break;
                case 'likeYou':
                    API.getLikeYouNotifications({}, cb, header);
                    break;
                case 'requests':
                    API.getNotifications({}, cb, header);
                    break;
                default:
                    break;
            }
        })
    } catch (error) {
        console.log({ error });
    }

}