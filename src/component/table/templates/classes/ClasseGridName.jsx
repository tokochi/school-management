import React from 'react'
import ClasseAvatar from "../../../avatar/ClasseAvatar";
import { useStore } from "../../../../contexts/Store";


export default function ClasseGridName(props) {
  return (
    <div className="flex items-center gap-2">
      <ClasseAvatar moduleName={props.module} width="40px" />
      <div className="">
        <p className="font-medium">{`${props.level != null ? props.level : ""}-${props.module != null ? props.module : ""}-${props.group != null ? props.group : ""}`}</p>
        <p className="text-xs">{`Élèves: ${props?.students != null ? props?.students?.length : useStore?.getState()?.selectedClasses?.students?.length}`}</p>
      </div>
    </div>
  );
}


