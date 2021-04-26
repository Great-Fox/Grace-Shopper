import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import { storageThunk, removeItemThunk } from '../store/redux/storage';

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
        console.log(this.props, 'cart props');
            return (
                <div>
                    This is Cart!
                    {!ringtoneList || ringtoneList.length === 0 ? 'NOTHING IN CART' : ringtoneList.map(ringtone => {
                        return (
                            <div key={Number(ringtone.id)} >
                                {ringtone.name}
                                <div>
                                    <button onClick = {() => this.props.removeItem(ringtone.id, ringtone.name, this.props.userId)}>
                                        Delete From Cart
                                    </button>
                                </div>
                            </div>
                            )
                        }
                    )
                }
                <button>Check Out</button>
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
