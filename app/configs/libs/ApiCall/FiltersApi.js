import { helpers, API } from '../../../configs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFiltersData = (filterType) => {

    let token;
    AsyncStorage.getItem('token').then((tk => token = tk));
    console.log('getFilterData token ==>', token);
    let header = helpers.buildHeader({
        authorization: token
    });

    return new Promise((resolve, reject)=>{
        let cb = {
            success: (res) => {
                resolve(filterType == 'locationCountry' ? res : res.data)
            },
            error: (err) => resolve(err)
        }
        API[filterType+'FilterGet']({}, cb, header);
    })

}