import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import AllRingtones from './components/AllRingtones';
import SingleRingtone from './components/SingleRingtone';
import Home from './components/Home';
import { me } from './store';
import Navbar from './components/Navbar';
import Cart from './components/Cart'
import AdminUsers from './components/AdminUsers';
import Checkout from './components/Checkout';
import UserInfo from './components/AccountInfo/UserInfo';
import OrderHistory from './components/AccountInfo/OrderHistory';
import EditInfo from './components/AccountInfo/EditInfo';
import ThankYou from './components/ThankYou';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ringtone" exact component={AllRingtones} />
          <Route
            path="/ringtone/:ringtoneId"
            exact
            component={SingleRingtone}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/admin/users" component={AdminUsers} />
          <Route exact path="/account" component={UserInfo} />
          <Route exact path="/account/:userId" component={OrderHistory} />
          <Route exact path="/account/:userId/edit" component={EditInfo} />
          <Route exact path="/thankyou" component={ThankYou} />
        </Switch>
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
