import React from 'react'
import RandomAvatar from "../../../avatar/RandomAvatar";
export default function TeacherGridName(props) {
  return (
    <div className="flex items-center gap-2">
      <RandomAvatar gender={props.gender} />
      {props.email != null && props.email.length > 0 ? (
        <div className="">
          <p className="font-medium">{props.name}</p>
          <p className="text-xs">{props.email}</p>
        </div>
      ) : (
        <p className="font-medium">{props.name}</p>
      )}
    </div>
  );
}
