import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';
<<<<<<< HEAD
import { storageThunk } from '../store/redux/storage'
=======
import { Cart } from './Cart';
import {
  addToStorage,
  deleteFromStorage,
  storageThunk,
} from '../store/redux/storage';
>>>>>>> 90272d3df8fe23bc5a356bf1380e654ba4840166

export class AllRingtones extends React.Component {
  constructor() {
    super();
<<<<<<< HEAD
    this.addToLocalStorage = this.addToLocalStorage.bind(this)
=======
    this.state = {
      storage: [],
    };
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);
>>>>>>> 90272d3df8fe23bc5a356bf1380e654ba4840166
  }

  componentDidMount() {
    this.props.getAllRingtones();
    this.props.getStorage();
  }

  addToLocalStorage(id, name) {
<<<<<<< HEAD
    localStorage.setItem(`${id}`, `${name}`)
    this.props.getStorage()
=======
    localStorage.setItem(`${id}`, `${name}`);
    this.props.addToStorage(name);
  }
  deleteFromLocalStorage(id, name) {
    localStorage.removeItem(`${id}`, `${name}`);
    this.props.deleteFromStorage(name);
>>>>>>> 90272d3df8fe23bc5a356bf1380e654ba4840166
  }

  render() {
    if (!this.props.ringtones.length) {
      return <h1> Loading Ringtones! </h1>;
    } else {
      return (
        <div>
          <h1> These are our wonderful ringtones! </h1>
          {this.props.ringtones.map((ringtone) => {
            return (
              <div key={ringtone.id}>
                <h3>{ringtone.name}</h3>
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
<<<<<<< HEAD
                    <button onClick = {() => this.addToLocalStorage(ringtone.id, ringtone.name)} >
                      Add To Cart
                    </button>
=======
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
>>>>>>> 90272d3df8fe23bc5a356bf1380e654ba4840166
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllRingtones: () => dispatch(fetchAllRingtones()),
<<<<<<< HEAD
    getStorage: () => dispatch(storageThunk())
=======
    addToStorage: (ringtone) => dispatch(addToStorage(ringtone)),
    deleteFromStorage: (ringtone) => dispatch(deleteFromStorage(ringtone)),
    getStorage: () => dispatch(storageThunk()),
>>>>>>> 90272d3df8fe23bc5a356bf1380e654ba4840166
  };
};

export default connect(mapState, mapDispatch)(AllRingtones);
