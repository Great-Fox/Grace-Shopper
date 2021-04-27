import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token !== 'undefined' && token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (
  email,
  password,
  method,
  history,
  firstName,
  lastName
) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName,
    });
    let storage;

    if (localStorage) {
      storage = Object.keys(localStorage).filter((key) => {
        if (Number(key)) {
          return Number(key);
        }
      });
    }
    window.localStorage.setItem(TOKEN, res.data.token);
    let ringtones = await axios.post(`/api/order/${res.data.userId}`, storage, {
      headers: {
        authorization: token,
      },
    });
    dispatch(me());
    dispatch(addToStorage(ringtones));
    history.push('/ringtone');
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
