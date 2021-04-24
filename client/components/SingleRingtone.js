import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import {
  editMySingleRingtone,
  deleteMySingleRingtone,
} from '../store/redux/adminRingtone';

const initialState = {
  name: '',
  artist: '',
  genre: '',
  songUrl: '',
  price: 1.99,
  isInEditMode: false,
};

export class SingleRingtone extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.getSingleRingtone(this.props.match.params.ringtoneId);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        name: this.props.ringtone.name || '',
        artist: this.props.ringtone.artist || '',
        genre: this.props.ringtone.genre || '',
        songUrl: this.props.ringtone.songUrl || '',
        price: this.props.ringtone.price || 1.99,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  changeEditMode() {
    if (this.props.isAdmin) {
      this.setState({
        isInEditMode: !this.state.isInEditMode,
      });
    }
  }
  handleDelete(id) {
    this.props.deleteRingtone(id);
    this.props.history.goBack();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.edit({ ...this.props.ringtone, ...this.state });
    this.setState({
      isInEditMode: false,
    });
  }

  render() {
    console.log('state', this.state);
    if (!this.props.ringtone.songUrl) {
      return <h1> Loading Ringtone! </h1>;
    } else {
      return (
        <div>
          <form id="edit-ringtone" onSubmit={this.handleSubmit}>
            <h1> Ringtone Infomation </h1>
            <div key={this.props.ringtone.id}>
              {this.state.isInEditMode ? (
                <div>
                  <input
                    label="Name:"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    name="songUrl"
                    label="Song URL:"
                    type="text"
                    value={this.state.songUrl}
                    onChange={this.handleChange}
                  />
                  <br />
                  {/* <iframe
                    src={`https://open.spotify.com/embed/track/${this.state.songUrl.slice(
                      14
                    )}`}
                    width="300"
                    height="380"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"></iframe> */}
                  <input
                    label="Artist:"
                    value={this.state.artist}
                    name="artist"
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    name="genre"
                    value={this.state.genre}
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    name="price"
                    label="Price:"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                  <br />
                  <button type="submit">Save Changes</button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete?')) {
                        this.handleDelete(this.state.ringtone.id);
                      }
                    }}>
                    DELETE
                  </button>
                </div>
              ) : (
                <div>
                  <div onClick={this.changeEditMode}>
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
                  </div>
                  <button>Buy This Ringtone!</button>
                </div>
              )}
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    ringtone: state.ringtone,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id)),
    edit: (ringtone) => dispatch(editMySingleRingtone(ringtone)),
    deleteRingtone: (id) => dispatch(deleteMySingleRingtone(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleRingtone);
