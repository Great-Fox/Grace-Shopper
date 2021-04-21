import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone} from '../store/redux/singleRingtone';

export class Cart extends React.Component {
    constructor() {
        super()
        // this.state = {
        //     storage: []
        // }
    }
    // componentDidUpdate() {
    //     this.setState({
    //         storage: localStorage
    //     })
    // }
    render() {
            // let songList = Object.entries(this.state.storage)
            console.log("this props", this.props.ringtones)
            console.log("type", this.props.ringtones[0].id)
            console.log("id", this.props.id)
            return (
                <div>
                    This is Cart!
                {/* //     {songList.map(song => {
                //         return (
                //         <div key={song[0]}>
                //             {song[1]}
                //         </div>)
                //     })} */}
                {/* { this.props.ringtones === undefined || this.props.ringtones.length === 0 ? ("Loading") : (

                )} */}
                    <div>
                        {this.props.ringtones.filter((cur) => {
                            if(cur.id === this.props.id) {
                                return (
                                    <p>
                                        {cur.name}
                                    </p>
                                )
                            }
                        })}
                    </div>

                <div>
                    <button onClick = {() => this.props.addToStorage(this.props.id, this.props.name)}>
                    Add To Cart
                    </button>

                    <button onClick = {() => this.props.deleteFromStorage(this.props.id, this.props.name)}>
                    Delete From Cart
                    </button>
                </div>
                </div>

            )
    }
}

const mapState = (ringtone) => {
    return ringtone.ringtone
}

const mapDispatchToProps = (dispatch) => ({
    getSingleRingtone: (id) => dispatch(fetchSingleRingtone(id))
})

export default connect(mapState, mapDispatchToProps)(Cart)