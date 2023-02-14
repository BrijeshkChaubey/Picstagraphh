import {
  SET_CAPAIGNS_PROP,
  PUSH_CAMPAIGNS_PROP,
  SAVE_SINGLE_CONTEST,
  REMOVE_SINGLE_CONTEST,
} from './Constants';

export const setCampaignProp = data => {
  return {
    type: SET_CAPAIGNS_PROP,
    campaignData: data,
  };
};
export const saveSingleContest = data => {
  return {
    type: SAVE_SINGLE_CONTEST,
    payload: data,
  };
};
export const removeSingleContest = () => {
  return {
    type: REMOVE_SINGLE_CONTEST,
  };
};
export const pushCampaignProp = (data, unshift = false) => {
  return {
    type: PUSH_CAMPAIGNS_PROP,
    campaignData: data,
    unshift,
  };
};
