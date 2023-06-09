import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment"
import { getAppointmentsForDay, getInterviewForDay, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);


  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview = {appointment.interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">

        {Object.values(dailyAppointments).map(appointment => {
          const interview = getInterviewForDay(state, appointment.interview);
          const interviewers = getInterviewersForDay (state, state.day);

          return (<Appointment
            key={appointment.id}
            {...appointment}
            interview={interview} 
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview} />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
