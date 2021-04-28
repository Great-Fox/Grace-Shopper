import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import {
  editMySingleRingtone,
  deleteMySingleRingtone,
} from '../store/redux/adminRingtone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';

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
    this.props.history.push('/ringtone');
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.edit({ ...this.props.ringtone, ...this.state });
    this.setState({
      isInEditMode: false,
    });
  }

  render() {
    if (!this.props.ringtone.songUrl) {
      return <h1> Loading Ringtone! </h1>;
    } else {
      return (
        <div>
          <Container>
          <form id="edit-ringtone" onSubmit={this.handleSubmit}>
            <h1> Ringtone Infomation </h1>
            <div key={this.props.ringtone.id}>
              {this.state.isInEditMode ? (
                <Grid container spacing={3} >
                  <Grid item xs={12}  style={{marginTop: 30}}>
                    <TextField
                    margin="normal"
                    label="Ringtone name"
                    name="name"
                    size="small"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.name}
                    required
                    />
                  </Grid>
                  <Grid item xs={12}  style={{marginTop: 30}}>
                    <TextField
                    margin="normal"
                    label="Song URL"
                    name="songUrl"
                    size="small"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.songUrl}
                    />
                  </Grid>
                  <Grid item xs={12}  style={{marginTop: 30}}>
                    <TextField
                    margin="normal"
                    label="Artist"
                    name="artist"
                    size="small"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.artist}
                    />
                  </Grid>
                  <Grid item xs={12}  style={{marginTop: 30}}>
                    <TextField
                    margin="normal"
                    label="Genre"
                    name="genre"
                    size="small"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.genre}
                    />
                  </Grid>
                  <Grid item xs={12}  style={{marginTop: 30}}>
                    <TextField
                    margin="normal"
                    label="Price"
                    name="price"
                    size="small"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.price}
                    />
                  </Grid>
                  <Button variant="contained" color="primary" type="submit">
                    Save Changes
                  </Button>
                  <Button variant="contained" color="primary" type="submit" onClick={() => {
                                  history.push(`/ringtone/${this.props.ringtone.id}`);
                                }}>
                  Cancel
                  </Button>
                </Grid>
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
                    <h6>Price ${(this.props.ringtone.price)/100}</h6>
                  </div>
                  <br />
                  <Button variant="contained" color="primary">
                    Buy This Ringtone!
                  </Button>
                  <br />
                </div>
              )}
              {this.props.isAdmin ? (
                <div>
                  <br />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete?')) {
                        this.handleDelete(this.props.ringtone.id);
                      }
                    }}>
                    Delete Ringtone
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.changeEditMode}>
                    Edit Ringtone
                  </Button>
                </div>
              ) : null}
            </div>
          </form>
          </Container>
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
