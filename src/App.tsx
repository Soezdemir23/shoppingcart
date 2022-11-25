import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { consumerKey } from "./env";
import { Event } from "./eventsInterface";
function App() {
  const [events, setEvents] = useState<Event[]| null>(null)
  useEffect(() => {
    
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey="+consumerKey, { mode: "cors" })
      .then(result => result.json())
      .then(content => setEvents(content._embedded.events))
  },[])
  return (<div>
    <ul>
      {events === null ? "<li>No events found</li>" :events.map((party) => (
        <li key={party.id}>
          {party.name}
        </li>

      ))}
    </ul>
  </div>);
}

export default App;
