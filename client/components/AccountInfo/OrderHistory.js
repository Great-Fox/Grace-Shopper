import React from 'react';
import { connect } from 'react-redux';
import { getAllOrderHistoryThunk } from '../../store/redux/orderHistory'


// const initialState = {
//   name: '',
//   artist: '',
//   genre: '',
//   songUrl: '',
//   price: '',
// };

export class OrderHistory extends React.Component {
//   constructor() {
//     super();
//     this.state = initialState;
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
// async componentDidMount() {
//     await this.props.getOrders(this.props.userId)
// }

async componentDidUpdate(prevProps){
    if (prevProps.userId !== this.props.userId) {
        await this.props.getOrders(this.props.userId)
    }
}
  render(){
      
      const orders = this.props.orders
      console.log(orders)
      return (
        <div>
                Your Orders: 
                {orders.map(order => {
                    return (
                        <p>
                            <p>Order: {order.id}</p>
                            { order.ringtones.map(ringtone => {
                            return (
                                <p>{ringtone.name}</p>
                            )
                        })}
                        <p>
                            {order.totalPrice}
                        </p>
                        </p>
                    )
                })}

        </div>
      )
  }
}
  const mapState = (state) => ({
    orders: state.orders,
    userId: state.auth.id,
  });

  const mapDispatch = (dispatch) => {
    return {
        getOrders: (userId) => dispatch(getAllOrderHistoryThunk(userId))
    };
  };
  
  export default connect(mapState, mapDispatch)(OrderHistory);