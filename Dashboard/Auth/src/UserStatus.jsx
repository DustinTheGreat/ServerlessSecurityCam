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
     <h1>Admin Panel</h1>,<br></br>
      )}

         <div>
      <header className="Navbar">
        <div className="Toolbar">
          <div className="Logo">
            {" "}
            <span role="img" aria-label="logo">
              
            </span>{" "}
          </div>
          <div className="sinn" >
              {this.state.email}
        {this.state.email && <button onClick={signOut}>Sign out</button>}
          </div>
        </div>
   
      </header>

    </div>


       
      </div>
    )
  }
}

export default UserStatus
