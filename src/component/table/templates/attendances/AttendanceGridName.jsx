import React from "react";
import ClasseAvatar from "../../../avatar/ClasseAvatar";
import { useStore } from "../../../../contexts/Store";

export default function AttendanceGridName(props) {
  return (
    <div className="flex items-center gap-2">
      <ClasseAvatar moduleName={props.name} width="40px" />
      <div className="">
        <p className="font-medium">{props.name}</p>
        <p className="text-xs">{`Élèves: ${props.students != null ? props.students.length : useStore.getState().selectedAttendances.students.length}`}</p>
      </div>
    </div>
  );
}
