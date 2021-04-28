import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { OrderHistory } from './OrderHistory'

const UserInfo = ({user}) => {
    return (
        <div>
            <p>First Name: 
            {user.firstName}</p>
            <p>Last Name: 
            {user.lastName}</p>
            <p>Email: 
            {user.email}</p>
            <Link to={`/account/${user.id}`}>
            <button>He</button>
            </Link>
            <Link to={`/account/${user.id}/edit`} >
            <button>edit</button>
            </Link>
        </div>
    )
}

const mapState = (state) => {
    return{
        user: state.auth
    }
}

// const mapDispatch(dispatch) {
//     return {

//     }
// }

export default connect(mapState)(UserInfo)