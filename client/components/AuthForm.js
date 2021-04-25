import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

/**
 * COMPONENT
 */

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="xs">
        <form onSubmit={handleSubmit} name={name}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {displayName === 'Sign Up' ? (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="FirstName"
                      size="small"
                      variant="standard"
                      required
                    />
                  </Grid>
                ) : null}
                {displayName === 'Sign Up' ? (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      size="small"
                      variant="standard"
                      required
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    size="small"
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    size="small"
                    type="password"
                    variant="standard"
                    required
                  />
                  {/* <label htmlFor="password">
                    <small>Password</small>
                  </label>
                  <input
                    placeholder="Password"
                    name="password"
                    type="password"
                  /> */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit">
                  {displayName}
                </Button>
              </Grid>
              {error && error.response && <div> {error.response.data} </div>}
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (evt.target.firstName) {
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(
          authenticate(email, password, formName, history, firstName, lastName)
        );
      } else {
        dispatch(authenticate(email, password, formName, history));
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
