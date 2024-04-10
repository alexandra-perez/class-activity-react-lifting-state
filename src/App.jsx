import { useState } from 'react';
import eventsData from './data';
import { v1 as generateUniqueID } from 'uuid';
// import Event from "./Components/Event";
// import Footer from "./Components/Footer";
import Header from './Components/Header';
import Attendees from './Components/Attendees';
import NewEventForm from './Components/NewEventForm';
// import NewEventForm from "./Components/NewEventForm";

function App() {
  const [events, setEvents] = useState(eventsData);



  const [selectOption, setSelectOption] = useState('');

  const [newEvent, setNewEvent] = useState({
    id: '',
    eventType: '',
    name: '',
    organizer: '',
    eventImage: '',
    date: '',
    people: [],
  });

  function addEvent() {
    const createEvent = {
      id: generateUniqueID(),
      eventType: selectOption,
      name: newEvent.name,
      organizer: newEvent.organizer,
      eventImage: newEvent.eventImage || 'https://loremflickr.com/640/480/',
      date: newEvent.date,
      people: [],
    };
    handleAddEvent(createEvent);
  }

  function handleSelectChange(e) {
    setSelectOption(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addEvent();
    resetEventForm();
  }

  function handleTextChange(e) {
    setNewEvent({
      ...newEvent,
      [e.target.id]: e.target.value,
    });
  }

  function resetEventForm() {
    setNewEvent({
      id: '',
      eventType: '',
      name: '',
      organizer: '',
      eventImage: '',
      date: '',
    });
    setSelectOption('');
  }

  function handleAddEvent(event) {
    setEvents([event, ...events]);
  }

  function toggleEventAttendees() {
    setShowAttendees(!showAttendees);
  }

  function updateEventAttendance(eventId, attendeeId) {
    const eventArray = [...events];
    const eventIndex = eventArray.findIndex((event) => eventId === event.id);
    const event = { ...eventArray[eventIndex] };
    const personIndex = event.people.findIndex(
      (person) => person.id === attendeeId
    );
    const peopleArray = [...event.people];
    peopleArray[personIndex].attendance = !peopleArray[personIndex].attendance;
    event.people = peopleArray;
    eventArray[eventIndex] = event;
    setEvents(eventArray);
  }

  return (
    <div className="App">
      <>
        <Header />
      </>
      <main>
        <div className="new-event">
          <>
            <NewEventForm />
          </>
        </div>
        <div className="events">
          <ul>
            {events.map((event) => {
              const { people: attendees } = event;

              return (
                <>
                  <li key={event.id}>
                    <img src={event.eventImage} alt={event.name} />
                    <h5>
                      {event.name} {event.eventType}
                    </h5>
                    <br />
                    <span>Organized by: {event.organizer} </span>
                    <br />
                    <Attendees toggleEventAttendees={toggleEventAttendees} />
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </main>
      <>
        <footer>
          <ul>
            <li>Contact</li>
            <li>About</li>
            <li>Legal</li>
          </ul>
        </footer>
      </>
    </div>
  );
}

export default App;
