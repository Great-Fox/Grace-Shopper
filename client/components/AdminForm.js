import React from 'react';

export class AdminForm extends React.Component {
    constructor() {
        super()
        this.state= {
            name='',
            artist='',
            genre='',
            songUrl='',
            price= 1.99
        }
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
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>Name</label>
                    <input name="name" onChange={this.handleChange} value={this.state.name} />
                <label>Artist</label>
                    <input name="artist" onChange={this.handleChange} value={this.state.artist} />
                <label>Genre</label>
                    <input name="genre" onChange={this.handleChange} value={this.state.genre} />
                 <label>Song URL</label>
                    <input name="songUrl" onChange={this.handleChange} value={this.state.songUrl} />
                <label>Price</label>
                    <input name="price" onChange={this.handleChange} value={this.state.price} />
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

// mapState = (state) => {
//     return {
//         ringtone
//     }
// }
// mapDispatch = () => {
//     return {

//     }
// }