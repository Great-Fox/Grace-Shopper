import React, { useState } from 'react';
import { connect } from 'react-redux';
import { me } from '../store/auth';
import { submitOrderThunk, storageThunk } from '../store/redux/storage';
import { fetchAllRingtones } from '../store/redux/allRingtones';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';



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
      <Container maxWidth="xs">
        <form onSubmit={this.handleSubmit}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      size="small"
                      variant="standard"
                      required
                      onChange={this.handleChange}
                      value={this.state.firstName}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      size="small"
                      variant="standard"
                      required
                      onChange={this.handleChange}
                      value={this.state.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      size="small"
                      variant="standard"
                      required
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                </Grid>
            {/* <input
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            /> */}
            {/* <select
              name="paymentMethod"
              onChange={this.handleChange}
              value={this.state.paymentMethod}>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Venmo">Venmo</option>
            </select> */}
            <Grid item xs={12}>
            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.paymentMethod}
              onChange={this.handleChange}
              fullWidth
              required
              >
                <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
                <MenuItem value={"PayPal"}>PayPal</MenuItem>
                <MenuItem value={"Venmo"}>Venmo</MenuItem>
            </Select>
            </Grid>
            <Grid item xs={12}>
                <TextField
                      fullWidth
                      label="Card Number"
                      name="creditCard"
                      size="small"
                      variant="standard"
                      onChange={this.handleChange}
                      value={this.state.creditCard}
                    />
                </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 8 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit">
                  Place Order
                </Button>
            </Grid>
          </Grid>
          </Grid>
        </form>
        </Container>
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
