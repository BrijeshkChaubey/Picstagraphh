import AsyncStorage from '@react-native-async-storage/async-storage';
import { helpers, API } from '../../../configs';

export const getFiltersData = (filterType) => {

    try {
        let token;
        AsyncStorage.getItem('token').then(tk => token = tk);
        console.log('getFilterData ==>',token);
        let header = helpers.buildHeader({ authorization: token });

        return new Promise((resolve, reject)=>{
            let cb = {
                success: (res) => resolve(res.data),
                error: (err) => resolve(arr)
            }
            API[filterType+'FilterGet']({}, cb, header);
        })
    } catch(err) {
        console.log({err});
    }
}