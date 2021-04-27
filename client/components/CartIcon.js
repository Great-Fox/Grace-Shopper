import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';
import { storageThunk } from '../store/redux/storage'


export class CartIcon extends React.Component {
  async componentDidMount(){
    this.props.getStorage(this.props.userId);
  }
  
  async componentDidUpdate(prevProps){
    // await this.props.getStorage(this.props.userId)
    if (this.props.userId !== prevProps.userId) {
      await this.props.getStorage(this.props.userId);
      console.log(this.props.userId)
    }
  }
  render(){
    return(
      <div>
        <Link to="/cart">
          <Badge badgeContent={this.props.storage.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Link>
    </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    storage: state.storage,
    userId: state.auth.id
  };
};
const mapDispatch = (dispatch) => {
  return {
    getStorage: (id) => dispatch(storageThunk(id))
  };
};
export default connect(mapState, mapDispatch)(CartIcon);