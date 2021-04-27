import React from 'react';
import { connect } from 'react-redux';
import { submitOrderThunk, storageThunk } from '../store/redux/storage';
import { fetchAllRingtones } from '../store/redux/allRingtones';
import { me } from '../store/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  creditCard: '',
  paymentMethod: 'Credit Card',
  finalRingtones: [],
  totalPrice: 0
};

export class Checkout extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addRingtones = this.addRingtones.bind(this);
  }
  async componentDidMount() {
    await this.props.userData();
    await this.props.getAllRingtones();
    await this.props.getStorage(this.props.userId);
    this.addRingtones();
    this.setState({
      firstName: this.props.firstName || '',
      lastName: this.props.lastName || '',
      email: this.props.email || '',
      totalPrice: this.state.finalRingtones.reduce(function (accumulator, currentValue) {
        return accumulator + Number(currentValue.price)
      }, 0)
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  addRingtones() {
    let storage;
    if (this.props.isLoggedIn) {
      storage = this.props.storage || [];
    } else {
      let ringtoneIds = this.props.storage.map((ringtone) =>
        parseInt(ringtone.id, 10)
      );
      storage =
        this.props.ringtones.filter((ringtone) =>
          ringtoneIds.includes(ringtone.id)
        ) || [];
    }
    this.setState({
      finalRingtones: storage,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const price = Number(this.state.totalPrice);
    console.log(price);
    await this.props.checkOut(
      this.props.userId,
      this.state.paymentMethod,
      this.state.finalRingtones, 
      price
    );
    console.log('submitted!');
    if (this.props.isLoggedIn === false) {
      localStorage.clear();
    }
    this.setState(initialState);
  }
  render() {
    let storage = this.state.finalRingtones;
    return (
      <div>
        <h1>Order Summary</h1>
        <table>
                  {/* <tr>
                      <th>Ringtone</th>
                      <th>Price</th>
                  </tr> */}
            {storage.map((ringtone) => {
              return (
                <tr key={Number(ringtone.id)}>
                    <td>
                    {ringtone.name}
                    </td>
                    <td>
                    ${Number(ringtone.price)/100}
                    </td>
                </tr>
              );
            })}
            <tr>
              <th>
                Tax: 
              </th>
              <th>
              ${((this.state.totalPrice*.04)/100).toFixed(2)}
              </th>
              </tr>
              <tr>
              <th>
                Total: 
              </th>
              <th>
              ${((this.state.totalPrice*1.04)/100).toFixed(2)}
              </th>
              </tr>
            </table>
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
            <select
              name="paymentMethod"
              onChange={this.handleChange}
              value={this.state.paymentMethod}>
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
    storage: state.storage,
    isLoggedIn: !!state.auth.id,
    ringtones: state.ringtones,
  };
};
const mapDispatch = (dispatch, { history }) => {
  return {
    checkOut: (userId, paymentMethod, ringtones, totalPrice) =>
      dispatch(submitOrderThunk(userId, paymentMethod, ringtones, totalPrice, history)),
    getAllRingtones: () => dispatch(fetchAllRingtones()),
    getStorage: (id) => dispatch(storageThunk(id)),
    userData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
