import { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((res) => {
      setState({ ...state, days: res[0].data, appointments: res[1].data, interviewers: res[2].data })
    })
      .catch(err => console.log('err', err));
  }, [])


  const updateSpots = (appointments, appointmentId) => {
    const specificDay = state.days.find(d => d.appointments.includes(appointmentId))
    const spots = specificDay.appointments.filter(id => appointments[id].interview === null).length
    return state.days.map(d => d.appointments.includes(appointmentId) ? { ...d, spots: spots } : {...d})
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days: updateSpots(appointments, id)})
      })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: updateSpots(appointments, id) })
      })
  }
  return { state, setDay ,bookInterview, cancelInterview}
}