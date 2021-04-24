import React from 'react';
import { connect } from 'react-redux';
import { submitSingleRingtone } from '../store/redux/adminRingtone'

const initialState = {
    name: '',
    artist: '',
    genre: '',
    songUrl: '',
    price: 1.99
}

export class AdminForm extends React.Component {
    constructor() {
        super()
        this.state = initialState
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit(evt) {
        evt.preventDefault();
        // should set the price * 100
        this.props.submitRingtone({...this.state})
        this.setState(initialState)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>Name</label>
                    <input name="name" onChange={this.handleChange} value={this.state.name} required />
                <label>Artist</label>
                    <input name="artist" onChange={this.handleChange} value={this.state.artist} />
                <label>Genre</label>
                    <input name="genre" onChange={this.handleChange} value={this.state.genre} />
                 <label>Song URL</label>
                    <input name="songUrl" onChange={this.handleChange} value={this.state.songUrl} />
                <label>Price</label>
                    <input name="price" onChange={this.handleChange} value={this.state.price} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

const mapState = ({ringtones}) => ({
    ringtones
})
const mapDispatch = (dispatch) => {
    return {
        submitRingtone: (ringtone) => dispatch(submitSingleRingtone(ringtone))
    }
}

export default connect(mapState, mapDispatch)(AdminForm)