import AsyncStorage from "@react-native-async-storage/async-storage";
import { helpers, API, globals } from "../../../configs";
import * as RNLocalize from "react-native-localize";
import DeviceInfo from "react-native-device-info";

const deviceCountry = RNLocalize.getCountry();

export const getJobData = async (page = 1, filterStr = "", param = {}) => {
  try {
    let token = await AsyncStorage.getItem("token");
    let secureFgp = await AsyncStorage.getItem("secureFgp");
    console.log(secureFgp,"okay1")
    let header = helpers.buildHeader({ authorization: token });
    Object.keys(header).forEach((key) => {
      header["secureFgp"] = secureFgp;
    });
    return new Promise((resolve, reject) => {
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
        pageLimit: param?.pageLimit,
      };
      console.log("Payload", payloadObject);
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

      console.log("payloadObject :", payloadObject);
       API.jobGetApi({}, exploreCb, header, payloadObject)
       
    });
  } catch (error) {
    console.log({ error });
  }
};
export const getJobInfoData = async (jobId) => {
  try {
    let token = await AsyncStorage.getItem("token");
    let secureFgp = await AsyncStorage.getItem("secureFgp");
    let header = helpers.buildHeader({ authorization: token });
    console.log(secureFgp)
    Object.keys(header).forEach((key) => {
      header["secureFgp"] = secureFgp;
    });
    return new Promise((resolve, reject) => {
      let jobCb  = {
        success: (res) => resolve(res),
        error: (err) => reject(err),
      };
      let apiData = {
        id: jobId,
      };
      API.jobInfoGetApi({}, jobCb, header, apiData)

    });
  } catch (error) {
    console.log({ error });
  }
};