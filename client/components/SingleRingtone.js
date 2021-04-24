import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import { editMySingleRingtone } from '../store/redux/adminRingtone'

const initialState = {
  name: '',
  artist: '',
  genre: '',
  songUrl: '',
  price: 1.99,
  isInEditMode: false
}

export class SingleRingtone extends React.Component {
  constructor() {
    super();
    this.state = initialState
    this.changeEditMode = this.changeEditMode.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
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
      [event.target.name]: event.target.value
    });
  }
  
  changeEditMode () {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.edit({...this.props.ringtone, ...this.state});
    this.setState({
      isInEditMode: false
    })
    alert("SAVED!");
  }

  render() {
    console.log("state", this.state)
    if (!this.props.ringtone.songUrl) {
      return <h1> Loading Ringtone! </h1>;
    } else {
      return (
        <div>
          <form id="todo-form" onSubmit={this.handleSubmit}>
          <h1> Ringtone Infomation </h1>
          <div key={this.props.ringtone.id}>

            {
              this.state.isInEditMode ? (
                <div>
                <h1>Name: </h1>
                <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>
              ) : (
                <div onClick={this.changeEditMode}>
                <h1>Name: </h1>
                <h3>{this.props.ringtone.name}</h3>
                </div>
              )
            }
            

            {/* <h1>Name: </h1>
                <h3>{this.props.ringtone.name}</h3> */}
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
          <button type="submit">Save Changes</button>
          </form>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    ringtone: state.ringtone,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id)),
    edit: (ringtone) => dispatch(editMySingleRingtone(ringtone))
  };
};

export default connect(mapState, mapDispatch)(SingleRingtone);
