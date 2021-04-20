import axios from 'axios';

const GET_ALL_RINGTONES = 'GET_ALL_RINGTONES';

export const getAllRingtones = (ringtones) => ({
  type: GET_ALL_RINGTONES,
  ringtones,
});

export const fetchAllRingtones = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/ringtone');
      dispatch(getAllRingtones(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function allRingtonesReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_RINGTONES:
      return action.ringtones;
    default:
      return state;
  }
}
