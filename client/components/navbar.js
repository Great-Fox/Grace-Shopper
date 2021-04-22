import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';
import { storageThunk } from '../store/redux/storage'

export class Navbar extends React.Component {
  componentDidMount(){
    this.props.getStorage()
  }
// const Navbar = ({ handleClick, isLoggedIn, firstName, storage }) => (
  render(){
    console.log("navbar", this.state)
    return(
      <div>
      <nav>
        {this.props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={this.props.handleClick}>
              Logout
            </a>
            <p>Welcome {this.props.firstName}!</p>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to="/cart">
          <Badge badgeContent={this.props.storage.length}>
            <ShoppingCartIcon />
          </Badge>
        </Link>
      </nav>
      <hr />
    </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
    storage: state.storage
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getStorage: () => dispatch(storageThunk())
  };
};

export default connect(mapState, mapDispatch)(Navbar);
