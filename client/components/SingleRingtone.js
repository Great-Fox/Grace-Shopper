import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';

export class SingleRingtone extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getSingleRingtone(this.props.match.params.ringtoneId);
  }
  render() {
    if (!this.props.ringtone.songUrl) {
      return <h1> Loading Ringtone! </h1>;
    } else {
      return (
        <div>
          <h1> Ringtone Infomation </h1>
          <div key={this.props.ringtone.id}>
            <h3>{this.props.ringtone.name}</h3>
            <iframe
              src={`https://open.spotify.com/embed/track/${this.props.ringtone.songUrl.slice(
                14
              )}`}
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"></iframe>
            <h4>{this.props.ringtone.artist}</h4>
            <h6>{this.props.ringtone.genre}</h6>
            <h6>Price ${this.props.ringtone.price}</h6>
            <button>Buy This Ringtone!</button>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    ringtone: state.ringtone,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleRingtone);
