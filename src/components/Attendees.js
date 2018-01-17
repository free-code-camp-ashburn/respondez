import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../style/Events.css'
import Attendee from './Attendee'

class Attendees extends Component {
  rsvpYes = (e) => {
    e.preventDefault()
    const { eventId } = this.props
    const { uid } = this.props.userProfile
    const { eid, date, eventName, location, time } = this.props.details
    const newAttendee = this.props.userProfile
    const targetAttendees = this.props.eventsList[eventId].attendees
    let arr = []

    if (targetAttendees) {
      for (let key of targetAttendees) { 
        arr.push(key.uid) 
      }
    }

    const newAttend = {
      eid,
      eventName,
      date,
      time,
      location,
    }

    !arr.includes(uid) && this.props.addRsvp(eventId, newAttendee, newAttend)
  }

  rsvpNo = (e) => {
    e.preventDefault()
    const { eventId } = this.props
    const eidFromEventDetails = this.props.details.eid
    const { uid } = this.props.userProfile
    const targetAttendees = this.props.eventsList[eventId].attendees
    
    if (targetAttendees) {
      for (let key of targetAttendees) {
        if (uid === key.uid) {
          let rsvpToRemove = targetAttendees.indexOf(key)
          this.props.removeRsvp(eventId, rsvpToRemove, eidFromEventDetails)
        }
      }
    }  
  }

  render() {
    const { eventId, loggedIn } = this.props
    const targetAttendees = this.props.eventsList[eventId].attendees
    const rsvpYes = <button className="rsvpYes" onClick={this.rsvpYes}>&#9745; Accept</button>
    const rsvpNo = <button className="rsvpNo" onClick={this.rsvpNo}>&#9746; Decline</button>
    const peopleIcon = <span className="white" role="img" aria-label="busts in silhouette icon">&#128101; 0</span>
    
    return (
      <div>
        <h3 className="header3">Attendees</h3>
        { targetAttendees ? targetAttendees.map( (attendee, i) => <Attendee key={i} attendee={attendee} />)
                           : <p>{peopleIcon}</p> } 
        
        <div>
          { loggedIn && rsvpNo }
          { loggedIn && rsvpYes }
        </div>
      </div>
    )
  }
}

// Remove in production
Attendees.propTypes = {
  rsvpYes: PropTypes.func,
  rsvpNo: PropTypes.func,
}

export default Attendees