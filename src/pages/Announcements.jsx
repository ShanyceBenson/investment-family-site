import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    event_date: "",
    event_time: "",
    event_type: "Meeting",
  });

  useEffect(() => {
    async function fetchAnnouncements() {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Announcement fetch error:", error.message);
        return;
      }

      setAnnouncements(data);
    }

    fetchAnnouncements();
    fetchEvents();
  }, []);

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  function formatDate(day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;
  }

  function getEventsForDay(day) {
    const dateString = formatDate(day);
    return events.filter((event) => event.event_date === dateString);
  }

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) {
      console.log("Event fetch error:", error.message);
      return;
    }

    setEvents(data);
  }

  async function addEvent(e) {
    e.preventDefault();

    if (!newEvent.title || !newEvent.event_date) {
      alert("Please add an event title and date.");
      return;
    }

    const { error } = await supabase.from("calendar_events").insert([
      {
        title: newEvent.title,
        event_date: newEvent.event_date,
        event_time: newEvent.event_time || "All Day",
        event_type: newEvent.event_type,
      },
    ]);

    if (error) {
      console.log("Add event error:", error.message);
      return;
    }

    setNewEvent({
      title: "",
      event_date: "",
      event_time: "",
      event_type: "Meeting",
    });

    fetchEvents();
  }

  return (
    <main className="page-layout">
      <div className="calendar-title-section">
        <h2>Upcoming Events</h2>
        <p>
          Stay informed about Family Fund meetings, contribution deadlines, and
          important dates.
        </p>
      </div>
      <section className="calendar-section">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
            ←
          </button>

          <h2>{monthName}</h2>

          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
            →
          </button>
        </div>

        <div className="calendar-weekdays">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => (
            <div
              className={day ? "calendar-day" : "calendar-day empty"}
              key={index}
            >
              {day && (
                <>
                  <span className="day-number">{day}</span>

                  <div className="day-events">
                    {getEventsForDay(day).map((event) => (
                      <div className="mini-event" key={event.id}>
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="event-form-card">
          <h3>Add Upcoming Event</h3>

          <form onSubmit={addEvent}>
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              placeholder="Family Fund Meeting"
            />

            <label>Date</label>
            <input
              type="date"
              name="event_date"
              value={newEvent.event_date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, event_date: e.target.value })
              }
            />

            <label>Time</label>
            <input
              type="text"
              name="event_time"
              value={newEvent.event_time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, event_time: e.target.value })
              }
              placeholder="7:00 PM or All Day"
            />

            <label>Type</label>
            <select
              name="event_type"
              value={newEvent.event_type}
              onChange={(e) =>
                setNewEvent({ ...newEvent, event_type: e.target.value })
              }
            >
              <option>Meeting</option>
              <option>Important Date</option>
              <option>Deadline</option>
              <option>Reminder</option>
              <option>Birthday</option>
            </select>

            <button type="submit">Add Event</button>
          </form>
        </div>
      </section>

      <section className="page-header">
        <h1>Announcements</h1>

        <p>
          Stay informed about meetings, fund updates, voting topics, and
          important family decisions.
        </p>
      </section>

      <section className="announcement-grid">
        {announcements.map((announcement) => (
          <article className="announcement-card" key={announcement.id}>
            <span className="announcement-date">
              {new Date(announcement.created_at).toLocaleDateString()}
            </span>

            <h3>{announcement.title}</h3>

            <p>{announcement.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Announcements;
