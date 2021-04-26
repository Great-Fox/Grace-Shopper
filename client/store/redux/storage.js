import axios from 'axios';

export const ADD_TO_STORAGE = 'ADD_TO_STORAGE';
export const DELETE_FROM_STORAGE = 'DELETE_FROM_STORAGE';
export const GET_STORAGE = 'GET_STORAGE';
const TOKEN = 'token';

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

export const storageThunk = (id) => {
  return async (dispatch) => {
    try {
      let storage;
      const token = window.localStorage.getItem(TOKEN);

      //check if they are logged in
      if (id !== undefined) {
        let response = await axios.get(`./api/order/${id}`, {
          headers: { authorization: token },
        });
        storage = response.data.ringtones;
      } else {
        storage = Object.keys(localStorage).map((ringtone) => {
          return {
            id: ringtone,
            name: localStorage[ringtone],
          };
        });
      }
      dispatch(getStorage(storage));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItemThunk = (ringtoneId, ringtoneName, userId) => {
  return async (dispatch) => {
    try {
      let storage;
      const token = window.localStorage.getItem(TOKEN);

      if (userId !== undefined) {
        let response = await axios.post(
          `/api/order/${userId}`,
          {
            id: ringtoneId,
          },
          {
            headers: { authorization: token },
          }
        );
        storage = response.data;
      } else {
        localStorage.setItem(`${ringtoneId}`, `${ringtoneName}`);
        storage = { id: ringtoneId, name: ringtoneName };
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

export default function storageReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_STORAGE:
      return [...state, action.ringtone];
    case DELETE_FROM_STORAGE:
      return state.filter((ringtone) => ringtone.id !== action.ringtone.id);
    case GET_STORAGE:
      return action.storage;
    default:
      return state;
  }
}
