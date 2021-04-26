import React from 'react';
import { connect } from 'react-redux';
import { submitSingleRingtone } from '../store/redux/adminRingtone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const initialState = {
  name: '',
  artist: '',
  genre: '',
  songUrl: '',
  price: '',
};

export class AdminForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    // should set the price * 100
    this.props.submitRingtone({ ...this.state });
    this.setState(initialState);
  }
  render() {
    return (
        <Container maxWidth="xs">
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container >
                            <Grid item xs={12}  style={{marginTop: 8}}>
                                <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                size="small"
                                variant="outlined"
                                onChange={this.handleChange}
                                value={this.state.name}
                                required
                                />
                            </Grid>
                            <Grid item xs={12}  style={{marginTop: 8}}>
                            <TextField
                                fullWidth
                                label="Artist"
                                size="small"
                                variant="outlined"                           
                                name="artist"
                                onChange={this.handleChange}
                                value={this.state.artist}
                            />
                            </Grid>
                            <Grid item xs={12}  style={{marginTop: 8}}>
                            <TextField
                                fullWidth
                                label="Genre"
                                size="small"
                                variant="outlined"                           
                                name="genre"
                                onChange={this.handleChange}
                                value={this.state.genre}
                            />
                            </Grid>
                            <Grid item xs={12} style={{marginTop: 8}}>
                            <TextField
                                fullWidth
                                label="Song URL"
                                size="small"
                                variant="outlined"                           
                                name="songUrl"
                                onChange={this.handleChange}
                                value={this.state.songUrl}
                            />
                            </Grid>
                            <Grid item xs={12} style={{marginTop: 8}}>
                            <TextField
                                fullWidth
                                label="Price"
                                size="small"
                                variant="outlined"                           
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.price}
                                required
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                    <Grid style={{marginTop: 8}}>
                        <Button 
                            fullWidth
                            color="secondary" 
                            variant="contained" 
                            type="submit">
                        Submit
                        </Button>
                    <Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
  }
}

const mapState = ({ ringtones }) => ({
  ringtones,
});
const mapDispatch = (dispatch) => {
  return {
    submitRingtone: (ringtone) => dispatch(submitSingleRingtone(ringtone)),
  };
};

export default connect(mapState, mapDispatch)(AdminForm);
