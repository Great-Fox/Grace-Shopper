import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleRingtone } from '../store/redux/singleRingtone';
import { storageThunk } from '../store/redux/storage';

export class Cart extends React.Component {
  constructor() {
    super();
    // this.state = {
    //     storage: []
    // }
  }
  // componentDidMount() {
  //     this.props.getStorage()
  // }
  render() {
    let songList = this.props.storage || [];
    return (
      <div>
        This is Cart!
        {this.songList !== false || this.songList.length === 0
          ? 'NOTHING IN CART'
          : songList.map((song) => {
              return <div key={song[0]}>{song[1]}</div>;
            })}
        {/* { this.props.ringtones === undefined || this.props.ringtones.length === 0 ? ("Loading") : (

                )} */}
        {/* <div>
                        {this.props.ringtones.filter((cur) => {
                            if(cur.id === this.props.id) {
                                return (
                                    <p>
                                        {cur.name}
                                    </p>
                                )
                            }
                        })}
                    </div> */}
      </div>
    );
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
