export function getAppointmentsForDay(state, day) {
  const result = [];
  const dayData = state.days.filter(days => days.name === day)

  if (!dayData[0]) return result;
  for (const appointment of dayData[0].appointments) {
    result.push(state.appointments[appointment]);
  }

  return result;
};


export function getInterviewForDay(state, interview) {
  if (!interview) return null;
  const interviewerId = interview.interviewer
  const interviewer = state.interviewers[interviewerId]
  const copyInterview = {...interview, interviewer}
  return copyInterview

}

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayData = state.days.filter(days => days.name === day)

  if (!dayData[0]) return result;
  for (const interviewers of dayData[0].interviewers) {
    result.push(state.interviewers[interviewers]);
  }

  return result;
};