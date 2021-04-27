import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import { storageThunk, removeItemThunk } from '../store/redux/storage';
import { Link } from 'react-router-dom';

export class Cart extends React.Component {

    componentDidMount() {
        const TOKEN = 'token';
        const token = window.localStorage.getItem(TOKEN);
        if (!token) {
            this.props.getStorage();
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.userId !== this.props.userId) {
            this.props.getStorage(this.props.userId);
        }  
    }

    render() {
        let ringtoneList = this.props.storage || []
            return (
                <div>
                    {!ringtoneList || ringtoneList.length === 0 ? (
                    <div>
                        <p>Your cart is empty! Click below to see our ringtones.</p>
                        <Link to={'/ringtone'}> 
                        <button>
                            View ringtones
                        </button>
                        </Link>
                    </div> ): (
                        <div>
                        {ringtoneList.map(ringtone => {
                        return (
                            <div key={Number(ringtone.id)} >
                                {ringtone.name}
                                <div>
                                    <button onClick = {() => this.props.removeItem(ringtone.id, ringtone.name, this.props.userId)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                            )
                        })}
                    
        
                <Link to={'/checkout'}> 
                    <button>Check Out</button>
                </Link>
                </div>
    )}
                
                </div>

            )
    }
}

const mapState = (state) => {
  return {
    storage: state.storage,
    userId: state.auth.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id)),
    getStorage: (id) => dispatch(storageThunk(id)),
    removeItem: (ringtoneId, ringtoneName, userId) => dispatch(removeItemThunk(ringtoneId, ringtoneName, userId))
  };
};

export default connect(mapState, mapDispatchToProps)(Cart);
