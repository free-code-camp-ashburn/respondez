import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../style/Header.css'
import { auth, githubProvider } from '../helpers/base'

class Header extends Component {
  signIn = () => {
    console.log("Logging into Github!")
    this.props.spinnerHandler()
    
    auth.signInWithPopup(githubProvider)
      .then((authData) => {
        const { avatar_url, bio, blog, name, login, html_url } = authData.additionalUserInfo.profile
        const profile = { 
          avatar: avatar_url || "",
          bio: bio || "",
          blog: blog || "",
          login: login || "",
          name: name || "",
          github: html_url || "",
          uid: authData.user.uid || ""
        }
        this.props.logIn(profile)
      })
      .catch((err) => console.log("Error: " + err))
  }

  signOut = () => {
    console.log("Logging out of Github!")
    auth.signOut()

    const profile = { 
      avatar: "",
      bio: "",
      blog: "",
      login: "",
      name: "",
      github: "",
      uid: ""
    }
    this.props.logOut(profile)
  }
  
  render() {
    const { loggedIn } = this.props
    const signInButton = <a onClick={this.signIn}><span role="img" aria-label="closed lock with key icon">&#128272;</span></a>
    const signOutButton = <a onClick={this.signOut}><span role="img" aria-label="open lock icon">&#128275;</span></a>
    const calendarIcon = <span role="img" aria-label="tear-off calendar icon">&#128198;</span>

    if(!this.props.user) {
      return (
      <header>
        <nav>
          <div className="topnav">
            { !loggedIn && signInButton }
            { loggedIn && signOutButton }
            
            {/* Remove in Production */}
            Development Version

            {/* Remove in Production */}
            <button onClick={this.props.loadEvents}>Load Samples</button>
            <button onClick={this.props.unloadEvents}>Unload Samples</button>
            
          </div>
        </nav>
        <p className="hr1">LOPOL</p>
        <h1 className="header1">Respondez </h1>
        <h3 className="header3">{calendarIcon} An Event Management System</h3>
        
        <p className="hr1">LOPOL</p>
      </header>
      )
    }
  }
}

// Remove in production
Header.propTypes = {
  signIn: PropTypes.func,
  signOut: PropTypes.func,
}

export default Header