import React from "react";

let days = null;
let hours = null;
let mins = null;

function countDownToTime(countTo, id) {
    countTo = new Date(countTo).getTime();
    var now = new Date();
    countTo = new Date(countTo);
    var timeDifference = (countTo - now);
        
    var secondsInADay = 60 * 60 * 1000 * 24,
        secondsInAHour = 60 * 60 * 1000;
  
    days = Math.floor(timeDifference / (secondsInADay) * 1);
    hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
    mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
}

function Event({event}) {
    countDownToTime(event.start.dateTime, 'countdown1');
    return (    
        <a className="event" href={event.htmlLink}>
            <h3>{event.summary} </h3>
            <span>By: {event.creator.displayName}</span>
            <div className="countdown" id="countdown1">
                <span className="timeel days">{days}</span>
                <span className="timeel timeRefDays">days</span>
                <span className="timeel hours">{hours}</span>
                <span className="timeel timeRefHours">hours</span>
                <span className="timeel minutes">{mins}</span>
                <span className="timeel timeRefMinutes">minutes</span>
            </div>
        </a>
    );
  }

export default Event;