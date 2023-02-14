import AsyncStorage from '@react-native-async-storage/async-storage';
import { globals, helpers, API } from '../../../configs';

const SUBSCRIBE_TYPE = globals.SUBSCRIBE_TYPE;

export const setSubscribe = async (filterType, data, otherUser) => {

    try {
        let token = await AsyncStorage.getItem('token');
        let header = helpers.buildHeader({ authorization: token });

        return new Promise((resolve, reject)=>{
            let cb = {
                success: (res) => resolve(res),
                error: (err) => reject(err)
            }
            switch (filterType) {
                case SUBSCRIBE_TYPE.SUBSCRIBE:
                    data = { followers : data }
                    API.subscribeUser(data, cb, header, otherUser);
                    break;
                case SUBSCRIBE_TYPE.SUBSCRIBED:
                    API.unsubscribeUser(data, cb, header, otherUser);
                    break;
                default:
                    break;
            }
        })   
    } catch (error) {
        console.log({error});
    }

}