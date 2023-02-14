import { SET_PUSH_NOTIFICATIONS } from './Constants';

export const setPushNotifications = (data) => {
    
    return {
        type: SET_PUSH_NOTIFICATIONS,
        notificationData: data
    }
}
