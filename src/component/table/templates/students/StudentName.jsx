import React from 'react'
import RandomAvatar from "../../../avatar/RandomAvatar";


export default function StudentName(props) {
  return (
    <div className="flex items-center gap-2">
      <RandomAvatar gender={props.gender} />
      <p>{props.name}</p>
    </div>
  );
}


