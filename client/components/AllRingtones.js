import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';

export class AllRingtones extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAllRingtones();
  }
  render() {
    if (!this.props.ringtones) {
      return <h1> Loading Ringtones! </h1>;
    } else {
      console.log(this.props.ringtones);
      return (
        <div>
          <h1> These are our wonderful ringtones! </h1>
          {this.props.ringtones.map((ringtone) => {
            return (
<div key={ringtone.id}>
              <h3>{ringtone.name}</h3>
              {/* <iframe
                src={ringtone.songUrl}
                width="300"
                height="380"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"></iframe> */}
              <h4>{ringtone.artist}</h4>
              <h6>{ringtone.genre}</h6>
            </div>
            )
            
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
