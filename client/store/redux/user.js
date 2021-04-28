import axios from 'axios';

const TOKEN = 'token';
const USER_INFO = 'USER_INFO';
const GET_USER = 'GET_USER';

const getUserInfo = (user) => ({
  type: GET_USER,
  user,
});

const editUserInfo = (user) => ({
  type: USER_INFO,
  user,
});

export const getUserInfoThunk = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/users/${userId}`, {
        headers: { authorization: token },
      });
      dispatch(getUserInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editUserInfoThunk = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.put(`/api/users/${user.id}`, user, {
        headers: { authorization: token },
      });
      dispatch(editUserInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function editReducer(user = {}, action) {
  switch (action.type) {
    case USER_INFO:
      return action.user;
    case GET_USER:
      return action.user;
    default:
      return user;
  }
}
