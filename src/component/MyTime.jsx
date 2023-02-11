import React from "react";
import { useTime } from "react-timer-hook";

export default function MyTime() {
  const { seconds, minutes, hours, ampm } = useTime({ format: "24-hour" });

  return (
    <div style={{ textAlign: "center",marginRight: "4px" }}>
      <div style={{ fontSize: "30px",width:"100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        <span>{ampm}</span>
      </div>
    </div>
  );
}
