import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone} from '../store/redux/singleRingtone';
import { storageThunk } from '../store/redux/storage'

export class Cart extends React.Component {
    constructor(){
        super()
        this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this)
    }

    componentDidMount(){
        this.props.getStorage()
    }

    deleteFromLocalStorage(id, name) {
        localStorage.removeItem(`${id}`, `${name}`)
        this.props.getStorage()
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
        storage: state.storage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id)),
        getStorage: () => dispatch(storageThunk())
    }
}

export default connect(mapState, mapDispatchToProps)(Cart)