import axios from 'axios';

const GET_SINGLE_RINGTONE = 'GET_SINGLE_RINGTONE';

export const getSingleRingtone = (ringtone) => ({
  type: GET_SINGLE_RINGTONE,
  ringtone,
});

export const fetchSingleRingtone = (ringtoneId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/ringtone/${ringtoneId}`);
      dispatch(getSingleRingtone(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function singleRingtoneReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_RINGTONE:
      return action.ringtone;
    default:
      return state;
  }
}
