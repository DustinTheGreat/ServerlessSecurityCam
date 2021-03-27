import React, { Component } from 'react'
import { getCurrentUser, signOut } from './Cognito'
import Signin from './Signin'

class UserStatus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: null,
    }
  }

  componentDidMount () {
    getCurrentUser(attributes => {
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].Name === 'email') {
          this.setState({ email: attributes[i].Value })
        }
      }
    })
  }

  render () {

    return (


      <div>


      {this.state.email ===null ? (
        <Signin />
      ) : (
     <h1>FUCK YOU!!!!!!!!!!!!!</h1>
      )}


        <span>{this.state.email}</span>
        {this.state.email && <button onClick={signOut}>Sign out</button>}
      </div>
    )
  }
}

export default UserStatus
