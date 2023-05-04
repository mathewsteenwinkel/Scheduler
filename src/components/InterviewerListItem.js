import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


// function to show the interviewers within the show component.
export default function InterviewerListItem (props){
  const interviewerClass = classNames("interviewer__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}