import React, { Component } from 'react';
import EventList from '../components/events/EventList';

const CLIENT_ID = '865287224872-jaa0ihhouta3mu1iebo6i67lvu3jg399.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showAuthButton: false,
          showSignOutButton: false,
          events:[]
        };
        this.initClient = this.initClient.bind(this);
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
    }

    handleAuthClick(){
        window.gapi.auth2.getAuthInstance().signIn();
    }
    handleSignoutClick(){
        window.gapi.auth2.getAuthInstance().signOut();
    }
    handleClientLoad() {
        window.gapi.load('client:auth2', this.initClient);
    }

    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          this.setState({
                showAuthButton: false,
                showSignOutButton: true
            });
            this.listUpcomingEvents();
        } else {
          this.setState({
                showAuthButton: true,
                showSignOutButton: false
            });
        }
    }

    initClient () {
        window.gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then( () => {
            console.log(window.gapi);
            console.log(this);
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    listUpcomingEvents() {
        window.gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then((response) => {
            var events = response.result.items;
            this.setState({
                events: events
            });
          console.log(events);
        });
      }

    
    componentDidMount(){
        this.handleClientLoad();
    }

    render(){
        const {events} = this.state;
        
        let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize</button>
        let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>
        return(
          <div className="page container">
            {this.state.showAuthButton ? authButton : null}
            {this.state.showSignOutButton ? signOutButton : null}
            <EventList events={events}></EventList>
          </div>
        )
      }
}

export default Events;