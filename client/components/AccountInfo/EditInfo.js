import React from 'react';
import { connect } from 'react-redux';
import { editUserInfoThunk, getUserInfoThunk } from '../../store/redux/user';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export class EditInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId);
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        firstName: this.props.user.firstName || '',
        lastName: this.props.user.lastName || '',
        email: this.props.user.email || '',
      });
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.edit({ ...this.props.user, ...this.state });
    this.props.history.push('/ringtone');
  }

  render() {
    return (
      <Container>
        <form id="account-form" onSubmit={this.handleSubmit}>
        <Grid container spacing={3} >
          <Grid item xs={12}>
            <Grid container >
              <Grid item xs={12}  style={{marginTop: 30}}>
                <TextField
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  size="small"
                  variant="outlined"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  required
                  />
              </Grid>
               <Grid item xs={12}  style={{marginTop: 12}}>
                <TextField
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  size="small"
                  variant="outlined"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  required
                  />
              </Grid>
              <Grid item xs={12}  style={{marginTop: 12}}>
                <TextField
                  margin="normal"
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                  />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{marginTop: 20}}>
                <Button 
                  color="secondary" 
                  variant="contained" 
                  type="submit">
                    Submit
                </Button>
                <Button 
                  style={{marginLeft: 12}}
                  color="secondary" 
                  variant="contained" 
                  type="submit"
                  onClick={() => {
                    this.props.history.push('/ringtone');
                  }}>
                    Cancel
                </Button>
                <Grid>
                    </Grid>
                </Grid>
      </form>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    edit: (user) => dispatch(editUserInfoThunk(user)),
    getUser: (id) => dispatch(getUserInfoThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(EditInfo);
