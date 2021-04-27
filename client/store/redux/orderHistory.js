import axios from 'axios';

const TOKEN = 'token';


export const ORDER_HISTORY = "ORDER_HISTORY"

export const getOrderHistory = (orders) => ({
    type: ORDER_HISTORY,
    orders
})

export const getAllOrderHistoryThunk = (userId) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const {data} = await axios.get(`/api/order/${userId}/orders`, {
                headers: { authorization: token },
              });
              dispatch(getOrderHistory(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export default function orderHistoryReducer(orders = [], action) {
    switch (action.type) {
      case ORDER_HISTORY:
        return action.orders;
      default:
        return orders;
    }
  }