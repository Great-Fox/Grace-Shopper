import axios from 'axios';

const TOKEN = 'token';
const USER_INFO = "USER_INFO";

const editUserInfo = (user) => ({
    type: USER_INFO,
    user
})

export const editUserInfoThunk = (user) => {
    return async( dispatch) => {
        try {
            console.log("user", user)
            const token = window.localStorage.getItem(TOKEN);
            const {data} = await axios.put(`/api/users/${user.id}`, user, {
                headers: { authorization: token },
              })
              dispatch(editUserInfo(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export default function editReducer(user = {}, action) {
    switch (action.type) {
      case USER_INFO:
        return action.user
      default:
        return user;
    }
  }