import axios from 'axios';

export const ADD_TO_STORAGE = 'ADD_TO_STORAGE';
export const DELETE_FROM_STORAGE = 'DELETE_FROM_STORAGE';
export const GET_STORAGE = 'GET_STORAGE';
const TOKEN = 'token';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const LOAD_GUEST_RINGTONES = 'LOAD_GUEST_RINGTONES';

export const addToStorage = (ringtone) => ({
  type: ADD_TO_STORAGE,
  ringtone,
});

export const deleteFromStorage = (ringtone) => ({
  type: DELETE_FROM_STORAGE,
  ringtone,
});

export const getStorage = (storage) => ({
  type: GET_STORAGE,
  storage,
});

export const submitOrder = (order) => ({
  type: SUBMIT_ORDER,
  order,
});

export const loadGuestRingtones = (ringtones) => ({
  type: LOAD_GUEST_RINGTONES,
  ringtones,
});

export const storageThunk = (id) => {
  return async (dispatch) => {
    try {
      let storage;
      const token = window.localStorage.getItem(TOKEN);
      console.log('id in storage thunk', id);
      if (id !== undefined) {
        let response = await axios.get(`/api/order/${id}`, {
          headers: { authorization: token },
        });
        storage = response.data.ringtones || [];
      } else {
        let unfilteredStorage = Object.keys(localStorage).map((ringtone) => {
          return {
            id: ringtone,
            name: localStorage[ringtone],
          };
        });
        storage = unfilteredStorage.filter((value) => Number(value.id));
      }
      dispatch(getStorage(storage));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItemThunk = (ringtone, userId) => {
  return async (dispatch) => {
    try {
      let storage;
      const token = window.localStorage.getItem(TOKEN);

      if (userId !== undefined) {
        let response = await axios.post(`/api/order/${userId}`, [ringtone.id], {
          headers: { authorization: token },
        });
        storage = response.data;
      } else {
        localStorage.setItem(`${ringtone.id}`, `${ringtone.name}`);
        storage = { id: ringtone.id, name: ringtone.name };
      }
      dispatch(addToStorage(storage));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeItemThunk = (ringtoneId, ringtoneName, userId) => {
  return async (dispatch) => {
    try {
      let storage;
      const token = window.localStorage.getItem(TOKEN);

      if (userId !== undefined) {
        let response = await axios.delete(
          `/api/order/${userId}/${ringtoneId}`,
          {
            headers: { authorization: token },
          }
        );
        storage = response.data;
      } else {
        localStorage.removeItem(`${ringtoneId}`, `${ringtoneName}`);
        storage = { id: ringtoneId, name: ringtoneName };
      }
      dispatch(deleteFromStorage(storage));
    } catch (error) {
      console.log(error);
    }
  };
};

export const submitOrderThunk = (userId, paymentInfo, ringtones) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      let updates = {
        completed: true,
        paymentMethod: paymentInfo,
      };
      let id = userId;
      let response;
      if (id === undefined) {
        response = await axios.post(
          `/api/order/guest`,
          { ringtones, updates },
          {
            headers: { authorization: token },
          }
        );
      } else {
        response = await axios.put(`/api/order/${userId}`, updates, {
          headers: { authorization: token },
        });
      }
      dispatch(submitOrder(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function storageReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_STORAGE:
      return [...state, action.ringtone];
    case DELETE_FROM_STORAGE:
      return state.filter((ringtone) => ringtone.id !== action.ringtone.id);
    case GET_STORAGE:
      return [...action.storage];
    case SUBMIT_ORDER:
      return [];
    case LOAD_GUEST_RINGTONES:
      return action.ringtones;
    default:
      return state;
  }
}
