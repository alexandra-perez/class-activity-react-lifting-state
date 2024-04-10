import { useState } from 'react';

export default function Attendee({ event }) {
  return (
    <>
      <div key={attendee.id} className="attendee">
        <p>
          <img src={attendee.avatar} alt={attendee.firstName} />
          {'   '}
          <span>
            {' '}
            {attendee.firstName} {attendee.lastName}{' '}
          </span>
        </p>
        <p>
          <button
            className="clickable"
            onClick={() => updateEventAttendance(event.id, attendee.id)}
          >
            Attending:
          </button>
          <span>{attendee.attendance ? '✅' : '❌'}</span>
        </p>

        <p>
          <span>Note:</span> {attendee.note}
        </p>
      </div>
    </>
  );
}
