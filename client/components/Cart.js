import React from 'react';
import { connect } from 'react-redux';
import { fetchAllRingtones } from '../store/redux/allRingtones';

export class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            storage: []
        }
    }
    componentDidUpdate() {
        this.setState({
            storage: localStorage
        })
    }
    render() {
            let songList = Object.entries(this.state.storage)
            console.log(songList)
            return (
                <div>
                    {songList.map(song => {
                        return (
                        <div key={song[0]}>
                            {song[1]}
                        </div>)
                    })}
                </div>
            )
    }
}