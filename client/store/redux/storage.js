import axios from 'axios';

export const ADD_TO_STORAGE = 'ADD_TO_STORAGE';
export const DELETE_FROM_STORAGE = 'DELETE_FROM_STORAGE';
export const GET_STORAGE = 'GET_STORAGE';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

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
  order
})

export const storageThunk = (id) => {
    return async (dispatch) => {
        try {
          let storage;
          //check if they are logged in
          if (id !== undefined) {
            let response = await axios.get(`./api/order/${id}`);
            storage = response.data.ringtones;
          } else {
            storage = Object.keys(localStorage).map(ringtone => { 
              return {
                  id: ringtone, 
                  name: localStorage[ringtone]
              }
            })
          }
          dispatch(getStorage(storage));
        } catch (error) {
          console.log(error);
        }
    };
}

export const addItemThunk = (ringtone, userId) => {
  return async (dispatch) => {
      try {
        let storage;
        if (userId !== undefined) {
          let response = await axios.post(`/api/order/${userId}`, {id: ringtone.id});
          storage = response.data;
        } else {
          localStorage.setItem(`${ringtone.id}`, `${ringtone.name}`);
          storage = {id: ringtone.id, name: ringtone.name, price: ringtone.price}
        }
        dispatch(addToStorage(storage));
      } catch (error) {
        console.log(error);
      }
  };
}

export const removeItemThunk = (ringtoneId, ringtoneName, userId) => {
  return async (dispatch) => {
      try {
        let storage;
        if (userId !== undefined) {
          console.log(ringtoneId, 'ringtone id in thunk');
          let response = await axios.delete(`/api/order/${userId}/${ringtoneId}`);
          storage = response.data;
        } else {
          localStorage.removeItem(`${ringtoneId}`, `${ringtoneName}`)
          storage = {id: ringtoneId, name: ringtoneName}
        }
        dispatch(deleteFromStorage(storage));
      } catch (error) {
        console.log(error);
      }
  };
}

export const submitOrderThunk = (userId, paymentInfo) => {
  return async (dispatch) => {
      try {
        let updates = {
          completed: true, 
          paymentMethod: paymentInfo
        }
        let id = userId;
        if (id === undefined) {
          id = 1000;
          let ringtones = Object.keys(localStorage).map(ringtone => { 
            return {
                id: ringtone
            }
          })
          await axios.post(`/api/order/${1000}`, ringtones);
        } 
          let response = await axios.put(`/api/order/${userId}`, updates);
          console.log(response.data);
          dispatch(submitOrder(response.data));
        
      } catch (error) {
        console.log(error);
      }
  };
}

export default function storageReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_STORAGE:
      return [...state, action.ringtone];
    case DELETE_FROM_STORAGE:
      return state.filter((ringtone) => ringtone.id !== action.ringtone.id);
    case GET_STORAGE:
      return action.storage;
    case SUBMIT_ORDER:
      return [];
    default:
      return state;
  }
}
