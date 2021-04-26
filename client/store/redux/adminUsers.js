import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';

export const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

const TOKEN = 'token';

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get('/api/admin/users', {
        headers: { authorization: token },
      });
      dispatch(getAllUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function allUsersReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}
