import React from 'react';
import { connect } from 'react-redux';
import AdminUsers from './AdminUsers';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;

  return (
    <div>
      <h3>Welcome to your Ringtone World!</h3>
      {firstName ? (<p>Hi, Welcome back {firstName}</p>) : null}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(Home);
