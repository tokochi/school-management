import React from 'react'
import { useStore } from "../../../../contexts/Store";
export default function TeacherGridLevels(props) {
  const theme = useStore((state) => state.theme);
  return (
    <div className="flex gap-1 ">
      {props.levels != null && props.levels.length > 1 ? (
        props.levels.map((item, index) => (
          <p key={index} className={`px-2 text-center ${theme.main} ${theme.text2} rounded-3xl`}>
            {item}
          </p>
        ))
      ) : (
        <p className={`px-2 text-center ${theme.main} ${theme.text2} rounded-3xl`}> {props.levels}</p>
      )}
    </div>
  );
}
