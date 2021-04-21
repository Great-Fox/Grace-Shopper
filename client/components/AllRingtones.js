import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';
import { Cart } from './Cart'

export class AllRingtones extends React.Component {
  constructor() {
    super();
    this.addToStorage = this.addToStorage.bind(this)
    this.deleteFromStorage = this.deleteFromStorage.bind(this)
  }
  componentDidMount() {
    this.props.getAllRingtones();
  }
  addToStorage(id, name) {
    localStorage.setItem(`${id}`, `${name}`)
  }
  deleteFromStorage(id, name) {
    localStorage.removeItem(`${id}`, `${name}`)
  }
  render() {
    if (!this.props.ringtones.length) {
      return <h1> Loading Ringtones! </h1>;
    } else {
      return (
        <div>
          <h1> These are our wonderful ringtones! </h1>
          <Cart />
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
                <button onClick = {() => this.addToStorage(ringtone.id, ringtone.name)}>
                  Add To Cart
                </button>
                <button onClick = {() => this.deleteFromStorage(ringtone.id, ringtone.name)}>
                  Delete From Cart
                </button>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllRingtones: () => dispatch(fetchAllRingtones()),
  };
};

export default connect(mapState, mapDispatch)(AllRingtones);
