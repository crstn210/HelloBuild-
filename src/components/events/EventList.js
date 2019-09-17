import React from 'react';
import Event from './Event';

const EventList = ({events}) =>{
    const eventsArray = events.map(event => {
        return (
            <li key={event.id}><Event event={event} ></Event></li>
        )
    })

    return(
        <ul>
            {eventsArray}
        </ul>
    )
}

export default EventList;

