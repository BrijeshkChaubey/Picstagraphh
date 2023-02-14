import AsyncStorage from "@react-native-async-storage/async-storage";
import { helpers, API, globals } from "../..";

export const getCampaignsData = async (
  filterType,
  page = 1,
  apiType,
  filterStr,
  timestamp = "",
) => {
  let token = await AsyncStorage.getItem("token");
  let header = helpers.buildHeader({ authorization: token });

  // let apiTypeNew = apiType === 'apply' ? "all" : apiType
  // console.log("APITYPE :", apiTypeNew)
  return new Promise((resolve, reject) => {
    let cb = {
      success: (res) => {
        console.log('campaignGetApi2 reponse ==>',res);
        resolve(res);
      },
      error: (err) => reject(err),
    };
    API.campaignGetApi2({}, cb, header, {
      type: filterType,
      page,
      apiType,
      limit:
        filterType === "company"
          ? globals.PAGINATION.companyCampaign
          : globals.PAGINATION.creatorCampaign,
      filterStr,
      timestamp,
    });
  });
};
export const getCategories = async () => {
  let token = await AsyncStorage.getItem("token");
  console.log('getCategories token ==> ',token);
  let header = helpers.buildHeader({ "authorization": token });
  console.log("Heee", header);

  // let apiTypeNew = apiType === 'apply' ? "all" : apiType
  // console.log("APITYPE :", apiTypeNew)
  return new Promise((resolve, reject) => {
    let cb = {
      success: (res) => {
        resolve(res);
      },
      error: (err) => reject(err),
    };
    API.getCategories({}, cb, header, null);
  });
};

export const getCampaignsUpdateRedis = async (
  apiType,
  timestamp,
  page,
  filterStr,
) => {
  let token = await AsyncStorage.getItem("token");
  let header = helpers.buildHeader({ authorization: token });

  return new Promise((resolve, reject) => {
    let cb = {
      success: (res) => {
        resolve(res);
      },
      error: (err) => reject(err),
    };
    API.campaignUpdateRedis({}, cb, header, {
      type: "company",
      apiType,
      timestamp,
      page,
      filterStr,
    });
  });
};

export const getCampaignParticipants = async (
  filterType,
  key,
  command,
  page = 1,
  param = {},
) => {
  let token = await AsyncStorage.getItem("token");
  let header = helpers.buildHeader({ authorization: token });

  return new Promise((resolve, reject) => {
    let cb = {
      success: (res) => {
        resolve(res);
      },
      error: (err) => reject(err),
    };
    switch (filterType) {
      case "Participant":
        let parCb = {
          success: (res) => {
            resolve(res);
          },
          error: (err) => reject(err),
        };
        API.participantGetApi({}, parCb, header, {
          key,
          page,
          limit:
            command == globals.PARTICIPANT_TYPE.APPROVED ||
            globals.PARTICIPANT_TYPE.FINALIST
              ? 15
              : globals.PAGINATION.companyParticipant,
          command,
          text: param.text || "campaign-participant",
          timestamp: param.timestamp || "",
          downTimestamp: param.downTimestamp || "",
          id: param?.id,
          mediaId: param?.mediaId,
        });
        break;
      case "ParticipantList":
        let parListCb = {
          success: (res) => {
            resolve(res);
          },
          error: (err) => reject(err),
        };
        API.participantGetApi({}, parListCb, header, {
          key,
          page,
          limit:
            command == globals.PARTICIPANT_TYPE.APPROVED ||
            globals.PARTICIPANT_TYPE.FINALIST
              ? param?.limit
                ? 0
                : 15
              : globals.PAGINATION.companyParticipant,
          command,
          text: param.text || "campaign-participant",
          timestamp: param.timestamp || "",
          downTimestamp: param.downTimestamp || "",
          id: param?.id,
          mediaId: param?.mediaId,
        });
        break;

      default:
        break;
    }
    let participantLimit = param.text
      ? param?.id
        ? 0
        : 3
      : globals.PAGINATION.companyParticipant;
    // API.participantGetApi({}, cb, header, {
    //     key,
    //     page,
    //     limit: command == globals.PARTICIPANT_TYPE.APPROVED || globals.PARTICIPANT_TYPE.FINALIST ? 15: globals.PAGINATION.companyParticipant,
    //     command,
    //     text: param.text || 'campaign-participant',
    //     timestamp: param.timestamp || '',
    //     downTimestamp: param.downTimestamp || '',
    //     id: param?.id,
    //     mediaId:param?.mediaId
    // });
  });
};
export const getCampaignParticipantsList = async (
  key,
  command,
  page = 1,
  param = {},
) => {
  let token = await AsyncStorage.getItem("token");
  let header = helpers.buildHeader({ authorization: token });

  return new Promise((resolve, reject) => {
    let cb = {
      success: (res) => {
        resolve(res);
      },
      error: (err) => reject(err),
    };

    API.participantGetApi({}, cb, header, {
      key,
      page,
      limit: params?.id ? 1 : globals.PAGINATION.companyParticipant,
      command,
      text: param.text || "campaign-participant",
      timestamp: param.timestamp || "",
      downTimestamp: param.downTimestamp || "",
    });
  });
};

export const getParticipantsTop10 = async (slug, page = 1) => {
  let token = await AsyncStorage.getItem("token");
  let header = helpers.buildHeader({ authorization: token });

  return new Promise((resolve, reject) => {
    let cb = {
      success: (res) => resolve(res),
      error: (err) => reject(err),
    };
    API.participantTop10GetApi({}, cb, header, {
      slug,
      page,
      command: "finalistParticipant",
      limit: globals.PAGINATION.participantTop10,
    });
  });
};

export const getParticipantsWinners = async (slug, page = 1) => {
  let token = await AsyncStorage.getItem("token");
  let header = helpers.buildHeader({ authorization: token });

  return new Promise((resolve, reject) => {
    let cb = {
      success: (res) => resolve(res),
      error: (err) => reject(err),
    };
    API.participantWinnersGetApi({}, cb, header, {
      slug,
      page,
      limit: globals.PAGINATION.participantTop10,
    });
  });
};
