import React from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import useVisualMode from "hooks/useVisualMode";
import Confirm from './Confirm';
import Error from './Error';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const CANCEL = "CANCEL"
  const ERROR_SAVE= "ERROR_SAVE"
  const ERROR_DELETE= "ERROR_DELETE"
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() =>
        transition(SHOW))
      .catch(error => {
      transition(ERROR_SAVE, true)
    })
      
  }

  function deleted (){
    transition(CANCEL)
    transition(DELETE, true)
      props.cancelInterview(props.id)
      .then(() =>
        transition(EMPTY))
      .catch(error => {
       transition(ERROR_DELETE, true)
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CANCEL)}

          
        />}

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}

      {mode === SAVING &&
        <Status
          message={"Saving"}
        />}

      {mode === DELETE &&
        <Status
          message={'Deleting'}
        />}

      {mode === EDIT &&
        <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />}

      {mode === CANCEL &&
        <Confirm
        message="Are you sure?"
        onConfirm={deleted}
        onCancel={back}
        />} 

      {mode === ERROR_SAVE &&
        <Error
          message={'Was not able to save.'}
          onclose={back}
        />}
  
      {mode === ERROR_DELETE &&
        <Error
          message={'Was not able to delete.'}
          onclose={back}
        />}
    </article>

  );
}