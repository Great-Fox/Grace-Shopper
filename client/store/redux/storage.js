import axios from 'axios';

export const ADD_TO_STORAGE = 'ADD_TO_STORAGE';
export const DELETE_FROM_STORAGE = 'DELETE_FROM_STORAGE';
export const GET_STORAGE = 'GET_STORAGE';

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

export const storageThunk = () => {
<<<<<<< HEAD
    return async (dispatch) => {
        try {
          const storage = Object.keys(localStorage).map(ringtone => { 
              return {
                  id: ringtone, 
                  name: localStorage[ringtone]
              }
            })
          console.log(storage)
          dispatch(getStorage(storage));
        } catch (error) {
          console.log(error);
        }
    };
}
=======
  return async (dispatch) => {
    try {
      const storage = localStorage;
      Object.keys(localStorage).map((ringtone) => {
        return {
          id: ringtone,
          name: localStorage[ringtone],
        };
      });
      dispatch(getStorage(storage));
    } catch (error) {
      console.log(error);
    }
  };
};
>>>>>>> 90272d3df8fe23bc5a356bf1380e654ba4840166

export default function storageReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_STORAGE:
      return [...state, action.ringtone];
    case DELETE_FROM_STORAGE:
      return state.filter((ringtone) => ringtone !== action.ringtone);
    case GET_STORAGE:
      return action.storage;
    default:
      return state;
  }
}
