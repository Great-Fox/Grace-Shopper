import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';
import { deleteMySingleRingtone } from '../store/redux/adminRingtone';
import { Cart } from './Cart';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';

import {
  addToStorage,
  deleteFromStorage,
  storageThunk,
} from '../store/redux/storage';
import AdminForm from './AdminForm';
import AdminUsers from './AdminUsers';

const classes = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 8,
    margin: 'auto',
    maxWidth: 'auto',
  },
};

export class AllRingtones extends React.Component {
  constructor() {
    super();
    this.state = {
      storage: [],
      form: false,
      users: false,
    };

    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getAllRingtones();
    this.props.getStorage();
    console.log(classes);
  }
  addToLocalStorage(id, name) {
    localStorage.setItem(`${id}`, `${name}`);
    this.props.addToStorage(name);
  }
  deleteFromLocalStorage(id, name) {
    localStorage.removeItem(`${id}`, `${name}`);
    this.props.deleteFromStorage(name);
  }
  handleDelete(id) {
    this.props.deleteRingtone(id);
  }

  render() {
    if (!this.props.ringtones.length) {
      return <h1> Loading Ringtones! </h1>;
    } else {
      return (
        <div>
          <h1> These are our wonderful ringtones! </h1>
          {this.props.isAdmin ? (
            <div>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  this.setState({ form: !this.state.form });
                }}>
                Add New Ringtone
              </Button>
              <Link to="/admin/users">See all users with accounts</Link>
            </div>
          ) : null}
          {this.state.form ? <AdminForm /> : null}
          {this.state.users ? <AdminUsers /> : null}
          <div style={{ padding: 20 }}>
            <Grid container justify="center">
              {this.props.ringtones.map((ringtone) => {
                return (
                  <div key={ringtone.id}>
                    <Grid item md style={{ margin: 10 }}>
                      <Paper style={{ padding: 5 }}>
                        <Link to={`/ringtone/${ringtone.id}`}>
                          <h3>{ringtone.name}</h3>
                        </Link>
                        <iframe
                          src={`https://open.spotify.com/embed/track/${ringtone.songUrl.slice(
                            14
                          )}`}
                          width="300"
                          height="380"
                          frameBorder="0"
                          allowtransparency="true"
                          allow="encrypted-media"></iframe>
                        <h4>{ringtone.artist}</h4>
                        <h6>{ringtone.genre}</h6>
                        <h6>Price ${ringtone.price}</h6>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              this.addToLocalStorage(ringtone.id, ringtone.name)
                            }>
                            Add To Cart
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onSubmit={() =>
                              this.deleteFromLocalStorage(
                                ringtone.id,
                                ringtone.name
                              )
                            }>
                            Delete From Cart
                          </Button>
                          {this.props.isAdmin ? (
                            <div>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                  if (
                                    confirm('Are you sure you want to delete?')
                                  ) {
                                    this.handleDelete(ringtone.id);
                                  }
                                }}>
                                DELETE
                              </Button>
                            </div>
                          ) : null}
                        </div>
                      </Paper>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    ringtones: state.ringtones,
    storage: state.storage,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllRingtones: () => dispatch(fetchAllRingtones()),
    addToStorage: (ringtone) => dispatch(addToStorage(ringtone)),
    deleteFromStorage: (ringtone) => dispatch(deleteFromStorage(ringtone)),
    getStorage: () => dispatch(storageThunk()),
    deleteRingtone: (id) => dispatch(deleteMySingleRingtone(id)),
  };
};

export default connect(mapState, mapDispatch)(AllRingtones);
