import React from 'react';
import { connect } from 'react-redux';
import AdminUsers from './AdminUsers';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;

  return (
    <div >
      <div className="title">
       <h4> 
          {firstName ? (`Hello, ${firstName}! Welcome back to...`) : (`Welcome to`)}
      </h4>
        <img src="https://i.picasion.com/gl/91/exry.gif" width="700.8" height="36" border="0" alt="glitter maker" />
        </div>
       <div>
      <Link to={'/ringtone'}>
            <Button
                style={{marginLeft: 5, marginTop: 5}}      
                color="secondary"
                variant="contained"
               >Start Shopping</Button>
            </Link>
            </div>

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
