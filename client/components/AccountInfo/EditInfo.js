import React from 'react';
import { connect } from 'react-redux';
import { editUserInfoThunk } from '../../store/redux/user'

// const initialState = {
//     firstName: '',
//     lastName:'',
//     email: ''
// }

export class EditInfo extends React.Component {
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName:'',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // componentDidMount (){
    //     this.setState({
    //         firstName: this.props.user.firstName
    //     })
    // }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
          this.setState({
            firstName: this.props.user.firstName || '',
            lastName: this.props.user.lastName || '',
            email: this.props.user.email || '',
          });
        }
      }
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    handleSubmit(event) {
        event.preventDefault();
        this.props.edit({...this.props.user, ...this.state});
      }

    render(){
        return (
            <form id="account-form" onSubmit={this.handleSubmit}>
                <p>First Name: </p>
                <input
                    label="First Name:"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                />
                <p>Last Name: </p>
                <input
                    label="Last Name:"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                />
                <p>Email: </p>
                <input
                    label="Email:"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <button>Submit</button>
            </form>
        )
    }
}

const mapState = (state) => {
  return {
    user: state.auth
  }
}

const mapDispatch = (dispatch) => {
  return {
      edit: (user) => dispatch(editUserInfoThunk(user))
  };
};

export default connect(mapState, mapDispatch)(EditInfo);