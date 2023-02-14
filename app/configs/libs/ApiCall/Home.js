import AsyncStorage from "@react-native-async-storage/async-storage";
import { helpers,API,globals } from "../..";
import * as RNLocalize from 'react-native-localize'
// import DeviceInfo from 'react-native-device-info'  // library not installed yet

const deviceCountry=RNLocalize.getCountry();

export const getHomeData = async (
    filterType,
    page = 1,
    filterStr = "",
    param = {}
  ) => {
    console.log('getHomeData==>',filterType);
    try {
      let token = await AsyncStorage.getItem("token");
      let header = helpers.buildHeader({ authorization: token });
  
      return new Promise((resolve, reject) => {
        let cb = {
          success: (res) => resolve(res),
          error: (err) => reject(err),
        };
        switch (filterType) {
          case "news":
            let newsFeedCb = {
              success: (res) => resolve(res),
              error: (err) => reject(err),
            };
            API.homeNewsfeedGetApi({}, newsFeedCb, header, {
              page,
              limit: globals.PAGINATION.newsfeed,
              country: deviceCountry,
              id: param.id,
              timestamp: param.timestamp ? param.timestamp : "",
            });
            break;
          case "explore":
          case "exploreList":
            let exploreCb = {
              success: (res) => resolve(res),
              error: (err) => reject(err),
            };
  
            // API.homeExploreGetApi({}, exploreCb, header, { page, limit: globals.PAGINATION.homeExplore, filterStr, country: deviceCountry });
            let payloadObject = {
              page,
              limit: globals.PAGINATION.homeExplore,
              filterStr,
              country: deviceCountry,
              //id: param?.id,
              pageLimit:param?.pageLimit
              
            };
            console.log("Payload",payloadObject)
            if (typeof param === "object" && param.mediaPage)
              payloadObject["mediaPage"] = param.mediaPage;
  
            if (typeof param === "object" && param.stagePage)
              payloadObject["stagePage"] = param.stagePage;
  
            if (typeof param === "object" && param.downTimestamp) {
              payloadObject["downTimestamp"] = param.downTimestamp;
            } else {
              payloadObject["downTimestamp"] = "";
            }
  
            if (typeof param === "object" && param.timestamp) {
              payloadObject["timestamp"] = param.timestamp;
            } else {
              payloadObject["timestamp"] = "";
            }
  
            console.log("payloadObject :", payloadObject)
            filterType == "exploreList"
              ? API.homeExploreGetApi({}, exploreCb, header, payloadObject)
              : API.homeExploreGetApi2({}, exploreCb, header, payloadObject);
            break;
          case "best":
          case "bestList":
            let bestCb = {
              success: (res) => resolve(res),
              error: (err) => reject(err),
            };
            let payloadObjectBest = {
              page,
              limit: globals.PAGINATION.homeBest,
              filterStr,
              country: deviceCountry,
              id: param?.id,
              pageLimit: param?.pageLimit
            };
            console.log("Payload", payloadObjectBest)
            if (typeof param === "object" && param.mediaPage)
              payloadObjectBest["mediaPage"] = param.mediaPage;
  
            if (typeof param === "object" && param.stagePage)
              payloadObjectBest["stagePage"] = param.stagePage;
  
            if (typeof param === "object" && param.downTimestamp) {
              payloadObjectBest["downTimestamp"] = param.downTimestamp;
            } else {
              payloadObjectBest["downTimestamp"] = "";
            }
  
            // if (typeof param === "object" && param.timestamp) {
            //   payloadObjectBest["timestamp"] = param.timestamp;
            // } else {
            //   payloadObjectBest["timestamp"] = "";
            // }
            
  
            console.log("payloadObject :", payloadObjectBest)
            filterType == "bestList"
              ? API.homeBestGetApi({}, bestCb, header, payloadObjectBest)
              : API.homeBestGetApi2({}, bestCb, header, payloadObjectBest);
            break;
          case "participant":
            let participantCb = {
              success: (res) => resolve(res),
              error: (err) => reject(err),
            };
            API.homeParticipantGetApi({}, participantCb, header, {
              page,
              limit: globals.PAGINATION.homeParticipant,
              filterStr,
            });
            break;
          
          case "user":
            API.usersListGet({}, cb, header, {
              page,
              limit: globals.PAGINATION.homeUsers,
              filterStr,
              isLastPage: param.loadMoreData,
            });
            break;
          case "pics":
            let picsCb = {
              success: (res) => resolve(res),
              error: (err) => reject(err),
            };
  
            API.getPicsHomeList(
              { usersList: param.usersList || [] },
              picsCb,
              header,
              {
                id: param.id,
                page,
                limit: globals.PAGINATION.homePics,
                filterStr,
                isSubscribe: param.isSubscribe,
                timestamp: param.timestamp ? param.timestamp : "",
              }
            );
            // API.getPicsHomeList({}, picsCb, header, { id: param.id, page, limit: globals.PAGINATION.homePics, filterStr, isSubscribe: param.isSubscribe, timestamp: '' });
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.log({ error });
    }
  };
