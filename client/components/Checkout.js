import React from 'react';
import { connect } from 'react-redux';
import { submitOrderThunk } from '../store/redux/storage';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    creditCard: '',
    paymentMethod: "Credit Card"
  };

export class Checkout extends React.Component {
  constructor() {
    super();
    this.state = initialState
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidUpdate(prevProps){
      if (prevProps.userId !==this.props.userId) {
        this.setState ({
            firstName: this.props.firstName || '',
            lastName: this.props.lastName || '',
            email: this.props.email || '',
        })
      }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.checkOut(this.props.userId, this.state.paymentMethod);
    console.log('submitted!');
    this.setState(initialState);
  }
  render() {
      //if logged in, auto fill all of the info
      //if not logged in, you get a screen that says login or continue as a guest
      //below is the guest experience
      let storage = this.props.storage || [];
      let counter = 0;
    return (
    <div>
        {storage.map(ringtone => {
            counter += ringtone.price;
            return (
            <div>
                <p>{ringtone.name}</p>
                <p>${ringtone.price}</p>
            </div>
        )
        })  
       }
       <p>Total: ${counter}</p>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
            required
          />
          <label>Last Name</label>
          <input
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
          <label>Email</label>
          <input
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        <select name="paymentMethod" onChange={this.handleChange} value={this.state.paymentMethod} >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Venmo">Venmo</option>
        </select>

          <label>Card Number</label>
          <input
            name="creditCard"
            onChange={this.handleChange}
            value={this.state.creditCard}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
      email: state.auth.email,
      userId: state.auth.id,
      storage: state.storage

  }
};
const mapDispatch = (dispatch) => {
  return {
    checkOut: (userId, paymentMethod) => dispatch(submitOrderThunk(userId, paymentMethod)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);