import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone} from '../store/redux/singleRingtone';
import { storageThunk } from '../store/redux/storage'

export class Cart extends React.Component {
    constructor() {
        super()
        // this.state = {
        //     storage: []
        // }
    }
    // componentDidMount() {
    //     this.props.getStorage()
    // }
    render() {
            let songList = this.props.ringtones || []
            console.log(songList, 'cart props');
            return (
                <div>
                    This is Cart!
                    {!songList || songList.length === 0 ? 'NOTHING IN CART' : songList.map(song => {
                        return (
                            <div key={Number(song.id)} >
                                {song.name}
                            </div>
                            )
                        })
                    }
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