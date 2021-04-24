import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';
import { Cart } from './Cart';
import {
  addToStorage,
  deleteFromStorage,
  storageThunk,
} from '../store/redux/storage';
import AdminForm from './AdminForm'

export class AllRingtones extends React.Component {
  constructor() {
    super();
    this.state = {
      storage: [],
      form: false
    };
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);
  }
  componentDidMount() {
    this.props.getAllRingtones();
    this.props.getStorage();
  }
  addToLocalStorage(id, name) {
    localStorage.setItem(`${id}`, `${name}`);
    this.props.addToStorage(name);
  }
  deleteFromLocalStorage(id, name) {
    localStorage.removeItem(`${id}`, `${name}`);
    this.props.deleteFromStorage(name);
  }
  render() {
    // if its admin login in, need to render AdminForm component 
    if (!this.props.ringtones.length) {
      return <h1> Loading Ringtones! </h1>;
    } else {
      return (
        <div>
          <h1> These are our wonderful ringtones! </h1>
          {this.props.isAdmin ? (
            <button onClick={()=>{this.setState({form: !this.state.form})}}>Add New Ringtone</button>
          ) : null
          }
          {
            this.state.form ? (
              <AdminForm />
            ) : null
          }
          {this.props.ringtones.map((ringtone) => {
            return (
              <div key={ringtone.id}>
                <h3>{ringtone.name}</h3>
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
                  <button
                    onClick={() =>
                      this.addToLocalStorage(ringtone.id, ringtone.name)
                    }>
                    Add To Cart
                  </button>

                  <button
                    onClick={() =>
                      this.deleteFromLocalStorage(ringtone.id, ringtone.name)
                    }>
                    Delete From Cart
                  </button>
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
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllRingtones: () => dispatch(fetchAllRingtones()),
    addToStorage: (ringtone) => dispatch(addToStorage(ringtone)),
    deleteFromStorage: (ringtone) => dispatch(deleteFromStorage(ringtone)),
    getStorage: () => dispatch(storageThunk()),
  };
};

export default connect(mapState, mapDispatch)(AllRingtones);
