import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';
import { deleteMySingleRingtone } from '../store/redux/adminRingtone';
import { Cart } from './Cart';
import { Link } from 'react-router-dom';

import {
  deleteFromStorage,
  storageThunk, addItemThunk
} from '../store/redux/storage';
import AdminForm from './AdminForm';
import AdminUsers from './AdminUsers';

export class AllRingtones extends React.Component {
  constructor() {
    super();
    this.state = {
      storage: [],
      form: false,
      users: false,
    };
    // this.addToStorage = this.addToStorage.bind(this);
    //this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.props.getAllRingtones();
  }

  // addToStorage(ringtoneId, ringtoneName, userId) {
    
  //   this.props.getStorage(this.props.userId);
  // }
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
              <button
                onClick={() => {
                  this.setState({ form: !this.state.form });
                }}>
                Add New Ringtone
              </button>
              <Link to="/admin/users">See all users with accounts</Link>
            </div>
          ) : null}
          {this.state.form ? <AdminForm /> : null}
          {this.state.users ? <AdminUsers /> : null}
          {this.props.ringtones.map((ringtone) => {
            return (
              <div key={ringtone.id}>
                <Link to={`/ringtone/${ringtone.id}`}>
                  <h3>{ringtone.name}</h3>
                </Link>
                <iframe
                  src={`https://open.spotify.com/embed/track/${ringtone.songUrl.slice(14)}`}
                  width="300"
                  height="380"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"></iframe>
                <h4>{ringtone.artist}</h4>
                <h6>{ringtone.genre}</h6>
                <h6>Price ${ringtone.price}</h6>
                <div>
                  <button
                    onClick={() => {console.log(ringtone);
                      this.props.addItem(ringtone.id, ringtone.name, this.props.userId)
                    }}>
                    Add To Cart
                  </button>
                  {this.props.isAdmin ? (
                    <div>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete?')) {
                            this.handleDelete(ringtone.id);
                          }
                        }}>
                        DELETE
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    ringtones: state.ringtones,
    storage: state.storage,
    userId: state.auth.id,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllRingtones: () => dispatch(fetchAllRingtones()),
    addItem: (ringtoneId, ringtoneName, userId) => dispatch(addItemThunk(ringtoneId, ringtoneName, userId)),
    getStorage: (id) => dispatch(storageThunk(id)),
    deleteRingtone: (id) => dispatch(deleteMySingleRingtone(id)),
  };
};

export default connect(mapState, mapDispatch)(AllRingtones);
