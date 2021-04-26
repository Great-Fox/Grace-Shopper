import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/redux/adminUsers';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'email', headername: 'Email', width: 200 },
];
class AdminUsers extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    {
      if (!this.props.users.length) {
        return <h2>Loading!</h2>;
      } else if (!this.props.isAdmin) {
        return <h2>I'm sorry you don't have access to this site!</h2>;
      } else {
        return (
          <div>
            <h1>Here are all our customers with accounts:</h1>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1, height: '100%' }}>
                <DataGrid columns={columns} rows={this.props.users} />
              </div>
            </div>
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
