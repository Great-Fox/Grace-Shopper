import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/redux/adminUsers';

class AdminUsers extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    {
      if (!this.props.isAdmin) {
        return <h2>I'm sorry you don't have access to this page!</h2>;
      } else if (!this.props.users.length) {
        return <h2>Loading!</h2>;
      } else {
        return (
          <div>
            <h1>Here are all our customers with accounts:</h1>
            {this.props.users.map((user) => {
              return (
                <div>
                  <h5>First Name: {user.firstName}</h5>
                  <h5>Last Name: {user.lastName}</h5>
                  <h5>Email: {user.email}</h5>
                  <br />
                </div>
              );
            })}
          </div>
        );
      }
    }
  }
}

const mapState = (state) => ({
  users: state.users,
  isAdmin: state.auth.isAdmin,
});

const mapDispatch = (dispatch) => ({
  getAllUsers: () => dispatch(getUsers()),
});

export default connect(mapState, mapDispatch)(AdminUsers);
