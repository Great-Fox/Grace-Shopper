import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import { storageThunk } from '../store/redux/storage';

export class Cart extends React.Component {
    constructor(){
        super()
        this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this)
    }

    componentDidMount(){
        //see if they are a user
        //if they are a user, see if they already have an open cart
        //if they do have an open cart, set local storage to their open cart
        //if they do not have an open cart, just stick with local storage (function below)
        this.props.getStorage()
    }

    deleteFromLocalStorage(id, name) {
        localStorage.removeItem(`${id}`, `${name}`)
        this.props.getStorage()
    }
    componentWillUnmount(){
        //check and see if there is a valid token
        //if there is a token, we try to get the cart that they already have in the db
        //if they do have a cart, we replace it with what's in our local storage
        //if they do not have a cart, we make a new one and add in local storage relationships
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
                                    <button onClick = {() => this.deleteFromLocalStorage(ringtone.id, ringtone.name)}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id)),
    getStorage: () => dispatch(storageThunk()),
  };
};

export default connect(mapState, mapDispatchToProps)(Cart);
