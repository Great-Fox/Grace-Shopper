import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import { storageThunk, removeItemThunk } from '../store/redux/storage';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//import useStyles from './styleSheet';
  

export class Cart extends React.Component {
  componentDidMount() {
    const TOKEN = 'token';
    const token = window.localStorage.getItem(TOKEN);
    if (!token) {
      this.props.getStorage();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props.getStorage(this.props.userId);
    }
  }

  render() {
    let ringtoneList = this.props.storage || [];
    return (
      <div>
        <div className="cheating">
        {!ringtoneList || ringtoneList.length === 0 ? (
           <Grid item md style={{ margin: 10 }}>
            <Typography className="cheating" variant="h5" >
            Your cart is empty! Click below to see our ringtones.
          </Typography>
            <Link to={'/ringtone'}>
            <Button
                style={{marginLeft: 5, marginTop: 5}}      
                color="secondary"
                variant="contained"
               >View Ringtones</Button>
            </Link>
          </Grid>
        ) : (
            <Grid item md style={{ margin: 10 }}>
              <table>
                  <tr>
                      <th>Ringtone</th>
                      <th>Price</th>
                      <th></th>
                  </tr>
            {ringtoneList.map((ringtone) => {
              return (
                <tr key={Number(ringtone.id)}>
                    <td>
                    {ringtone.name}
                    </td>
                    <td>
                    ${Number(ringtone.price)/100}
                    </td>
                  <td>
                    <Button
                style={{marginLeft: 5, marginTop: 5}}      
                color="secondary"
                variant="text"
                onClick={() =>
                    this.props.removeItem(
                      ringtone.id,
                      ringtone.name,
                      this.props.userId
                    )
                  }>Remove</Button>
                  </td>
                </tr>
              );
            })}
            
            </table>

            <Link to={'/checkout'}>
            <Button
                style={{marginLeft: 5, marginTop: 5}}      
                color="secondary"
                variant="contained"
               >Check Out</Button>
            </Link>
          </Grid>
        )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    storage: state.storage,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id)),
    getStorage: (id) => dispatch(storageThunk(id)),
    removeItem: (ringtoneId, ringtoneName, userId) =>
      dispatch(removeItemThunk(ringtoneId, ringtoneName, userId)),
  };
};

export default connect(mapState, mapDispatchToProps)(Cart);
