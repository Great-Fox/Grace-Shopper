import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';
import { storageThunk } from '../store/redux/storage'

export class AllRingtones extends React.Component {
  constructor() {
    super();
    this.addToLocalStorage = this.addToLocalStorage.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllRingtones();
  }

  addToLocalStorage(id, name) {
    localStorage.setItem(`${id}`, `${name}`)
    this.props.getStorage(this.props.userId);
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
                    <button onClick = {() => this.addToLocalStorage(ringtone.id, ringtone.name)} >
                      Add To Cart
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
    userId: state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllRingtones: () => dispatch(fetchAllRingtones()),
    getStorage: (id) => dispatch(storageThunk(id))
  };
};

export default connect(mapState, mapDispatch)(AllRingtones);
